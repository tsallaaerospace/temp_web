# BAT responsive layout

Applies to `/bat` and `/uncrewedsystems/bat` only. Homepage styling remains unchanged.

- Keep new sections inside `.bat-page`. Reuse `--bat-gutter`, `--bat-space`, and `--bat-title` for desktop spacing and headings.
- The BAT route uses the browser's normal root font size. Grow individual elements with bounded `clamp()` values; do not scale all rem units with screen width.
- Preserve mobile styles first, then add desktop rules at the existing 1024px breakpoint. Existing larger breakpoints are 1536px, 1800px, and 2500px.
- Reserve space for the fixed navigation. Use Flexbox or Grid with `min-width: 0` and `min-height: 0` for flexible media regions; use `object-fit: contain` for complete product views.
- Full-screen sections use viewport height; text-heavy sections retain content-driven height when necessary instead of hiding text. Keep deliberate video crops inside their section boundaries.
- Sticky scenes need their own containing boundary so they release before the next section. Preserve their wheel handlers, phase data, camera movement, and model transforms.
- Retain keyboard controls, visible focus, reduced-motion behavior, video looping, and responsive pause behavior.

## Verification

With Playwright available to Node (the Codex bundled runtime provides it), run:

    node scripts/check-bat-responsive.cjs
    node scripts/check-bat-frames.cjs
    node scripts/check-bat-battery.cjs

The responsive check covers 1280×720, 1366×768, 1440×900, 1536×864, 1920×1080, 2560×1440, 3440×1440, 3840×2160, and 5120×1440. It checks all section bounds, readable text boundaries, 3D release, phase labels, carousel navigation, and phone/tablet horizontal overflow. The other checks verify payload switching and battery playback. Reference screenshots are saved in `output/responsive/`.
