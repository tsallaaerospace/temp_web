// Wix hosting answers "429 Too Many Requests" when a visitor asks for many files that are not in its
// cache yet (common right after a publish). Browsers never retry a failed image or video on their
// own, so the site retries them with growing waits until the limit clears.
export const RETRY_DELAYS_MS = [2000, 4000, 8000, 15000, 30000, 60000]

// Runs in <head> before any image loads, so it also catches failures from the server-rendered HTML.
// Covers every <img>, <video> and <source> on every page.
export const MEDIA_RETRY_SCRIPT = `(function () {
  var delays = ${JSON.stringify(RETRY_DELAYS_MS)};
  var tries = new WeakMap();
  document.addEventListener("error", function (event) {
    var el = event.target;
    var tag = el && el.tagName;
    if (tag !== "IMG" && tag !== "VIDEO" && tag !== "SOURCE") return;
    var src = el.getAttribute("src");
    if (!src) return;
    var state = tries.get(el);
    if (!state || state.src !== src) state = { src: src, count: 0 };
    if (state.count >= delays.length) return;
    var wait = delays[state.count++];
    tries.set(el, state);
    setTimeout(function () {
      if (!el.isConnected || el.getAttribute("src") !== src) return;
      if (tag === "IMG") { el.removeAttribute("src"); el.setAttribute("src", src); return; }
      var video = tag === "SOURCE" ? el.parentElement : el;
      if (video && typeof video.load === "function") video.load();
    }, wait);
  }, true);
})();`

// Downloads a whole file into memory, retrying failed or rate-limited attempts with the same waits.
// Resolves null once every retry has failed or the signal is aborted.
export async function fetchBlobWithRetry(src: string, options: { signal?: AbortSignal } = {}): Promise<Blob | null> {
  const { signal } = options
  for (let attempt = 0; ; attempt++) {
    try {
      const response = await fetch(src, { signal })
      if (response.ok) return await response.blob()
    } catch {
      if (signal?.aborted) return null
    }
    if (attempt >= RETRY_DELAYS_MS.length || signal?.aborted) return null
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS_MS[attempt]))
  }
}

// For images loaded in code (new Image()), which the page-wide script cannot see.
// Resolves with the loaded image, or null once every retry has failed or isActive() turns false.
export function loadImageWithRetry(
  src: string,
  options: { crossOrigin?: string; isActive?: () => boolean } = {},
): Promise<HTMLImageElement | null> {
  const { crossOrigin, isActive = () => true } = options
  return new Promise((resolve) => {
    let attempt = 0
    const tryLoad = () => {
      const image = new Image()
      if (crossOrigin) image.crossOrigin = crossOrigin
      image.onload = () => resolve(image)
      image.onerror = () => {
        if (attempt >= RETRY_DELAYS_MS.length || !isActive()) return resolve(null)
        setTimeout(() => (isActive() ? tryLoad() : resolve(null)), RETRY_DELAYS_MS[attempt++])
      }
      image.src = src
    }
    tryLoad()
  })
}
