const assert = require('node:assert/strict')
const { test } = require('node:test')
const { readFileSync } = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

function mount(src, time, frameCallbacks = true) {
  const effects = []
  let subtitle = false, callbacks = 0
  const video = { currentSrc: src, currentTime: time, ended: true, paused: true,
    pause() { this.paused = true },
    ...(frameCallbacks ? { requestVideoFrameCallback() { callbacks++; return 1 }, cancelVideoFrameCallback() {} } : {}),
  }
  const react = {
    useState: () => [false, value => { subtitle = value }],
    useRef: () => ({ current: video }), useEffect: effect => effects.push(effect),
  }
  const module = { exports: {} }
  const requireMock = name => {
    if (name === 'react') return react
    if (name === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null }
    return { useHeroVideoSource() {}, HERO_4K: '' }
  }
  const source = ts.transpileModule(readFileSync(require.resolve('../app/storm/components/StormHero.tsx'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText
  vm.runInNewContext('(function(require,module,exports){' + source + '\n})')(requireMock, module, module.exports)
  module.exports.default()
  effects[0]()
  return { video, subtitle, callbacks }
}

for (const clip of ['phone', 'tablet']) {
  for (const callbacks of [true, false]) {
    test(`${clip}: an end event missed before hydration still holds the visible frame (frame callback: ${callbacks})`, () => {
      const result = mount(`https://example.com/product/STORM/Hero_Section/optimized/${clip}.mp4`, 5.5, callbacks)
      assert.equal(result.video.currentTime, 325 / 60)
      assert.equal(result.video.paused, true)
      assert.equal(result.subtitle, true)
      assert.equal(result.callbacks, 0, 'an already-finished clip must not wait for another video frame callback')
    })
  }
}

test('desktop: late hydration keeps the clean clip ending and restores the subtitle', () => {
  const result = mount('https://example.com/product/STORM/Hero_Section/optimized/desktop-1080.mp4', 5.4)
  assert.equal(result.video.currentTime, 5.4)
  assert.equal(result.video.paused, true)
  assert.equal(result.subtitle, true)
})
