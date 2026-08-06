"use strict"

/**
 * Removes map comments shipped by dependencies when the referenced map is not
 * distributed. This prevents the browser requesting non-existent `*.mjs.map`
 * files from Next's development bundle.
 */
module.exports = function stripSourceMapUrl(source) {
  const code = Buffer.isBuffer(source) ? source.toString() : source
  return code.replace(/^[\t ]*\/\/[#@][\t ]*sourceMappingURL=.*$/gm, "")
}
