import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.dirname(fileURLToPath(import.meta.url))
const stripSourceMapUrlLoader = path.join(projectRoot, "loaders", "strip-source-map-url.cjs")

/**
 * Framer Motion's ESM distribution keeps `*.mjs.map` references in the final
 * development chunks even after module loaders run. Remove only those dangling
 * dependency references from emitted client assets; normal application maps
 * remain available.
 */
class StripDependencyMjsSourceMapUrlsPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("StripDependencyMjsSourceMapUrlsPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: "StripDependencyMjsSourceMapUrlsPlugin",
          // PREVIOUS UI: PROCESS_ASSETS_STAGE_OPTIMIZE ran before Next appended the dependency map comments.
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
        },
        (assets) => {
          Object.entries(assets).forEach(([assetName, asset]) => {
            if (!assetName.endsWith(".js")) return

            const originalSource = asset.source().toString()
            // PREVIOUS UI: the expression handled only normal newline comments, not Next's `eval("...\\n...")` module strings.
            const cleanedSource = originalSource.replace(/(?:^[\t ]*|\\n[\t ]*)\/\/[#@][\t ]*sourceMappingURL=[^\r\n"\\]*\.mjs\.map[^\r\n"\\]*/gm, "")

            if (cleanedSource !== originalSource) {
              compilation.updateAsset(assetName, new compiler.webpack.sources.RawSource(cleanedSource))
            }
          })
        },
      )
    })
  }
}

/**
 * PREVIOUS CONFIG:
 * const nextConfig = {
 *   eslint: { ignoreDuringBuilds: true },
 *   typescript: { ignoreBuildErrors: true },
 *   images: { unoptimized: true },
 * }
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      /* PREVIOUS UI: only the post-loader below attempted to strip package map references. */
      config.module.rules.push({
        test: /\.mjs$/,
        include: path.join(projectRoot, "node_modules", "framer-motion", "dist", "es"),
        enforce: "post",
        use: [{ loader: stripSourceMapUrlLoader }],
      })
      config.plugins.push(new StripDependencyMjsSourceMapUrlsPlugin())
    }

    return config
  },
}
export default nextConfig
