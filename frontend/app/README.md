# app/: one folder per page

Every page of the website has **one folder** here. Open the folder to find everything for that page:

```
app/<page>/
  page.tsx        the page itself (disabled pages have disabled.tsx instead)
  components/     the sections used only by this page
```

In Next.js the folder name is the web address: `app/bat/page.tsx` is `/bat`.
`app/(home)/` is the one exception: the brackets mean "not part of the address", so it is the home page at `/`.

## Live pages

| Page | Folder | Address | Also reachable at |
|---|---|---|---|
| Home | `(home)/` | `/` | |
| FENIX | `fenix/` | `/fenix` | `/uncrewedsystems/fenix` |
| T-BAT | `bat/` | `/bat` | `/uncrewedsystems/bat` |
| MANTIS | `mantis/` | `/mantis` | `/uncrewedsystems/mantis` |
| AI-Pilot | `ai-pilot/` | `/ai-pilot` | `/maverick/ai-pilot` (redirects to `/ai-pilot`, see `next.config.mjs`) |
| Contact | `contact/` | `/contact` | |

The longer addresses work through one-line files in `uncrewedsystems/` and `maverick/` that point at the real page folder. Edit the page in its own folder, never the pointer.

## Disabled pages

These pages exist but are switched off: the file is named `disabled.tsx`, so Next.js doesn't serve it and the address shows "page not found".
**To turn one on, rename its `disabled.tsx` to `page.tsx`** (and the matching pointer file, if it has one).

| Page | Folder | Pointer for the long address |
|---|---|---|
| About | `about/` | |
| Blog | `blog/` | |
| Careers | `careers/` (+ `careers/culture/`, `careers/[slug]/`) | |
| Coming soon | `coming-soon/` | |
| Counter systems | `countersystems/` (+ `countersystems/detection/`) | |
| Cortex | `cortex/` | `maverick/cortex/disabled.tsx` |
| Dexter | `dexter/` | `uncrewedsystems/dexter/disabled.tsx` |
| Documents | `documents/` | |
| Hardware | `hardware/` | |
| Leadership | `leadership/` | |
| Maverick | `maverick/disabled.tsx` | |
| Media | `media/` | |
| Merchandise | `merchandise/` (+ `merchandise/[id]/`) | |
| Mesh | `mesh/` | `maverick/mesh/disabled.tsx` |
| Mission | `mission/` | |
| Newsroom | `newsroom/` | |
| Roadrunner | `roadrunner/` | |
| Storm | `storm/` | `uncrewedsystems/storm/disabled.tsx` |

## Site-wide files (not a page)

| File / folder | What it does |
|---|---|
| `layout.tsx` | Wraps every page: navbar, footer, loading screen, smooth scrolling |
| `template.tsx` | Re-renders on every page change |
| `globals.css` | Site-wide styles |
| `api/` | Data endpoints (`/api/...`) |

Shared building blocks used by several pages live outside `app/`, in `components/` (navbar, footer, text animations, UI parts). Images and videos live in `public/`, also one folder per page.
