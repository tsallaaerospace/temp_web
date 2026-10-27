const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { promisify } = require('node:util')
const { test } = require('node:test')

test('callback: invalid callbacks still fail synchronously', () => {
  assert.throws(() => fs.readlink(__filename), { code: 'ERR_INVALID_ARG_TYPE' })
})

for (const [name, readlink] of [
  ['callback', promisify(fs.readlink)],
  ['promise', fs.promises.readlink],
  ['sync', async (file, options) => fs.readlinkSync(file, options)],
]) {
  test(`${name}: files and directories are non-links`, async () => {
    for (const file of [__filename, __dirname]) {
      await assert.rejects(readlink(file), { code: 'EINVAL', syscall: 'readlink' })
    }
  })

  test(`${name}: missing-path errors are preserved`, async () => {
    await assert.rejects(readlink(path.join(__dirname, 'missing-readlink-test')), { code: 'ENOENT' })
  })

  test(`${name}: real links and buffer encoding still work`, async (t) => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'tsalla-readlink-'))
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }))
    const target = path.join(directory, 'target')
    const link = path.join(directory, 'link')
    fs.mkdirSync(target)
    fs.symlinkSync(target, link, 'junction')
    assert.equal(await readlink(link), fs.readlinkSync(link))
    assert.equal(fs.realpathSync(link), fs.realpathSync(target))
    assert.ok(Buffer.isBuffer(await readlink(link, { encoding: 'buffer' })))
  })
}
