// Recover bounded transient media failures without requiring a page refresh.
export const RETRY_DELAYS_MS = [2000, 4000, 8000, 15000, 30000, 60000]

// Runs in <head> before any image loads, so it also catches failures from the server-rendered HTML.
// Covers every <img>, <video> and <source> on every page.
export const MEDIA_RETRY_SCRIPT = `(function () {
  var delays = ${JSON.stringify(RETRY_DELAYS_MS)};
  var tries = new WeakMap();
  function fresh(src, stamp) {
    var url = new URL(src, document.baseURI);
    if (url.origin !== new URL(document.baseURI).origin) return src;
    url.searchParams.set("_media_retry", stamp);
    return url.href;
  }
  function refreshSet(value, stamp) {
    if (value.indexOf("data:") !== -1) return value;
    return value.split(",").map(function (candidate) {
      return candidate.trim().replace(/^([^\\s]+)/, function (src) { return fresh(src, stamp); });
    }).join(", ");
  }
  function retry(el) {
    var tag = el && el.tagName;
    if (tag !== "IMG" && tag !== "VIDEO" && tag !== "SOURCE") return;
    var src = el.getAttribute("src") || el.currentSrc;
    if (!src) return;
    if (tag === "SOURCE") {
      // The browser also fires "error" on a <source> it skips because its media query doesn't match (e.g. the
      // phone-only clip on desktop), or after a later <source> was chosen. Retrying those reloaded a video that was
      // already playing, so the FENIX hero restarted after 2 s, 4 s and 8 s on desktop.
      // PREVIOUS: every <source> error was retried.
      var media = el.getAttribute("media");
      if (media && !window.matchMedia(media).matches) return;
      var owner = el.parentElement;
      if (owner && owner.currentSrc && owner.currentSrc !== el.src && !owner.error) return;
    }
    var state = tries.get(el);
    if (!state || state.current !== src) state = { src: src, current: src, count: 0, pending: false };
    if (state.pending || state.count >= delays.length) return;
    var wait = delays[state.count++];
    state.pending = true;
    tries.set(el, state);
    setTimeout(function () {
      state.pending = false;
      if (!el.isConnected || (el.getAttribute("src") || el.currentSrc) !== src) return;
      var stamp = Date.now() + "-" + state.count;
      state.current = fresh(state.src, stamp);
      if (tag === "IMG") {
        // Refresh the browser-selected candidates too; src alone does not override srcset/picture.
        var srcset = el.getAttribute("srcset");
        if (srcset) el.setAttribute("srcset", refreshSet(srcset, stamp));
        if (el.parentElement && el.parentElement.tagName === "PICTURE") {
          el.parentElement.querySelectorAll("source[srcset]").forEach(function (source) {
            source.setAttribute("srcset", refreshSet(source.getAttribute("srcset"), stamp));
          });
        }
        el.setAttribute("src", state.current);
        return;
      }
      el.setAttribute("src", state.current);
      var video = tag === "SOURCE" ? el.parentElement : el;
      if (video && typeof video.load === "function") video.load();
    }, wait);
  }
  document.addEventListener("error", function (event) { retry(event.target); }, true);
  document.addEventListener("load", function (event) { tries.delete(event.target); }, true);
  function scan() {
    document.querySelectorAll("img").forEach(function (image) {
      if (image.complete && !image.naturalWidth) retry(image);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scan, { once: true });
  else scan();
})();`

// Downloads a whole file into memory, retrying failed or rate-limited attempts with the same waits.
// Resolves null once every retry has failed or the signal is aborted.
// Retries skip the browser cache (fresh URL, no-store): a broken cached copy, e.g. saved while the file was
// still being copied, would otherwise fail the same way every time.
// PREVIOUS: every attempt was a plain fetch(src, { signal }) and there was no `retries` option.
export async function fetchBlobWithRetry(src: string, options: { signal?: AbortSignal; retries?: number } = {}): Promise<Blob | null> {
  const { signal, retries = RETRY_DELAYS_MS.length } = options
  for (let attempt = 0; ; attempt++) {
    try {
      const url = attempt ? new URL(src, location.href) : null
      url?.searchParams.set("_media_retry", String(Date.now()))
      const response = await fetch(url ? url.href : src, { signal, cache: attempt ? "no-store" : "default" })
      if (response.ok) return await response.blob()
    } catch {
      if (signal?.aborted) return null
    }
    if (attempt >= Math.min(retries, RETRY_DELAYS_MS.length) || signal?.aborted) return null
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
