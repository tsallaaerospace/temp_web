# app/ Folder Organisation Plan (revised: app folder only)

> Plan only. Not executed. Waiting for approval.

**Goal:** Inside `frontend/app`, every page has **one** folder that holds everything for that page (`page.tsx` + `components/` + any data), so a new developer opens `app/bat/` and finds the BAT page. Website addresses don't change.

**Scope:** only `frontend/app`. `components/`, `lib/`, `public/`, config and tooling are not reorganised. The only files that come *into* `app` are the home and contact page sections that currently sit in `components/`, because they belong to exactly one page.

## The rule a new developer needs

```
app/<page-name>/
  page.tsx        the page (disabled pages: disabled.tsx — rename to page.tsx to turn it on)
  components/     sections used only by this page
```

Folders in `app/` are the website's addresses in Next.js (`app/bat/page.tsx` = `/bat`). The one exception is `app/(home)/`: the brackets mean "not part of the address", so the home page stays at `/`.

## Problems this fixes

1. **Each product page is split in two.** `app/bat/page.tsx` is a one-line pointer, and the real code and its 17 sections are in `app/uncrewedsystems/bat/`. The same goes for `fenix`, `mantis` and `ai-pilot` (code in `app/maverick/ai-pilot/`), and for the disabled `storm`, `dexter`, `cortex` and `mesh`.
2. **The home page has no folder.** `app/page.tsx` sits loose, and its 5 sections are mixed into the global `components/` folder.
3. **Contact's form section** (`ContactSection`) is also in the global `components/` folder.
4. **Nothing in the repo explains** which folder is which page, which are live, and which are disabled.

## Target `app/` structure

```
app/
  README.md            NEW: table of every page, its folder, its address(es), live or disabled
  layout.tsx  template.tsx  globals.css            unchanged (site-wide Next.js files)

  (home)/              HOME, address "/"
    page.tsx           ← app/page.tsx
    components/        ← HeroSection, Missions, ProductSection, VelocityComplex, Testimonials (from components/)
  fenix/               FENIX, real code moves here
    page.tsx           ← app/uncrewedsystems/fenix/page.tsx
    components/        ← app/uncrewedsystems/fenix/components/ (17 files)
  bat/                 T-BAT: page.tsx + components/ (17 files) ← app/uncrewedsystems/bat/
  mantis/              MANTIS: page.tsx + components/ (4) ← app/uncrewedsystems/mantis/
  ai-pilot/            AI-PILOT: page.tsx + components/ (6) ← app/maverick/ai-pilot/
  contact/             CONTACT: page.tsx (already here) + components/ContactSection.tsx (from components/)

  storm/  dexter/  cortex/  mesh/        disabled; real code moves in the same way
  about/  careers/  leadership/  newsroom/  merchandise/  countersystems/ …   disabled, already one folder each, unchanged

  uncrewedsystems/     OLD LONG ADDRESSES, kept working
    fenix/page.tsx     becomes the one-line pointer → ../../fenix/page   (same for bat, mantis, storm, dexter)
  maverick/            /maverick (disabled) + pointers for ai-pilot, cortex, mesh
    components/        unchanged (MaverickShip is shared with mesh)
  api/                 unchanged
```

So the code moves to the **short** folder (the address the navbar uses), and the **long** folder becomes the pointer. Today it's the other way round. Both addresses keep working: `/bat` and `/uncrewedsystems/bat` show the same page, as now.

## How code paths are updated

- **One script moves the folders.** It rewrites every `import` that points at a moved file, plus the moved files' own imports, keeping the style (`@/app/...` alias or `./components/...` relative). Example: the disabled About page imports `FenixLast` from `@/app/uncrewedsystems/fenix/components/FenixLast`, which becomes `@/app/fenix/components/FenixLast`.
- **The 8 pointer files are flipped.** For example, `app/uncrewedsystems/bat/page.tsx` becomes `export { default, metadata } from "../../bat/page"`.
- **Imports in comments get updated too**, so "PREVIOUS UI" notes stay accurate.
- **No change to:** links and URLs in the code, image paths, the `next.config.mjs` redirect (`/maverick/ai-pilot` → `/ai-pilot`), metadata, or styling.
- **Safe to undo:** every edited file is backed up first, and one command undoes everything.

## Checks after running it

1. **No broken imports.** The import map reports none, and every page still uses the same set of files.
2. **Typecheck and production build pass.**
3. **Same addresses.** The build lists the same 18 routes as today (already recorded: `/`, `/fenix`, `/bat`, `/mantis`, `/ai-pilot`, `/contact`, the `/uncrewedsystems/*` and `/maverick/ai-pilot` addresses, the API routes and `/_not-found`).
4. **The pages load.** `/`, `/fenix`, `/bat`, `/mantis`, `/ai-pilot`, `/contact` and the `/uncrewedsystems/*` addresses load with nothing missing.
5. **Only import paths changed.** Each edited file, with the path changes reversed, equals its backup.

## Risks

- **Files with the same name.** Moving `uncrewedsystems/bat/page.tsx` to `bat/page.tsx` replaces the current pointer file at that spot. The script swaps them in the right order (pointer content goes to the long folder), and the build check proves both addresses work.
- **The Wix publish setup** (outside this repo) builds from `package.json`, which doesn't change. Its output has the same routes.

## Delete list, unchanged, for you to decide

- **A. 33 code files no page uses (~0.2 MB):** old section versions and template demos. Full list in the previous version of this plan.
- **B. 19 generated build folders (~337 MB):** `.next-recovery-*`, `.build-check-20261024`, `.next-build-check*`, `.next-wix-*`.
- **C. Two one-off scripts:** `convert_px_to_rem.py`, `convert_rem.py`.
