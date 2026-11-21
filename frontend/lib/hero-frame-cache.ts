// Retain compressed frames for repeat scrubbing, but decode only a small window around the scroll position.
// Frames arrive in packs (several AVIF files joined end to end, see scripts/pack-hero-frames.mjs). Each frame is
// cut out as soon as its bytes have streamed in, so it doesn't wait for the rest of its pack.
// PREVIOUS: one request per frame (557 requests, 6 at a time, 2 retries then given up). Wix's Cloudflare answered
// 429 after ~160 of them and then blocked the whole site for that visitor, so most frames never loaded.
export type FramePacks = {
  url: (pack: number) => string
  perPack: number
  // Byte length of every frame, in order
  sizes: number[]
}

const MAX_PACK_DOWNLOADS = 2
// Waits before retrying a failed pack: 2s, 4s, 8s, 16s, 32s, then give up.
const MAX_PACK_ATTEMPTS = 5

export function createHeroFrameCache(count: number, packs: FramePacks, onReady: () => void) {
  const blobs = new Map<number, Blob>()
  const images = new Map<number, ImageBitmap>()
  const decoding = new Set<number>(), failed = new Set<number>()
  const downloading = new Set<number>(), waiting = new Set<number>()
  const attempts = new Map<number, number>()
  const retryTimers = new Set<ReturnType<typeof setTimeout>>()
  const controller = new AbortController()
  let target = 0, direction = 1, disposed = false
  let wanted: number[] = [], queue: number[] = []

  const packOf = (frame: number) => Math.floor(frame / packs.perPack)
  const packCount = Math.ceil(count / packs.perPack)
  const packStart = (pack: number) => pack * packs.perPack
  const packEnd = (pack: number) => Math.min(count, (pack + 1) * packs.perPack)
  const packDone = (pack: number) => {
    for (let f = packStart(pack); f < packEnd(pack); f++) if (!blobs.has(f)) return false
    return true
  }

  const nearest = () => {
    let best = -1
    for (const frame of images.keys()) {
      if (best < 0 || Math.abs(frame - target) < Math.abs(best - target)) best = frame
    }
    return best < 0 ? null : { frame: best, image: images.get(best)! }
  }
  const trim = () => {
    const fallback = nearest()?.frame
    for (const [frame, image] of images) {
      if (frame !== fallback && !wanted.includes(frame)) { image.close(); images.delete(frame) }
    }
  }
  const decode = () => {
    while (!disposed && decoding.size < 2) {
      const frame = wanted.find(i => blobs.has(i) && !images.has(i) && !decoding.has(i) && !failed.has(i))
      if (frame === undefined) break
      decoding.add(frame)
      void createImageBitmap(blobs.get(frame)!).then(image => {
        if (disposed || !wanted.includes(frame)) { image.close(); return }
        images.set(frame, image)
        trim()
        onReady()
      }).catch(() => { failed.add(frame) }).finally(() => { decoding.delete(frame); decode() })
    }
  }

  // Streams one pack and stores each frame as soon as its last byte has arrived.
  const loadPack = async (pack: number, attempt: number) => {
    const src = packs.url(pack)
    const response = await fetch(attempt ? src + (src.includes('?') ? '&' : '?') + '_frame_retry=' + Date.now() : src, {
      signal: controller.signal, cache: attempt ? 'no-store' : 'force-cache',
    })
    if (!response.ok) throw new Error('Frame pack request failed: ' + response.status)
    const first = packStart(pack), end = packEnd(pack)
    let total = 0
    for (let f = first; f < end; f++) total += packs.sizes[f]
    const bytes = new Uint8Array(total)
    let received = 0, frame = first, offset = 0
    const take = () => {
      let added = false
      while (frame < end && received >= offset + packs.sizes[frame]) {
        if (!blobs.has(frame)) {
          blobs.set(frame, new Blob([bytes.subarray(offset, offset + packs.sizes[frame])], { type: 'image/avif' }))
          added = true
        }
        offset += packs.sizes[frame]
        frame++
      }
      if (added) decode()
    }
    const add = (chunk: Uint8Array) => {
      if (received + chunk.length > total) throw new Error('Frame pack is larger than expected')
      bytes.set(chunk, received)
      received += chunk.length
      take()
    }
    if (!response.body) add(new Uint8Array(await response.arrayBuffer()))
    else {
      const reader = response.body.getReader()
      for (;;) {
        const { done, value } = await reader.read()
        if (done || disposed) break
        add(value)
      }
    }
    if (!disposed && received !== total) throw new Error('Frame pack ended early')
  }

  const pump = () => {
    // The pack under the scroll position may always start, even when both download slots are busy.
    while (!disposed && queue.length &&
      (downloading.size < MAX_PACK_DOWNLOADS || (downloading.size === MAX_PACK_DOWNLOADS && queue[0] === packOf(target)))) {
      const pack = queue.shift()!
      if (downloading.has(pack) || waiting.has(pack) || packDone(pack)) continue
      downloading.add(pack)
      const attempt = attempts.get(pack) || 0
      void loadPack(pack, attempt).catch(() => {
        if (disposed || attempt + 1 >= MAX_PACK_ATTEMPTS) return
        attempts.set(pack, attempt + 1)
        waiting.add(pack)
        const timer = setTimeout(() => {
          retryTimers.delete(timer)
          waiting.delete(pack)
          if (disposed) return
          queue.unshift(pack)
          pump()
        }, 2000 * 2 ** attempt)
        retryTimers.add(timer)
      }).finally(() => { downloading.delete(pack); pump() })
    }
  }

  // Spread background downloads across the sequence so every scene has an early fallback.
  const background: number[] = packCount > 1 ? [0, packCount - 1] : [0]
  let ranges: [number, number][] = [[1, packCount - 2]]
  while (ranges.length) {
    const next: [number, number][] = []
    for (const [from, to] of ranges) {
      if (from > to) continue
      const mid = (from + to) >> 1
      background.push(mid)
      next.push([from, mid - 1], [mid + 1, to])
    }
    ranges = next
  }

  return {
    seek(frame: number) {
      if (disposed) return
      const next = Math.min(count - 1, Math.max(0, Math.round(frame)))
      if (next !== target) direction = next > target ? 1 : -1
      target = next
      wanted = [target]
      for (let d = 1; d <= 16; d++) wanted.push(target + direction * d)
      for (let d = 1; d <= 8; d++) wanted.push(target - direction * d)
      wanted = wanted.filter(i => i >= 0 && i < count)
      trim()
      const first = [...new Set(wanted.map(packOf))]
      const priority = new Set(first)
      queue = [...first, ...background.filter(p => !priority.has(p))]
      decode()
      pump()
    },
    nearest,
    dispose() {
      disposed = true
      controller.abort()
      retryTimers.forEach(clearTimeout)
      images.forEach(image => image.close())
      images.clear()
      blobs.clear()
    },
  }
}
