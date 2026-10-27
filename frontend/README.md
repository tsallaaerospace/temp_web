# Tsalla Aerospace Setup

Run commands from `frontend`:

```sh
npm run dev
npm run typecheck
npm test
npm run build
npm start
```

The npm launch commands preload `plugins/exfat-readlink.cjs` for Windows exFAT drives. It converts `EISDIR` to `EINVAL` only after confirming the path is not a symbolic link, covering both Webpack and Next.js dependency tracing. Other errors and real links are preserved. Direct `next` commands bypass this fix; use the npm scripts.

Set `NEXT_DIST_DIR=.next-build-check` to verify a production build alongside the default `.next` preview. Use the same value with `npm start` to serve that build. Production builds require network access for the site's Google Fonts.

Contact submissions and individual career/merchandise pages are temporarily disabled. Their source is preserved as `app/api/contact/disabled.ts`, `app/careers/[slug]/disabled.tsx`, and `app/merchandise/[id]/disabled.tsx`. To restore them, rename these to `route.ts` or `page.tsx` and restore the listing links/actions. The contact page currently offers direct email instead of a form.

The BAT hero loops its video below 768px. Wider screens retain scroll-controlled playback; reduced-motion visitors see the poster.



## Overview

## Deployment


## How It Works

3. Changes are automatically pushed to this repository
