const assert = require('node:assert/strict')
const { test } = require('node:test')
const vm = require('node:vm')
const { MEDIA_RETRY_SCRIPT, RETRY_DELAYS_MS } = require('../lib/media-retry.ts')

function image(src, extra = {}) {
  const attrs = { src, ...extra }
  return { tagName: 'IMG', isConnected: true, complete: false, naturalWidth: 0,
    getAttribute: key => attrs[key] ?? null,
    setAttribute: (key, value) => { attrs[key] = value },
    ...extra,
  }
}
function harness(images = []) {
  const listeners = {}, timers = []
  vm.runInNewContext(MEDIA_RETRY_SCRIPT, {
    URL, WeakMap, Date,
    document: { baseURI: 'https://example.com/', readyState: 'complete',
      addEventListener: (type, handler) => { listeners[type] = handler },
      querySelectorAll: () => images,
    },
    setTimeout: callback => timers.push(callback),
  })
  return { timers, error: el => listeners.error({ target: el }), load: el => listeners.load({ target: el }) }
}

test('a transient failure retries a fresh URL on the same image without a page refresh', () => {
  const img = image('/photo.png?quality=90#frame'), h = harness()
  h.error(img); h.error(img)
  assert.equal(h.timers.length, 1)
  h.timers.shift()()
  const next = new URL(img.getAttribute('src'))
  assert.equal(next.pathname, '/photo.png')
  assert.equal(next.searchParams.get('quality'), '90')
  assert.ok(next.searchParams.has('_media_retry'))
  assert.equal(next.hash, '#frame')
  img.complete = true; img.naturalWidth = 1200; h.load(img)
  assert.equal(h.timers.length, 0)
})
test('responsive candidates and picture sources retry together, preserving descriptors', () => {
  const source = image('/fallback.png', { srcset: '/mobile.png 1x, /mobile@2x.png 2x' })
  const img = image('/photo.png', { srcset: '/small.png 640w, /large.png 1280w' })
  img.parentElement = { tagName: 'PICTURE', querySelectorAll: () => [source] }
  const h = harness(); h.error(img); h.timers.shift()()
  assert.match(img.getAttribute('srcset'), /_media_retry=.* 640w,/)
  assert.match(img.getAttribute('srcset'), /_media_retry=.* 1280w$/)
  assert.match(source.getAttribute('srcset'), /_media_retry=.* 2x$/)
})
test('repeated failures stop at the configured retry limit', () => {
  const img = image('/photo.png'), h = harness()
  for (let i = 0; i < RETRY_DELAYS_MS.length; i++) { h.error(img); h.timers.shift()() }
  h.error(img)
  assert.equal(h.timers.length, 0)
})
test('a pending retry does not overwrite a new image selected by React', () => {
  const img = image('/old.png'), h = harness()
  h.error(img); img.setAttribute('src', '/new.png'); h.timers.shift()()
  assert.equal(img.getAttribute('src'), '/new.png')
})
test('images which failed before listener installation are recovered too', () => {
  const img = image('/photo.png'); img.complete = true
  const h = harness([img]); assert.equal(h.timers.length, 1)
  h.timers.shift()(); assert.match(img.getAttribute('src'), /_media_retry=/)
})
test('detached images are not retried', () => {
  const img = image('/photo.png'), h = harness()
  h.error(img); img.isConnected = false; h.timers.shift()()
  assert.equal(img.getAttribute('src'), '/photo.png')
})
