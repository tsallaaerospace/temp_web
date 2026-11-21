const assert = require('node:assert/strict')
const { test } = require('node:test')
const { readFileSync } = require('node:fs')
const { join } = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')

// Exercise the actual hero effect with slow, manually completed frame requests.
function harness() {
  const requests = [], pending = [], effects = [], listeners = {}, timers = new Set()
  let decoded = 0, peak = 0, top = 0, refIndex = 0
  // Each test frame is 4 bytes holding its own index, so the mock decoder can tell which frame it got.
  const PER_PACK = 16, COUNT = 557
  const packIndex = src => Number(src.match(/bat-hero-pack-(\d+)/)[1])
  const delays = []
  const bitmap = i => {
    decoded++; peak = Math.max(peak, decoded)
    let closed = false
    return { i, close() { if (!closed) { closed = true; decoded-- } } }
  }
  const track = { offsetHeight: 4000, getBoundingClientRect: () => ({ top, height: 4000 }) }
  const canvas = { width: 1000, height: 1000, clientWidth: 1000, clientHeight: 1000, style: {},
    getContext: () => ({ drawImage() {} }) }
  const refs = [track, { style: {}, pause() {} }, canvas, { style: {} }, null, null, null, null, null, false, { style: {} }, { style: {} }, { style: {}, clientWidth: 1920, clientHeight: 1080 }]
  const context = vm.createContext({
    console, AbortController, Blob,
    window: { innerHeight: 1000, devicePixelRatio: 2,
      matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
      addEventListener: (name, fn) => { listeners[name] = fn }, removeEventListener() {} },
    setTimeout: (callback, ms) => { delays.push(ms); timers.add(callback); return callback }, clearTimeout: fn => timers.delete(fn),
    requestAnimationFrame: () => 1, cancelAnimationFrame() {},
    fetch: (src, options) => new Promise((resolve, reject) => {
      const pack = packIndex(src); requests.push(pack)
      pending.push(status => {
        if (options.signal.aborted) return reject(new Error('aborted'))
        if (status) return resolve({ ok: false, status })
        // One chunk per frame, so frames are cut out while the pack is still streaming
        const chunks = []
        for (let f = pack * PER_PACK; f < Math.min(COUNT, (pack + 1) * PER_PACK); f++) {
          const b = new Uint8Array(4); new DataView(b.buffer).setUint32(0, f); chunks.push(b)
        }
        resolve({ ok: true, body: { getReader: () => ({ read: async () => chunks.length ? { done: false, value: chunks.shift() } : { done: true } }) } })
      })
    }),
    createImageBitmap: async blob => bitmap(new DataView(await blob.arrayBuffer()).getUint32(0)),
  })
  const react = { useRef: () => ({ current: refs[refIndex++] }), useState: value => [value, () => {}], useEffect: fn => effects.push(fn) }
  const load = file => {
    const module = { exports: {} }
    const requireMock = name => {
      if (name === 'react') return react
      if (name === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null }
      if (name === 'framer-motion') return { motion: {}, useReducedMotion: () => false }
      if (name === '@/lib/hero-frame-cache') return load(join(__dirname, '../lib/hero-frame-cache.ts'))
      if (name === './batHeroForeground') return load(join(__dirname, '../app/bat/components/batHeroForeground.ts'))
      if (name === './batHeroFramePacks') return { FRAMES_PER_PACK: PER_PACK, FRAME_SIZES: Array(COUNT).fill(4) }
      return {}
    }
    const code = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX,
    } }).outputText
    vm.runInContext('(function(require,module,exports){' + code + '\n})', context)(requireMock, module, module.exports)
    return module.exports
  }
  const hero = load(join(__dirname, '../app/bat/components/BatHero.tsx'))
  hero.default()
  const cleanups = effects.map(fn => fn())
  const flush = () => new Promise(resolve => setImmediate(resolve))
  return {
    requests, pending, timers, delays, canvas, titleGroundOffset: hero.titleGroundOffset, titleScale: hero.titleScale, droneMaskPose: hero.droneMaskPose,
    get maskPosition() { return refs[12].style.maskPosition },
    get maskImage() { return refs[12].style.maskImage },
    resizeMask(width, height) { refs[12].clientWidth = width; refs[12].clientHeight = height; listeners.resize() },
    get decoded() { return decoded }, get peak() { return peak },
    scroll(y) { top = -y; listeners.scroll() },
    async complete() { pending.shift()?.(); await flush() },
    async fail(status = 429) { pending.shift()?.(status); await flush() },
    async runTimers() { const due = [...timers]; timers.clear(); due.forEach(fn => fn()); await flush() },
    async dispose() { cleanups.forEach(fn => fn?.()); await flush() },
  }
}

test('scrolling prioritises the requested frame without waiting for scrolling to stop', async () => {
  const h = harness()
  const firstBatch = h.requests.length
  h.scroll(1500)
  // PREVIOUS UI: a title fade held the sequence back to frame 263. Frames now advance immediately.
  assert.equal(h.requests[firstBatch], Math.floor(278 / 16))
  await h.dispose()
})

test('ground title follows the landscape out of view instead of floating in the sky', async () => {
  const h = harness()
  assert.equal(h.titleGroundOffset(0), 0)
  assert.equal(h.titleGroundOffset(60), 0)
  assert.equal(h.titleGroundOffset(63), 330)
  assert.equal(h.titleGroundOffset(72), 2200)
  assert.equal(h.titleGroundOffset(556), 2200)
  assert.equal(h.titleGroundOffset(0), 0, 'reverse scrubbing returns to its original ground position')
  await h.dispose()
})

test('title counter-zoom is slight and settles through takeoff', async () => {
  const h = harness()
  assert.equal(h.titleScale(0), 1)
  assert.equal(h.titleScale(30), 0.97)
  assert.equal(h.titleScale(60), 0.94)
  assert.equal(h.titleScale(95), 0.94)
  await h.dispose()
})

test('foreground cutout follows the growing aircraft and rewinds to the opening pose', async () => {
  const h = harness()
  assert.deepEqual(Array.from(h.droneMaskPose(0)), [945, 543, 1])
  assert.ok(h.droneMaskPose(48)[2] > 1.27)
  assert.ok(Math.abs(h.droneMaskPose(18)[2] - 1.0667) < 0.0001)
  assert.deepEqual(Array.from(h.droneMaskPose(0)), [945, 543, 1])
  await h.dispose()
})

test('opening masks use each displayed frame at native size', async () => {
  const h = harness()
  while (h.pending.length) await h.complete()
  h.resizeMask(1920, 1080)
  const opening = h.maskImage
  h.scroll(48 / 556 * 3000)
  while (h.pending.length) await h.complete()
  h.resizeMask(1920, 1080)
  assert.notEqual(h.maskImage, opening, 'each frame has its own silhouette')
  assert.equal(h.maskPosition, '0 0, 0px 0px', 'source matte never receives aircraft scale offsets')
  h.scroll(0)
  await h.complete()
  h.resizeMask(1920, 1080)
  assert.equal(h.maskImage, opening, 'reverse scrubbing restores the opening matte')
  await h.dispose()
})

test('resizing refreshes the mask even when the backing canvas size is unchanged', async () => {
  const h = harness()
  h.scroll(64 / 556 * 3000)
  while (h.pending.length) await h.complete()
  h.resizeMask(1920, 1080)
  const x = parseFloat(h.maskPosition.split(',')[1])
  h.resizeMask(3840, 2160)
  assert.notEqual(x, 0)
  assert.equal(parseFloat(h.maskPosition.split(',')[1]), x * 2)
  await h.dispose()
})

test('the full sequence downloads once, in 35 packs, without retaining 557 decoded 1080p images', async () => {
  const h = harness()
  while (h.pending.length) await h.complete()
  assert.equal(new Set(h.requests).size, 35)
  assert.ok(h.peak <= 28)
  for (const y of [1500, 0]) { h.scroll(y); while (h.pending.length) await h.complete() }
  assert.equal(h.requests.length, 35, 'scrubbing must reuse downloaded frames')
  assert.ok(h.peak <= 28)
  await h.dispose()
  assert.equal(h.decoded, 0)
})

test('retina canvas rendering does not upscale beyond source detail', async () => {
  const h = harness()
  assert.ok(h.canvas.width <= 1920 && h.canvas.height <= 1080)
  await h.dispose()
  while (h.pending.length) await h.complete()
  assert.equal(h.decoded, 0)
})

test('a blocked pack is retried later with growing waits instead of being given up', async () => {
  const h = harness()
  const blocked = h.requests[0]
  await h.fail(429)
  assert.deepEqual(h.delays, [2000])
  await h.runTimers()
  assert.equal(h.requests.filter(p => p === blocked).length, 2, 'retried after the wait')
  // Answer every other pack; block the retry once more
  while (h.pending.length) {
    if (h.requests[h.requests.length - h.pending.length] === blocked && h.delays.length === 1) await h.fail(429)
    else await h.complete()
  }
  assert.deepEqual(h.delays, [2000, 4000])
  await h.runTimers()
  while (h.pending.length) await h.complete()
  assert.equal(h.requests.filter(p => p === blocked).length, 3)
  assert.equal(new Set(h.requests).size, 35)
  await h.dispose()
})
