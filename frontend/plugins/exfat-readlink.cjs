const fs = require('node:fs')

function normalize(error, path) {
  if (error.code !== 'EISDIR') return error
  try {
    if (fs.lstatSync(path).isSymbolicLink()) return error
  } catch {
    return error
  }
  // exFAT reports EISDIR for non-links; Next.js and Webpack expect EINVAL.
  return Object.assign(new Error(`EINVAL: invalid argument, readlink '${path}'`), {
    code: 'EINVAL', errno: -4071, syscall: 'readlink', path, cause: error,
  })
}

if (process.platform === 'win32') {
  const readlink = fs.readlink
  fs.readlink = (path, options, callback) => {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }
    if (typeof callback !== 'function') return readlink(path, options, callback)
    return readlink(path, options, (error, target) => callback(error ? normalize(error, path) : null, target))
  }

  const readlinkSync = fs.readlinkSync
  fs.readlinkSync = (path, options) => {
    try {
      return readlinkSync(path, options)
    } catch (error) {
      throw normalize(error, path)
    }
  }

  const readlinkPromise = fs.promises.readlink
  fs.promises.readlink = async (path, options) => {
    try {
      return await readlinkPromise(path, options)
    } catch (error) {
      throw normalize(error, path)
    }
  }
  require('node:module').syncBuiltinESMExports()
}
