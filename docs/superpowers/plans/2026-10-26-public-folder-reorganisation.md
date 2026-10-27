# public/ Folder Reorganisation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every page its own folder in `frontend/public` (with one `shared/` folder for assets used by several pages or by the site layout), leave `product/` as it is, and update every code reference in the same step so nothing breaks.

**Architecture:** One fixed move list (`moves.json`, 100 entries, listed in full at the end) drives a single script that, in one run: backs up every source file it will edit, moves the files, and replaces each old path with its new path in the code. Every reference to these files is a full path in quotes (checked: none is assembled from pieces), so an exact, boundary-safe text replace is enough. A separate reference checker proves before/after that no path in the code points at a missing file.

**Tech Stack:** Next.js 15 app in `frontend/`, Node scripts (kept outside the repo in `E:\ffmpeg-tools\cleanup\`), headless Brave for page checks.

**Spec:** The request: *"re-arrange the files and folders in public in a systematic manner, create a separate folder for each page, the product folder is correctly arranged so don't change it, and update the code files wherever a location changes."*

## Global Constraints

- `public/product/` keeps all its existing files and folders unchanged.
- `public/.well-known/` stays at the site root (browsers look for it there).
- File names do not change; only their folder changes.
- Every moved path is updated in the code in the same run, including paths inside "PREVIOUS UI" comments, so comments stay accurate.
- Nothing is deleted. Every edited source file is backed up first, and one command undoes the whole change.
- Assets used only by disabled pages move to that page's folder and stay available for when the page is re-enabled.
- New folder names are lowercase (Wix serves paths case-sensitively).

## Target structure

```
public/
  .well-known/            unchanged
  product/                unchanged, except decision D1 below
    T-BAT/   +6 files      BAT-page images that sat in /images/Bat, /images/design-mode, /model
    fenix/   +4 files      FENIX images that sat in /images/Fenix
  shared/                 used by the site layout or by more than one page
    brand/        6        logos (navbar, footer, loader) + press logo used by home & newsroom
    culture/     10        culture photos (about + careers/culture)
    images/       7        backgrounds and photos used across several pages
    missions/     4        mission photos (about + FENIX)
    news/         3        event covers (home news cards + newsroom)
    placeholders/ 3        placeholder images (several pages + API routes)
  home/           3        hero video, India flag video, Velocity Complex photo
  ai-pilot/       6
  about/          3        disabled page
  careers/        9        disabled page
  cortex/         6        disabled page
  mesh/           3        disabled page
  countersystems/ 1 (+ detection/ 1)   disabled pages
  dexter/         2        disabled page
  storm/          1        disabled page
  leadership/     1        disabled page
  merchandise/   17        disabled page
  newsroom/  events/ 2, press/ 1      disabled page
```

The old `images/`, `merch/` and `model/` folders and the loose files at the top of `public` disappear. MANTIS and contact have no files outside `product/`, so they get no new folder.

**Decision D1 (needs your OK):** the 10 BAT/FENIX images listed above are only used by those product pages, so the plan adds them **into** `product/T-BAT/` and `product/fenix/` (nothing already there moves or changes). The alternative is new top-level `bat/` and `fenix/` folders, which would split each product's files across two places.

**Rule for "shared":** a file goes to `shared/` when it is used by the site layout (navbar, footer, loading screen), by an API route, or by two or more pages; otherwise it goes to the one page that uses it. Pages were decided from full-path references in code only. A bare file name can belong to a different file (for example `cortex-hero.png` also ends in `hero.png`), so those were excluded.

**One extra file:** `/images/design-mode/88fab3a74f…-616x726.png` (0.1 MB) is not used. The DEXTER code points at an online copy on cdn.sanity.io, so it goes to `E:\Tsalla-unused-assets\public\` with the earlier cleanup.

## Review Focus

- **The most widely used file**, `/placeholder.svg`, appears in 9 code files across working pages, disabled pages and the navbar. Every one must be updated. No path uses a `?query` today, but the replacement rule still keeps one intact if it appears.
- **Paths that start the same way**, such as `/placeholder.svg` vs `/placeholder-user.jpg`, or `/images/Fenix/ptop.jpg` vs `/images/Fenix/ptop.mp4`: a replacement must only match the whole path. It must not be followed by another file-name character.
- **Disabled pages can't be opened** (they 404 by design), so their 50-odd references are proved by the static reference checker, not by loading them.
- **Upper/lower case:** `/Tsalla.svg` and `/tsalla_main.svg` are different files, and the live host is case-sensitive. Replacements are case-exact.
- **The live site:** old image URLs stop working after the next publish (bookmarks, cached pages, any external links to images). This is expected. The whole site is re-published together, so pages and files stay in step.

---

### Task 1: Reference checker and baseline

**Files:**
- Create: `E:\ffmpeg-tools\cleanup\check-public-refs.mjs` (outside the repo)

**Interfaces:**
- Produces: `node check-public-refs.mjs` prints `missing: N` followed by one `path <- file` line per missing reference; exit code 0 always. Task 3 compares against the baseline it records.

- [ ] **Step 1:** Write the checker. Collect every quoted string and CSS `url(...)` in `frontend/{app,components,lib}` plus `frontend/next.config.mjs` (code and comments), keep those that start with `/` and end in a file extension (after removing `?…`/`#…` and URL-decoding), skip `/_next/` and API routes, and report each that has no file under `frontend/public`.
- [ ] **Step 2:** Run it on the current tree: `node E:\ffmpeg-tools\cleanup\check-public-refs.mjs > baseline.txt`. Expected: a short list of references that are already missing today (from old comments). Save it as the baseline; nothing in it is caused by this work.

### Task 2: Reorganise script (dry run, then apply)

**Files:**
- Create: `E:\ffmpeg-tools\cleanup\reorganize.mjs`
- Input: `E:\ffmpeg-tools\cleanup\moves.json` (the 100 rows at the end of this plan)
- Modifies: the 66 code files in the table, and files under `frontend/public`

**Interfaces:**
- Consumes: `moves.json` as `[{ from: "/images/Bat/Bat.png", to: "/product/T-BAT/Bat.png" | "ARCHIVE" }]`
- Produces: `node reorganize.mjs --dry-run | --apply | --undo`; `--apply` writes `E:\Tsalla-unused-assets\reorg-backup\manifest.json` holding every move and every backed-up source file, which `--undo` reverses.

- [ ] **Step 1:** Pre-checks, all must pass or the script stops before changing anything. Every `from` exists, no `to` exists yet, no two rows share a `to`, and every row except ARCHIVE has at least one full-path occurrence in the code.
- [ ] **Step 2:** Replacement rule: for each row, replace the exact `from` string only where the next character is not a file-name character (`[A-Za-z0-9_.\-/]`), so `?query`, quotes and `)` all still match. Apply the rows longest path first.
- [ ] **Step 3:** Run `--dry-run`. Expected: `100 moves (99 + 1 archive), 66 code files, <N> replacements`, with a per-file list. Check by hand that `/placeholder.svg` is replaced in all 9 of its files and that `Navbar.tsx` shows its 4 paths (`tsalla_main.svg`, `merch/TsallaAerospace_black.png`, `blueprint-background.png`, `placeholder.svg`).
- [ ] **Step 4:** Run `--apply`. It backs up each of the 66 files to `reorg-backup\<same path>`, moves the 100 files with `rename`, writes the edited sources, and writes `manifest.json`.

### Task 3: Verify

- [ ] **Step 1:** `node check-public-refs.mjs`. Expected: the same `missing:` list as the baseline, nothing new.
- [ ] **Step 2:** Search `frontend/{app,components,lib}` for the old prefixes `"/images/`, `"/merch/`, `"/model/` and the moved top-level names (for example `"/home-page-hero.mp4"`). Expected: 0 hits.
- [ ] **Step 3:** `npx tsc --noEmit`, then the production build (`NEXT_DIST_DIR=.next-build-check-bathero npm run build`). Expected: both pass.
- [ ] **Step 4:** Headless Brave page check (`pages404.mjs`) on `/`, `/fenix`, `/bat`, `/mantis`, `/ai-pilot`, `/contact`. Expected: `missing: none` on every page.
- [ ] **Step 5:** Re-run the earlier unused-file scan. Expected: `unused 0`; the disabled-page files are now in their page folders.

### Task 4: Tidy up

- [ ] **Step 1:** Remove the old folders left empty (`images/`, `merch/`, `model/`); they may stay visible until the dev server restarts.
- [ ] **Step 2:** Delete `public-cleanup-list.md` from the repo root; its paths are out of date after the move.
- [ ] **Step 3:** Report the final `public/` tree and how to undo (`node reorganize.mjs --undo`).

---

## Appendix: every move

| # | Current path | New path | Why | Code files to update |
|---:|---|---|---|---|
| 1 | `/building.avif` | `/about/building.avif` | only the about page | `components/VelocityComplex.tsx (comment)`<br>`components/ui/map.tsx` |
| 2 | `/images/design-mode/istock-drone-image-e1462996105863.jpg` | `/about/istock-drone-image-e1462996105863.jpg` | only the about page | `app/about/components/OurMission.tsx` |
| 3 | `/images/Fenix/ptop.jpg` | `/about/ptop.jpg` | only the about page | `app/about/components/AboutUsVideoPage.tsx` |
| 4 | `/images/AI-Pilot/ai-how-it-works-mobile.png` | `/ai-pilot/ai-how-it-works-mobile.png` | only the ai-pilot page | `app/maverick/ai-pilot/components/AIHowItWorks.tsx` |
| 5 | `/images/AI-Pilot/destop-veiw.png` | `/ai-pilot/destop-veiw.png` | only the ai-pilot page | `app/maverick/ai-pilot/components/AIDomains.tsx` |
| 6 | `/images/AI-Pilot/hero.png` | `/ai-pilot/hero.png` | only the ai-pilot page | `app/maverick/ai-pilot/components/AIHero.tsx` |
| 7 | `/images/AI-Pilot/how_it_works.png` | `/ai-pilot/how_it_works.png` | only the ai-pilot page | `app/maverick/ai-pilot/components/AIHowItWorks.tsx` |
| 8 | `/images/AI-Pilot/mobile-veiw.png` | `/ai-pilot/mobile-veiw.png` | only the ai-pilot page | `app/maverick/ai-pilot/components/AIDomains.tsx` |
| 9 | `/images/AI-Pilot/something.png` | `/ai-pilot/something.png` | only the ai-pilot page | `app/maverick/ai-pilot/components/AICapabilities.tsx` |
| 10 | `/images/design-mode/08b50f4f-79c5-4ae5-b5bf-fa2fcfb0b544.jpg` | `/careers/08b50f4f-79c5-4ae5-b5bf-fa2fcfb0b544.jpg` | only the careers page | `app/careers/components/OpposingMotionReveal.tsx` |
| 11 | `/images/design-mode/759cf3b1631ac09f8787809500212d9914788964-4064x2286.jpg` | `/careers/759cf3b1631ac09f8787809500212d9914788964-4064x2286.jpg` | only the careers page | `app/careers/components/HomeFounder.tsx`<br>`app/careers/components/OpposingMotionReveal.tsx` |
| 12 | `/images/careers/careerboost.jpg` | `/careers/careerboost.jpg` | only the careers page | `app/careers/components/InnovationSection.tsx` |
| 13 | `/images/careers/Familyfirst.jpg` | `/careers/Familyfirst.jpg` | only the careers page | `app/careers/components/InnovationSection.tsx` |
| 14 | `/images/design-mode/hero-2-2.jpg` | `/careers/hero-2-2.jpg` | only the careers page | `app/careers/components/HomeFounder.tsx` |
| 15 | `/images/careers/lifeleave.jpg` | `/careers/lifeleave.jpg` | only the careers page | `app/careers/components/InnovationSection.tsx` |
| 16 | `/images/careers/MindSupport.jpg` | `/careers/MindSupport.jpg` | only the careers page | `app/careers/components/InnovationSection.tsx` |
| 17 | `/images/careers/NextGen.jpg` | `/careers/NextGen.jpg` | only the careers page | `app/careers/components/InnovationSection.tsx` |
| 18 | `/images/design-mode/v-bat-7c.jpg` | `/careers/v-bat-7c.jpg` | only the careers page | `app/careers/components/OpposingMotionReveal.tsx` |
| 19 | `/images/cortex/cortex-domains.png` | `/cortex/cortex-domains.png` | only the cortex page | `app/maverick/cortex/components/CortexDomains.tsx` |
| 20 | `/images/cortex/cortex-hero.png` | `/cortex/cortex-hero.png` | only the cortex page | `app/maverick/cortex/components/CortexHero.tsx` |
| 21 | `/images/cortex/hiw_decision.png` | `/cortex/hiw_decision.png` | only the cortex page | `app/maverick/cortex/components/CortexHowItWorks.tsx` |
| 22 | `/images/cortex/hiw_denied.png` | `/cortex/hiw_denied.png` | only the cortex page | `app/maverick/cortex/components/CortexHowItWorks.tsx` |
| 23 | `/images/cortex/hiw_oversight.png` | `/cortex/hiw_oversight.png` | only the cortex page | `app/maverick/cortex/components/CortexHowItWorks.tsx` |
| 24 | `/images/cortex/hiw_tracking.png` | `/cortex/hiw_tracking.png` | only the cortex page | `app/maverick/cortex/components/CortexHowItWorks.tsx` |
| 25 | `/images/design-mode/83f98b9ad65c714770e4625d0fba18d997e1a451-1016x1018.png` | `/countersystems/83f98b9ad65c714770e4625d0fba18d997e1a451-1016x1018.png` | only the countersystems page | `app/countersystems/components/CounterDrones.tsx` |
| 26 | `/images/Counter-systems/Detection/detection.png` | `/countersystems/detection/detection.png` | only the countersystems/detection page | `app/countersystems/detection/components/DetectionHero.tsx` |
| 27 | `/images/design-mode/cb086dde298ee0705a8a4afad32741324e8997cf-1075x1433.jpg` | `/dexter/cb086dde298ee0705a8a4afad32741324e8997cf-1075x1433.jpg` | only the dexter page | `app/uncrewedsystems/dexter/components/DexterCapabilities.tsx` |
| 28 | `/images/design-mode/f0f1a5dabcfec99d58024cd069b67a4644ae7d0f-1683x1560.png` | `/dexter/f0f1a5dabcfec99d58024cd069b67a4644ae7d0f-1683x1560.png` | only the dexter page | `app/uncrewedsystems/dexter/components/Dexter_6.tsx` |
| 29 | `/home-page-hero.mp4` | `/home/home-page-hero.mp4` | only the home page | `components/HeroSection.tsx` |
| 30 | `/India-flag.mp4` | `/home/India-flag.mp4` | only the home page | `components/Missions.tsx` |
| 31 | `/Velocity-Complex.jpg` | `/home/Velocity-Complex.jpg` | only the home page | `components/VelocityComplex.tsx` |
| 32 | `/images/company/hero-founder.jpg` | `/leadership/hero-founder.jpg` | only the leadership page | `app/about/components/Founders.tsx` |
| 33 | `/merch/bat-1.jpg` | `/merchandise/bat-1.jpg` | only the merchandise page | `app/merchandise/data.ts` |
| 34 | `/merch/bat-2.jpg` | `/merchandise/bat-2.jpg` | only the merchandise page | `app/merchandise/data.ts` |
| 35 | `/merch/black.png` | `/merchandise/black.png` | only the merchandise page | `app/merchandise/data.ts` |
| 36 | `/merch/fenix-1.jpg` | `/merchandise/fenix-1.jpg` | only the merchandise page | `app/merchandise/data.ts` |
| 37 | `/merch/fenix-2.jpg` | `/merchandise/fenix-2.jpg` | only the merchandise page | `app/merchandise/data.ts` |
| 38 | `/merch/hat1.png` | `/merchandise/hat1.png` | only the merchandise page | `app/merchandise/data.ts` |
| 39 | `/merch/hat2.png` | `/merchandise/hat2.png` | only the merchandise page | `app/merchandise/data.ts` |
| 40 | `/merch/hatsss.png` | `/merchandise/hatsss.png` | only the merchandise page | `app/merchandise/data.ts` |
| 41 | `/merch/hoodie1.png` | `/merchandise/hoodie1.png` | only the merchandise page | `app/merchandise/data.ts` |
| 42 | `/merch/hoodie11.png` | `/merchandise/hoodie11.png` | only the merchandise page | `app/merchandise/data.ts` |
| 43 | `/merch/hoodie12.png` | `/merchandise/hoodie12.png` | only the merchandise page | `app/merchandise/data.ts` |
| 44 | `/merch/hoodie2.png` | `/merchandise/hoodie2.png` | only the merchandise page | `app/merchandise/data.ts` |
| 45 | `/merch/logo_only.png` | `/merchandise/logo_only.png` | only the merchandise page | `app/merchandise/disabled.tsx` |
| 46 | `/merch/rifle.png` | `/merchandise/rifle.png` | only the merchandise page | `app/merchandise/data.ts` |
| 47 | `/merch/shirt1.png` | `/merchandise/shirt1.png` | only the merchandise page | `app/merchandise/data.ts` |
| 48 | `/merch/shirt2.png` | `/merchandise/shirt2.png` | only the merchandise page | `app/merchandise/data.ts` |
| 49 | `/merch/white2.png` | `/merchandise/white2.png` | only the merchandise page | `app/merchandise/data.ts` |
| 50 | `/images/mesh/mesh-hero.png` | `/mesh/mesh-hero.png` | only the mesh page | `app/maverick/mesh/components/MeshHero.tsx` |
| 51 | `/images/mesh/mesh-network-v2.png` | `/mesh/mesh-network-v2.png` | only the mesh page | `app/maverick/mesh/components/MeshDomains.tsx` |
| 52 | `/images/design-mode/Stage-3.png` | `/mesh/Stage-3.png` | only the mesh page | `app/maverick/components/MaverickShip.tsx` |
| 53 | `/images/News/events/event1.png` | `/newsroom/events/event1.png` | only the newsroom page | `app/newsroom/disabled.tsx` |
| 54 | `/images/News/events/event2.png` | `/newsroom/events/event2.png` | only the newsroom page | `app/newsroom/disabled.tsx` |
| 55 | `/images/News/news/The_Times_Of_India_graphic.jpg` | `/newsroom/press/The_Times_Of_India_graphic.jpg` | only the newsroom page | `app/newsroom/disabled.tsx` |
| 56 | `/images/Fenix/fenix_backveiw.png` | `/product/fenix/fenix_backveiw.png` | only the fenix page | `app/uncrewedsystems/fenix/components/FenixFUI.tsx` |
| 57 | `/images/Fenix/OngoingBuild.webp` | `/product/fenix/OngoingBuild.webp` | only the fenix page | `app/uncrewedsystems/fenix/components/FenixMission.tsx` |
| 58 | `/images/Fenix/PipelineDuctwork.webp` | `/product/fenix/PipelineDuctwork.webp` | only the fenix page | `app/uncrewedsystems/fenix/components/FenixMission.tsx` |
| 59 | `/images/Fenix/ptop.mp4` | `/product/fenix/ptop.mp4` | only the fenix page | `app/uncrewedsystems/fenix/components/FenixPtoP.tsx` |
| 60 | `/images/design-mode/5775ccaf2c5cd09152a9dd145194077947d82a6a-1558x1781.jpg` | `/product/T-BAT/5775ccaf2c5cd09152a9dd145194077947d82a6a-1558x1781.jpg` | only the bat page | `app/uncrewedsystems/bat/components/BatCurtainReveal.tsx` |
| 61 | `/images/Bat/bat_sensor.png` | `/product/T-BAT/bat_sensor.png` | only the bat page | `app/uncrewedsystems/bat/components/BatCurtainReveal.tsx` |
| 62 | `/images/Bat/bat_wing.png` | `/product/T-BAT/bat_wing.png` | only the bat page | `app/uncrewedsystems/bat/components/BatCurtainReveal.tsx` |
| 63 | `/images/Bat/Bat.png` | `/product/T-BAT/Bat.png` | only the bat page | `app/uncrewedsystems/bat/components/BatCapabilities.tsx`<br>`app/uncrewedsystems/bat/components/BatLaunchSequence.tsx` |
| 64 | `/model/BATMAN.glb` | `/product/T-BAT/BATMAN.glb` | only the bat page | `app/uncrewedsystems/bat/components/BatLaunchSequence.tsx`<br>`app/uncrewedsystems/bat/components/Bat3DSequence.tsx (comment)` |
| 65 | `/images/design-mode/Micasense-Rededge-P.jpg` | `/product/T-BAT/Micasense-Rededge-P.jpg` | only the bat page | `app/uncrewedsystems/bat/components/BatPayLoad3.tsx` |
| 66 | `/images/News/news/Deccan-Herald-Logo.webp` | `/shared/brand/Deccan-Herald-Logo.webp` | used by newsroom + home | `app/newsroom/disabled.tsx`<br>`components/Testimonials.tsx` |
| 67 | `/logo2.svg` | `/shared/brand/logo2.svg` | used by LAYOUT | `components/InitialLoader.tsx` |
| 68 | `/svgmaker-editor.svg` | `/shared/brand/svgmaker-editor.svg` | used by LAYOUT | `components/InitialLoader.tsx` |
| 69 | `/tsalla_main.svg` | `/shared/brand/tsalla_main.svg` | used by LAYOUT | `components/Footer.tsx`<br>`components/Navbar.tsx` |
| 70 | `/Tsalla.svg` | `/shared/brand/Tsalla.svg` | used by LAYOUT | `components/Footer.tsx` |
| 71 | `/merch/TsallaAerospace_black.png` | `/shared/brand/TsallaAerospace_black.png` | used by LAYOUT | `components/Navbar.tsx` |
| 72 | `/images/culture/culture1.webp` | `/shared/culture/culture1.webp` | used by about + careers/culture | `app/about/components/AboutUsVideoPage.tsx`<br>`app/careers/culture/disabled.tsx` |
| 73 | `/images/culture/culture10.jpg` | `/shared/culture/culture10.jpg` | used by about + careers/culture | `app/about/components/AboutUsVideoPage.tsx`<br>`app/careers/culture/disabled.tsx` |
| 74 | `/images/culture/culture2.jpg` | `/shared/culture/culture2.jpg` | used by about + careers/culture | `app/about/components/AboutUsVideoPage.tsx`<br>`app/careers/culture/disabled.tsx` |
| 75 | `/images/culture/culture3.jpg` | `/shared/culture/culture3.jpg` | used by about + careers/culture | `app/about/components/AboutUsVideoPage.tsx`<br>`app/careers/culture/disabled.tsx` |
| 76 | `/images/culture/culture4.jpg` | `/shared/culture/culture4.jpg` | used by about + careers/culture | `app/about/components/AboutUsVideoPage.tsx`<br>`app/careers/culture/disabled.tsx` |
| 77 | `/images/culture/culture5.jpg` | `/shared/culture/culture5.jpg` | used by about + careers/culture | `app/about/components/AboutUsVideoPage.tsx`<br>`app/careers/culture/disabled.tsx` |
| 78 | `/images/culture/culture6.webp` | `/shared/culture/culture6.webp` | used by about + careers/culture | `app/about/components/AboutUsVideoPage.tsx`<br>`app/careers/culture/disabled.tsx` |
| 79 | `/images/culture/culture7.png` | `/shared/culture/culture7.png` | used by about + careers/culture | `app/about/components/AboutUsVideoPage.tsx`<br>`app/careers/culture/disabled.tsx` |
| 80 | `/images/culture/culture8.webp` | `/shared/culture/culture8.webp` | used by about + careers/culture | `app/about/components/AboutUsVideoPage.tsx`<br>`app/careers/culture/disabled.tsx` |
| 81 | `/images/culture/culture9.webp` | `/shared/culture/culture9.webp` | used by about + careers/culture | `app/about/components/AboutUsVideoPage.tsx`<br>`app/careers/culture/disabled.tsx` |
| 82 | `/images/design-mode/0649dbe96de92e27212722dbfc01e42c576247ad-1080x1235.png` | `/shared/images/0649dbe96de92e27212722dbfc01e42c576247ad-1080x1235.png` | used by countersystems + bat + shared + dexter + storm | `app/countersystems/components/CounterSpec.tsx`<br>`app/uncrewedsystems/bat/components/BatFeatures.tsx`<br>`app/uncrewedsystems/dexter/components/Dexter_2.tsx`<br>`app/uncrewedsystems/storm/components/StormFeatures.tsx` |
| 83 | `/images/design-mode/3efb323c85cf4b1583dc48c6cb043329901ebf22-688x546.png` | `/shared/images/3efb323c85cf4b1583dc48c6cb043329901ebf22-688x546.png` | used by bat + shared + dexter | `app/uncrewedsystems/bat/components/BatPayLoad1.tsx`<br>`app/uncrewedsystems/dexter/components/Dexter_4.tsx` |
| 84 | `/images/design-mode/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg` | `/shared/images/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg` | used by about + careers + countersystems + dexter + storm | `app/about/components/WhatWeAreHeaded.tsx`<br>`app/careers/components/HomeFounder.tsx`<br>`app/careers/components/OpposingMotionReveal.tsx`<br>`app/countersystems/components/CounterLast.tsx`<br>`app/uncrewedsystems/bat/components/BatLast.tsx (comment)`<br>`app/uncrewedsystems/dexter/components/Dexter_5.tsx`<br>`app/uncrewedsystems/storm/components/StormLast.tsx` |
| 85 | `/blueprint-background.png` | `/shared/images/blueprint-background.png` | used by newsroom + LAYOUT | `app/newsroom/disabled.tsx`<br>`components/Navbar.tsx` |
| 86 | `/images/design-mode/c30de4a3e1c213e28f4b49a5d01d81652fca6f51-1536x1024.png` | `/shared/images/c30de4a3e1c213e28f4b49a5d01d81652fca6f51-1536x1024.png` | used by about + careers | `app/about/components/WhatWeDo.tsx`<br>`app/careers/components/HomeFounder.tsx`<br>`app/careers/components/OpposingMotionReveal.tsx` |
| 87 | `/images/company/get_in_touch.jpg` | `/shared/images/get_in_touch.jpg` | used by about + leadership | `app/about/components/AwardsAndCertification.tsx` |
| 88 | `/images/design-mode/home1.jpg` | `/shared/images/home1.jpg` | used by shared | `components/CommitmentSection.tsx` |
| 89 | `/images/Fenix/CounterInversion.webp` | `/shared/missions/CounterInversion.webp` | used by about + fenix | `app/about/components/AboutUsVideoPage.tsx`<br>`app/uncrewedsystems/fenix/components/FenixMission.tsx` |
| 90 | `/images/Fenix/CounterTerrorism.jpg` | `/shared/missions/CounterTerrorism.jpg` | used by about + fenix | `app/about/components/AboutUsVideoPage.tsx`<br>`app/uncrewedsystems/fenix/components/FenixMission.tsx` |
| 91 | `/images/Fenix/Search_Rescue.jpg` | `/shared/missions/Search_Rescue.jpg` | used by about + fenix | `app/about/components/AboutUsVideoPage.tsx`<br>`app/uncrewedsystems/fenix/components/FenixMission.tsx` |
| 92 | `/images/Fenix/WarehouseManagement.jpeg` | `/shared/missions/WarehouseManagement.jpeg` | used by about + fenix | `app/about/components/AboutUsVideoPage.tsx`<br>`app/uncrewedsystems/fenix/components/FenixMission.tsx` |
| 93 | `/images/News/events/event1-cover.png` | `/shared/news/event1-cover.png` | used by newsroom + home | `app/newsroom/disabled.tsx`<br>`components/Testimonials.tsx` |
| 94 | `/images/News/events/event2-cover.png` | `/shared/news/event2-cover.png` | used by newsroom + home | `app/newsroom/disabled.tsx`<br>`components/Testimonials.tsx` |
| 95 | `/images/News/events/event3.png` | `/shared/news/event3.png` | used by newsroom + home | `app/newsroom/disabled.tsx`<br>`components/Testimonials.tsx` |
| 96 | `/placeholder-user.jpg` | `/shared/placeholders/placeholder-user.jpg` | used by api | `app/api/blog/route.ts`<br>`app/api/team/route.ts` |
| 97 | `/placeholder.jpg` | `/shared/placeholders/placeholder.jpg` | used by api | `app/api/blog/route.ts`<br>`app/api/media/route.ts`<br>`app/api/missions/route.ts`<br>`app/api/news/route.ts` |
| 98 | `/placeholder.svg` | `/shared/placeholders/placeholder.svg` | used by careers + countersystems + newsroom + bat + dexter + shared + home + LAYOUT | `app/careers/components/ValuesSection.tsx`<br>`app/countersystems/components/CounterMissions.tsx`<br>`app/newsroom/disabled.tsx`<br>`app/uncrewedsystems/bat/components/BatMission.tsx`<br>`app/uncrewedsystems/dexter/components/Dexter1.tsx`<br>`components/ui/NewsroomCard.tsx`<br>`components/ui/zoom-parallax.tsx`<br>`components/Testimonials.tsx`<br>`components/Navbar.tsx` |
| 99 | `/images/design-mode/5a0c9583711b45a93c29fd9e143682b9ea4a72f6-898x898.png` | `/storm/5a0c9583711b45a93c29fd9e143682b9ea4a72f6-898x898.png` | only the storm page | `app/uncrewedsystems/storm/components/StormCapabilities.tsx` |
| 100 | `/images/design-mode/88fab3a74f0c1658a8e8e8d496f1ca06b00a05ac-616x726.png` | **archive** | unused: the code points at an online copy on cdn.sanity.io |  |

