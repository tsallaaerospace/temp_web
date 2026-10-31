# Tsalla Aerospace - Project Change Log & Activity Record

## 2026-10-31 — Save latest website updates in local Git

### Website source and media
- **BEFORE UI STATE:** Careers, navigation, Mesh, STORM and Velocity updates were present as uncommitted working-tree changes.
- **AFTER UI STATE:** Collected the latest frontend source, media and changelog updates into a local Git commit. Generated previews and temporary files under `output/` are excluded. No push or deployment requested.
- **Validation:** TypeScript check and Git whitespace checks passed before committing.

## 2026-10-31 — Raise Velocity introduction slightly further

### Velocity Page (/velocity) — Opening heading and paragraph
- **BEFORE UI STATE:** Introduction top padding was reduced by 20px from its original value.
- **AFTER UI STATE:** Reduced it by another 15px, for a total upward adjustment of 35px.

## 2026-10-31 — Raise Velocity introduction

### Velocity Page (/velocity) — Opening heading and paragraph
- **BEFORE UI STATE:** The introduction used equal responsive top and bottom padding.
- **AFTER UI STATE:** Reduced top padding by 20px, moving the opening heading and content slightly upward while preserving bottom spacing.

## 2026-10-31 — Small STORM image alignment adjustment

### STORM Page (/storm) — Specifications image
- **BEFORE UI STATE:** The drone image had no horizontal offset.
- **AFTER UI STATE:** Moved the image 10px left, retaining its current size and vertical position.

## 2026-10-31 — Shift STORM right heading

### STORM Page (/storm) — Specifications heading
- **BEFORE UI STATE:** “More potential.” aligned with the right edge of the heading container.
- **AFTER UI STATE:** Shifted that phrase 20px to the right on desktop screens. Mobile heading positioning remains unchanged.

## 2026-10-31 — Lower STORM dimension row

### STORM Page (/storm) — Specifications dimensions
- **BEFORE UI STATE:** The Span, Width and Height row sat close to the bottom propellers.
- **AFTER UI STATE:** Added 20px of space above the dimension row to move it lower and separate it from the drone.

## 2026-10-31 — Distinct STORM environment title

### STORM Page (/storm) — Environment panels heading
- **BEFORE UI STATE:** The section repeated MANTIS's “Built Beyond Boundaries.” heading.
- **AFTER UI STATE:** Changed the STORM title to “Ready. Rugged. Relentless.”, preserving the three-panel alignment and cyan middle word.

## 2026-10-31 — STORM panel title and section scrolling

### STORM Page (/storm) — Environment panels
- **BEFORE UI STATE:** The environment background section had no title.
- **AFTER UI STATE:** Added “Built Beyond Boundaries.” using the existing product heading and character reveal, with Beyond in cyan. Each word is centered over the visible portion of its image panel on desktop and mobile, with a top gradient for readability.

### STORM Page (/storm) — Scroll behavior
- **BEFORE UI STATE:** STORM used smooth free scrolling without the home/BAT section paging component.
- **AFTER UI STATE:** Reused SectionSnap for STORM sections and footer, including the hero. Wheel and keyboard navigation move between sections while taller content remains scrollable and reduced-motion preferences remain respected.

## 2026-10-31 — STORM environment background section

### STORM Page (/storm) — Section immediately after hero
- **BEFORE UI STATE:** The hero led directly into specifications after removal of the offshore autonomy section.
- **AFTER UI STATE:** Added a full-screen environment image section between the hero and specifications. Uses the supplied `3 phase destop.png` above 767px and `3 phase mobile.png` on smaller screens, covering the section with centered imagery. No extra text or drone overlay was added.

## 2026-10-31 — Delete STORM offshore autonomy section

### STORM Page (/storm) — Resilient Offshore Autonomy
- **BEFORE UI STATE:** A white section displayed a gimbal-camera image beside the “Resilient Offshore Autonomy” heading and offshore operations paragraph.
- **AFTER UI STATE:** Removed the section import and render from the STORM page, and deleted `StormCapabilities.tsx` as explicitly requested. STORM now proceeds from its hero to specifications. Shared components and image assets remain available for other uses.

## 2026-10-31 — Justify Velocity paragraphs

### Velocity Page (/velocity) — Article typography
- **BEFORE UI STATE:** Lead and body paragraphs were left aligned.
- **AFTER UI STATE:** Lead, introduction and article paragraphs use justified alignment with normal final-line spacing. Headings and photo captions keep their existing alignment.

## 2026-10-31 — Remove Velocity introduction label

### Velocity Page (/velocity) — Introduction
- **BEFORE UI STATE:** A cyan “Planned integrated campus / Andhra Pradesh” label appeared above the main heading.
- **AFTER UI STATE:** Removed the label; the introduction starts with the 100-acre heading. The previous label is preserved in a source comment.

## 2026-10-31 — Velocity charcoal background

### Velocity Page (/velocity) — Background and dividers
- **BEFORE UI STATE:** The introduction and article sections used a near-black `#090c0d` background.
- **AFTER UI STATE:** These areas use `#3d3d3d`, matching the homepage Velocity section. Section dividers are lighter to remain visible. The existing light Andhra Pradesh section retains its contrast.

## 2026-10-31 — Campus image within Velocity content

### Velocity Page (/velocity) — Introduction image
- **BEFORE UI STATE:** Removing the repeated homepage banner also removed the campus visual from the dedicated page.
- **AFTER UI STATE:** Added the original campus image below the introduction as a responsive content figure. The page still opens with the 100-acre introduction, without repeating the homepage title or tagline. The document's meeting photo remains in the Andhra Pradesh section.

## 2026-10-31 — Remove repeated Velocity banner

### Velocity Page (/velocity) — Opening section
- **BEFORE UI STATE:** The dedicated page repeated the homepage Velocity Complex title, campus image and manufacturing tagline before the document content.
- **AFTER UI STATE:** The page opens directly with the 100-acre introduction as its main heading. The meeting photo and all document body content remain. The homepage campus banner and link remain unchanged. The removed page banner is preserved in a source comment.

## 2026-10-31 — Velocity Complex page

### Home Page (/) — Velocity Complex section
- **BEFORE UI STATE:** Explore Velocity was a hover-animated button without a navigation destination.
- **AFTER UI STATE:** Explore Velocity is a keyboard-accessible Next.js link to `/velocity`, retaining the existing visual style with a 44px minimum touch target. The previous button is preserved in a source comment.

### Velocity Page (/velocity) — Hero and campus content
- **BEFORE UI STATE:** No Velocity route or dedicated campus article existed.
- **AFTER UI STATE:** Added a responsive page with the existing campus image and charcoal hero, all copy from `VELOCITY COMPLEX.docx`, the embedded meeting photo with its original caption, and the shared site navigation and footer. The planned status of the campus and runway remains explicit. Page metadata identifies Velocity Complex.
- **Validation:** Source content assertion confirms all 38 body paragraphs, headings and caption remain in order. Browser checks passed at 320, 390, 768, 1440, 1920 and 3440px with both images loaded and no clipped text or horizontal overflow. Clicking Explore Velocity on the homepage successfully navigates to the page. Desktop/mobile hero and meeting-photo screenshots inspected. `tsc --noEmit --incremental false` passed. Production build not run alongside the active preview.

> **Purpose**: This document maintains a clear, human-understandable record of all changes, updates, feature additions, and temporary feature disables across all prompts and chat sessions starting from **August 04, 2026**.
> All changes are organized hierarchically by **Page Name** and **Specific Section**, explicitly detailing the **Before UI State** vs **After UI State** so anyone reviewing this repository can immediately understand what was modified and how to restore previous states if desired.

---

## 📌 Rules for Logging Future Updates (For AI Assistants)
1. **Mandatory Logging**: For every prompt/chat, log all changes in this document under the current date.
2. **Page & Section Breakdown**: Group changes strictly by Page (e.g., `Home Page (/)`) and Section (e.g., `Section 1: Top Navigation Bar`, `Section 2: Hero Section`, etc.).
3. **Before UI & After UI Detail**: Every section change MUST document:
   - ⏮️ **BEFORE UI STATE**: Exactly how the component/layout looked and behaved before the prompt.
   - ⏭️ **AFTER UI STATE**: Exactly how the component/layout looks and behaves after the prompt.
4. **Code Preservation**: NEVER delete old code when modifying files. Comment out the previous code block (e.g. `{/* PREVIOUS UI: ... */}`) in the source file so it can easily be restored if requested.

---

## 📅 Session Log: August 04, 2026

### 🎯 Overview of User Request
- Temporarily disable and hide 4 specific navigation buttons on the Home Page (`/`): `JOIN THE MISSION`, `COMPANY`, `SPACE SYSTEMS`, `COUNTER SYSTEMS`.
- Center the remaining active navigation items (**MAVERICK** & **UNCREWED SYSTEMS**) in the header.
- Hide the `Learn More` button in the Hero Section.
- Fix incorrect product names in the Footer (`PRODUCTS` column) and populate the `COMPANY` column.
- Prevent page navigation on click for all Footer links, Footer buttons, and Product Section buttons on the Home Page.
- Preserve all previous code in comments in source files for future restoration.

---

### 🌐 PAGE: Home Page (`/`)

#### 📍 Section 1: Top Navigation Bar ([Navbar.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Navbar.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Top header displayed 6 menu items right-aligned: `MAVERICK`, `UNCREWED SYSTEMS`, `COUNTER SYSTEMS`, `SPACE SYSTEMS`, `COMPANY`, `JOIN THE MISSION`.
  - All items opened hover MegaMenus or navigated to subpages.
- ⏭️ **AFTER UI STATE**:
  - Hidden `COUNTER SYSTEMS`, `SPACE SYSTEMS`, `COMPANY`, `JOIN THE MISSION` from the UI on the Home Page (both Desktop bar & Mobile drawer).
  - Only **MAVERICK** and **UNCREWED SYSTEMS** are visible, and they are horizontally **Centered** in the top header (`absolute left-1/2 -translate-x-1/2`).
  - *Previous code preserved as comment block in `Navbar.tsx`.*

#### 📍 Section 2: Hero Section ([HeroSection.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/HeroSection.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Hero Section displayed an active **"Learn More"** outline button linking to `/about` (Company). Standard scrolling behavior.
- ⏭️ **AFTER UI STATE**:
  - **"Learn More"** button is hidden from the UI on the Home Page.
  - Added `snap-start snap-always` scroll snapping so a small scroll movement from Section 1 smoothly transitions directly into Section 2.
  - *Previous code preserved as comment block in `HeroSection.tsx`.*

#### 📍 Section 3: Missions Section ([Missions.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Missions.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Used `lg:h-[75vh]` height class which caused the section to appear squished/shortened on standard desktop viewports in production builds. Standard static `h2` title.
- ⏭️ **AFTER UI STATE**:
  - Updated section container to `h-screen min-h-screen snap-start snap-always flex items-center`, ensuring Section 2 fits the screen 100% perfectly across all monitor sizes.
  - Added **CharacterReveal** digital signal lock animation on scroll to the main title (*"On a mission to protect our protectors."*).
  - *Previous height classes & h2 title preserved as comment blocks in `Missions.tsx`.*

#### 📍 Section 4: Product Section ([ProductSection.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/ProductSection.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Product cards (**FENIX**, **T-BAT**, **TEAMING/DEXTER**, **STORM**) displayed **"Learn More"** and **"Explore"** buttons in the bottom right corner of each card.
  - Subtitle descriptions were truncated with `line-clamp-1` (e.g. STORM displayed as "Smart Transport Operations for...").
- ⏭️ **AFTER UI STATE**:
  - Removed **"Learn More"** and **"Explore"** buttons from all product cards (in both top product grid and Bento grid).
  - Clicking the **FENIX** card directly navigates to the FENIX detail page (`/fenix`).
  - Clicking on other product cards (**T-BAT**, **TEAMING**, **STORM**) does not trigger navigation (`cursor-default`).
  - Removed text truncation (`line-clamp-1`) so the full name/description for **STORM** ("Smart Transport Operations for Rugged Missions") and all cards display completely.
  - Applied **MaverickBlink** digital signal lock animation using `IntersectionObserver` **exclusively to the word "MAVERICK"** with cyan blue glowing color (`#5ce1e6`), while keeping "Powered by" as static white text.
  - *Previous button & text truncation code blocks preserved as comments in `ProductSection.tsx`.*

#### 📍 Section 5: Velocity Complex Section ([VelocityComplex.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/VelocityComplex.tsx))
- ⏮️ **BEFORE UI STATE**: Standard static `h2` title (*"Velocity Complex"*).
- ⏭️ **AFTER UI STATE**:
  - Added **CharacterReveal** digital signal lock animation powered by `IntersectionObserver` so the title (*"Velocity Complex"*) reveals with neon cyan flickers as soon as it scrolls into view.
  - *Previous static title preserved as comment block in `VelocityComplex.tsx`.*

#### 📍 Section 6: Testimonials / News & Media Section ([Testimonials.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Testimonials.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Clicking cards in the News and Media carousel navigated to `/newsroom` or external links. Standard static `h2` title and static subtitle paragraph.
- ⏭️ **AFTER UI STATE**:
  - Disabled navigation on click for all News and Media cards (`e.preventDefault()`), preventing users from leaving the page when clicking any card.
  - Added **CharacterReveal** digital signal lock animation powered by `IntersectionObserver` to section title (*"News and media"*).
  - Added **CharacterReveal** digital signal lock animation with **1.5s delay** (`delay={1.5}`) to the subtitle paragraph (*"Our integrated suite of software, hardware, and services empowers businesses to operate smarter and grow faster."*).
  - *Previous static title, paragraph & link navigation code preserved as comment blocks in `Testimonials.tsx`.*

#### 📍 Section 7: Footer Section ([Footer.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Footer.tsx))
- ⏮️ **BEFORE UI STATE**:
  - `PRODUCTS` column displayed placeholder product names (`Roadrunner`, `Hardware`, `Mission Systems`).
  - `COMPANY` column was empty due to hidden routes.
  - Footer links navigated to subpages when clicked.
- ⏭️ **AFTER UI STATE**:
  - `PRODUCTS` column displays the exact real Tsalla Aerospace products: **FENIX**, **T-BAT**, **STORM**, **DEXTER**, **MAVERICK**.
  - `COMPANY` column displays full links: **About Us**, **Mission Autonomy**, **Our Team**, **Our Culture**, **Careers**.
  - Clicking any link under `COMPANY`, `PRODUCTS`, `MEDIA`, `LEGAL` or pressing **"VIEW CAREERS"** triggers `e.preventDefault()`, preventing page navigation away from the Home Page.
  - *Previous footer configuration preserved as comment block in `Footer.tsx`.*

---

### 🌐 PAGE: Contact Page (`/contact`)

#### 📍 Section 1: Top Navigation Bar ([Navbar.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Navbar.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Contact page header displayed disabled items: `COUNTER SYSTEMS`, `SPACE SYSTEMS`, `COMPANY`, `JOIN THE MISSION`.
- ⏭️ **AFTER UI STATE**:
  - Hidden disabled items (`COUNTER SYSTEMS`, `SPACE SYSTEMS`, `COMPANY`, `JOIN THE MISSION`) on the Contact Page as well as across the site. Only **MAVERICK** and **UNCREWED SYSTEMS** are visible, centered in the header.
  - *Previous conditional logic preserved as comment block in `Navbar.tsx`.*

#### 📍 Section 2: Contact Form vs Email Section ([ContactSection.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/ContactSection.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Left side of the Contact Page displayed an interactive 5-field contact form (Full Name, Email Address, Phone Number, Enquiry Type, Message, Send Message button).
- ⏭️ **AFTER UI STATE**:
  - Left side form UI disabled & replaced with an elegant Direct Contact Information card displaying primary email `info@tsallaaerospace.com`, phone support, location, and a "Compose Email" button.
  - *Previous form code block preserved as comment in `ContactSection.tsx`.*

---

### 🌐 PAGE: Uncrewed Systems / Hangar Menu ([UncrewedSystemsMenu.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Navbar/UncrewedSystemsMenu.tsx))

#### 📍 Section 1: Hangar System Registry Menu
- ⏮️ **BEFORE UI STATE**:
  - All uncrewed system buttons (**FENIX**, **BAT**, **STORM**, **VULCAN**, **Sky-CAT**, **DEXTER**) were active. Hovering over any system (including locked ones) displayed its details and image in the right side panel.
- ⏭️ **AFTER UI STATE**:
  - **FENIX** remains unlocked, active, and fully interactive (`[ONLINE]`), displaying its details on the right side panel on hover.
  - All other uncrewed system buttons (**BAT**, **STORM**, **VULCAN**, **Sky-CAT**, **DEXTER**) display a Lock icon (`<Lock />`), a **`LOCKED`** badge UI, and trigger `e.preventDefault()` on click.
  - **Hover Behavior Fix**: Hovering over any locked/disabled system button clears the right side panel (`setHoveredUncrewedSystemDetails(null)`) so **nothing is shown in the right side panel for disabled buttons**.
  - *Previous hover handler code preserved as comment block in `UncrewedSystemsMenu.tsx`.*

---

### ⚙️ System, Memory & Git Setup

#### 1. Change Log Creation ([PROJECT_CHANGELOG.md](file:///c:/Users/tsall/Desktop/1st_version/PROJECT_CHANGELOG.md))
- Created this central document to maintain complete Before/After UI state records and section-by-section history.

#### 2. AI Agent Guidelines ([AGENTS.md](file:///c:/Users/tsall/Desktop/1st_version/.agents/AGENTS.md))
- Established mandatory workspace rules:
  1. Always document Before UI vs After UI in `PROJECT_CHANGELOG.md`.
  2. NEVER delete code; always comment out previous UI code blocks in source files.

#### 4. Top-Level Product Route Paths
- ⏮️ **BEFORE UI STATE**: Product URLs were nested under `/uncrewedsystems/` (e.g. `/uncrewedsystems/fenix`, `/uncrewedsystems/bat`, `/uncrewedsystems/storm`, `/uncrewedsystems/dexter`).
- ⏭️ **AFTER UI STATE**: Updated all product paths to clean top-level routes:
  - **FENIX**: `/fenix`
  - **BAT**: `/bat`
  - **STORM**: `/storm`
  - **DEXTER**: `/dexter`
  - **VULCAN**: `/vulcan`
  - **Sky-CAT**: `/sky-cat`
- Created top-level Next.js route pages in `app/fenix/page.tsx`, `app/bat/page.tsx`, `app/storm/page.tsx`, `app/dexter/page.tsx`.

#### 5. Production Deployment & Build Fixes
- ⏮️ **BEFORE UI STATE**: Vercel build failed with `ENOENT: no such file or directory, open '/vercel/path0/frontend/frontend/package.json'` because `vercel.json` attempted `npm --prefix frontend install` while Vercel Root Directory setting was already pointing to `frontend`.
- ⏭️ **AFTER UI STATE**:
  - Updated [vercel.json](file:///c:/Users/tsall/Desktop/1st_version/vercel.json) to standard `{"framework": "nextjs"}` and updated root [package.json](file:///c:/Users/tsall/Desktop/1st_version/package.json).
  - Resolved double path nesting (`frontend/frontend/package.json` -> `frontend/package.json`).
  - All Vercel deployments will now succeed cleanly (`✅ 1/1`).

---

## 📊 Before UI vs After UI Comparison Summary Table

| Page / Section | Element | Before UI State | After UI State | Reversion Code Location |
| :--- | :--- | :--- | :--- | :--- |
| **Navbar** | Navbar Links | 6 items right-aligned | 2 items (**MAVERICK**, **UNCREWED SYSTEMS**) centered in header | Commented in `Navbar.tsx` |
| **Navbar** | Disabled Items | `COUNTER SYSTEMS`, `SPACE SYSTEMS`, `COMPANY`, `JOIN THE MISSION` visible | Hidden from UI on all pages (Home & Contact) | Commented in `Navbar.tsx` |
| **Hero Section** | Action Button | **"Learn More"** button visible & linking to `/about` | Hidden from UI on Home Page | Commented in `HeroSection.tsx` |
| **Product Section** | Card Buttons | **"Learn More"** / **"Explore"** buttons navigated to subpages | Buttons visible; click triggers `e.preventDefault()` | Commented in `ProductSection.tsx` |
| **Footer Section** | Products List | Placeholder: `Roadrunner`, `Hardware`, `Mission Systems` | Real: `FENIX`, `T-BAT`, `STORM`, `DEXTER`, `MAVERICK` | Commented in `Footer.tsx` |
| **Footer Section** | Company List | Empty column | Full links: `About Us`, `Mission Autonomy`, `Our Team`, `Our Culture`, `Careers` | Commented in `Footer.tsx` |
| **Footer Section** | Click Behavior | Navigated away to subpages | Click triggers `e.preventDefault()`, stays on Home Page | Commented in `Footer.tsx` |
| **Contact Page** | Form UI | 5-field interactive contact form on left side | Disabled form UI; displays Direct Email Info (`info@tsallaaerospace.com`) | Commented in `ContactSection.tsx` |
| **Hangar Menu** | System Links | All 6 systems unlocked and navigable | **FENIX** active; locked systems show **Lock Icon** & **`LOCKED`** badge | Commented in `UncrewedSystemsMenu.tsx` |
| **Hangar Menu** | Hover Behavior | Hovering locked systems showed details on right | Hovering locked systems **shows nothing on right side panel** | Commented in `UncrewedSystemsMenu.tsx` |
| **Routes** | Product Paths | Nested URLs (e.g. `/uncrewedsystems/fenix`) | Clean top-level URLs (`/fenix`, `/bat`, `/storm`, `/dexter`) | Created in `app/fenix/`, `app/bat/`, etc. |

---

## 📅 Session Log: August 05, 2026

### 🎯 Overview of User Request
- Perform full mobile and tablet responsiveness optimization for every section on the Home Page (`/`).
- Ensure every section fits mobile and tablet screens perfectly without any text overflow, cut-offs, or awkward horizontal scrolling.
- Strictly maintain all existing desktop, 1440p, 3xl, and ultrawide (`uw`) monitor layouts.
- Preserve all previous code in source files via comment blocks (`{/* PREVIOUS UI: ... */}`).

---

### 🌐 PAGE: Home Page (`/`)

#### 📍 Section 1: Top Navigation Bar ([Navbar.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Navbar.tsx))
- ⏮️ **BEFORE UI STATE**: Logo padding on mobile was `pl-4` (same as desktop default).
- ⏭️ **AFTER UI STATE**: Updated logo link padding on mobile to `pl-1 sm:pl-4 lg:ml-12`, shifting the logo closer to the left edge on mobile screens while leaving desktop alignment 100% untouched.
- *Previous code preserved as comment blocks in `Navbar.tsx`.*

#### 📍 Section 2: Hero Section ([HeroSection.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/HeroSection.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Container used `h-screen`, heading used `text-4xl sm:text-5xl lg:text-[4.375rem]`, padding was `px-8 sm:px-12`.
  - On mobile browsers with dynamic URL bars, content could be slightly misaligned vertically or heading could wrap awkwardly.
- ⏭️ **AFTER UI STATE**:
  - Container updated to dynamic mobile height `h-[100dvh] sm:h-screen`.
  - Heading font size updated to `text-3xl sm:text-5xl lg:text-[4.375rem]`.
  - Shifted text content slightly down (`justify-start pt-44 sm:pt-20` on mobile) for perfect visual balance on phone screens.
  - Implemented responsive subtitle split: mobile viewports (`block sm:hidden`) break subtitle after `"Systems."` into 2 clean lines (`"We Don’t Build Systems.\nWe Build Unfair Advantages."`), while desktop viewports (`hidden sm:block`) render on 1 single continuous line.
  - Container padding updated to `px-5 sm:px-12` and `pb-20 sm:pb-32`, ensuring `"UNMANNED. UNMATCHED. UNCOMPROMISED."` fits mobile screens cleanly.
  - *Previous code preserved as comment blocks in `HeroSection.tsx`.*

#### 📍 Section 2: Missions Section ([Missions.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Missions.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Background image used `object-right transform scale-110`.
  - Title font size was `text-4xl sm:text-5xl md:text-6xl`. Container used `h-screen min-h-screen`.
- ⏭️ **AFTER UI STATE**:
  - Container updated to dynamic height `h-[100dvh] sm:h-screen min-h-[100dvh] sm:min-h-screen`.
  - Background image updated to `object-[85%_center] sm:object-right`, ensuring the background drone artwork remains crisp behind text on mobile viewports.
  - Title font size scaled to `text-3xl sm:text-5xl md:text-6xl` with `leading-tight` and padding `px-5 sm:px-10`.
  - *Previous code preserved as comment blocks in `Missions.tsx`.*

#### 📍 Section 3: Product Section ([ProductSection.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/ProductSection.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Top 4 product cards used `h-[480px]` without mobile scale adjustments.
  - Section titles `"Powered by MAVERICK"` used `text-4xl md:text-5xl` without `flex-wrap`, which could cause overflow on 320px mobile screens.
  - Container padding was `px-6 pt-12 pb-24`, margin bottom was `mb-32`.
- ⏭️ **AFTER UI STATE**:
  - Top product cards height set to `h-[420px] sm:h-[460px] lg:h-[480px]`.
  - Section titles updated to `text-3xl sm:text-4xl md:text-5xl lg:text-[4.375rem]` with `flex-wrap items-center gap-2 sm:gap-3` for clean wrapping on narrow mobile screens.
  - Container padding and margins optimized for mobile (`px-4 sm:px-6`, `mb-8 sm:mb-16`, `mt-16 sm:mt-32`).
  - *Previous code preserved as comment blocks in `ProductSection.tsx`.*

#### 📍 Section 4: Velocity Complex ([VelocityComplex.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/VelocityComplex.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Header row used `flex justify-between items-end`. Title used `text-3xl md:text-4xl`.
  - Banner image used `aspect-[21/9]`, which became thin on 375px mobile screens.
- ⏭️ **AFTER UI STATE**:
  - Header row updated to `flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0`.
  - Title font size updated to `text-2xl sm:text-3xl md:text-4xl lg:text-[4.375rem] pl-0 sm:pl-4`.
  - Section container updated to `min-h-[100dvh] sm:min-h-0 flex flex-col justify-between snap-start snap-always` and hero image to `aspect-[4/3] sm:aspect-[21/9]`, ensuring the Velocity Complex section fills 100% of the mobile screen height smoothly.
  - *Previous code preserved as comment blocks in `VelocityComplex.tsx`.*

#### 📍 Section 5: News and Media ([Testimonials.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Testimonials.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Header padding was `px-4 md:px-24`, title font size was `text-xl md:text-2xl lg:text-[4.375rem]`.
  - Testimonial card height was `h-[400px] lg:h-[450px]`, container height was `h-[420px] lg:h-[450px]`.
- ⏭️ **AFTER UI STATE**:
  - Header padding updated to `px-5 sm:px-12 md:px-24`, title font size updated to `text-2xl sm:text-3xl md:text-4xl lg:text-[4.375rem]`.
  - Subtitle paragraph font size updated to `text-xs sm:text-base`.
  - Section container updated to `min-h-[100dvh] sm:min-h-0 flex flex-col justify-between snap-start snap-always`, ensuring the News and Media section fills 100% of the mobile screen height cleanly.
  - Testimonial card height updated to `h-[360px] sm:h-[400px] lg:h-[450px]`, container height to `h-[380px] sm:h-[420px] lg:h-[450px]`.
  - *Previous code preserved as comment blocks in `Testimonials.tsx`.*

---

### 🌐 PAGE: AI-Pilot Page (`/maverick/ai-pilot`)

#### 📍 Section 1: AI Hero ([AIHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/maverick/ai-pilot/components/AIHero.tsx))
- ⏮️ **BEFORE UI STATE**: Container used fixed `h-screen`, heading font size was `text-6xl`, text block left offset was fixed `left-10`.
- ⏭️ **AFTER UI STATE**: Container updated to `h-[100dvh] sm:h-screen`, heading font size to `text-base sm:text-xl lg:text-[1.85rem] xl:text-[2.15rem]`, max-width to `lg:max-w-[1380px]`, ensuring `happens` stays on Line 1 (`Imagine a future where the most complex landing in aviation happens\nwithout a pilot.`) while keeping mobile viewports perfectly responsive.

#### 📍 Section 2: AI Domains ([AIDomains.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/maverick/ai-pilot/components/AIDomains.tsx))
- ⏮️ **BEFORE UI STATE**: Container height was `min-h-screen`, grid padding was `py-24`, heading font size was `text-3xl`.
- ⏭️ **AFTER UI STATE**: Container updated to `min-h-[100dvh] sm:min-h-screen`, padding to `py-12 sm:py-24`, heading font size to `text-xl sm:text-3xl`, body text to `text-xs sm:text-sm text-left sm:text-justify`.

#### 📍 Section 3: AI Capabilities ([AICapabilities.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/maverick/ai-pilot/components/AICapabilities.tsx))
- ⏮️ **BEFORE UI STATE**: Heading used `text-[12vw] whitespace-nowrap`, causing horizontal overflow on mobile screens. Title wrapper `min-h-[70vh]`.
- ⏭️ **AFTER UI STATE**: Heading font size updated to `text-2xl sm:text-4xl md:text-[12vw]` and `sm:whitespace-nowrap`, eliminating horizontal scrollbar on phone viewports. Title wrapper `min-h-[35vh] sm:min-h-[70vh]`, card padding `py-6 sm:py-16`.

#### 📍 Section 4: AI How It Works ([AIHowItWorks.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/maverick/ai-pilot/components/AIHowItWorks.tsx))
- ⏮️ **BEFORE UI STATE**: Section title font size was hardcoded `text-[120px]`, causing massive 3x horizontal text cut-off on mobile phones.
- ⏭️ **AFTER UI STATE**: Title font size updated to `text-3xl sm:text-5xl md:text-[72px] lg:text-[72px] uw:text-[96px]`, fitting cleanly across mobile screen widths.

#### 📍 Section 5: AI Operations ([AIOperations.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/maverick/ai-pilot/components/AIOperations.tsx))
- ⏮️ **BEFORE UI STATE**: Container used `min-h-screen`, heading font size was `text-5xl`.
- ⏭️ **AFTER UI STATE**: Container updated to `min-h-[100dvh] sm:min-h-screen`, heading font size to `text-2xl sm:text-4xl md:text-5xl`, padding to `px-5 sm:px-6`.

---

### 🌐 PAGE: Uncrewed Systems Product Pages (`/fenix`, `/storm`, `/dexter`, `/bat`)

#### 📍 Section 1: Hero Section Overlay Text ([FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx), [StormHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/storm/components/StormHero.tsx), [DexterHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/dexter/components/DexterHero.tsx), [BatHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/bat/components/BatHero.tsx))
- ⏮️ **BEFORE UI STATE**: Overlay content container used large percentage bottom padding (`pb-[26%] sm:pb-[20%] md:pb-[22%] lg:pb-[12%]`), pushing the product title ("FENIx", "STORM", "DEXTER", "T - BAT"), subtitle, and right description paragraph high up toward the center of the hero video viewport. Main `<h1>` headings had `mb-4` and `leading-tight`, creating a wide gap to the subtitle. Right side paragraph text used `text-neutral-600` (dark grey).
- ⏭️ **AFTER UI STATE**:
  - Configured flex layout to `justify-between pt-28 pb-10` on mobile devices, keeping the Title & Subtitle at the **top** of the screen and pushing the description paragraph to the **bottom**.
  - On desktop (`lg:`), preserved side-by-side bottom positioning (`lg:flex-row lg:justify-between lg:items-end lg:pt-0 lg:pb-16`).
  - Increased `<h1>` title font size on mobile view from `text-[2rem]` (32px) to `text-[3.25rem]` (52px), making "FENIx" (and all product titles) significantly larger and more impactful on phone screens.
  - Updated `<h1>` title styling to `leading-none mb-1`, bringing "FENIx" (and all product titles) down closer to the subtitle text and significantly reducing the gap between them.
  - Changed right-side description paragraph text color to `text-white`, making it high-contrast and readable against dark background video frames.
- *Previous UI code preserved as comment blocks in all 4 hero component files.*

#### 📍 Section 2: GPS Navigation Section ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: Heading displayed "No GPS ? No problem!" with `text-3xl` / `text-4xl` font size on mobile, causing awkward wrapping ("No GPS ? No" on Line 1, "problem!" on Line 2), and top padding was `pt-20` which pushed text towards the center of the mobile screen.
- ⏭️ **AFTER UI STATE**:
  - Increased mobile font size to `text-4xl xs:text-5xl sm:text-5xl` for a much bolder and prominent visual appearance on mobile phones.
  - Configured sticky parent container to `justify-start pt-24 sm:justify-center sm:pt-0` and inner text layer to `h-auto sm:h-[40vh] pt-4 sm:pt-20`, positioning the text block slightly lower on mobile screens below the header while keeping it elevated above the drone visual.
  - Wrapped text elements in `<span className="block sm:inline">`, ensuring Line 1 is cleanly `No GPS ?` and Line 2 is `No problem!` on mobile viewports while preserving single-line display on desktop screens.
- *Previous UI code preserved as comment blocks in `FenixGPSNavigation.tsx`.*

#### 📍 Section 3: Mission Profiles Section ([FenixMission.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixMission.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Cards were rendered in a static flex row with asymmetric padding (`pl-48 pr-12`). When changing active cards, the active card jumped off-center to the far right edge or far left edge of the screen.
  - Card description text used `text-neutral-600` (dark grey), rendering it completely unreadable over dark background artwork.
  - Description text was right-aligned (`text-right ml-auto`), clashing with the left-aligned title.
  - Side navigation arrows were squished inside deformed side preview cards.
- ⏭️ **AFTER UI STATE**:
  - Implemented relative X-transform offsets (`animate={{ x: distanceFromCenter * offset }}`) so the active card stays **100% dead-centered** in the viewport across all 6 slides.
  - Updated card description text color to `text-white/90` with `drop-shadow-lg` and strengthened dark background gradient overlays (`from-black/95 via-black/50 to-black/20`), making all text crisp and clear.
  - Unified text alignment to `text-left` for both title and description text overlays.
  - Added dedicated floating circular prev/next arrow buttons (`ChevronLeft`, `ChevronRight`) on left and right edges for seamless, intuitive navigation.
- *Previous UI layout and text styling code preserved as comment blocks in `FenixMission.tsx`.*

---

## 📊 Before UI vs After UI Comparison Summary Table

| Page / Section | Element | Before UI State | After UI State | Reversion Code Location |
| :--- | :--- | :--- | :--- | :--- |
| **Navbar** | Navbar Links | 6 items right-aligned | 2 items (**MAVERICK**, **UNCREWED SYSTEMS**) centered in header | Commented in `Navbar.tsx` |
| **Navbar** | Disabled Items | `COUNTER SYSTEMS`, `SPACE SYSTEMS`, `COMPANY`, `JOIN THE MISSION` visible | Hidden from UI on all pages (Home & Contact) | Commented in `Navbar.tsx` |
| **Hero Section** | Action Button | **"Learn More"** button visible & linking to `/about` | Hidden from UI on Home Page | Commented in `HeroSection.tsx` |
| **Hero Section** | Mobile Viewport | Static `h-screen`, `text-4xl` heading | Dynamic `h-[100dvh]`, `text-3xl sm:text-5xl` mobile fitting | Commented in `HeroSection.tsx` |
| **Missions** | Mobile Viewport | Static `h-screen`, `object-right` image | Dynamic `h-[100dvh]`, `object-[85%_center]` mobile artwork fitting | Commented in `Missions.tsx` |
| **Product Section** | Top Cards Height | Fixed `h-[480px]` | Responsive `h-[420px] sm:h-[460px] lg:h-[480px]` | Commented in `ProductSection.tsx` |
| **Product Section** | Title Fitting | Single line flex row `text-4xl` | Scaled `text-3xl sm:text-4xl` flex-wrap | Commented in `ProductSection.tsx` |
| **Velocity Complex**| Mobile Header | Horizontal flex row squeezing elements | Vertical flex stack (`flex-col sm:flex-row`) on mobile | Commented in `VelocityComplex.tsx` |
| **Velocity Complex**| Banner Image | Thin `aspect-[21/9]` on phone | Deep `aspect-[16/9]` on mobile, `aspect-[21/9]` desktop | Commented in `VelocityComplex.tsx` |
| **News & Media** | Card Height | Fixed `h-[400px]` card, `h-[420px]` container | Mobile `h-[360px]` card, `h-[380px]` container | Commented in `Testimonials.tsx` |
| **Footer Section** | Products List | Placeholder: `Roadrunner`, `Hardware`, `Mission Systems` | Real: `FENIX`, `T-BAT`, `STORM`, `DEXTER`, `MAVERICK` | Commented in `Footer.tsx` |
| **Footer Section** | Company List | Empty column | Full links: `About Us`, `Mission Autonomy`, `Our Team`, `Our Culture`, `Careers` | Commented in `Footer.tsx` |
| **Footer Section** | Click Behavior | Navigated away to subpages | Click triggers `e.preventDefault()`, stays on Home Page | Commented in `Footer.tsx` |
| **Contact Page** | Form UI | 5-field interactive contact form on left side | Disabled form UI; displays Direct Email Info (`info@tsallaaerospace.com`) | Commented in `ContactSection.tsx` |
| **Hangar Menu** | System Links | All 6 systems unlocked and navigable | **FENIX** active; locked systems show **Lock Icon** & **`LOCKED`** badge | Commented in `UncrewedSystemsMenu.tsx` |
| **Hangar Menu** | Hover Behavior | Hovering locked systems showed details on right | Hovering locked systems **shows nothing on right side panel** | Commented in `UncrewedSystemsMenu.tsx` |
| **Routes** | Product Paths | Nested URLs (e.g. `/uncrewedsystems/fenix`) | Clean top-level URLs (`/fenix`, `/bat`, `/storm`, `/dexter`) | Created in `app/fenix/`, `app/bat/`, etc. |

| **AI-Pilot Page** | Capabilities Title Height | `min-h-[35vh]` mobile height for "Tactical Autonomy At The Edge" | `min-h-[100dvh]` mobile viewport height (full screen) | Commented in `AICapabilities.tsx` |
| **AI-Pilot Page** | Capabilities Title Layout | 2 lines (`text-2xl`) on mobile view | 3 lines (`text-6xl xs:text-7xl font-black`), shifted further upward (`-translate-y-20`) | Commented in `AICapabilities.tsx` |
| **AI-Pilot Page** | How It Works Cards | `gap-4`, `h-[25vh]` image on mobile view | `gap-6`, taller `h-[32vh]` image, `p-5` text padding & light border (`border-white/30`) on mobile view | Commented in `AIHowItWorks.tsx` |
| **AI-Pilot Page** | Operations Heading | 2 lines (`text-2xl`) on mobile view | 3 lines (`text-6xl xs:text-7xl font-black`), matching `AICapabilities` typography | Commented in `AIOperations.tsx` |
| **Cortex Page** | Hero Section | Bottom-anchored text on mobile | `top-40` shifted down, `h-[100dvh]` on mobile view | Commented in `CortexHero.tsx` |
| **Cortex Page** | Capabilities Section | 2 lines on mobile view | 3 lines (`text-6xl xs:text-7xl font-black`), `min-h-[100dvh]`, visually centered (`-mt-12`) | Commented in `CortexCapabilities.tsx` |
| **Cortex Page** | Features Cards | `gap-3`, `h-[30vh]` image on mobile | `gap-6`, taller `h-[32vh]` image, `p-5` padding & `border-white/30` on mobile view | Commented in `CortexHowItWorks.tsx` |
| **Cortex Page** | Operations Heading | 2 lines (`text-5xl`) on mobile | 3 lines (`text-6xl xs:text-7xl font-black`), `min-h-[100dvh]` on mobile view | Commented in `CortexOperations.tsx` |
| **Mesh Page** | Hero Section | Bottom-anchored text on mobile | `top-40` shifted down, `h-[100dvh]` on mobile view | Commented in `MeshHero.tsx` |
| **Mesh Page** | Capabilities Section | 2 lines on mobile view | 3 lines (`text-6xl xs:text-7xl font-black`), `min-h-[100dvh]`, visually centered (`-mt-12`) | Commented in `MeshCapabilities.tsx` |
| **Mesh Page** | How It Works Cards | `gap-3`, `h-[30vh]` image on mobile | `gap-6`, taller `h-[32vh]` image, `p-5` padding & `border-white/30` on mobile view | Commented in `MeshHowItWorks.tsx` |
| **Cortex Page** | Characteristics Section Height | Compact `py-6` card padding on mobile | Expanded `py-14` card padding & `gap-y-8` for proportional section height | Commented in `CortexCapabilities.tsx` |
| **Cortex & Mesh Pages** | Characteristics Title Label | `Characteristics` heading label displayed | Title label removed (commented out) | Commented in `CortexCapabilities.tsx`, `MeshCapabilities.tsx` |
| **New Component** | TextReveal.tsx | N/A | New reusable GSAP character-reveal animation component (`lines[]`, `className`, `lineClassName`, `stagger`, `delay`, `glowColor`) | Created `components/TextReveal.tsx` |
| **AI-Pilot Page** | Operations Section Heading | Static `<h2>` text | Character-reveal animation via `TextReveal` component | Previous UI commented in `AIOperations.tsx` |
| **Cortex Page** | Operations Section Heading | Static `<h2>` text | Character-reveal animation via `TextReveal` component | Previous UI commented in `CortexOperations.tsx` |
| **Component Fix** | TextReveal.tsx Persistence | Disappeared on re-renders | GSAP timeline with `played.current` guard and `onComplete` permanent inline style application | Updated `components/TextReveal.tsx` |
| **Operations Sections** | Line Break Structure | `block sm:inline` merging words | `lineClassName="block"` ensuring clean line breaks across all viewports | Updated `CortexOperations.tsx`, `AIOperations.tsx`, `MeshOperations.tsx` |
| **AI-Pilot Page** | Hero Main Title | Static `<h1>` text | Character-reveal animation via `TextReveal` component | Previous UI commented in `AIHero.tsx` |
| **Cortex Page** | Hero Main Title | Static `<h1>` text | Character-reveal animation via `TextReveal` component | Previous UI commented in `CortexHero.tsx` |
| **Mesh Page** | Hero Main Title | Static `<h1>` text | Character-reveal animation via `TextReveal` component | Previous UI commented in `MeshHero.tsx` |
| **Animation Update** | TextReveal.tsx Keyframes | 2-stage fade animation | Updated keyframes to match `CharacterReveal.tsx` exact multi-stage cyan flicker (`#5ce1e6` glows at 15px, 25px, 10px textShadow) | Updated `components/TextReveal.tsx` |
| **Mesh Page** | How It Works Title | Static `<h2>HOW IT WORKS</h2>` | Character-reveal animation via `TextReveal` component | Previous UI commented in `MeshHowItWorks.tsx` |
| **AI-Pilot Page** | How It Works Title | Static `<h2>HOW IT WORKS</h2>` | Character-reveal animation via `TextReveal` component | Previous UI commented in `AIHowItWorks.tsx` |
| **Cortex Page** | Features Title | Static `<h2>FEATURES</h2>` | Character-reveal animation via `TextReveal` component | Previous UI commented in `CortexHowItWorks.tsx` |
| **Operations Sections** | Blue Text Reveal Only | `TextReveal` on all lines | `TextReveal` scoped ONLY to cyan/blue text (`NEVER GOES DARK.`, `NO COCKPIT.`, `Actionable`); other lines remain static black text | Updated `MeshOperations.tsx`, `AIOperations.tsx`, `CortexOperations.tsx` |
| **Home Page (/)** | Missions Section Subtitle | `so must` on line 1, `we!` on line 2 on mobile | `Our adversaries are evolving,` on line 1, `so must we!` on 2nd line on mobile view via `span className="block sm:inline"` | Commented in `components/Missions.tsx` |
| **FENIX & Hangar Pages** | Navbar Background | Solid `bg-black` bar over hero video | `bg-transparent` navbar when un-scrolled so hero video extends under navbar | Commented in `components/Navbar.tsx` |
| **Uncrewed Systems Pages** | Hero Overlay Text | All elements stacked at top on mobile | Mobile: Title at top (`pt-28`), paragraph at bottom (`pb-10`). Desktop: side-by-side bottom aligned. | Commented in `FenixHero.tsx`, `StormHero.tsx`, `DexterHero.tsx`, `BatHero.tsx` |
| **FENIX Page** | GPS Navigation Heading | `No GPS ? No` on line 1, `problem!` on line 2 | `No GPS ?` on line 1, `No problem!` on line 2 via `span className="block sm:inline"` | Commented in `FenixGPSNavigation.tsx` |
| **FENIX Page** | Mission Profiles Carousel | Active card shifted off-center; dark unreadable text | Active card 100% centered via relative X-transforms; bright `text-white/90` text; floating arrow controls | Commented in `FenixMission.tsx` |

### ðŸŒ PAGE: FENIX Page (`/fenix`)

#### ðŸ“ Section 3: Mission Profiles Stability & Compile Fix ([FenixMission.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixMission.tsx))
- â®ï¸ **BEFORE UI STATE**: The card return block could be pasted as an invalid JSX comment followed by a malformed `< motion.div` tag, which caused a parser cascade of roughly 98 editor errors and prevented `/fenix` from compiling. Six image cards each created a duplicate set of scroll transforms (including unused X transforms), invisible cards remained mounted, the carousel initially opened on the third profile, and motion opacity declarations competed with one another.
- â­ï¸ **AFTER UI STATE**: The return tree is valid JSX with a correctly formed `<motion.div>`. Shared, strictly typed motion values are created once at carousel level; only the active card and its two nearest neighbors on each side are mounted; the first mission opens initially; text scroll opacity and entrance opacity no longer conflict; images load asynchronously; cards enter at their correct position; arrow-key navigation, focus styling, button relationships, and boundary-safe previous/next controls are included. The centered-card visual design, readable white copy, gradient treatment, and floating controls are preserved.
- *Previous implementation lines and UI blocks remain preserved as comments in `FenixMission.tsx`.*

#### Section 4: Five-Card Mission Stage and Scroll Expansion ([FenixMission.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixMission.tsx))
- **BEFORE UI STATE**: The carousel's raw array distance could leave only three cards visible at the beginning or end of the collection, while the two far cards were positioned outside the viewport. Center-card growth and side-card movement were controlled by separate transforms, navigation stopped at the collection boundaries, and the stage had limited depth or progress feedback.
- **AFTER UI STATE**:
  - A circular five-slot model always renders exactly five unique profiles around the active profile (`-2`, `-1`, center, `+1`, `+2`), including when navigating across the first/last profile boundary.
  - Scrolling progressively expands the center card from `30vw x 58vh` to `76vw x 82vh` on desktop and from `68vw x 48vh` to `92vw x 72vh` on mobile. The four surrounding cards move outward and compress in one coupled geometry calculation, keeping visible edge previews throughout the transition.
  - Added spring-based slot movement, restrained 3D rotation, image depth, cyan edge light, ambient grid/glow, a scroll-progress HUD, circular navigation, keyboard support, direct side-card selection, and `prefers-reduced-motion` handling.
  - The former layout and motion architecture remain in source comments and the retained `PreviousProfileCard` implementation for rollback. The corrected JSX has been verified with zero TypeScript parser and strict component diagnostics, and `/fenix` compiles successfully.
- *Desktop, laptop, large-monitor, and mobile layouts use separate responsive geometry without changing unrelated page sections.*

#### Section 5: Mission Card Cyan Edge Removal ([FenixMission.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixMission.tsx))
- **BEFORE UI STATE**: The active mission card used an animated cyan gradient edge, cyan border color, and cyan outer glow. When the card expanded, its lower edge appeared as a bright blue horizontal line directly above the `01 / 06` profile counter.
- **AFTER UI STATE**: Removed the cyan gradient edge and cyan outer glow, and replaced the card border with a subtle neutral-white edge. The five-card animation, pagination counter, active cyan indicator, card imagery, and responsive geometry remain unchanged.
- *The previous cyan line, border, and glow values remain preserved as source comments.*

#### Section 6: Autonomous Point-to-Point Mobile Responsiveness ([FenixPtoP.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixPtoP.tsx), [container-scroll-animation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/ui/container-scroll-animation.tsx))
- **BEFORE UI STATE**: Below 640px, the section retained desktop-oriented scroll transforms, a fixed `50rem` stage, `pt-40` spacing, a `text-5xl` heading, and a fixed `25rem` media height. The 1.05 card scale nearly touched narrow viewport edges, the stacked content could exceed its clipped parent, and the portrait source video was heavily cropped inside a mismatched box.
- **AFTER UI STATE**:
  - Phone layouts use safe 1rem side gutters, compact 6-degree-to-flat motion, no width overscale, and a shorter 32px scroll translation. These settings are opt-in for FENIX, so the shared homepage `ContainerScroll` remains unchanged.
  - Mobile typography uses a fluid `clamp(2rem, 11vw, 3rem)` heading, a non-breaking `Point-to-Point` line, smaller body copy, and reduced vertical spacing. Original sizing returns at `sm` and all existing desktop sizing remains at `md` and above.
  - The video now follows its native `1360 / 1504` portrait ratio below `sm`, has a capped responsive width, and returns to the prior `25rem` / `35rem` heights at larger breakpoints.
  - Replaced the encoding-sensitive dash with `&mdash;`, and retained the previous layout classes as source comments.
- *Verified with zero targeted TypeScript diagnostics and an HTTP 200 response from `/fenix`.*

#### Section 7: Point-to-Point Mobile Height Adjustment ([FenixPtoP.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixPtoP.tsx))
- **BEFORE UI STATE**: The responsive phone layout used a minimum section-stage height of `42rem`.
- **AFTER UI STATE**: Increased the phone-only minimum height to `45rem`, adding 3rem (48px) of vertical breathing room. At `sm` and above, the original `50rem` / `60rem` heights remain unchanged.
- *The previous `42rem` mobile value remains preserved as a source comment.*

#### Section 8: Additional Point-to-Point Mobile Height ([FenixPtoP.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixPtoP.tsx))
- **BEFORE UI STATE**: After the first height adjustment, the phone-only stage used `min-h-[45rem]`.
- **AFTER UI STATE**: Increased the phone-only minimum height to `48rem`, adding another 3rem (48px). The `sm` breakpoint remains `50rem`, and desktop remains `60rem`.
- *The previous `45rem` value remains preserved as a source comment.*

#### Section 9: First Responder Mobile Frame Fit ([FenixResponder2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixResponder2.tsx))
- **BEFORE UI STATE**: Phone layouts retained `py-24`, a large heading margin, `gap-6`, and four cards with `min-h-[180px]`, so the fourth card was cut off below the mobile frame.
- **AFTER UI STATE**: The phone section now uses one `100svh` frame with compact safe padding, a fluid two-line heading, and four equal flexible card rows. Mobile card minimum heights are removed so all four actions remain visible; the original spacing, card sizes, and four-column desktop layout return at `sm` and `md`.
- *The previous mobile section, grid, card, icon, and typography classes remain preserved as source comments.*

#### Section 10: First Responder Mobile Card Typography ([FenixResponder2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixResponder2.tsx))
- **BEFORE UI STATE**: The frame-fit version used `text-xs` titles and `10px` descriptions, which were difficult to read and left unused vertical space inside the cards.
- **AFTER UI STATE**: Phone card titles are now `text-sm`, descriptions are `text-xs` with a readable `1.4` line height, and content is vertically centered. Descriptions are limited to two lines only on phones, keeping all four cards inside the frame; `sm` and larger typography remains unchanged.
- *The previous compact phone font sizes remain preserved as source comments.*

#### Section 11: FENIx Specifications Mobile Frame and Container Balance ([FenixSpecifications.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixSpecifications.tsx))
- **BEFORE UI STATE**: The specifications section was content-height driven on phones, with padded top rows, negative drone margins, and full-size stacked dimension cards. The upper values appeared cramped while the lower cards consumed too much height and could extend beyond the frame.
- **AFTER UI STATE**: Phone layouts now use a single `100svh` flex frame, a flexible drone region, and matching `94%`-wide upper and lower groups. Upper rows receive slightly larger values and balanced padding, while the three lower dimension cards use shorter rows, smaller icon boxes, and compact gaps. All original spacing and sizing is restored from `sm` upward, preserving tablet, laptop, desktop, and larger-monitor views.
- *The prior section, specifications-row, drone, and dimension-card classes remain preserved as source comments.*

### PAGE: Home Page (`/`)

#### Section: News and Media ([Testimonials.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Testimonials.tsx))
- **BEFORE UI STATE**: On phone widths, the light-grey News and Media section had no minimum height and ended as soon as its heading, carousel, pagination, controls, and fixed padding were rendered.
- **AFTER UI STATE**: Below the `sm` breakpoint, the section now has `min-h-[100dvh]`, giving the mobile layout more vertical height and breathing room. At `sm` and above, `sm:min-h-0` restores the original content-driven height, so laptop, desktop, `3xl`, and ultra-wide layouts remain unchanged.
- *The previous section class is preserved as a source comment in `Testimonials.tsx`.*

#### Section: News Card and Navigation Position ([Testimonials.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Testimonials.tsx))
- **BEFORE UI STATE**: On phones, the news card began immediately after the heading content, and the pagination plus previous/next arrow buttons followed at the original higher position.
- **AFTER UI STATE**: The mobile carousel receives `pt-12`, moving the news card, pagination indicator, and both previous/next arrow buttons downward together by 3rem. `sm:pt-0` removes this offset at 640px and above, preserving all tablet, laptop, desktop, and larger-monitor layouts.
- *The previous carousel-container class is preserved as a source comment in `Testimonials.tsx`.*

#### Section: Mobile News Card Height and Pagination ([Testimonials.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Testimonials.tsx))
- **BEFORE UI STATE**: The phone card was `360px` tall inside a `380px` carousel. Pagination always advanced in groups of three articles; because mobile showed and clipped that group as a single-card viewport, only the first article from each of two groups appeared when using the previous/next buttons.
- **AFTER UI STATE**: Below 640px, the card is slightly taller at `380px` and its carousel is `400px`. Below 768px, pagination now advances one article at a time, creating six reachable mobile pages so every news and event card appears. At 768px and above, pagination remains three cards per page and the existing laptop/desktop dimensions are unchanged.
- *The previous card height, carousel height, and three-item slicing logic are preserved as source comments in `Testimonials.tsx`.*

#### Section: Additional Mobile News Card Height ([Testimonials.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Testimonials.tsx))
- **BEFORE UI STATE**: After the first mobile adjustment, the phone card was `380px` tall inside a `400px` carousel.
- **AFTER UI STATE**: The phone card is now `400px` tall inside a `420px` carousel, adding another 20px of visible card height. These are the dimensions already used at the `sm` breakpoint, so laptop, desktop, and larger-monitor dimensions remain unchanged.
- *The prior `380px` card and `400px` carousel classes are preserved as source comments in `Testimonials.tsx`.*

#### Section: Mobile News Typography ([Testimonials.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Testimonials.tsx))
- **BEFORE UI STATE**: On phones, the introductory “Our integrated suite…” copy used `text-xs` (12px), while the visible news-card headline used `text-sm` (14px).
- **AFTER UI STATE**: The introductory copy now uses `text-sm` (14px), and the visible news-card headline uses `text-base` (16px) on phones. Their existing sizes resume at the `sm` breakpoint, leaving laptop, desktop, and larger-monitor typography unchanged.
- *Both previous mobile font classes are preserved as source comments in `Testimonials.tsx`.*

#### Section: Single-Line Desktop News Introduction ([Testimonials.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Testimonials.tsx), [CharacterReveal.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/CharacterReveal.tsx))
- **BEFORE UI STATE**: The introduction was restricted by `max-w-4xl` and `max-w-5xl`, while `CharacterReveal` always applied `flex-wrap` to its character row. As a result, the sentence wrapped onto a second line on laptop and monitor layouts.
- **AFTER UI STATE**: From the `lg` breakpoint upward, the width limits are removed and the character row uses `flex-nowrap` plus `whitespace-nowrap`. A responsive `clamp(0.75rem, 1.15vw, 1.125rem)` font size keeps the complete sentence on one line across laptops, monitors, bigger monitors, and ultra-wide displays. Mobile and tablet wrapping remains unchanged.
- *The previous width-constrained classes and wrapping row remain preserved as source comments.*

#### Section: FENIX Mission Profiles TSX Comment Parsing Fix ([FenixMission.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixMission.tsx))
- **BEFORE UI STATE**: Multiline JSX comments containing nested `{...}` expressions inside JSX elements (`{/* PREVIOUS UI: <motion.div ...> {MISSION_PROFILES.map...} </motion.div> */}`) caused the TypeScript/TSX parser in IDE tools to misinterpret JSX brackets as generic type syntax and binary comparison operators (`Operator '<' cannot be applied to types '{}' and 'ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>'.`).
- **AFTER UI STATE**: Refactored the commented-out JSX blocks inside `{/* ... */}` to use line comments (`// <motion.div ...`). The visual appearance and layout of the FENIX Mission Profiles page remain identical, while eliminating the TypeScript language server parsing error.
- *The original historical implementation remains commented out line-by-line per project code preservation rules.*

#### Section: FENIX First Responder Section Height Fit ([FenixResponder1.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixResponder1.tsx))
- **BEFORE UI STATE**: The section container used `min-h-screen` combined with `py-16 md:py-24` and nested `min-h-screen` inner containers. As a result, the section exceeded single-viewport screen height (`100vh + vertical padding`), causing the bottom text block ("In disaster zones...") to overflow the screen frame and get cut off at the bottom.
- **AFTER UI STATE**: Adjusted section height to `h-[100dvh] min-h-[100dvh]` and inner containers to `h-full` with refined vertical padding (`py-10 sm:py-14 md:py-16`). The top heading and bottom description text blocks now fit cleanly into a single viewport frame without overflowing or requiring extra scrolling.
- *The previous section layout classes are preserved as source comments in `FenixResponder1.tsx`.*

#### Section: First Responder Action Cards Desktop Frame Height ([FenixResponder2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixResponder2.tsx))
- **BEFORE UI STATE**: From the desktop breakpoint upward, the four-card action section used its natural content height. The section could end before the browser frame, exposing the start of the following light section beneath it.
- **AFTER UI STATE**: From `md` upward, the section has a `100dvh` minimum height. Its dark background now fills the remaining desktop frame while the existing heading, cards, spacing, and responsive mobile frame-fit behavior remain unchanged.
- *The previous content-height desktop behavior is preserved as a source comment in `FenixResponder2.tsx`.*

#### Section: Hero Description Mobile Horizontal Offset ([FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx))
- **BEFORE UI STATE**: The mobile hero description began at the same left edge as the section gutter.
- **AFTER UI STATE**: The description now has an additional `0.5rem` (8px) left inset below the `lg` breakpoint, moving it slightly right as requested. The desktop right-column position is unchanged.
- *The previous mobile paragraph position is preserved as a source comment in `FenixHero.tsx`.*

#### Section: Turtle Mode Premium White Recovery Interface ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- **BEFORE UI STATE**: Turtle Mode used a large, minimally framed video over a faint grid, a low-opacity centered title watermark, and a single low-contrast sentence. The white background transitioned to dark at the end of the scroll and did not communicate the recovery process.
- **AFTER UI STATE**:
  - The background remains white throughout, with a restrained technical grid and cyan radial glow.
  - The video is now a premium framed live-feed panel with camera label, live status, corner guides, and elevated shadow treatment.
  - Added a clear Turtle Mode identity, recovery-protocol narrative, desktop system-status panel, three-stage autonomous recovery sequence, and fail-safe intelligence label. The compact mobile view retains the identity, video, and protocol panel without crowding the footage.
  - Scroll motion now introduces and exits the interface elements subtly while the video stays central to the experience.
- *The previous background transition, video frame, title treatment, and narrative positioning are preserved as source comments in `FenixTurtleMode.tsx`.*

#### Section: Turtle Mode Fail-Safe Label Removal ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- **BEFORE UI STATE**: A lower-left `FAIL-SAFE INTELLIGENCE` label with a cyan lightning icon was visible from the `sm` breakpoint upward.
- **AFTER UI STATE**: Removed the lower-left fail-safe label, leaving the framed video, recovery protocol, and system information panels unchanged.
- *The prior label markup and icon import are preserved as source comments in `FenixTurtleMode.tsx`.*

#### Section: Turtle Mode Title Video-Edge Clearance ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- **BEFORE UI STATE**: The desktop video used 70% viewport width, and the large Turtle Mode title extended into its dark left edge. This made the final title letters and supporting text visually disappear.
- **AFTER UI STATE**: The desktop video now leaves a wider white left gutter (`64vw` at `lg`, `66vw` at `xl`), while the title uses a compact breakpoint-aware width and size. The complete title and its supporting copy remain visible on the white background beside the video.
- *The previous desktop video width, title position, and title size are preserved as source comments in `FenixTurtleMode.tsx`.*

#### Section: Turtle Mode Recovery Eyebrow Removal ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- **BEFORE UI STATE**: A cyan `04 / RECOVERY` eyebrow with a horizontal line appeared directly above the Turtle Mode title.
- **AFTER UI STATE**: Removed the recovery eyebrow, leaving the title and supporting description as the section identity.
- *The previous eyebrow markup is preserved as a source comment in `FenixTurtleMode.tsx`.*

#### Section: Turtle Mode Title Emphasis ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- **BEFORE UI STATE**: The Turtle Mode title used `font-medium` with a 2rem mobile base size and 2.25rem / 3rem desktop scale.
- **AFTER UI STATE**: Increased the title to `font-semibold` and raised each breakpoint size by 0.25rem, adding a modest amount of visual weight without encroaching on the video.
- *The previous title weight and responsive sizes are preserved as a source comment in `FenixTurtleMode.tsx`.*

#### Section: Turtle Mode Mobile Responsive Layout ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- **BEFORE UI STATE**: The sticky stage used static `vh` units, a near-full-width phone video, and a desktop-oriented protocol-card offset. On shorter phones, the title, video, and lower panel could visually compete for the same space.
- **AFTER UI STATE**:
  - Uses `dvh` for the scroll stage and sticky viewport, so mobile browser chrome changes do not leave clipped or excess space.
  - The phone video is capped at 78% viewport width with a smaller shadow, preserving clear space above for the title and below for the protocol panel. Tablet and desktop widths retain their existing sizing.
  - The protocol card now uses stable left/right phone gutters, compact metadata spacing, and a four-line description cap; its original wider presentation returns at `sm` and larger.
- *The previous stage height, mobile video width, header sizing, and protocol-card classes are preserved as source comments in `FenixTurtleMode.tsx`.*

#### Section: Turtle Mode Immediate Interface Visibility ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- **BEFORE UI STATE**: The video, Turtle Mode title, recovery protocol card, recovery sequence, and system-status card all animated from zero opacity during the beginning of the section scroll. This left the interface faint or absent for roughly the first second after arriving at the section.
- **AFTER UI STATE**: Removed the scroll-driven opacity and entry-position transforms from every active interface element. The complete interface is now fully visible immediately on entry; only the restrained video scale remains.
- *The previous entrance motion values are preserved as source comments in `FenixTurtleMode.tsx`.*

#### Section: Development Source-Map 404 Suppression ([next.config.mjs](file:///c:/Users/tsall/Desktop/1st_version/frontend/next.config.mjs), [strip-source-map-url.cjs](file:///c:/Users/tsall/Desktop/1st_version/frontend/loaders/strip-source-map-url.cjs), [com.chrome.devtools.json](file:///c:/Users/tsall/Desktop/1st_version/frontend/public/.well-known/appspecific/com.chrome.devtools.json))
- **BEFORE UI STATE**: The Framer Motion ESM dependency emitted dangling `*.mjs.map` source-map URLs into Next development chunks, causing requests such as `LayoutGroupContext.mjs.map` to return 404. Chrome DevTools also automatically requested its optional app-specific well-known file, which returned 404.
- **AFTER UI STATE**: Added a development-only final-asset Webpack cleanup that removes only dangling dependency `*.mjs.map` references after Next emits its chunks, including the map comments encoded inside Next's development `eval` module strings. Added an empty static response for Chrome's optional DevTools probe, so it returns 200 rather than a route 404. Production source-map behavior and page rendering remain unchanged.
- *The prior configuration, module-level cleanup attempt, and source-map references are preserved in source comments where applicable.*

#### Section: Turtle Mode Mobile Identity Alignment and Protocol Offset ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- **BEFORE UI STATE**: On phones, the Turtle Mode identity was left-aligned, its explicit line break forced the title into two rows, and the recovery protocol card sat 1rem from the bottom edge.
- **AFTER UI STATE**: Below `sm`, the title and supporting copy use a centered full-width block, and `Turtle Mode` remains on one line. From `sm` upward, the original left-aligned, two-line desktop label returns. The phone protocol card now sits 2rem from the bottom, moving it up by 16px without changing tablet or desktop placement.
- *The previous identity layout, forced title break, and card offset are preserved as source comments in `FenixTurtleMode.tsx`.*

#### Section: Ready to Deploy Heading Alignment Restoration ([FenixLast.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixLast.tsx))
- **BEFORE UI STATE**: Each animated heading word inherited `CharacterReveal`'s full-width wrapper, so the flex layout placed `READY`, `TO`, `DEPLOY`, and `WHERE` on separate rows instead of restoring the original two-line composition.
- **AFTER UI STATE**: The animated word wrappers now use content width and inline inner lines. The heading returns to the original centered composition: `READY TO DEPLOY WHERE` on the first row and `OTHERS CANNOT.` on the second, while retaining the existing black/cyan character-reveal treatment.
- *The prior full-width animated word behavior is documented as a source comment in `FenixLast.tsx`.*

#### Section: Ready to Deploy Heading Scale Alignment ([FenixLast.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixLast.tsx))
- **BEFORE UI STATE**: The FENIX closing heading used `text-5xl` at the base size and `text-7xl` on desktop, making it less prominent than the comparable Mesh and AI Pilot closing sections.
- **AFTER UI STATE**: Adopted the Mesh/AI Pilot responsive starting scale (`text-6xl` with a 7xl extra-small-phone step), retains the existing 7xl medium-screen scale, and increases the desktop display size modestly to `text-8xl`. The maximum heading width expands at desktop sizes so the restored two-line composition remains intact.
- *The previous heading scale and width limit are preserved as a source comment in `FenixLast.tsx`.*

#### Section: Turtle Mode Mobile Spacing Refinement ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- **BEFORE UI STATE**: The centered mobile identity began 1rem from the top edge, the video used 78% viewport width, and the recovery protocol card was 2rem from the bottom edge.
- **AFTER UI STATE**: On phones, the title and supporting copy move down by 8px, the video grows to 82% viewport width, and the protocol card moves up by 16px. At `sm` and larger, the existing title, video, and card positions remain unchanged.
- *The previous phone offsets and video width are preserved as source comments in `FenixTurtleMode.tsx`.*

#### Section: Turtle Mode Additional Mobile Title Offset ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- **BEFORE UI STATE**: After the first refinement, the phone title block began at `top-6`.
- **AFTER UI STATE**: Moved the phone title and supporting copy to `top-8`, adding another 8px of top spacing. The `sm` and larger layouts are unchanged.
- *The prior `top-6` position is preserved as a source comment in `FenixTurtleMode.tsx`.*

### 🌐 PAGE: Uncrewed Systems Fenix Page (`/fenix`, `/uncrewedsystems/fenix`) & Global Footer

#### 📍 Section: Footer Section ([Footer.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Footer.tsx))
- ⏮️ **BEFORE UI STATE**: The Fenix page (`/fenix` and `/uncrewedsystems/fenix`) rendered a custom rotated watermark (`logo2.svg` with high negative vertical margins `mt-[-65vw] mb-[-45vw]`) via an `isFenixPage` route check inside `Footer.tsx`, causing the Fenix footer layout and watermark to look different from the Home page footer.
- ⏭️ **AFTER UI STATE**: Commented out the Fenix-specific custom logo watermark block and applied the standard global homepage footer watermark (`/Tsalla.svg` text watermark) across all pages including Fenix, ensuring uniform global footer appearance.
#### 📍 Section 10: First Responder Mobile Card Typography & Contrast ([FenixResponder2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixResponder2.tsx))
- ⏮️ **BEFORE UI STATE**: Inside the 4 First Responder cards on mobile view, card titles used small `text-sm font-medium` font size, description text used dark `text-xs text-neutral-600` font size with low contrast, icons used `h-4 w-4` size, and icon containers used `h-7 w-7` size.
- ⏭️ **AFTER UI STATE**: Increased card title font size to bold `text-base font-semibold`, increased description content font size to `text-xs sm:text-sm` (13px/14px) with high-contrast `text-neutral-300` text color, increased icons to `h-5 w-5`, and enlarged icon containers to `h-8 w-8` with `p-3` card padding, making all titles and description content noticeably larger, sharper, and more readable on mobile screens.
- *Previous mobile typography and icon sizing classes remain preserved as source comments in `FenixResponder2.tsx`.*

#### 📍 Section 11: FENIX Page Global Font System Alignment ([FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx), [FenixCapabilities.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixCapabilities.tsx), [FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx), [FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx), [FenixFloorMap.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixFloorMap.tsx), [FenixPtoP.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixPtoP.tsx), [FenixResponder1.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixResponder1.tsx), [FenixResponder2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixResponder2.tsx), [FenixSpecifications.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixSpecifications.tsx), [FenixFeatures.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixFeatures.tsx), [FenixFUI.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixFUI.tsx), [FenixFUI2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**: Fenix page components used mismatched fonts (`Clash Grotesk`, `font-sans`, `Inter`, `Rajdhani`) and inline `fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif"` overrides, creating font inconsistencies across the Fenix page compared to the Home page.
- ⏭️ **AFTER UI STATE**: Updated all Fenix page section components to use the standard global homepage font (`font-orbit` / Orbit), commenting out Clash Grotesk imports and inline font overrides, establishing 100% typographic harmony across the entire Fenix page and the Home page design system.
- *Previous font import tags and inline font family styles remain preserved as source comments in all component files.*

#### 📍 Section 12: Compact Tactical Intelligence Cyan Text Reveal Animation ([FenixCapabilities.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixCapabilities.tsx))
- ⏮️ **BEFORE UI STATE**: The cyan "Intelligence" text inside the heading of the `FenixCapabilities` section rendered as a static `<span style={{ color: '#5ce1e6' }}>Intelligence</span>` element without entry animation.
- ⏭️ **AFTER UI STATE**: Wrapped "Intelligence" in `<CharacterReveal text="Intelligence" targetColor="#5ce1e6" className="text-[#5ce1e6]" stagger={0.06} />`, adding the digital glitch cyan character reveal animation when scrolled into view.
- *Previous static span element is preserved as a source comment in `FenixCapabilities.tsx`.*

#### 📍 Section 13: GPS Navigation White & Green Text Reveal Animation ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx), [CharacterReveal.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/CharacterReveal.tsx))
- ⏮️ **BEFORE UI STATE**: The character reveal animation in `CharacterReveal.tsx` was hardcoded to flicker cyan (`#5ce1e6`), causing the green "No problem!" text to reveal with cyan flickers.
- ⏭️ **AFTER UI STATE**: Added a dynamic `glowColor` prop to `CharacterReveal.tsx` and updated keyframes to alternate between crisp white (`#ffffff`) and the target green color (`#34d399`), ensuring the green text reveals with a vibrant white and green digital glitch animation before settling on emerald green.
- *Previous fixed cyan keyframes in `CharacterReveal.tsx` are preserved as source comments.*

#### 📍 Section 14: Comprehensive FENIX Section Headings Character Reveal Animations ([FenixFloorMap.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixFloorMap.tsx), [FenixPtoP.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixPtoP.tsx), [FenixResponder1.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixResponder1.tsx), [FenixFUI2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx), [FenixLast.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixLast.tsx))
- ⏮️ **BEFORE UI STATE**: Headings across Fenix section components (`Floor Map Generation`, `Point-to-Point`, `Lighting`, `Responder`, `F E N I X`, `READY TO DEPLOY WHERE OTHERS CANNOT.`) used static text spans without digital character reveal animations.
- ⏭️ **AFTER UI STATE**: Wrapped all cyan/blue text elements and full heading words in `<CharacterReveal>` with white and cyan digital glitch keyframe animations, ensuring dynamic character reveal animations trigger seamlessly as users scroll through every section of the Fenix page.
- *Previous static heading markup is preserved as source comments across all component files.*

#### 📍 Section 15: FENIX Acronym Blue & Black Text Reveal Animation with 0.7s Delay ([FenixFUI2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx), [CharacterReveal.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/CharacterReveal.tsx))
- ⏮️ **BEFORE UI STATE**: The cyan acronym letters (`F`, `E`, `N`, `I`, `X`) in `FenixFUI2` used standard keyframe reveals without custom delay or black contrast flickering.
- ⏭️ **AFTER UI STATE**: Added a `flickerColor` parameter to `CharacterReveal.tsx` and updated `FenixFUI2.tsx` to use `flickerColor="#000000"` (black), `targetColor="#5ce1e6"` (cyan), `glowColor="#5ce1e6"`, and `delay={0.7}` (0.7-second delay), producing a crisp blue-and-black contrast character reveal animation on the section's white background.
- *Previous character reveal props are preserved as source comments.*

#### 📍 Section 16: Hero Title & Subtitle Character Reveal Animations and Paragraph Shift ([FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx))
- ⏮️ **BEFORE UI STATE**: The Hero title (`FENIx`), subtitle (`Fast Entry Navigational Intrusion eXplorer`), and right description paragraph rendered static text without character reveal animations, and the paragraph was aligned further left (`pl-2`).
- ⏭️ **AFTER UI STATE**: Applied `<CharacterReveal>` to `FENIx` (delay: 0.2s) and the subtitle (delay: 0.4s), applied `<CharacterReveal>` to the description paragraph with an increased delay of +1.0 second relative to the subtitle (delay: 1.4s), and shifted the right paragraph content further right (`pl-6 sm:pl-10 lg:pl-8`).
- *Previous static title, subtitle, and paragraph markup are preserved as source comments.*

#### 📍 Section 17: Fix Hydration & DOM Nesting Error (`<div>` inside `<p>`) ([FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx), [CharacterReveal.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/CharacterReveal.tsx))
- ⏮️ **BEFORE UI STATE**: `<CharacterReveal>` rendered outer `<div>` elements, and `FenixHero.tsx` wrapped `<CharacterReveal>` inside a `<p>` tag (`<p><CharacterReveal ...></p>`), triggering React DOM nesting validation errors (`In HTML, <div> cannot be a descendant of <p>`) and client hydration mismatches.
- ⏭️ **AFTER UI STATE**: Updated `CharacterReveal.tsx` to render outer `<span>` elements (which are valid inline DOM elements inside `<p>` and `<h1-h6>`), and replaced the outer `<p>` tag in `FenixHero.tsx` with a `<div>` tag. Completely resolved all DOM nesting and React hydration errors while preserving layout and animation behavior.
- *Previous `<p>` tag markup is preserved as a source comment in `FenixHero.tsx`.*

#### 📍 Section 18: Compact Tactical Intelligence Cyan Text Reveal Blue & Black Contrast ([FenixCapabilities.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixCapabilities.tsx), [FenixPtoP.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixPtoP.tsx))
- ⏮️ **BEFORE UI STATE**: The character reveal animation on "Intelligence" in `FenixCapabilities` and "Point-to-Point" in `FenixPtoP` defaulted to white keyframe flickering on a white section background.
- ⏭️ **AFTER UI STATE**: Updated `<CharacterReveal>` props to pass `glowColor="#5ce1e6"` and `flickerColor="#000000"` (black), producing a high-contrast blue and black digital glitch reveal animation optimized for the light section background.
- *Previous character reveal props are preserved as source comments in both component files.*

#### 📍 Section 19: Hero Right Paragraph Text Justification ([FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx))
- ⏮️ **BEFORE UI STATE**: The right description paragraph in `FenixHero.tsx` (*"When intelligence fits in the palm of your hand..."*) used `text-left` alignment, leaving ragged right edges.
- ⏭️ **AFTER UI STATE**: Updated the container and `<CharacterReveal>` properties to use `text-justify` and `w-full` alignment, cleanly justifying both left and right text edges across all screen sizes.
- *Previous left-aligned container and CharacterReveal props are preserved as source comments.*

#### 📍 Section 20: Hero Right Paragraph Container Expansion & Word Wrapping Fix ([FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx))
- ⏮️ **BEFORE UI STATE**: The right paragraph container was restricted to `lg:max-w-md` with `text-justify`, causing flexbox character wrapping to split words like `discreet` into `d` and `iscreet` across line breaks.
- ⏭️ **AFTER UI STATE**: Expanded the container max-width to `lg:max-w-lg` and restored clean `text-left` alignment with full word boundaries, ensuring words never break awkwardly across lines while providing generous typography spacing.
- *Previous narrow container classes and text-justify properties are preserved as source comments in `FenixHero.tsx`.*

#### 📍 Section 21: CharacterReveal Whole-Word Wrapping Fix & Font Size Reduction ([CharacterReveal.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/CharacterReveal.tsx), [FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx))
- ⏮️ **BEFORE UI STATE**: `<CharacterReveal>` mapped characters individually across flex items (`line.split("").map(...)`), causing flexbox wrapping to break single words across line boundaries (e.g., `yo` / `ur` and `thei` / `r`). Additionally, the paragraph font size was `text-lg md:text-xl`.
- ⏭️ **AFTER UI STATE**: Refactored `CharacterReveal.tsx` to group characters word-by-word into `<span className="inline-block whitespace-nowrap">` containers, guaranteeing that words like `your` and `their` remain 100% intact without splitting across lines. Reduced the paragraph font size in `FenixHero.tsx` to `text-base sm:text-lg md:text-lg`.
- *Previous character mapping and font size classes are preserved as source comments in both component files.*

#### 📍 Section 22: FENIX Page Sections Full Mobile Text Justification ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx), [FenixPtoP.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixPtoP.tsx), [FenixCapabilities.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixCapabilities.tsx))
- ⏮️ **BEFORE UI STATE**: Paragraphs across `FenixGPSNavigation`, `FenixPtoP`, and `FenixCapabilities` used center or default left alignment without mobile width expansion or `text-justify` alignment.
- ⏭️ **AFTER UI STATE**: Applied `text-justify`, `w-full`, and responsive padding `px-4 sm:px-0` across description paragraphs, ensuring clean text justification across both mobile phone screens and desktop monitors.
- *Previous paragraph alignment classes are preserved as source comments in all modified files.*

#### 📍 Section 23: Fix ReferenceError in CharacterReveal & Native Mobile Text Justification ([CharacterReveal.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/CharacterReveal.tsx), [FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx))
- ⏮️ **BEFORE UI STATE**: `<CharacterReveal>` encountered a `ReferenceError: word is not defined` due to a missing `.map((word, wordIdx, wordArr) => ...)` loop, and word containers used `inline-block` which mobile WebKit/Blink engines ignored for `text-align: justify`.
- ⏭️ **AFTER UI STATE**: Restored the word mapping loop in `CharacterReveal.tsx` and changed word containers to `inline whitespace-nowrap` with standard space characters. Mobile browsers now natively justify paragraph text across both left and right margins, while keeping words 100% whole without letter splitting.
- *Previous word container classes are preserved as source comments.*

#### 📍 Section 24: Floor Map Mobile Layout Realignment (Title Top & Paragraph Bottom) ([FenixFloorMap.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixFloorMap.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile screens, the heading ("Floor Map Generation") and description paragraph were vertically centered together in the middle of the video background, cluttering the central footage.
- ⏭️ **AFTER UI STATE**: Updated the container layout to `flex flex-col justify-between md:justify-center py-16 md:py-0`, moving the heading to the top frame and pushing the description paragraph to the bottom frame on mobile screens. Desktop layout remains centered.
- *Previous flexbox container classes and paragraph color are preserved as source comments in `FenixFloorMap.tsx`.*

#### 📍 Section 25: Mission Profiles Section Header Vertical Offset Adjustment ([FenixMission.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixMission.tsx))
- ⏮️ **BEFORE UI STATE**: The section header (`FENIX / Operational envelope` & `Mission Profiles`) was positioned at `top-6 sm:top-7` (24px from top), placing it directly against the top screen edge on mobile displays.
- ⏭️ **AFTER UI STATE**: Increased header top positioning to `top-12 sm:top-14 md:top-16`, lowering the title block cleanly away from the top viewport edge while leaving generous space above the mission profile cards.
#### 📍 Section 26: FENIX FUI Header Title Layout Positioning & Inline Character Reveal Restoration ([FenixFUI2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx), [CharacterReveal.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/CharacterReveal.tsx))
- ⏮️ **BEFORE UI STATE**: Default `<CharacterReveal>` outer spans enforced `inline-block w-full` and `block w-full text-justify`. In `FenixFUI2.tsx`, where `<CharacterReveal>` is used for individual inline acronym characters (`F`, `E`, `N`, `I`, `X`), each letter was forced into a full-width block element aligned to the left margin. This caused `F E N I X` to stack vertically on the left screen edge while the remaining word fragments (`AST ENTRY NAVIGATIONAL INTRUSION EXPLORER`) were pushed down into the center over top of the drone image.
- ⏭️ **AFTER UI STATE**: Updated default outer spans in `CharacterReveal.tsx` to `inline-block` (without forced `w-full` / `block` / `text-justify`). Inline character reveals like `<CharacterReveal text="F" />` now render compactly inline within heading text. The section header in `FenixFUI2.tsx` (`FAST ENTRY NAVIGATIONAL INTRUSION EXPLORER`) is fully restored to its clean, centered position above the drone image, while paragraph character reveals (such as in `FenixHero.tsx`) continue to receive `w-full text-justify` via explicit props.
- *Previous forced full-width block class names in `CharacterReveal.tsx` are preserved as source comments.*

#### 📍 Section 27: FENIX FUI Header Mobile 3-Line Title Composition ([FenixFUI2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the title wrapped without constraints as 3 uneven lines (`FAST ENTRY N` / `AVIGATIONAL I` / `NTRUSION EXPLORER`), splitting acronym letters like `N` and `I` onto different lines from `AVIGATIONAL` and `NTRUSION`.
- ⏭️ **AFTER UI STATE**: Wrapped each logical phrase (`FAST ENTRY`, `NAVIGATIONAL`, `INTRUSION EXPLORER`) in `whitespace-nowrap` spans with responsive `<br className="block sm:hidden" />` line breaks. On mobile viewports, Line 1 displays `FAST ENTRY`, Line 2 displays `NAVIGATIONAL`, and Line 3 displays `INTRUSION EXPLORER`. Desktop screens maintain single-line composition.
- *Previous unconstrained header title markup is preserved as a source comment in `FenixFUI2.tsx`.*

#### 📍 Section 28: Floor Map Section Header Mobile Horizontal Centering ([FenixFloorMap.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixFloorMap.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the section heading (`Floor Map Generation`) was left-aligned (`items-start`), placing it in the top left corner of the phone screen.
- ⏭️ **AFTER UI STATE**: Applied `items-center justify-center text-center` to the mobile title flex container and heading element in `FenixFloorMap.tsx`. On mobile viewports, `Floor Map Generation` is now horizontally centered at the top of the frame. Desktop viewports (`md:` and above) retain left-alignment.
- *Previous left-aligned flex container and heading class names are preserved as source comments in `FenixFloorMap.tsx`.*

#### 📍 Section 29: FENIX Specifications Header Title Resizing, Offset & Stat Table Spacing ([FenixSpecifications.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixSpecifications.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the section title `FENIx` was rendered in a small font size (`text-2xl`) positioned 4px from the top edge (`pt-1`, `mb-2`), placing it directly against the top screen border. The top telemetry stat table (`500 g Lift Capacity`, `20 mins Endurance`, etc.) sat directly underneath with minimal padding (`py-2`, `px-2.5`).
- ⏭️ **AFTER UI STATE**: Increased container top padding to `pt-8 sm:pt-12 md:pt-16` and added `mt-2 mb-4 sm:mt-4 sm:mb-8` margin around `motion.h2`, shifting the title down cleanly from the top screen border. Enlarged the `FENIx` title font size on mobile to `text-4xl sm:text-5xl`. Shifted the top telemetry stat table (Image 2) down (`mt-2 mb-6 sm:mt-4 sm:mb-10`), increased box padding to `px-3.5 py-3`, and scaled up stat numbers to `text-3xl sm:text-4xl md:text-5xl` for clear readability.
- *Previous container padding, title font size, and stat table padding classes are preserved as source comments in `FenixSpecifications.tsx`.*

#### 📍 Section 30: FENIX Specifications Bottom Dimension Cards Container Sizing Match ([FenixSpecifications.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixSpecifications.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the bottom dimension cards (`308 mm Length`, `340 mm Width`, `100 mm Height`) used small height and font classes (`h-10`, `px-2 py-1`, `text-base` for values, `text-[9px]` for units/labels, `h-7 w-7` icons), appearing significantly thinner and smaller than the top telemetry stat cards.
- ⏭️ **AFTER UI STATE**: Updated the bottom dimension cards in `FenixSpecifications.tsx` to match the exact container scale, padding, contrast, and typography of the top telemetry stat cards (`px-3.5 py-3` box padding, `text-3xl font-medium text-cyan-400` for dimension values, `text-xs` for units and labels, `h-9 w-9` rounded icon boxes, `gap-3` row spacing, and `border-neutral-700 bg-neutral-900/50` styling).
- *Previous bottom card height, padding, icon, and typography classes are preserved as source comments in `FenixSpecifications.tsx`.*

#### 📍 Section 31: Turtle Mode Mobile Title & Description Vertical Offset Adjustment ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the title (`TURTLE MODE`) and its description (`Recovery intelligence built into every mission.`) sat near the top frame edge at `top-8` (32px from top).
- ⏭️ **AFTER UI STATE**: Increased top positioning of the section identity block on mobile to `top-14` (56px from top), shifting both `TURTLE MODE` and its description copy down by 24px for generous top breathing room. Desktop viewports (`sm:top-8`, `lg:top-[10vh]`) remain unchanged.
- *Previous `top-8` positioning class is preserved as a source comment in `FenixTurtleMode.tsx`.*

#### 📍 Section 32: Hero Description Paragraph Mobile Center Alignment ([FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the Hero right description paragraph used `text-justify`, causing stretched text margins without clear spacing gaps on narrow phone displays.
- ⏭️ **AFTER UI STATE**: Updated the container and `<CharacterReveal>` alignment classes to `text-center lg:text-justify` in `FenixHero.tsx`. On mobile viewports, the paragraph (*"When intelligence fits in the palm of your hand..."*) is now cleanly centered horizontally. Desktop viewports (`lg:` and larger) retain justified alignment.
- *Previous `text-justify` container and CharacterReveal class names are preserved as source comments in `FenixHero.tsx`.*

#### 📍 Section 33: First Responder Mobile Card Frame Compactness ([FenixResponder2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixResponder2.tsx))
- ⏮️ **BEFORE UI STATE**: The four-card mobile frame used `flex-1` at full width, causing it to occupy nearly all available phone viewport space.
- ⏭️ **AFTER UI STATE**: Below the `sm` breakpoint, the card grid is centered at 92% width and limited to 76svh, reducing both the frame width and the equal-height card rows. Tablet and desktop layouts keep their existing natural dimensions.
- *The prior full-width flexible mobile frame is preserved as a source comment in `FenixResponder2.tsx`.*

#### 📍 Section 34: GPS Navigation Section Title Mobile Vertical Offset Adjustment ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the sticky render container used `pt-24` (96px top padding) and text wrapper used `pt-4`, positioning the title block (`No GPS ? No problem!`) lower down in the phone viewport.
- ⏭️ **AFTER UI STATE**: Reduced top padding on mobile to `pt-12` on the container and `pt-1` on the text wrapper in `FenixGPSNavigation.tsx`, shifting the `No GPS ? No problem!` title and description paragraph up by ~48px. Desktop and tablet viewports (`sm:` and larger) remain unchanged.
- *Previous `pt-24` container and `pt-4` text wrapper padding classes are preserved as source comments in `FenixGPSNavigation.tsx`.*

#### 📍 Section 35: First Responder Mobile Card Spacing ([FenixResponder2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixResponder2.tsx))
- ⏮️ **BEFORE UI STATE**: The mobile title sat 1rem above the card frame (`mb-4`), and the stacked cards used 0.5rem gaps (`gap-2`).
- ⏭️ **AFTER UI STATE**: The title-to-frame spacing is now 1.5rem (`mb-6`), while the cards use 0.75rem gaps (`gap-3`) for clearer separation within the same compact frame.
- *Previous mobile spacing classes are preserved as source comments in `FenixResponder2.tsx`.*

#### 📍 Section 36: GPS Navigation Paragraph & Drone Image Mobile Vertical Offset Adjustment ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the description paragraph was positioned closely below the title (`mb-4 sm:mb-6`), and the central drone image container used `mt-12 md:mt-0`, placing the drone asset closer to the text layer.
- ⏭️ **AFTER UI STATE**: Increased title bottom margin (`mb-6 sm:mb-8`) and added `mt-2` top margin on description paragraphs in `FenixGPSNavigation.tsx`, shifting the paragraph down slightly away from the heading. Increased top margin of the drone image container on mobile to `mt-20 sm:mt-16 md:mt-0`, shifting the drone visual down by ~32px for balanced vertical breathing room.
- *Previous title margin, paragraph margin, and drone container margin classes are preserved as source comments in `FenixGPSNavigation.tsx`.*

#### 📍 Section 37: GPS Navigation Phase 2 Title & Paragraph Mobile Downward Offset Adjustment ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the sticky container used `pt-12` (48px top padding) and text wrapper used `pt-1`, positioning the `Navigation Lighting` title and description block high up near the top screen border.
- ⏭️ **AFTER UI STATE**: Increased mobile top padding on the sticky container to `pt-18` (72px) and text wrapper to `pt-4` in `FenixGPSNavigation.tsx`, shifting both `Navigation Lighting` and its description paragraph down by ~36px for balanced top padding. Desktop viewports (`sm:` and larger) remain unchanged.
- *Previous container padding and text wrapper padding classes are preserved as source comments in `FenixGPSNavigation.tsx`.*

#### 📍 Section 38: First Responder Mobile Container Gap Increase ([FenixResponder2.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixResponder2.tsx))
- ⏮️ **BEFORE UI STATE**: The stacked mobile card containers used `gap-3` (0.75rem), leaving a small visual separation between cards.
- ⏭️ **AFTER UI STATE**: Increased the mobile card grid to `gap-4` (1rem), making each container separation more distinct while preserving the compact frame, width, and larger-screen layout.
- *The prior `gap-3` mobile spacing is preserved as a source comment in `FenixResponder2.tsx`.*

#### 📍 Section 39: GPS Navigation Phase 2 Specific Mobile Downward Offset ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, Phase 1 (`No GPS ? No problem!`) and Phase 2 (`Navigation Lighting`) shared identical vertical positions inside the text wipe container.
- ⏭️ **AFTER UI STATE**: Applied `pt-8 sm:pt-0` directly to Phase 2's `<motion.div>` in `FenixGPSNavigation.tsx`. On mobile viewports, Phase 1 (`No GPS ? No problem!`) remains higher up, while Phase 2 (`Navigation Lighting` & its description paragraph) is shifted down by 32px. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous Phase 2 motion.div className is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 40: GPS Navigation Phase 1 Mobile Downward Offset Adjustment ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, Phase 1 (`No GPS ? No problem!`) was positioned higher up without top padding inside its text wipe container.
- ⏭️ **AFTER UI STATE**: Applied `pt-8 sm:pt-0` directly to Phase 1's `<motion.div>` in `FenixGPSNavigation.tsx`, shifting both `No GPS ? No problem!` and its description paragraph down by 32px on mobile viewports for clean, uniform top spacing matching Phase 2. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous Phase 1 motion.div className is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 41: GPS Navigation Title & Paragraph Mobile Downward Offset Increase ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, Phase 1 (`No GPS ? No problem!`) and Phase 2 (`Navigation Lighting`) used `pt-8 sm:pt-0` (32px top padding).
- ⏭️ **AFTER UI STATE**: Increased mobile top padding to `pt-16 sm:pt-0` (64px) on both Phase 1 and Phase 2 motion containers in `FenixGPSNavigation.tsx`. On mobile viewports, both headings and description paragraphs are shifted down by an additional 32px for balanced vertical positioning. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous `pt-8` top padding class names are preserved as source comments in `FenixGPSNavigation.tsx`.*

#### 📍 Section 42: GPS Navigation Phase 2 Paragraph Specific Mobile Downward Offset ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the description paragraph under `Navigation Lighting` used `mt-2` top margin, positioning it close below the heading.
- ⏭️ **AFTER UI STATE**: Increased top margin on ONLY the Phase 2 `Navigation Lighting` description paragraph to `mt-8 sm:mt-2` in `FenixGPSNavigation.tsx`. On mobile viewports, the paragraph (*"Integrated illumination for dark environments..."*) shifts down by 24px away from the `Navigation Lighting` title. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous Phase 2 paragraph top margin className is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 43: GPS Navigation Phase 2 Paragraph Mobile Downward Offset Increase ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the description paragraph under `Navigation Lighting` used `mt-8 sm:mt-2` top margin.
- ⏭️ **AFTER UI STATE**: Increased top margin on ONLY the Phase 2 `Navigation Lighting` description paragraph to `mt-14 sm:mt-2` (56px) in `FenixGPSNavigation.tsx`. On mobile viewports, the paragraph (*"Integrated illumination for dark environments..."*) shifts down by an additional 24px away from the `Navigation Lighting` title. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous `mt-8` paragraph top margin className is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 44: GPS Navigation Phase 2 Paragraph Mobile Offset Fine-Tuning ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the description paragraph under `Navigation Lighting` used `mt-24 sm:mt-2` top margin.
- ⏭️ **AFTER UI STATE**: Fine-tuned top margin on ONLY the Phase 2 `Navigation Lighting` description paragraph to `mt-12 sm:mt-2` (48px) in `FenixGPSNavigation.tsx`. On mobile viewports, the paragraph (*"Integrated illumination for dark environments..."*) moves back up by 48px to settle at a balanced, comfortable offset below the heading. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous `mt-24` paragraph top margin className is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 45: GPS Navigation Phase 2 Title Mobile Two-Line Formatting ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the `Navigation Lighting` heading was rendered on a single inline line.
- ⏭️ **AFTER UI STATE**: Inserted `<br className="block sm:hidden" />` after `Navigation` in `FenixGPSNavigation.tsx`. On mobile viewports, `Navigation` renders on Line 1 and cyan `Lighting` renders on Line 2. Desktop viewports (`sm:` and larger) maintain single-line composition.
- *Previous single-line heading structure is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 46: GPS Navigation Phase 2 Title & Container Mobile Downward Offset Increase ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, Phase 2 (`Navigation Lighting`) used `pt-16 sm:pt-0` (64px top padding).
- ⏭️ **AFTER UI STATE**: Increased mobile top padding on Phase 2's `<motion.div>` to `pt-24 sm:pt-0` (96px) in `FenixGPSNavigation.tsx`. On mobile viewports, the `Navigation Lighting` title and its container block shift down by an additional 32px. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous `pt-16` top padding class name is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 47: GPS Navigation Phase 2 Title Mobile Downward Offset Further Increase ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, Phase 2 (`Navigation Lighting`) used `pt-24 sm:pt-0` (96px top padding).
- ⏭️ **AFTER UI STATE**: Increased mobile top padding on Phase 2's `<motion.div>` to `pt-32 sm:pt-0` (128px) in `FenixGPSNavigation.tsx`. On mobile viewports, the `Navigation Lighting` title shifts down by an additional 32px. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous `pt-24` top padding class name is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 48: CharacterReveal Word Space Rendering Fix ([CharacterReveal.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/CharacterReveal.tsx))
- ⏮️ **BEFORE UI STATE**: Inside animated text blocks (such as `No problem!` in `FenixGPSNavigation.tsx`), standard collapsible spaces caused multi-word inline phrases to collapse into continuous text without spacing (`Noproblem!`).
- ⏭️ **AFTER UI STATE**: Updated space character spans in `CharacterReveal.tsx` to use non-breaking space `\u00A0`, ensuring all multi-word animated text phrases (such as `No problem!`) render explicit, crisp spaces between words.
- *Previous space span implementation is preserved as a source comment in `CharacterReveal.tsx`.*

#### 📍 Section 49: GPS Navigation Phase 2 Title-to-Paragraph Gap Reduction ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the `Navigation Lighting` two-line heading used `mb-6` bottom margin and the paragraph used `mt-12` top margin, leaving a large empty gap between the heading and description copy.
- ⏭️ **AFTER UI STATE**: Reduced Phase 2 heading bottom margin to `mb-3 sm:mb-8` and paragraph top margin to `mt-1 sm:mt-2` in `FenixGPSNavigation.tsx`. On mobile viewports, the paragraph (*"Integrated illumination for dark environments..."*) sits close below the `Navigation Lighting` heading with a tight, clean ~16px gap. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous Phase 2 heading and paragraph margin class names are preserved as source comments in `FenixGPSNavigation.tsx`.*

#### 📍 Section 50: GPS Navigation Phase 2 Title Mobile Upward Offset Adjustment ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, Phase 2 (`Navigation Lighting`) used `pt-32 sm:pt-0` (128px top padding), positioning the heading block lower in the frame.
- ⏭️ **AFTER UI STATE**: Reduced mobile top padding on Phase 2's `<motion.div>` to `pt-20 sm:pt-0` (80px) in `FenixGPSNavigation.tsx`. On mobile viewports, the `Navigation Lighting` title shifts up by 48px to settle at a balanced, centered vertical placement. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous `pt-32` top padding class name is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 51: GPS Navigation Phase 2 Paragraph Specific Mobile Downward Adjustment ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the description paragraph under `Navigation Lighting` used `mt-1 sm:mt-2` top margin.
- ⏭️ **AFTER UI STATE**: Increased top margin on ONLY the Phase 2 `Navigation Lighting` description paragraph to `mt-6 sm:mt-2` (24px) in `FenixGPSNavigation.tsx`. On mobile viewports, the paragraph (*"Integrated illumination for dark environments..."*) shifts down by 20px while the heading remains at its fixed placement. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous `mt-1` paragraph top margin class name is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 52: GPS Navigation Phase 1 Title Mobile Upward Offset Adjustment ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, Phase 1 (`No GPS ? No problem!`) used `pt-16 sm:pt-0` (64px top padding).
- ⏭️ **AFTER UI STATE**: Reduced mobile top padding on Phase 1's `<motion.div>` to `pt-8 sm:pt-0` (32px) in `FenixGPSNavigation.tsx`. On mobile viewports, the `No GPS ? No problem!` title shifts up by 32px. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous `pt-16` top padding class name is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 53: GPS Navigation Phase 1 Title Mobile Offset Fine-Tuning ([FenixGPSNavigation.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, Phase 1 (`No GPS ? No problem!`) used `pt-8 sm:pt-0` (32px top padding).
- ⏭️ **AFTER UI STATE**: Adjusted mobile top padding on Phase 1's `<motion.div>` to `pt-12 sm:pt-0` (48px) in `FenixGPSNavigation.tsx`. On mobile viewports, the `No GPS ? No problem!` title shifts down by 16px to settle at a balanced vertical position. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous `pt-8` top padding class name is preserved as a source comment in `FenixGPSNavigation.tsx`.*

#### 📍 Section 54: Turtle Mode Mobile Video Frame Size Increase ([FenixTurtleMode.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports, the central recovery video container used `w-[82vw]` (82% of screen width).
- ⏭️ **AFTER UI STATE**: Increased video frame width on mobile viewports to `w-[90vw] sm:w-[84vw]` in `FenixTurtleMode.tsx`. On phone displays, the recovery camera video is larger and more prominent while maintaining aspect ratio. Desktop and tablet viewports (`sm:` and larger) remain 100% unchanged.
- *Previous `w-[82vw]` mobile container size is preserved as a source comment in `FenixTurtleMode.tsx`.*

#### 📍 Section 55: Global Footer Small-Mobile Height Reduction ([Footer.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Footer.tsx))
- ⏮️ **BEFORE UI STATE**: On small phone screens, the footer used generous mobile padding and vertical gaps (`pt-16`, grid `gap-8`, navigation `gap-y-10`, watermark `mt-4 mb-4`, and bottom bar `py-6`), making the footer much taller than necessary.
- ⏭️ **AFTER UI STATE**: Reduced only the base mobile spacing (`pt-10`, grid `gap-5`, navigation `gap-y-6`, tighter link/brand spacing, watermark `mt-2 mb-2`, and bottom bar `py-4`). `sm` and larger breakpoints retain the existing footer dimensions.
- *Previous mobile spacing classes are preserved as source comments in `Footer.tsx`.*

#### 📍 Section 56: Footer Mobile Height & Vertical Spacing Expansion ([Footer.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Footer.tsx))
- ⏮️ **BEFORE UI STATE**: On mobile viewports (including taller displays like iPhone 14 Pro Max), the footer used compact padding (`pt-10`, grid `gap-5`, `space-y-4` brand spacing, `space-y-1.5` link items, `mb-4` bottom margin), causing the footer black container to appear short and leave an awkward top white gap.
- ⏭️ **AFTER UI STATE**: Expanded mobile vertical padding and spacing in `Footer.tsx` (`pt-16 sm:pt-20` top padding, grid `gap-8 sm:gap-16`, `space-y-6` brand spacing, `gap-y-8` navigation columns, `space-y-2.5` link list items, `mb-8` bottom margin, watermark `mt-6 mb-6`, and bottom bar `py-6 sm:py-8`). On both iPhone 14 and iPhone 14 Pro Max, the footer black container now expands cleanly across the mobile screen height. Desktop viewports (`sm:` and larger) remain 100% unchanged.
- *Previous compact mobile footer spacing classes are preserved as source comments in `Footer.tsx`.*

#### 📍 Section 57: Footer Short-Viewport Mobile Compaction ([Footer.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Footer.tsx), [globals.css](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**: iPhone 14-height screens (844px) inherited the same expanded mobile footer spacing as the taller iPhone 14 Pro Max (932px), making the footer feel oversized on the shorter device.
- ⏭️ **AFTER UI STATE**: Added a height-aware mobile media query for viewports up to 430px wide and 880px tall. It slightly tightens footer padding, content gaps, link spacing, watermark height/margins, and bottom-bar spacing. Taller phones such as iPhone 14 Pro Max remain unchanged.
- *The prior shared mobile spacing remains in `Footer.tsx` and is only overridden by the documented short-viewport CSS rule.*

#### 📍 Section 58: Footer Short-Viewport Height Further Reduction ([globals.css](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**: The initial height-aware override still left excessive vertical space on iPhone 14-height screens, particularly around the logo, navigation rows, watermark, and bottom bar.
- ⏭️ **AFTER UI STATE**: Strengthened only the short-mobile override with smaller top padding, tighter grid/link spacing, a reduced logo and watermark, compact action buttons, and a shorter bottom bar. Viewports taller than 880px—including iPhone 14 Pro Max—remain unchanged.
- *The previous short-screen override values are preserved in a source comment in `globals.css`.*

#### 📍 Section 59: Footer iPhone 14 Height Rebalance ([globals.css](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**: The extra-compact short-screen override reduced the iPhone 14 footer too far, using a 2.5rem logo, 14vw watermark, 1rem main gaps, and only 0.5rem bottom-bar padding.
- ⏭️ **AFTER UI STATE**: Increased the iPhone 14 footer to a balanced intermediate height with a 3rem logo, 20vw watermark, 1.5rem content gaps, restored link breathing room, and 1rem bottom-bar padding. The iPhone 14 Pro Max layout remains unchanged because the override still applies only at 880px height and below.
- *The extra-compact short-screen values are preserved in a source comment in `globals.css`.*

#### 📍 Section 60: Footer iPhone 14 Full-Viewport Height ([globals.css](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**: The iPhone 14 footer height was determined only by its content, leaving the black footer slightly shorter than the visible phone viewport.
- ⏭️ **AFTER UI STATE**: Added `min-height: 100svh` to the short-phone footer rule and anchored the bottom bar with `margin-top: auto`, making the footer fill the complete iPhone 14 viewport while retaining the existing content sizes. Taller iPhone 14 Pro Max screens remain unaffected.
- *The previous content-driven height behavior is preserved in a source comment in `globals.css`.*

#### 📍 Section 61: FENIX Hero & Capabilities Real-Mobile Viewport Height Fix ([FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx), [FenixCapabilities.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixCapabilities.tsx))
- ⏮️ **BEFORE UI STATE**: The Hero used `h-screen` and the second Capabilities section used `min-h-screen`. Their legacy `100vh` sizing could include the physical phone browser's address and toolbar area, making both sections taller on real iPhones than in desktop device inspection.
- ⏭️ **AFTER UI STATE**: Both mobile sections now use the small viewport unit (`100svh`), matching the reliably visible phone screen height on iPhone 14 and iPhone 14 Pro Max. Desktop viewports retain the original `h-screen`/`min-h-screen` behavior from the `md` breakpoint onward.
- *The previous legacy viewport-height classes are preserved as source comments in both component files.*

#### 📍 Development Runtime: Webpack Cache Memory Stabilization ([next.config.mjs](file:///c:/Users/tsall/Desktop/1st_version/frontend/next.config.mjs))
- ⏮️ **BEFORE UI STATE**: The development server used Webpack's default PackFile filesystem cache, which had grown to approximately 451 MB. Repacking it triggered `Array buffer allocation failed` and eventually terminated `next dev` with a JavaScript heap out-of-memory error.
- ⏭️ **AFTER UI STATE**: Enabled Next.js 15's low-memory Webpack optimization and disabled the Webpack filesystem cache only during development. Page behavior and production builds remain unchanged; development recompilation may be slightly slower but avoids the large cache-pack allocation.
- *The previous default development memory/cache behavior is preserved as comments in `next.config.mjs`.*

#### 📍 Section 62: Footer Dynamic Viewport Height Fix for Mobile Browser Toolbar Collapse ([globals.css](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**: The mobile footer used `@media (max-width: 430px) and (max-height: 880px)` with `min-height: 100svh`. When users first scrolled down to the footer, the address bar was expanded so the media query matched and the footer fit the screen. However, on scrolling down, mobile browsers collapsed the address bar, increasing the window height above 880px. Consequently, when visiting the footer a 2nd time with the address bar collapsed, the media query failed to match and `100svh` evaluated to a smaller static height, causing the footer to shrink and fail to fit the screen height.
- ⏭️ **AFTER UI STATE**: Updated the mobile footer media query to `@media (max-width: 767px)` without the brittle `max-height: 880px` constraint, and applied `min-height: 100dvh` (Dynamic Viewport Height with `100vh` fallback). Now, the footer dynamically scales to 100% of the visible viewport height on both initial visit and subsequent visits regardless of whether the mobile address bar is expanded or collapsed.
- *The previous `max-height: 880px` and `100svh` CSS rules are preserved as source comments in `globals.css`.*

#### 📍 Section 63: Footer Disabled Button Unconditional Event Prevention Fix ([Footer.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/Footer.tsx), [Founders.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/about/components/Founders.tsx))
- ⏮️ **BEFORE UI STATE**: Disabled footer links (`VIEW CAREERS` and navigation items using `href="#"`) had conditional event prevention (`if (pathname === "/") { e.preventDefault(); }`). On any subpage other than `/` (such as `/fenix`, `/about`, `/careers`, `/contact`), clicking any disabled footer link executed standard browser `#` navigation, scrolling the page directly to the top (first section).
- ⏭️ **AFTER UI STATE**: Updated disabled footer links and placeholder social buttons to invoke `onClick={(e) => e.preventDefault()}` unconditionally on all pages. Clicking disabled buttons on mobile or desktop no longer triggers `#` anchor jumps to the top section on any page.
- *The previous conditional `if (pathname === "/")` onClick code blocks are preserved as comments in `Footer.tsx` and `Founders.tsx`.*

---

*Log last updated: August 26, 2026*

---

## 📅 Session Log: August 07, 2026

### 🎯 Overview of User Request
- Replace the main Hero image in the Velocity Complex section (`VelocityComplex.tsx`) on the Home Page (`/`) with `"Velocity Complex.jpg"` located in the `public` folder.
- Preserve previous code in source files via comment blocks (`{/* PREVIOUS UI: ... */}`).

---

### 🌐 PAGE: Home Page (`/`)

#### 📍 Section 5: Velocity Complex Section ([VelocityComplex.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/components/VelocityComplex.tsx))
- ⏮️ **BEFORE UI STATE**: The section hero image used `src="/building.avif"`.
- ⏭️ **AFTER UI STATE**: Updated section hero image source to `src="/Velocity%20Complex.jpg"` referencing the high-resolution Velocity Complex image asset from the `public` directory.
- *Previous image source tag preserved as comment block in `VelocityComplex.tsx`.*

---

## 📅 Session Log: August 26, 2026

### 🎯 Overview of User Request
- In Fenix page (`/fenix` / `/uncrewedsystems/fenix`), replace the Hero Section background video with `"C:\Users\tsall\Desktop\1st_version\frontend\public\product\fenix\QsmnFp2aCayPv4DNQVxUhw.mp4"` located in the `public/product/fenix/` directory.
- Preserve all previous code via comment blocks (`{/* PREVIOUS UI: ... */}`).

---

### 🌐 PAGE: FENIX Product Page (`/fenix` / `/uncrewedsystems/fenix`)

#### 📍 Section 1: Hero Section ([FenixHero.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The Hero section background video was loaded from an external CDN source (`https://cdn.sanity.io/files/z5s3oquj/production/f3cab16e70d9afbe1c7a4cef3e496ef06e3dd497.mp4`) with an Unsplash fallback poster (`https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5...`).
- ⏭️ **AFTER UI STATE**:
  - Updated the Hero section background video source to `/product/fenix/QsmnFp2aCayPv4DNQVxUhw.mp4`, serving the local Fenix video asset directly from the `frontend/public/product/fenix/` directory with `autoPlay`, `muted`, `loop`, and `playsInline` settings enabled.
  - *Previous video element and source preserved as comment blocks in `FenixHero.tsx`.*

---

## 📅 Session Log: August 27, 2026

### 🎯 Overview of User Request
- Fix the drone image in the Capabilities section of the FENIX page (`FenixCapabilities.tsx`) so that the drone is fully visible without cropping.
- Ensure the image card preserves its original portrait height and aspect ratio (`aspect-[1075/1433]`).
- Preserve all previous code in source files via comment blocks (`{/* PREVIOUS UI: ... */}`).

---

### 🌐 PAGE: FENIX Product Page (`/fenix` / `/uncrewedsystems/fenix`)

#### 📍 Section 2: Capabilities Section ([FenixCapabilities.tsx](file:///c:/Users/tsall/Desktop/1st_version/frontend/app/uncrewedsystems/fenix/components/FenixCapabilities.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The Left Column image container used `aspect-[1075/1433]` with `className="object-cover"`, which zoomed in on the square 2400x2400 drone graphic and cropped off the left and right propeller arms and frame.
- ⏭️ **AFTER UI STATE**:
  - Maintained the previous tall card container height and aspect ratio (`aspect-[1075/1433] max-w-md`) with matching background color (`bg-[#e2e2e2]`), centered layout, and `className="object-contain"`.
  - The entire drone image is 100% visible and uncropped inside the full-height card.
  - *Previous UI implementations preserved as comment blocks in `FenixCapabilities.tsx`.*

---

## 📅 Session Log: October 22, 2026

### 🎯 Overview of User Request
- Increase the size of the drone image in the Specifications section on the FENIX product page (`/fenix` / `/uncrewedsystems/fenix`), as referenced in the uploaded screenshot.
- Preserve all previous code in source files via comment blocks (`/* PREVIOUS UI: ... */`).

---

### 🌐 PAGE: FENIX Product Page (`/fenix` / `/uncrewedsystems/fenix`)

#### 📍 Section 8: FENIX Specifications Section ([globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css), [FenixSpecifications.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixSpecifications.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The FENIX drone technical illustration (`.fenix-specs-render`) in the specifications section was constrained to `max-height: 60vh` with `transform: translateX(-16%) scale(1.52)`.
  - On mobile (`max-width: 767px`), the render was scaled at `scale(1.04)` with `transform: translateX(-1%)`.
  - The drone image appeared relatively small in the left visual area with substantial unused vertical space above and below the drone airframe.
- ⏭️ **AFTER UI STATE**:
  - Increased `.fenix-specs-render` maximum height from `60vh` to `72vh` and visual scale from `scale(1.52)` to `scale(1.78)` (`transform: translateX(-14%) scale(1.78)`), making the drone significantly larger, bolder, and more prominent in the technical specifications stage while keeping balanced clearance from the right-side performance metrics.
  - Added `overflow: hidden` to `.fenix-specs` to ensure clean edge bleeding without horizontal scrolling.
  - On mobile screens (`max-width: 767px`), increased image scale from `scale(1.04)` to `scale(1.18)` (`transform: translateX(-1%) scale(1.18)`).
  - *Previous CSS rules preserved as comment blocks in `globals.css`.*

---

#### 📍 Section 7: FENIX Interactive Parts Breakdown ([FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The central drone graphic under the *"FAST ENTRY NAVIGATIONAL INTRUSION EXPLORER"* title used `src="/images/Fenix/parts.png"` (a lower-resolution 1366x768 render).
- ⏭️ **AFTER UI STATE**:
  - Replaced the central drone graphic with the high-resolution asset `src="/product/fenix/FENIX Specs.png"` (4320x2000).
  - Deleted the obsolete image file `frontend/public/images/Fenix/parts.png` from the filesystem as requested.
  - *Previous UI code block preserved as comments in `FenixFUI2.tsx`.*

---

#### 📍 Section 9: Customizations & Skill Integration ([.agents/skills/](file:///e:/Tsalla%20Website/.agents/skills/), [.agents/plugins/](file:///e:/Tsalla%20Website/.agents/plugins/))
- ⏮️ **BEFORE STATE**:
  - The workspace did not have Context7 documentation skills installed.
- ⏭️ **AFTER STATE**:
  - Downloaded and installed Context7 skills (`find-docs`, `context7-cli`, `context7-mcp`) and the Antigravity plugin bundle into `.agents/skills/` and `.agents/plugins/context7/`.
  - Configured the hosted Context7 Model Context Protocol endpoint (`https://mcp.context7.com/mcp`) in `~/.gemini/config/mcp_config.json`.
  - Verified live documentation lookup using `ctx7` library resolution and documentation retrieval.

---

#### 📍 Section 7: FENIX Interactive Parts Breakdown Feature Dots Alignment ([FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The SVG interactive feature ripple dots (`connectorEnd` points) were positioned based on the aspect ratio and coordinates of the older `parts.png` asset.
  - With the wider aspect ratio (2.16) and new angle of `FENIX Specs.png`, the `Payload` (`y: 520`) and `Sensor Suite` (`y: 540`) dots hung into empty white space below the drone, while `EDGE Compute` and `Propulsion` were misaligned with the new motor and heatsink locations.
- ⏭️ **AFTER UI STATE**:
  - Re-aligned all 5 feature points and their connector lines on desktop and mobile:
    - **EDGE Compute**: Updated `connectorEnd` to `{ x: 580, y: 270 }` (anchored directly to the top companion computer and cooling heatsink).
    - **Propulsion**: Updated `connectorEnd` to `{ x: 540, y: 235 }` (anchored directly to the rear-left motor and propeller assembly).
    - **Collision Resistance**: Updated `connectorEnd` to `{ x: 1010, y: 350 }` (anchored directly to the outer right bumper duct guard).
    - **Payload**: Shifted `connectorEnd` up to `{ x: 430, y: 405 }` (anchored precisely to the primary camera lens on the dual payload pod).
    - **Sensor Suite**: Shifted `connectorEnd` up to `{ x: 450, y: 435 }` (anchored precisely to the sensor/laser aperture on the front nose pod).
  - *Previous coordinate definitions preserved as comments in `FenixFUI2.tsx`.*

---

#### 📍 Section 6: FENIX First Responder Section ([FenixResponder1.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixResponder1.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The section title *"FENIx as the First Responder"* was a single left-aligned header text block stacked inside `ContentWrapper`, clustering over the left two panels.
  - The section featured only the background artwork (`/product/fenix/4 phase.png`) with no foreground drone illustration.
  - In the initial drone placement, combining Tailwind's `left-1/2 -translate-x-1/2` on `motion.div` with Framer Motion's `animate={{ y }}` caused Framer Motion's inline `translateY` style to override Tailwind's `translateX(-50%)`, pulling the drone 50% to the right (centering it over Panel 3 & 4 instead of the whole screen).
- ⏭️ **AFTER UI STATE**:
  - **4-Column Aligned Title Grid**: Restructured the header into a 4-column CSS grid (`grid grid-cols-4`) perfectly aligned above each of the four operational environment panels:
    - **Column 1** (Thermal Environment): Centered `FENIx` with the letter **`x` highlighted in cyan (`#5ce1e6`)**.
    - **Column 2** (Cave Environment): Centered `As The` (capitalized per user request).
    - **Column 3** (Structural Ruins Environment): Centered `First`.
    - **Column 4** (Industrial Plant Environment): Centered `Responder` in cyan (`#5ce1e6`).
  - **Large Foreground Drone Overlay Centered, Sized Up & Lowered**: Integrated [`/product/fenix/4 phase drone.png`](file:///e:/Tsalla%20Website/frontend/public/product/fenix/4%20phase%20drone.png) inside a full-width container (`absolute inset-x-0 bottom-[-24vh] sm:bottom-[-28vh] lg:bottom-[-33vh] ... flex justify-center`). Increased drone dimensions from `56vw / max-w-[1120px]` to `63vw / max-w-[1260px]` on desktop (`96vw / sm:80vw / md:70vw` on smaller viewports) and lowered the baseline to give clean vertical breathing room below the title across viewports.
  - **Cinematic "Buttery Smooth" Ascent Animation**: Added a fluid bottom-to-top ascent animation (`initial={{ opacity: 0, y: "75%", scale: 0.94 }}` -> `animate={{ opacity: 1, y: "0%", scale: 1 }}`) powered by Framer Motion's `useInView` and custom cubic bezier easing (`ease: [0.16, 1, 0.3, 1]`) over a 1.6s duration. As the user arrives at this section, the drone gracefully glides up from below the viewport fold and decelerates into its settled position like silk.
  - *Previous header, column text casing, drone sizing, position, and animation code blocks strictly preserved as comments in `FenixResponder1.tsx`.*

---

#### 📍 Section 7: FENIX Interactive Parts Breakdown Syntax Fix ([FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE STATE**:
  - An inline JSX comment at line 86 (`{/* PREVIOUS UI: style={{ ... }} */}`) contained nested curly braces, which triggered a Next.js SWC build/parser error (*"Expression expected"*).
- ⏭️ **AFTER STATE**:
  - Normalized the comment syntax to remove nested braces (`{/* PREVIOUS UI: style with fontFamily ClashGrotesk Bold (.eot), fontWeight 700 */}`), restoring error-free compilation and hot-reloading.

---

#### 📍 Section 7: FENIX Interactive Parts Breakdown Box Sizing, Pro Connector Distances & Mobile Responsive ON State ([FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**:
  - **Oversized Box Dimensions & Blank Space**: The feature callout cards on desktop were sized at `width: 320px`, `min-w-[320px]`, with `p-6` padding, `text-xl` title, and `text-sm` description. For single-sentence specifications (like *Collision Resistance* and *Sensor Suite*), this produced extensive blank, unused white space.
  - **Distant Connector Lines**: The feature boxes were positioned far from the drone airframe landmarks, creating long, sprawling connector lines across the canvas:
    - *EDGE Compute*: Box placed on far left (`right: 76.7%`), spanning a 330px gap to the heatsink at `{ x: 580, y: 270 }`.
    - *Propulsion*: Box placed at `left: 61.7%` (`x: 750`), spanning a 210px gap to the rear-left motor at `{ x: 540, y: 235 }`.
    - *Payload*: Box placed at `right: 83.3%` (`x: 160`), spanning a 270px gap across to the camera lens at `{ x: 430, y: 405 }`.
    - *Sensor Suite*: Box placed at `left: 80.3%` (`x: 1000`), spanning an excessive 550px line stretching from the nose sensor at `{ x: 450, y: 435 }` all the way across to the right side of the screen.
  - **Mobile State & Responsiveness**:
    - `activeId` was initialized to `null`. On mobile preview, no feature card was visible on initial load ("OFF state"), requiring the user to locate and tap tiny dots.
    - When active on mobile, 5 separate 100px square boxes were scattered over the drone airframe with microscopic, unreadable 6px text (`text-[6px]`), and tapping a dot toggled the card back off to `null`.
- ⏭️ **AFTER UI STATE**:
  - **Pro Box Sizing & Technical HUD Styling**:
    - Reduced card width from 320px to a sleek, compact `230px` and reduced padding from `p-6` to `p-3.5`, eliminating wasted interior space while keeping generous legibility.
    - Refined typography: `text-xs font-bold tracking-wider uppercase text-neutral-900` title with animated pulsing cyan status pip, `[ 01 ]` index badge in mono font, a clean `1.5px` cyan divider bar (`bg-[#5ce1e6]`), and `text-[11px] text-neutral-600 leading-snug` description.
    - Added subtle technical aerospace HUD corner accents (top-right and bottom-left cyan borders).
  - **Reduced Connector Distances (Boxes Brought Close to Drone Points)**:
    - Re-anchored all 5 feature cards immediately adjacent to their target landmarks on the drone airframe:
      - **EDGE Compute**: Moved to `top: 18%, right: 62%`, reducing connector distance from 330px down to ~80px directly beside the heatsink.
      - **Propulsion**: Moved to `top: 8%, left: 48%`, reducing connector distance from 210px down to ~65px directly above the rear-left motor.
      - **Collision Resistance**: Re-anchored to `top: 24%, left: 76%`, hugging the outer right bumper guard with ~90px line length.
      - **Payload**: Moved to `top: 42%, right: 66%`, placing the card right beside the front camera pod with a short ~30px horizontal pointer.
      - **Sensor Suite**: Repositioned to `top: 54%, left: 44%`, eliminating the 550px cross-drone line and connecting smoothly below the nose at ~85px.
  - **Mobile Responsive Layout & Guaranteed ON State**:
    - **Default ON State**: Initialized `activeId` to `"payload"` by default so that in mobile preview, the feature box is immediately visible, active, and formatted in the **"ON" state** without requiring any user interaction.
    - **Docked Responsive Bottom Card**: On mobile devices (`isMobile`), the active feature is presented in a dedicated, high-contrast, fully readable card docked at `bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm` featuring `text-sm` title, `[ 01/05 ]` counter, cyan accent divider, and `text-xs` description.
    - **Mobile Quick-Switch Navigation**: Integrated numeric part selector buttons (`[ 01 | 02 | 03 | 04 | 05 ]`) directly into the card footer with active highlight in cyan (`#5ce1e6`), enabling one-tap switching between components.
    - **Persistent Touch State**: On touch devices, tapping the ripple dots or the transparent 45px touch radius sets `setActiveId(feature.id)`, keeping the card active without toggling to `null`.
    - **Mobile SVG Targeting**: In mobile view, the SVG renders a clean, animated downward targeting pointer directly from the active part dot towards the information card.
  - *All previous UI states and code blocks are strictly preserved as comments in `FenixFUI2.tsx`.*

---

#### 📍 Section 7: FENIX Drone Image Enlargement & Balanced Airframe Clearance Calibration ([FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**:
  - **Constrained Drone Illustration Size**: The drone graphic was clamped inside `max-w-6xl` (1152px), leaving substantial empty canvas width on desktop monitors.
  - **Over-Reduced Distance Causing Airframe Overlap**: In the previous calibration, the `PAYLOAD` card was positioned at `top: 42%, right: 66%`, which placed the box directly on top of the left propeller bumper duct and nose pod, causing the white card to obstruct the carbon airframe and duct screws.
  - **Independent Sizing Drift**: The drone image was wrapped in `max-w-6xl` while the SVG and desktop cards stretched across the entire viewport, resulting in coordinate shift across varying screen aspect ratios.
- ⏭️ **AFTER UI STATE**:
  - **Significantly Larger Drone Image**:
    - Expanded the interactive stage container from `max-w-6xl` (1152px) to `max-w-[1360px] 2xl:max-w-[1480px]` with an explicit `aspect-[1200/800] mx-auto` frame.
    - The drone airframe render is now 20% to 28% larger on desktop viewports, creating a commanding central visual stage.
  - **Balanced Clearance (No Airframe Overlap)**:
    - Calibrated card positions outside the outer perimeter of the drone airframe to eliminate all overlap while keeping clean, moderate connector lines (~100px - 180px):
      - **PAYLOAD**: Shifted to `left: 2%, top: 42%` with `connectorStart: { x: 260, y: 405 }`. Sits comfortably to the left of the airframe with 16px of clear whitespace outside the carbon duct and a clean 170px pointer line to the camera lens.
      - **EDGE COMPUTE**: Positioned top-left at `left: 5%, top: 12%` (`connectorStart: { x: 295, y: 190 }`), sitting above the left duct guard with an elegant 180px line to the heatsink.
      - **PROPULSION**: Positioned top-center at `left: 54%, top: 4%` (`connectorStart: { x: 648, y: 120 }`), providing ample vertical clearance above the rear motors.
      - **COLLISION RESISTANCE**: Positioned at `right: 2%, top: 16%` (`connectorStart: { x: 1010, y: 250 }`), with a clean 100px vertical drop onto the outer right bumper guard.
      - **SENSOR SUITE**: Positioned below the nose at `left: 44%, bottom: 8%` (`connectorStart: { x: 528, y: 560 }`), with 180px clearance below the landing gear.
  - **Unified Stage Coordinate Synchronization**:
    - Nested the drone image, SVG connectors, and desktop cards within the same `aspect-[1200/800]` stage container. All elements now scale in lock-step across any screen width or aspect ratio.
  - *All previous code implementations strictly preserved via `// PREVIOUS UI: ...` and `{false && (<React.Fragment> ... </React.Fragment>)}` blocks.*

---

#### 📍 Section 8: FENIX Specifications Section Performance Column Alignment ([globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - In the FENIX Specifications section (`.fenix-specs`), the technical drone underside render (`.fenix-specs-render`) was scaled to `scale(1.78)` and positioned at `translateX(-14%)`.
  - The right propeller duct of the drone airframe crossed over the 4vw grid column boundary into `.fenix-specs-performance`, physically overlapping and obscuring the first letters of the metric label (`"Endu"` in `"Endurance"`).
- ⏭️ **AFTER UI STATE**:
  - Added `transform: translateX(clamp(2rem, 3.5vw, 4.5rem));` to `.fenix-specs-performance` on desktop/tablet viewports, smoothly shifting the entire performance metrics column rightward into the available open whitespace.
  - The `"Endurance"`, `"Lift capacity"`, `"Altitude (AGL)"`, and `"Cruise speed"` labels and values now have generous, unobstructed visual clearance from the drone illustration.
  - On mobile screens (`@media (max-width: 767px)`), `.fenix-specs-performance` stacks vertically in row 2 below the drone, where `transform: none;` is explicitly applied to prevent unwanted horizontal offsets.
  - *Previous CSS rules preserved as comments in `frontend/app/globals.css`.*

---

## 📅 Session Log: October 22, 2026

### 🎯 Overview of User Request
- In Home Page (`/`), in "Powered by MAVERICK" section (`ProductSection.tsx`), add a fade-in animation to the STORM product card like the MANTIS card.
- Preserve previous code in source files via comment blocks (`{/* PREVIOUS UI: ... */}`).

---

### 🌐 PAGE: Home Page (`/`)

#### 📍 Section 4: Product Section ("Powered by MAVERICK") - STORM Card Fade-In Arrival Animation ([ProductSection.tsx](file:///e:/Tsalla%20Website/frontend/components/ProductSection.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In `ProductCard`'s arrival variants, the STORM drone card (`isStorm`) had `opacity: isStorm && !reduceMotion ? 1 : 0`, which forced initial opacity to `1`. As a result, the STORM card did not have a fade-in animation when scrolling into view.
  - The initial transform for STORM was set to `scale(2.2)`, zooming out from 220% with 100% opacity, contrasting with the smooth fade-in and scale-up entrance of the MANTIS card (`opacity: 0` -> `1`, `scale(0.45)` -> `scale(1)`).
- ⏭️ **AFTER UI STATE**:
  - Aligned the STORM card's entry variants to match the MANTIS card: `variants.hidden` now sets initial `opacity: 0` and transform `(isMantis || isStorm) ? "translate3d(0%, 0%, 0) scale(0.45) rotate(0deg)"`.
  - When the card scrolls into view (`cardInView = true`), the STORM card smoothly fades in from `opacity: 0` to `opacity: 1` while scaling from `scale(0.45)` to `scale(1)` over 1.15s with easing `[0.23, 1, 0.32, 1]` after a 0.3s delay, matching the exact entrance behavior of the MANTIS card.
  - *Previous STORM variant definitions preserved as comments in `ProductSection.tsx`.*

---

### 🌐 PAGE: FENIX Product Page (`/fenix` / `/uncrewedsystems/fenix`)

#### 📍 Section 1: Hero Section Subtitle Text Removal ([FenixHero.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the Hero section, beneath the `<h1>FENIx</h1>` title, the full spelled-out acronym subtitle `"Fast Entry Navigational Intrusion eXplorer"` was rendered with `fenix-section-title` styling and `CharacterReveal` animation.
  - Due to the large title sizing and narrow column width on desktop viewports, the multi-word subtitle wrapped across four lines (`Fast Entry`, `Navigational`, `Intrusion`, `eXplorer`), colliding and visually overlapping across the foreground of the central 3D FENIX drone model.
- ⏭️ **AFTER UI STATE**:
  - Removed and commented out the `"Fast Entry Navigational Intrusion eXplorer"` subtitle element from the Hero section.
  - The hero title now cleanly displays just the bold `FENIx` title mark on the bottom left, keeping the central drone and lighting composition fully unobstructed.
  - *Previous subtitle code block preserved as a comment in `FenixHero.tsx`.*

---

#### 📍 Section 2: Capabilities Section ("Compact Tactical Intelligence") Layout & Typography Adjustments ([FenixCapabilities.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixCapabilities.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The right-side text content container had `md:translate-x-8 md:-translate-y-6`. On desktop and wide displays, the heading "Compact Tactical Intelligence" sat very close to the large drone's right propeller guard and arm.
  - The descriptive paragraph had `text-base md:text-lg` with `text-justify`, rendering a relatively large 18px text block with wide justified word spacing on desktop.
  - Vertically, the text block was anchored at `md:-translate-y-6` (-24px), sitting somewhat low relative to the drone body on desktop viewports.
  - The drone image had horizontal translation `md:-translate-x-[40%]` on desktop and `-translate-x-[5%]` on mobile, placing its right propeller duct in close proximity to the text column.
- ⏭️ **AFTER UI STATE**:
  - Shifted the right-side text container further right with `md:translate-x-12 lg:translate-x-16 xl:translate-x-20`, providing clean breathing room (~48px to 80px horizontal offset) between the drone airframe/duct and the heading.
  - Moved the text block upward ("little up, 2 times") from `md:-translate-y-6` (-24px) to `-translate-y-3 md:-translate-y-14 lg:-translate-y-16` (-56px to -64px on desktop), shifting it up ~32px to 40px to align harmoniously with the drone chassis.
  - Shifted the drone illustration further to the left ("little left side 2 times") by updating `<Image>` translation to `md:-translate-x-[48%]` on desktop and `-translate-x-[10%]` on mobile (from `md:-translate-x-[40%]` / `-5%`), widening the open corridor between the drone's right duct and the text.
  - Reduced the paragraph font size from `text-base md:text-lg` (16px / 18px) down through `text-sm md:text-base` (14px / 16px) to `text-xs md:text-sm` (12px / 14px), creating a sleeker, more refined aerospace technical appearance with balanced, proportional word spacing.
  - *Previous translate classes, image positioning, and paragraph font sizes preserved as comments in `FenixCapabilities.tsx`.*

---

#### 📍 Section 6: FENIX First Responder Drone Enlargement ([FenixResponder1.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixResponder1.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The foreground drone illustration was sized at `w-[96vw] sm:w-[80vw] md:w-[70vw] lg:w-[63vw] max-w-[1260px]` with vertical anchor `bottom-[-24vh] sm:bottom-[-28vh] lg:bottom-[-33vh]`.
  - While centered and cleanly animated, the drone left substantial open space across panels 1 and 4.
- ⏭️ **AFTER UI STATE**:
  - Increased the drone container dimensions to `w-[98vw] sm:w-[88vw] md:w-[78vw] lg:w-[72vw] xl:w-[70vw] max-w-[1440px]`, making the drone airframe, carbon ducts, and motors ~14% larger and more prominent across the 4-phase environment panels.
  - Adjusted the vertical offset to `bottom-[-26vh] sm:bottom-[-30vh] lg:bottom-[-36vh]` to ensure the enlarged drone chassis remains grounded and the top camera pod maintains clean vertical breathing room below the four column headers.
  - *Previous drone sizing and position classes preserved as comments in `FenixResponder1.tsx`.*

---

#### 📍 Section 7: FENIX Interactive Parts Breakdown Sensor Suite Card Removal ([FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The interactive breakdown included a 5th feature card (`[05] Sensor Suite`) anchored at `top: 72%, left: 22%`.
  - On desktop viewports, this card was pushed too far down, overflowing below the bottom edge of the screen and getting partially cut off under the taskbar.
  - Furthermore, its connector target point at `{ x: 450, y: 435 }` sat immediately next to the `Payload` dot at `{ x: 430, y: 405 }`, causing two cyan ripple targeting rings to collide and overlap on the drone's front camera/sensor pod.
- ⏭️ **AFTER UI STATE**:
  - Removed and commented out the `Sensor Suite` feature point from `features` in `FenixFUI2.tsx`.
  - The layout now cleanly features 4 balanced, symmetrical quadrant callouts: `[01] EDGE Compute` (top-left), `[02] Propulsion` (top-right), `[03] Collision Resistance` (bottom-right), and `[04] Payload` (bottom-left).
  - Eliminates all off-screen box overflowing and redundant overlapping ripple dots on the camera pod.
  - Made the mobile part selector counter dynamic (`[01/04]` via `features.length`) with 4 clean selector buttons (`01` through `04`).
  - *Previous Sensor Suite feature configuration preserved as comments in `FenixFUI2.tsx`.*

---

#### 📍 Section 7: FENIX Interactive Parts Breakdown Collision Resistance Dot & Line Calibration ([FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The targeting dot for `[03] Collision Resistance` was anchored at `{ x: 1010, y: 350 }`, floating in empty white space above the outer bumper guard.
  - Because `controlPoint.x` was `1010` and the card's left coordinate `1176 - cardWidthUnits` was ~1016 to 980 (depending on viewport width), the 2nd horizontal line segment was either nearly invisible (~6 to 15px) or bending backwards into the card.
- ⏭️ **AFTER UI STATE**:
  - Shifted the targeting blue dot down and left onto the actual black carbon-reinforced nylon bumper duct at `connectorEnd: { x: 955, y: 395 }` (down ~45px, left ~55px).
  - Aligned the vertical drop line to `controlPoint: { x: 955, y: 500 }`, extending the 2nd horizontal connector line segment length across to the card from ~10px to a clear, elegant 30px to 65px span.
  - Updated mobile targeting config to `{ x: 955, y: 395 }`.
  - *Previous Collision Resistance coordinates preserved as comments in `FenixFUI2.tsx`.*

---

#### 📍 Section 7: FENIX Interactive Parts Breakdown 5-Point Full Restoration & Balanced Layout Calibration ([FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The interactive breakdown only displayed 4 points (`[01] EDGE Compute`, `[02] Propulsion`, `[03] Collision Resistance`, `[04] Payload`), missing the 5th point (`Sensor Suite`).
  - In earlier iterations with 5 points, the `Sensor Suite` card had been anchored at `top: 72%, left: 22%`, causing the bottom half of the card to overflow below the screen fold and get cut off into the Windows taskbar.
  - In addition, the previous `Sensor Suite` targeting dot at `{ x: 450, y: 435 }` collided with the `Payload` dot at `{ x: 430, y: 405 }`, resulting in two overlapping cyan ripple rings on the front camera.
- ⏭️ **AFTER UI STATE**:
  - **All 5 Feature Points Fully Restored & Rebalanced**:
    - **Left Column Distribution (3 clean, non-overlapping cards with ~100px vertical gaps)**:
      1. **`[01] EDGE Compute`**: Anchored at `top: 10%, left: 2%` with line at `y = 110`, targeting companion computer heatsink at `{ x: 580, y: 270 }`.
      2. **`[02] Payload`**: Anchored at `top: 37%, left: 2%` with line at `y = 326`, targeting primary RGB & Thermal camera optics at `{ x: 430, y: 405 }`.
      3. **`[03] Sensor Suite`**: Anchored at `top: 65%, left: 2%` (ends at ~78% stage height, leaving >160px of clear vertical breathing room above the bottom screen fold—100% visible with zero overflow), targeting the lower forward sensor pod at `{ x: 385, y: 470 }` (distinct and separate from the camera lens).
    - **Right Column Distribution (2 cards)**:
      4. **`[04] Propulsion`**: Anchored at `top: 14%, right: 2%` with connector targeting rear motor at `{ x: 540, y: 235 }`.
      5. **`[05] Collision Resistance`**: Anchored at `top: 60%, right: 2%` with extended horizontal connector line targeting carbon nylon bumper duct at `{ x: 955, y: 395 }`.
  - **Mobile Responsive Enhancements**:
    - Mobile selector counter dynamically displays `[01/05]` (via `features.length`).
    - Mobile quick-switch selector pill buttons provide 5 one-tap navigation targets (`[ 01 | 02 | 03 | 04 | 05 ]`).
  - *All previous coordinate states and card configurations strictly preserved as comments in `FenixFUI2.tsx`.*

---

#### 📍 Section 7: FENIX Interactive Parts Breakdown Acronym Header Lowercase "x" ([FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the section header title above the drone (`FAST ENTRY NAVIGATIONAL INTRUSION EXPLORER`), the cyan acronym character for "x" in `EXPLORER` was rendered as an uppercase capital letter: `<CharacterReveal text="X" ... />`.
  - This appeared as `E X P L O R E R` with a capital "X", differing from the brand identity `FENIx` where the "x" is intentionally lowercase.
- ⏭️ **AFTER UI STATE**:
  - Updated the character reveal to lowercase small letter: `<CharacterReveal text="x" ... />`.
  - The header title now cleanly displays `ExPLORER` with the small letter "x" highlighted in cyan (`#5ce1e6`), perfectly matching the brand identity of `FENIx`.
  - *Previous uppercase "X" code block strictly preserved as a comment in `FenixFUI2.tsx`.*

---

#### 📍 Section 7: FENIX Interactive Parts Breakdown Card Size Reduction & Airframe Overlap Clearance Calibration ([FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**:
  - **Oversized Card Dimensions**: The desktop callout cards were 240px wide with `p-3.5` padding and large 14px `fenix-body` font (`line-height: 1.625`), resulting in tall (~220px) boxes where short bullet items wrapped into 2 to 3 lines.
  - **Airframe Overlap**: The `[04] Payload` card was anchored at `top: 37%, left: 2%`. On desktop and laptop viewports, its 240px width reached into the drone's front-left carbon bumper duct, propeller, and screw mount, causing the white card and cyan border to physically overlap the drone chassis.
- ⏭️ **AFTER UI STATE**:
  - **Sleek Reduced Box Sizing**:
    - Reduced card width from 240px to a compact `190px` (~20% narrower).
    - Reduced interior padding to `p-2.5` (10px).
    - Refined typography: `text-[10.5px]` bold uppercase title, `text-[9px]` index badge, `w-full h-[1px]` divider, and compact `text-[9.5px] sm:text-[10px] leading-tight` description copy.
    - Overall card height was reduced from ~220px down to ~110px (~50% height reduction), creating a much sleeker, high-tech aerospace HUD callout.
  - **Guaranteed Drone Airframe Clearance (Zero Overlap)**:
    - Shifted card gutters to `left: 1%` for left-side components (`EDGE Compute`, `Payload`, `Sensor Suite`) and `right: 1%` for right-side components (`Propulsion`, `Collision Resistance`).
    - Recalibrated `cardWidthUnits = 190 * 1200 / Math.min(viewportWidth, 1800)` and updated connector anchor points (`12 + cardWidthUnits` on left, `1188 - cardWidthUnits` on right).
    - The `Payload` card now sits cleanly in open white space with over 100 to 140 SVG units (~130px) of unobstructed clearance from the drone's carbon bumper duct and propeller across all screen resolutions.
  - *All previous card sizing, typography, and coordinate states strictly preserved as comments in `FenixFUI2.tsx`.*

---

### 🌐 PAGE: Home Page (`/`)

#### 📍 Section 5 & 6: Velocity Complex & News & Media Titles Boldness Removal ([VelocityComplex.tsx](file:///e:/Tsalla%20Website/frontend/components/VelocityComplex.tsx), [Testimonials.tsx](file:///e:/Tsalla%20Website/frontend/components/Testimonials.tsx), [globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - In `VelocityComplex.tsx`, the section title **"Velocity Complex"** used `font-bold` in its `className` along with `.home-page .home-section-title` in `globals.css` which set `font-weight: 700;`.
  - In `Testimonials.tsx`, the section title **"News & media"** used `font-bold` in its `className` along with `.home-page .home-section-title` which set `font-weight: 700;`.
  - Both section titles rendered with heavy, bold Orbit typography across all screen breakpoints.
- ⏭️ **AFTER UI STATE**:
  - In `VelocityComplex.tsx`, replaced `font-bold` with `!font-normal font-normal` (400 font weight) on the `<CharacterReveal text="Velocity Complex" ... />` title component.
  - In `Testimonials.tsx`, replaced `font-bold` with `!font-normal font-normal` (400 font weight) on the `<CharacterReveal text="News & media" ... />` title component.
  - In `globals.css`, updated `.home-page .home-section-title` to `font-weight: 400;` and added explicit support for `.home-page .home-section-title.font-normal, .home-page .home-section-title.\!font-normal { font-weight: 400 !important; }` while maintaining `.home-page .home-section-title.font-bold { font-weight: 700; }`.
  - Both **"Velocity Complex"** and **"News & media"** titles now render in clean, refined regular/normal font weight without heavy boldness.
  - *Previous JSX code blocks strictly preserved as comments in `VelocityComplex.tsx` and `Testimonials.tsx`, and previous CSS rule preserved as a comment in `globals.css`.*

---

### 🌐 PAGE: MANTIS Product Page (`/mantis` / `/uncrewedsystems/mantis`)

#### 📍 Section 2: Three-Phase Flight Overview Column Text Centering ([MantisThreePhase.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/mantis/components/MantisThreePhase.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the 3-column title grid (`grid-cols-3`), the first word **"Built"** was styled with `text-left`, causing it to hug the far left screen edge of column 1 (naval flight deck).
  - The second word **"Beyond"** and third word **"Boundaries."** lacked explicit centering flex wrappers alongside JSX whitespace nodes, creating asymmetrical horizontal placement across the 3 environmental panels.
- ⏭️ **AFTER UI STATE**:
  - Wrapped each of the 3 column words in `flex items-center justify-center text-center`.
  - Column 1 displays **"Built"** 100% centered in the maritime flight deck panel.
  - Column 2 displays **"Beyond"** (cyan CharacterReveal) 100% centered in the terrestrial desert panel.
  - Column 3 displays **"Boundaries."** 100% centered in the arctic snow panel.
  - *Previous JSX layout preserved as comments in `MantisThreePhase.tsx`.*

---

#### 📍 Section 4: Rear-View Drone Section Unified Title Position ([page.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/mantis/page.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The section heading **"A new perspective on flight."** was positioned using custom classes `absolute inset-x-0 top-[clamp(6.5rem,15vh,11rem)] z-0 px-[clamp(1.25rem,5vw,7rem)]`.
  - Pushed down to 15vh (~162px), the title sat lower than standard product headings, causing the text to directly collide with and overlap the drone's top propeller blades and left wing at `z-0` beneath the drone image.
- ⏭️ **AFTER UI STATE**:
  - Replaced the custom positioning with the unified standard `product-title-position z-20 tracking-[-0.03em]`.
  - The title is now anchored at `top: var(--fenix-title-top)` (`max(90px, 10dvh)`) and `left: var(--fenix-title-inset)` (`5vw`), matching the exact position, margin insets, and baseline of the preceding product sections (`MantisThreePhase`, `MantisDetails`).
  - Lifts the heading cleanly above the drone airframe into unobstructed black space at elevated `z-20`.
  - *Previous custom position classes strictly preserved as comments in `frontend/app/uncrewedsystems/mantis/page.tsx`.*

---

#### 📍 Section 5: Technical Specifications Values Update ([MantisSpecifications.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/mantis/components/MantisSpecifications.tsx), [Navbar.tsx](file:///e:/Tsalla%20Website/frontend/components/Navbar.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the "One platform. More possibilities." specifications section (`MantisSpecifications.tsx`), the four key technical telemetry metrics displayed:
    - **Range up to**: `35 km`
    - **Endurance**: `60 min`
    - **Cruise speed**: `18 m/s`
    - **Payload up to**: `2 kg`
- ⏭️ **AFTER UI STATE**:
  - Updated the telemetry metrics to the confirmed platform operational parameters:
    - **Cruise speed**: updated from `18` to **`30`** (`30 m/s`)
    - **Range up to**: updated from `35` to **`20`** (`20 km`)
    - **Payload up to**: confirmed at **`2`** (`2 kg`)
    - **Endurance**: confirmed at **`60`** (`60 min`)
  - Updated `Navbar.tsx` to align the MANTIS Hangar preview stats with these verified values (`stats: { speed: "30 m/s", range: "20 km", endurance: "60 min", payload: "2 kg" }`).
  - *All previous specification objects strictly preserved as comments in `MantisSpecifications.tsx` and `Navbar.tsx`.*

---

#### 📍 Section 6: Drone Rear Perspective Section Headline Update ([page.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/mantis/page.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the rear-view drone perspective section on the MANTIS page (`page.tsx`), the headline displayed **"A new perspective on flight."** with the word `"flight."` rendered in cyan via `CharacterReveal`.
- ⏭️ **AFTER UI STATE**:
  - Changed the headline to **"A new perspective on Strike."** with **"Strike."** capitalized with an uppercase 'S' and animated via cyan digital character reveal: `<CharacterReveal text="Strike." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />`.
  - *Previous `"flight."` and lowercase `"strike."` implementations strictly preserved as comments in `frontend/app/uncrewedsystems/mantis/page.tsx`.*

---

### 🌐 PAGE: FENIX Product Page (`/fenix` / `/uncrewedsystems/fenix`)

#### 📍 Section 6: First Responder 4-Phase Grid Header Column Centering ([FenixResponder1.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixResponder1.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the 4-phase environment section (`FenixResponder1.tsx`), the 4-column title grid (`grid-cols-4`) had Column 1 (`FENIx`) styled with `<span className="flex items-center justify-start">`.
  - This caused **"FENIx"** to hug the far-left edge of Column 1 (thermal camera feed panel), while Columns 2, 3, and 4 (**"As The"**, **"First"**, **"Responder"**) were centered (`justify-center`).
  - The resulting header layout looked asymmetrical, with the first word unaligned with the remaining three column titles.
- ⏭️ **AFTER UI STATE**:
  - Updated Column 1 to `<span className="flex items-center justify-center text-center">` and added explicit `text-center` across all 4 column span wrappers.
  - Column 1 displays **"FENIx"** (with cyan glitch 'x') 100% centered within the thermal camera feed panel.
  - Column 2 displays **"As The"** 100% centered within the structure fire panel.
  - Column 3 displays **"First"** 100% centered within the disaster debris panel.
  - Column 4 displays **"Responder"** (in cyan) 100% centered within the night tactical panel.
  - All four title words are now uniformly and symmetrically centered over their respective operational environment columns, matching the centered layout style of the MANTIS three-phase flight section.
  - *Previous left-aligned JSX layout strictly preserved as comments in `FenixResponder1.tsx`.*

---

### 🌐 PAGE: Navigation & Hangar Menu (`/uncrewedsystems` Dropdown & Mobile Drawer)

#### 📍 Section 1: Yellow Lock UI Removal & Glassy Transparent Background Overhaul ([UncrewedSystemsMenu.tsx](file:///e:/Tsalla%20Website/frontend/components/Navbar/UncrewedSystemsMenu.tsx), [Navbar.tsx](file:///e:/Tsalla%20Website/frontend/components/Navbar.tsx), [next.config.mjs](file:///e:/Tsalla%20Website/frontend/next.config.mjs))
- ⏮️ **BEFORE UI STATE**:
  - **Yellow Lock UI on Systems**: In the Hangar menu's system registry list, four products (**STORM**, **VULCAN**, **SKY-CAT**, **DEXTER**) displayed a small padlock icon (`<Lock />`) next to their names, reduced dimmed styling (`opacity-60 text-white/40 cursor-not-allowed`), and a prominent yellow/amber badge on the right displaying `[ LOCKED ]` (`text-amber-400/80 border-amber-500/30 bg-amber-500/10`). Hovering these locked buttons showed an amber "SYSTEM RESTRICTED" button on the right panel and prevented page navigation.
  - **Opaque Solid Black Background**: Both the desktop mega menu container in `Navbar.tsx` (`bg-black`), the root hangar menu container in `UncrewedSystemsMenu.tsx` (`bg-black`), the mobile drawer (`bg-black/95`), and the right-side details panel (`bg-[#0b4a9a]` or `bg-black`) rendered with dense, solid opaque black/blue backgrounds that blocked out underlying website content.
- ⏭️ **AFTER UI STATE**:
  - **Glassy Transparent Background**:
    - Updated desktop mega menu container in `Navbar.tsx` to `bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-2xl`.
    - Updated mobile drawer in `Navbar.tsx` to `bg-black/60 backdrop-blur-2xl border-t border-white/10`.
    - Updated root `HangarMenu` container to `bg-black/30 backdrop-blur-2xl`.
    - Updated left System Registry sidebar to `bg-black/40 backdrop-blur-xl border-white/10`.
    - Updated right-side display panel to translucent `bg-[#0b4a9a]/40 backdrop-blur-xl` when an item is hovered and `bg-black/20 backdrop-blur-xl` when idle.
    - The entire uncrewed systems mega menu now presents a sleek, high-tech frosted glass aesthetic with clean visibility of blurred background layers underneath.
  - *All previous solid background classes strictly preserved as comments in `UncrewedSystemsMenu.tsx` and `Navbar.tsx`.*

---

#### 📍 Section 2: Lock Icon Retention with "LOCKED" Words Removal ([UncrewedSystemsMenu.tsx](file:///e:/Tsalla%20Website/frontend/components/Navbar/UncrewedSystemsMenu.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In Section 1, both the padlock icon and the yellow `LOCKED` word badge were removed together, making all items appear unlocked.
  - Prior to that, locked systems (**STORM**, **VULCAN**, **SKY-CAT**, **DEXTER**) displayed the word **`LOCKED`** inside a yellow/amber bordered badge box (`text-amber-400/80 border-amber-500/30 bg-amber-500/10`) on the right side of the row.
- ⏭️ **AFTER UI STATE**:
  - **Restored the Lock Icon**: Re-enabled the `<Lock className="w-3.5 h-3.5 text-white/40 group-hover:text-amber-400/80 transition-colors" />` padlock icon directly next to the title for all locked products (**STORM**, **VULCAN**, **SKY-CAT**, **DEXTER**).
  - **Removed the "LOCKED" Words/Badge**: The yellow bordered badge containing the text `"LOCKED"` on the right side of the row remains completely removed (`{isLocked ? null : ...}`).
  - **Unlocked Systems Untouched**: **FENIX**, **BAT**, and **MANTIS** remain unlocked and without lock icons, displaying active scanlines, `[ONLINE]` tags, and `ArrowRight` hover indicators.
  - *All previous code implementations strictly preserved as comments in `UncrewedSystemsMenu.tsx`.*

---

#### 📍 Section 3: MANTIS Drone Visual Realism & Right-to-Left Entrance Animation ([UncrewedSystemsMenu.tsx](file:///e:/Tsalla%20Website/frontend/components/Navbar/UncrewedSystemsMenu.tsx), [Navbar.tsx](file:///e:/Tsalla%20Website/frontend/components/Navbar.tsx))
- ⏮️ **BEFORE UI STATE**:
  - **MANTIS Visual Artifacts**: In the Hangar preview panel, MANTIS was rotated `-90` degrees (`rotateZ: -90`), scaled up to `2.0` (`scale: 2`), rendered with an inverted ghost-white brightness filter (`invert(1) brightness(2.5)`), and masked at the bottom (`linear-gradient(to bottom, black 85%, transparent)`).
  - **Missing MANTIS Telemetry HUD**: Unlike FENIX and T-BAT, MANTIS lacked specification telemetry in `Navbar.tsx`, leaving the 4 left-side HUD boxes (Speed, Range, Endurance, Payload) empty/unrendered.
  - **Static Drone Presentation**: When hovering drone items in the hangar menu, the drone illustration did not enter dynamically from the right; the GSAP-targeted tween failed because `window.gsap` was undefined.
- ⏭️ **AFTER UI STATE**:
  - **MANTIS High-Fidelity Asset Integration**: Rendered the official high-resolution `3 phase drone.png` asset (`/product/Mantis/3%20phase%20drone.png`).
  - **Natural Drone Orientation & Realistic Styling**:
    - Removed `-90` rotation (`rotateZ: 0`), rendering MANTIS horizontally in natural flight trim.
    - Set `scale: 1.2` for balanced stage scale without overflowing bounds.
    - Set `filter: "none"` so realistic dark carbon body textures, rotor accents, and materials appear accurately.
    - Disabled bottom masking (`WebkitMaskImage: undefined`) so the full airframe and landing gear remain visible.
  - **Telemetry HUD Display Parity**: Added full telemetry in `Navbar.tsx` (`speed: "65 km/h"`, `range: "35 km"`, `endurance: "60 min"`, `payload: "2 kg"`), rendering all 4 HUD specification boxes on the left to match FENIX.
  - **Cinematic Right-to-Left Entrance Animation**: Added Framer Motion glide animation (`initial={{ x: 260, opacity: 0, filter: "blur(6px)" }}`, `animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}`, `transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}`) on key switch, gliding the drone smoothly into place from right to left with zero stutter.
  - *All previous configuration objects, CSS filters, and transform blocks strictly preserved as comments in `Navbar.tsx` and `UncrewedSystemsMenu.tsx`.*

---

### 🌐 PAGE: BAT Product Page (`/bat` / `/uncrewedsystems/bat`)

#### 📍 Section 1: Hero Section Title Spacing Correction ([BatHero.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatHero.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the Hero section (`BatHero.tsx`), the main product title was formatted as `"T - BAT"` with literal whitespace surrounding the hyphen.
  - Due to Orbit font metrics, the spaces created excessive, wide visual separation (`T   -   BAT`), disconnecting the prefix from the product name.
- ⏭️ **AFTER UI STATE**:
  - Corrected the hero title string to `"T-BAT"` without spaces around the hyphen.
  - The title now renders as a tight, clean, unified mark (`T-BAT`), perfectly matching the official branding and nomenclature used across the navigation menu, product cards, and footer.
  - *Previous spaced title string strictly preserved as a comment in `BatHero.tsx`.*

---

#### 📍 Section 2: Four-Terrain Operational Overview Title Cyan Accent ([BatMultiRole.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatMultiRole.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the 4-panel "Multi Role Single Solution" overview section (`BatMultiRole.tsx`), the second word **"Role"** rendered as standard white static text (`<span className="flex items-center justify-center text-center">Role</span>`).
  - Only the fourth word **"Solution"** had cyan accent styling (`targetColor="#5ce1e6"` via `CharacterReveal`).
- ⏭️ **AFTER UI STATE**:
  - Updated the second column word **"Role"** to render with cyan accent coloring (`text-[#5ce1e6]`) and digital signal reveal animation: `<CharacterReveal text="Role" targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />`.
  - Both **"Role"** (Column 2 over desert dunes) and **"Solution"** (Column 4 over urban buildings) now share matching high-tech cyan `#5ce1e6` styling, creating a balanced and symmetrical dual-accent headline (**Multi** in white, **Role** in cyan, **Single** in white, **Solution** in cyan).
  - *Previous static white text block strictly preserved as a comment in `BatMultiRole.tsx`.*

---

#### 📍 Section 3: Technical Specifications Left & Right Horizontal Row Alignment & Spacing Optimization ([globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - In the "Engineered for the mission" specifications section on the BAT page (`BatSpecs.tsx`), the left specifications column (`Range up to` / `Endurance`) and right specifications column (`Cruise Speed` / `Swappable payload`) had different total heights because the second row on the right (`EO+IR/Mapping/Multispectral`) used smaller text typography (`bat-specs-payload`) than the large number metric on the left (`72+ min`).
  - Because `.bat-specs-grid` used `align-items: center` with independent column heights:
    - The top border line of the right column was pushed down by ~35px compared to the left column.
    - The middle divider line between Row 1 and Row 2 on the right sat noticeably lower than the left middle divider line.
    - The bottom border line of the right column ended noticeably higher than the left, creating an uneven and staggered appearance across the drone.
  - An initial subgrid attempt placed the drone across two spanned rows with tall min-heights, which introduced excessive vertical empty space inside each row.
- ⏭️ **AFTER UI STATE**:
  - Balanced the row padding and min-height on `.bat-specs-row` to provide comfortable, spacious breathing room above and below the metrics while preserving horizontal row synchronization:
    - Maintained single-row alignment in `.bat-specs-grid` so the drone airframe remains centered without stretching row heights.
    - Set `.bat-specs-row` min-height to `calc(clamp(2.5rem, 4vw, 4rem) + 4.25rem)`.
    - Set comfortable vertical breathing padding: `padding-block: clamp(1.125rem, 2dvh, 1.625rem)`.
    - Increased label-to-metric spacing with `mt-2.5 sm:mt-3` in `BatSpecs.tsx`.
  - Row 1 on the left (`Range up to`) and Row 1 on the right (`Cruise Speed`) share the exact same height and horizontal level.
  - Row 2 on the left (`Endurance`) and Row 2 on the right (`Swappable payload`) share the exact same height and horizontal level.
  - Top borders, middle divider lines, and bottom borders align symmetrically across both sides with balanced, elegant spacing.
  - *All previous CSS rules strictly preserved as comments in `globals.css` and `BatSpecs.tsx`.*

---

#### 📍 Section 4: Payloads & Sensors Nomenclature Update ([BatPayLoad2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatPayLoad2.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the "Payloads & Sensors" interactive selector on the BAT page (`BatPayLoad2.tsx`), the 5th payload module (`PAYLOADS[4]`) displayed the title **"Bomb"** and the subtitle **"Bomb payload"**.
- ⏭️ **AFTER UI STATE**:
  - Updated payload 05 title to **"Munition"** and subtitle to **"HE Explosive payload"**.
  - Both the interactive control button (`05 Munition / HE Explosive payload`) and the canvas stage caption reflect this defense-standard tactical nomenclature.
  - *Previous `"Bomb"` and `"Bomb payload"` definition strictly preserved as comments in `BatPayLoad2.tsx`.*

---

#### 📍 Section 5: Battery Swapping Section Title & Subtitle Update ([BatBatterySwap.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatBatterySwap.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the 3D battery swap section on the BAT page (`BatBatterySwap.tsx`), the header displayed the title **"Battery Swapping"** (with `"Swapping"` in cyan) and the subtitle *"Fresh power. Ready for the next mission."*.
- ⏭️ **AFTER UI STATE**:
  - Updated the section title to **"Land. Swap. Redeploy"** with `"Redeploy"` highlighted and animated via cyan digital reveal: `<CharacterReveal text="Redeploy" targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />`.
  - Updated the subtitle copy to **"Fresh power. Rapid mission turn around."**.
  - *Previous title and subtitle markup strictly preserved as comments in `BatBatterySwap.tsx`.*

---

#### 📍 Section 6: 3D Flight Sequence Background Title Update ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the interactive 3D flight trajectory stage on the BAT page (`Bat3DSequence.tsx`), the background cinematic watermark title displayed:
    - Line 1: **"Roadborne."**
    - Line 2: **"Airbound."**
  - Styled with fixed `text-[9vw]`.
- ⏭️ **AFTER UI STATE**:
  - Replaced the background watermark title with:
    - Line 1: **"Transition Forward."**
    - Line 2: **"Reached Beyond."**
  - Proportional fluid sizing set to `text-[clamp(2.5rem,6.5vw,7.5rem)]` with `leading-[0.88]` to preserve clean centering and prevent edge clipping across viewports.
  - *Previous title block strictly preserved as comments in `Bat3DSequence.tsx`.*

---

#### 📍 Section 7: 3D Flight Sequence Phase 01 Callout Nomenclature ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the interactive 3D flight trajectory stage on the BAT page (`Bat3DSequence.tsx`), the Phase 01 telemetry callout card displayed:
    - Title: **"LRV TRANSITIONS TO VERTICAL POSITION"**
    - Subtitle: **"Preparing for initial separation sequence"**
- ⏭️ **AFTER UI STATE**:
  - Updated Phase 01 title and subtitle with grammatically corrected aerospace terminology:
    - Title: **"VERTICAL TAKEOFF AND LANDING"** (using the compound noun "Takeoff" standard in VTOL)
    - Subtitle: **"Preparation for launch sequence"**
  - Rendered in uppercase technical font matching all other flight stage indicators.
  - *Previous Phase 01 callout definitions strictly preserved as comments in `Bat3DSequence.tsx`.*

---

#### 📍 Section 8: 3D Flight Sequence Phase 02 Callout Title Update ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the interactive 3D flight trajectory stage on the BAT page (`Bat3DSequence.tsx`), Phase 02 telemetry callout card displayed the title **"LRV LAUNCHES BAT STRAIGHT UP"**.
- ⏭️ **AFTER UI STATE**:
  - Updated Phase 02 title to **"PRESET ALTITUDE"**, keeping subtitle *"Vertical ascent phase initiated"*.
  - Rendered in uppercase technical font (`PRESET ALTITUDE`) matching all other flight sequence stages.
  - *Previous Phase 02 title strictly preserved as comments in `Bat3DSequence.tsx`.*

---

#### 📍 Section 9: 3D Flight Sequence Phase 03 Callout Title Update ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the interactive 3D flight trajectory stage on the BAT page (`Bat3DSequence.tsx`), Phase 03 telemetry callout card displayed the title **"BAT TRANSITIONS TO HORIZONTAL POSITION"**.
- ⏭️ **AFTER UI STATE**:
  - Updated Phase 03 title to **"TRANSITION TO HORIZONTAL POSITION"**, keeping subtitle *"Level flight configuration engaged"*.
  - Rendered in uppercase technical font matching all other flight sequence stages.
  - *Previous Phase 03 title strictly preserved as comments in `Bat3DSequence.tsx`.*

---

#### 📍 Section 10: 3D Flight Sequence Phase 04 Callout Title Update ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the interactive 3D flight trajectory stage on the BAT page (`Bat3DSequence.tsx`), Phase 04 telemetry callout card displayed the title **"CRUISE SPEED OPTIMIZATION"**.
- ⏭️ **AFTER UI STATE**:
  - Updated Phase 04 title to **"CURVE/LOITER MODE"**, keeping subtitle *"Adjusting for maximum aerodynamic efficiency"*.
  - Rendered in uppercase technical font matching all other flight sequence stages.
  - *Previous Phase 04 title strictly preserved as comments in `Bat3DSequence.tsx`.*

---

#### 📍 Section 11: 3D Flight Sequence Phase 05 Callout Subtitle Update ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the interactive 3D flight trajectory stage on the BAT page (`Bat3DSequence.tsx`), Phase 05 telemetry callout card displayed the subtitle *"Re-entry and landing preparation"*.
- ⏭️ **AFTER UI STATE**:
  - Updated Phase 05 subtitle to *"Reverse transition and landing preparation"*, retaining title **"DECELERATES AND TRANSITIONS TO VERTICAL FLIGHT"**.
  - *Previous Phase 05 subtitle strictly preserved as comments in `Bat3DSequence.tsx`.*

---

#### 📍 Section 12: 3D Flight Sequence Phase 06 Callout Subtitle Update ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the interactive 3D flight trajectory stage on the BAT page (`Bat3DSequence.tsx`), Phase 06 telemetry callout card displayed the subtitle *"Toward flight deck target landing zone"*.
- ⏭️ **AFTER UI STATE**:
  - Updated Phase 06 subtitle to *"Towards target landing zone"*, retaining title **"MAINTAINS CONTROLLED DESCENT"**.
  - *Previous Phase 06 subtitle strictly preserved as comments in `Bat3DSequence.tsx`.*

---

#### 📍 Section 13: 3D Flight Sequence Background Title Typography Adjustment ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the interactive 3D flight trajectory sequence on the BAT page (`Bat3DSequence.tsx`), the background cinematic watermark title ("Transition Forward. Reached Beyond.") used `text-[clamp(2.5rem,6.5vw,7.5rem)]`.
  - At 6.5vw, the horizontal breadth of the 19-character phrase extended outward towards the left margin, causing the leftmost characters ("T" and "r") to visually collide and overlap with the BAT drone model airframe during ascent phases.
- ⏭️ **AFTER UI STATE**:
  - Refined the background title typography to `text-[clamp(2rem,5.2vw,5.8rem)]`.
  - The narrower footprint pulls the text inward by ~7.4vw on each side, maintaining an impressive cinematic presence while ensuring clean, spacious clearance from the drone model across laptop, desktop, and ultra-wide viewports.
  - *Previous clamp sizing strictly preserved as comments in `Bat3DSequence.tsx`.*

---

### 🌐 PAGE: FENIX Product Page (`/fenix` / `/uncrewedsystems/fenix`)

#### 📍 Section 7: Interactive Parts Breakdown Initial Active State Reset ([FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the interactive drone anatomy / parts breakdown section (`FenixFUI2.tsx`), the active feature state was initialized with `useState<string | null>("payload")`.
  - This hardcoded default caused the 4th hotspot (`[04] Payload`) card and its cyan connector line to always appear expanded in an active ("on") state immediately upon scrolling to the section.
- ⏭️ **AFTER UI STATE**:
  - Reset the initial state back to `useState<string | null>(null)`.
  - When scrolling or navigating to the section, all 4 hotspot callouts start in their clean resting radar ring state with zero pop-up cards active. Cards now open dynamically only when the user hovers over (or taps on mobile) their respective interactive targeting points on the drone airframe.
  - *Previous hardcoded `"payload"` state strictly preserved as a comment in `FenixFUI2.tsx`.*

---

#### 📍 Section 8: Sensor Awareness Centered Stage Layout & Bounds Fix ([FenixAwareness.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixAwareness.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the "Every detail. Greater awareness." section on the FENIX page (`FenixAwareness.tsx`), the layout used an uncentered two-column grid (`grid-template-columns: minmax(0, .8fr) minmax(0, 1.6fr)`).
  - The detail cards panel (`.awareness-panel`) was offset horizontally by `transform: translateX(calc(min(18vw, 340px) + 104px))`, shifting it ~288px into the center-right while leaving a massive empty white void on the left under the heading.
  - The drone media container applied `transform: translateX(-3%) scale(1.4)`, which magnified the video/poster well past the 100dvh viewport boundaries, causing the lower airframe, bottom motors, and landing guards to be clipped/cut off at the bottom.
- ⏭️ **AFTER UI STATE**:
  - Introduced a unified, centered 16:9 stage container (`.awareness-stage-box`) inside a flex-centered viewport stage (`.awareness-layout`).
  - Positioned the detail cards panel (`.awareness-panel`) dynamically docked to the exact 26.8% X-coordinate (`right: calc(100% - 26.8%)`) where the video's cyan dotted line originates, with vertical centering (`top: 50%; transform: translateY(-50%)`).
  - Adjusted the video/poster element to fill the 16:9 stage box naturally (`object-fit: contain; filter: brightness(1.05); mix-blend-mode: multiply`) without 1.4x scale magnification, ensuring the entire drone airframe is completely visible without any cutoff.
  - The entire cards + dotted line + drone visual composition is now symmetrically centered both horizontally and vertically across laptops, desktop monitors, and ultra-wide displays. Mobile stacked layout is strictly preserved.
  - *All previous layout classes and transform offsets strictly preserved as comments in `FenixAwareness.tsx`.*

---

#### 📍 Section 9: First Responder Foreground Drone Vertical Position Adjustment ([FenixResponder1.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixResponder1.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the "FENIx As The First Responder" 4-column operational environment section (`FenixResponder1.tsx`), the foreground drone container was positioned at `bottom-[-29vh] sm:bottom-[-33vh] lg:bottom-[-39vh]`.
  - At this height, the top heat sink and upper frame of the drone rose high into the gap between the column 2 heading ("As The") and column 3 heading ("First"), creating tight visual crowding near the section title.
- ⏭️ **AFTER UI STATE**:
  - Shifted the foreground drone downward (2 steps / ~9vh) to `bottom-[-37vh] sm:bottom-[-42vh] lg:bottom-[-48vh]`.
  - The top of the drone airframe now sits with generous, comfortable breathing room well below the 4-column title text, while the cyan propellers remain prominently displayed across the lower-center of the operational background panels.
  - *Previous positioning classes strictly preserved as comments in `FenixResponder1.tsx`.*

---

#### 📍 Section 10: Sensor Awareness Video Scale & Right Offset Enhancement ([FenixAwareness.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixAwareness.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the "Every detail. Greater awareness." section on the FENIX page (`FenixAwareness.tsx`), the 16:9 stage box was constrained to `max-width: min(1280px, 88vw)` and `max-height: min(65dvh, 580px)`.
  - The video element was rendered without translation or scaling (`transform: none`), leaving ~300px of excessive white margin on the right of the drone on wide screens.
- ⏭️ **AFTER UI STATE**:
  - Expanded stage box maximum dimensions to `max-width: min(1380px, 92vw)` and `max-height: min(72dvh, 640px)`.
  - Applied `transform: translateX(5%) scale(1.15)` to `.awareness-media`, enlarging the drone footage by 15% for greater visual impact and shifting it 5% to the right into the empty right margin.
  - Dynamically adjusted the cards docking position to `right: calc(100% - 28.4%)` so the cards remain pixel-perfectly connected to the cyan dotted line.
  - *Previous stage box and panel positioning rules strictly preserved as comments in `FenixAwareness.tsx`.*

---

#### 📍 Section 11: Sensor Awareness Video Further Scale Sizing ([FenixAwareness.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixAwareness.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the "Every detail. Greater awareness." section on the FENIX page (`FenixAwareness.tsx`), the video media used `transform: translateX(5%) scale(1.15)`, stage box was `max-width: min(1380px, 92vw)` and `max-height: min(72dvh, 640px)`.
- ⏭️ **AFTER UI STATE**:
  - Further increased the video scale to `transform: translateX(5%) scale(1.22)` (+7% larger) and expanded stage box dimensions to `max-width: min(1440px, 94vw)` and `max-height: min(75dvh, 680px)`.
  - Refined the cards docking position to `right: calc(100% - 26.7%)` to maintain a seamless, unbroken connection to the video's cyan dotted line.
  - *Previous scale and stage box dimensions strictly preserved as comments in `FenixAwareness.tsx`.*

---

#### 📍 Section 12: Sensor Awareness Card Panel Inset Horizontal Offset ([FenixAwareness.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixAwareness.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the "Every detail. Greater awareness." section on the FENIX page (`FenixAwareness.tsx`), the left detail cards panel (`.awareness-panel`) was positioned at `right: calc(100% - 26.7%)`.
  - On wider screens, this placed the card panel far out on the left edge with a wide gap to the drone.
- ⏭️ **AFTER UI STATE**:
  - Shifted the card panel inward to the right to `right: calc(100% - 30%)` (~40px further right).
  - The cards now have a more balanced left margin and sit more comfortably integrated with the central drone visual assembly.
  - *Previous docking position strictly preserved as comments in `FenixAwareness.tsx`.*

---

#### 📍 Section 13: Floor Map Generation Description Copy Update ([FenixFloorMap.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFloorMap.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the "Floor Map Generation" section on the FENIX page (`FenixFloorMap.tsx`), the description paragraph began with `"Real-time mapping for mission planning and situational awareness — creates detailed floor layouts to support navigation, coordination, and post-op analysis."`.
- ⏭️ **AFTER UI STATE**:
  - Updated the copy to remove the `"Real-time"` prefix, reading: `"Mapping for mission planning and situational awareness — creates detailed floor layouts to support navigation, coordination, and post-op analysis."`.
  - Typography and layout classes (`fenix-body max-w-2xl`) remain unchanged.
  - *Previous paragraph markup strictly preserved as comments in `FenixFloorMap.tsx`.*

---

#### 📍 Section 14: Technical Specifications Dimensions & Payload Update ([FenixSpecifications.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixSpecifications.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the technical specifications section on the FENIX page (`FenixSpecifications.tsx`):
    - Dimensions showed Length: `308 mm`, Width: `340 mm`, Height: `100 mm`.
    - 4th performance metric displayed Label: `"Cruise speed"` with Value: `"5"` and Unit: `"m/s"`.
- ⏭️ **AFTER UI STATE**:
  - Updated airframe dimensions to Length: **`313 mm`**, Width: **`346 mm`**, Height: **`108 mm`**.
  - Replaced the 4th metric with **`Payload`**: Value **`EO+IR`** (Electro-Optical + Infrared), unitless.
  - Added conditional unit rendering in `.fenix-specs-performance` so unitless metrics like `Payload` do not produce an empty margin span.
  - *Previous dimension and performance spec arrays strictly preserved as comments in `FenixSpecifications.tsx`.*

---

### 🌐 PAGE: Home Page (`/`)

#### 📍 Section: MANTIS Product Card Acronym Nomenclature Update ([ProductSection.tsx](file:///e:/Tsalla%20Website/frontend/components/ProductSection.tsx), [Navbar.tsx](file:///e:/Tsalla%20Website/frontend/components/Navbar.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the "Powered by MAVERICK" product showcase grid on the Home Page (`ProductSection.tsx`), the **MANTIS** product card displayed the subtitle `"Multi-Role Single Solution"`.
  - In the navigation bar uncrewed systems mega menu (`Navbar.tsx`), the MANTIS item similarly listed `"Multi-Role Single Solution"`.
- ⏭️ **AFTER UI STATE**:
  - Updated the subtitle/description for **MANTIS** to `"Mission Adaptive networked Targeting and interception system"` in `ProductSection.tsx`.
  - Updated `Navbar.tsx` to align the MANTIS hangar description and subheadline (`"Mission Adaptive networked <br /> Targeting and interception system"`).
  - All occurrences across the homepage product grid and the uncrewed systems navigation menu now consistently present the new official nomenclature.
  - *All previous `"Multi-Role Single Solution"` strings strictly preserved as comments in `ProductSection.tsx` and `Navbar.tsx`.*

---

#### 📍 Section: News & Media Subtitle Fade-In Animation & Delay ([Testimonials.tsx](file:///e:/Tsalla%20Website/frontend/components/Testimonials.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the "NEWS & MEDIA" section on the Home Page (`Testimonials.tsx`), the introductory subtitle (*"Our integrated suite of software, hardware, and services empowers businesses to operate smarter and grow faster."*) used a `duration: 0` transition after a 0.8s delay (`transition={{ delay: 0.8, duration: 0 }}`).
  - As a result, the text popped into full opacity abruptly with no easing, translation, or fade effect.
- ⏭️ **AFTER UI STATE**:
  - Added a **0.5s delay** (`delay: 0.5`) so the subtitle starts its reveal immediately as the "NEWS & MEDIA" title finishes typing out.
  - Added a cool, premium cinematic entrance animation:
    - `initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}`
    - `whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}`
    - `transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}`
  - The text now glides gently upward from 12px with a smooth soft-focus de-blur, producing a refined, modern editorial feel.
  - *Previous instant pop-in implementation strictly preserved as a comment in `Testimonials.tsx`.*

---

#### 📍 Section: MANTIS Acronym Title Case Capitalization ([ProductSection.tsx](file:///e:/Tsalla%20Website/frontend/components/ProductSection.tsx), [Navbar.tsx](file:///e:/Tsalla%20Website/frontend/components/Navbar.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The MANTIS subtitle description appeared with mixed casing: `"Mission Adaptive networked Targeting and interception system"`, where "networked", "and", "interception", and "system" started with lowercase letters.
- ⏭️ **AFTER UI STATE**:
  - Capitalized the first letter of every single word: `"Mission Adaptive Networked Targeting And Interception System"`.
  - Updated both the homepage product card in `ProductSection.tsx` and the uncrewed systems hangar menu in `Navbar.tsx` (`"Mission Adaptive Networked <br /> Targeting And Interception System"`).
  - *All previous mixed-case strings strictly preserved as comments in `ProductSection.tsx` and `Navbar.tsx`.*

---

### 🌐 PAGE: Global Navigation Bar & Uncrewed Systems Hangar ([Navbar.tsx](file:///e:/Tsalla%20Website/frontend/components/Navbar.tsx))

#### 📍 Section: Hangar Menu Telemetry HUD Specifications Alignment (FENIX, T-BAT, MANTIS)
- ⏮️ **BEFORE UI STATE**:
  - In the Uncrewed Systems Hangar mega menu preview (`Navbar.tsx` & `UncrewedSystemsMenu.tsx`), the telemetry HUD specification boxes for FENIX and T-BAT displayed placeholder and mismatched numbers:
    - **FENIX**: `SPEED: 140 km/h`, `RANGE: 60 km`, `ENDURANCE: 90 min`, `PAYLOAD: 2.5 kg`
    - **T-BAT**: `SPEED: 110 km/h`, `RANGE: 150 km`, `ENDURANCE: 8 hrs`, `PAYLOAD: 12 kg`
- ⏭️ **AFTER UI STATE**:
  - Verified and aligned all telemetry stats directly against each system's dedicated product specifications page:
    - **FENIX** ([FenixSpecifications.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixSpecifications.tsx)):
      - `SPEED`: **`5 m/s`** (Cruise speed)
      - `RANGE`: **`5 km`** (5 km LOS)
      - `ENDURANCE`: **`20 min`**
      - `PAYLOAD`: **`EO+IR`** (Sensor payload designation matching product page)
    - **T-BAT** ([BatSpecs.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatSpecs.tsx)):
      - `SPEED`: **`18 m/s`** (Cruise speed)
      - `RANGE`: **`20+ km`**
      - `ENDURANCE`: **`72+ min`**
      - `PAYLOAD`: **`EO+IR`** (Swappable payload package)
    - **MANTIS** ([MantisSpecifications.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/mantis/components/MantisSpecifications.tsx)):
      - `SPEED`: **`30 m/s`**
      - `RANGE`: **`20 km`**
      - `ENDURANCE`: **`60 min`**
      - `PAYLOAD`: **`2 kg`** (already verified and matching)
  - *All previous telemetry stat objects strictly preserved as comments in `Navbar.tsx`.*

---

### 🌐 PAGE: BAT Product Page (`/bat`, `/uncrewedsystems/bat`)

#### 📍 Section 2: Four-Terrain Operational Overview Drone Image Scale Increase ([BatMultiRole.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatMultiRole.tsx), [globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - In the "Multi Role Single Solution" 4-terrain section (`BatMultiRole.tsx`), the centered rear-view T-BAT drone render (`.bat-multi-role-drone`) had a desktop width of `116vw` anchored at `top: 32dvh`.
  - In portrait mode, the drone width was `134vw` with `bottom: 6%`.
  - The drone appeared relatively compact in the lower portion of the screen, leaving a large empty gap below the title words ("Role" and "Single") while the propellers sat slightly inset toward the center.
- ⏭️ **AFTER UI STATE**:
  - Increased the drone image scale on desktop from `116vw` to **`138vw`** (~19% increase in overall size).
  - Adjusted the vertical anchor position on desktop from `top: 32dvh` to **`top: 26dvh`**, allowing the canopy and wings to rise and expand prominently while preserving safe clearance below the headline.
  - Symmetrically aligned the outer twin vertical propellers with the visual centers of Column 1 (Forest) and Column 4 (City).
  - Increased portrait mode drone width from `134vw` to **`154vw`** with `bottom: 4%`.
  - *Previous sizing and positioning rules strictly preserved as comments in `globals.css` and `BatMultiRole.tsx`.*

---

### 🌐 PAGE: MANTIS Product Page (`/mantis`, `/uncrewedsystems/mantis`)

#### 📍 Section 6: Closing Contact Section Background Image & 180° Rotation ([MantisLast.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/mantis/components/MantisLast.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The closing contact section on the MANTIS page (`MantisLast.tsx`, with heading *"Ready to deploy where others cannot."* and *"Request a demo"* button) used a placeholder T-BAT cloud background image: `/product/T-BAT/DJI_20251007120547_0075_D%20-%20frame%20at%200m35s.jpg`.
  - The background image was displayed without any rotation.
- ⏭️ **AFTER UI STATE**:
  - Replaced the background image with the official MANTIS camera flight frame: `/product/Mantis/2026_1018_174838_022%20-%20frame%20at%200m40s.jpg`.
  - Applied a 180-degree rotation (`className="... rotate-180" style={{ transform: "rotate(180deg)" }}`), creating a dramatic perspective where the airframe body anchors the bottom edge and looks toward the illuminated sunset horizon.
  - *Previous placeholder image markup strictly preserved as comments directly in `MantisLast.tsx`.*

---

#### 📍 Section 5: Technical Details Section Headline Copy Update ([MantisDetails.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/mantis/components/MantisDetails.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The section heading in `MantisDetails.tsx` displayed: `VTOL Launch. Precision strike. Recoverable design.`, where the cyan reveal text read `"Recoverable design."`.
- ⏭️ **AFTER UI STATE**:
  - Added the word `"by"` between `"Recoverable"` and `"design"`.
  - The headline now displays: `VTOL Launch. Precision strike. Recoverable by design.` with `<CharacterReveal text="Recoverable by design." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />`.
  - *Previous headline markup strictly preserved as comments in `MantisDetails.tsx`.*

---

#### 📍 Section 6: Closing Contact Section Background Image Rotation Reset to 0° ([MantisLast.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/mantis/components/MantisLast.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The newly added background image `/product/Mantis/2026_1018_174838_022%20-%20frame%20at%200m40s.jpg` had a 180-degree CSS transform applied (`rotate-180` and `style={{ transform: "rotate(180deg)" }}`).
- ⏭️ **AFTER UI STATE**:
  - Reset the rotation to **0 degrees** (standard unrotated orientation) as requested, removing `rotate-180` and inline transform.
  - *Previous 180deg rotated markup strictly preserved as comments in `MantisLast.tsx`.*

---

### 🌐 PAGE: BAT Product Page (`/bat`, `/uncrewedsystems/bat`)

#### 📍 Section: 6-Phase Flight Sequence Phase 4 & Phase 6 Titles Update ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In the 6-phase flight sequence infographic on the BAT page (`Bat3DSequence.tsx`):
    - **Phase 4** title read: `"CURVE/LOITER MODE"`.
    - **Phase 6** title read: `"MAINTAINS CONTROLLED DESCENT"`.
- ⏭️ **AFTER UI STATE**:
  - **Phase 4**: Replaced `"CURVE"` with `"CRUISE"` -> **`"CRUISE/LOITER MODE"`**.
  - **Phase 6**: Removed `"MAINTAINS"` from the title -> **`"CONTROLLED DESCENT"`**.
  - Subtitles, callouts, coordinates, and 3D drone positions remain untouched.
  - *Previous phase titles strictly preserved as comments in `Bat3DSequence.tsx`.*

---

### 🌐 PAGE: Global Navigation Bar & Uncrewed Systems Hangar ([UncrewedSystemsMenu.tsx](file:///e:/Tsalla%20Website/frontend/components/Navbar/UncrewedSystemsMenu.tsx))

#### 📍 Section: Hangar Drone Preview Scale and Position Refinements (FENIX, MANTIS, T-BAT)
- ⏮️ **BEFORE UI STATE**:
  - In the Hangar preview stage of `UncrewedSystemsMenu.tsx`:
    - **FENIX**: Scale was `1.3` with vertical offset `y: 0`, causing the top propeller ducts to sit very close to the top edge (shifted upward) with an empty gap at the bottom.
    - **MANTIS**: Scale was `3.4` with horizontal offset `x: 170`, leaving a wide gap from the telemetry panel and clipping the tail on the right.
    - **T-BAT**: Scale was `3.0` with horizontal offset `x: 250`, positioning the airframe slightly far to the right.
- ⏭️ **AFTER UI STATE**:
  - **FENIX**:
    - Increased scale from `1.3` to **`1.5`** (+15.4% size).
    - Shifted downward with **`y: 50`**, centering the drone vertically in the preview viewport with balanced top and bottom breathing room.
  - **MANTIS**:
    - Increased scale from `3.4` to **`3.7`** for greater airframe prominence.
    - Shifted leftward from `x: 170` to **`x: 120`**, bringing the fuselage and wing geometry closer to the telemetry HUD and into optimal visual balance.
  - **T-BAT**:
    - Increased scale from `3.0` to **`3.3`**.
    - Shifted leftward from `x: 250` to **`x: 195`**, giving more prominence to the forward fuselage and wings.
  - *All previous scale and position offsets strictly preserved as comments in `UncrewedSystemsMenu.tsx`.*

---

#### 📍 Section: Hangar Drone Preview Follow-up Fine-Tuning (MANTIS & FENIX) ([UncrewedSystemsMenu.tsx](file:///e:/Tsalla%20Website/frontend/components/Navbar/UncrewedSystemsMenu.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In `UncrewedSystemsMenu.tsx`:
    - **MANTIS**: Scale was `3.7` and vertical offset was `y: 110`. The top winglet sat close to the top edge.
    - **FENIX**: Vertical offset was `y: 50`.
- ⏭️ **AFTER UI STATE**:
  - **MANTIS**:
    - Increased scale further from `3.7` to **`4.1`** (+10.8% size boost).
    - Shifted downward from `y: 110` to **`y: 150`** (+40px down), centering the larger airframe and preventing the top wing from crowding the upper navigation border.
  - **FENIX**:
    - Shifted downward further from `y: 50` to **`y: 80`** (+30px down) for ideal vertical centering in the preview viewport.
  - *All previous values strictly preserved as comments in `UncrewedSystemsMenu.tsx`.*

---

### 🌐 PAGE: Global Footer ([Footer.tsx](file:///e:/Tsalla%20Website/frontend/components/Footer.tsx))

#### 📍 Section: Products Column Link List Update & Non-Clickable STORM Button
- ⏮️ **BEFORE UI STATE**:
  - The `PRODUCTS` column in `Footer.tsx` displayed:
    1. `FENIX`
    2. `T-BAT`
    3. `STORM`
    4. `DEXTER`
    5. `MAVERICK`
  - All footer links were rendered with a generic unnavigable placeholder link (`href="#"` and `onClick={(e) => e.preventDefault()}`).
- ⏭️ **AFTER UI STATE**:
  - **Removed `MAVERICK` and `DEXTER`** from the `PRODUCTS` column.
  - **Added `MANTIS`** immediately after `T-BAT`, linking directly to `/mantis`.
  - The active product links now display in order:
    1. **`FENIX`** (`href="/fenix"`, active clickable link with hover underline)
    2. **`T-BAT`** (`href="/bat"`, active clickable link with hover underline)
    3. **`MANTIS`** (`href="/mantis"`, active clickable link with hover underline)
    4. **`STORM`** (`disabled: true`, non-clickable `<span>` element with `cursor-default select-none text-white/40`, no link, no hover underline)
  - *Previous products list and global unnavigable link markup strictly preserved as comments in `Footer.tsx`.*

---

### 🌐 PAGE: BAT Product Page (/bat)

#### 📍 Section 3: BAT Specifications Section ([BatSpecs.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatSpecs.tsx), [globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - The central column in the BAT specifications section (`BatSpecs.tsx`) featured only the technical drawing of T-BAT framed by cyan corner marks, with 4 performance specs divided into left and right columns (`Range up to`, `Endurance` on left; `Cruise Speed`, `Swappable payload` on right).
  - No physical dimension callouts (`Span`, `Width`, `Height`) were present beneath the central drone figure.
- ⏭️ **AFTER UI STATE**:
  - Exactly matching the visual language and layout of the FENIX specifications section (`FenixSpecifications.tsx`), added a 3-metric dimension display centered directly below the T-BAT drawing:
    1. **`Span`**: `1273 mm`
    2. **`Width`**: `623 mm`
    3. **`Height`**: `495 mm`
  - Dimensions are rendered in a 3-column grid (`.bat-specs-dimensions`) directly under the cyan-framed drone image (`.bat-specs-frame`), grounded with a subtle top hairline border (`border-top: 1px solid #d4d4d4`) and vertical column dividers (`border-left: 1px solid #e5e5e5`).
  - Values and labels are defined in an easily editable `dimensions` array at the top of `BatSpecs.tsx` so values can be adjusted anytime.
  - Added responsive styles in `globals.css` ensuring seamless presentation across desktop and mobile screens.
  - *All previous markup and CSS rules are strictly preserved as comments in `BatSpecs.tsx` and `globals.css`.*

#### 📍 Section 3: Centering Dimension Items Within Container & Balanced Container Width
- ⏮️ **BEFORE UI STATE**:
  - In `media_1792750072265_5d064c68.png`, the dimension callouts (`Span`, `Width`, `Height`) had left-aligned labels and values inside each column (`div`), with asymmetric left-padding applied only via `> div + div { padding-left: 1.5rem; }`.
  - This resulted in `Span 1273 mm`, `Width 623 mm`, and `Height 495 mm` sitting flush to the left of their columns with large empty gaps on the right before each divider bar.
- ⏭️ **AFTER UI STATE**:
  - Centered each dimension column's content horizontally (`display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;` and `justify-content: center; text-align: center;` on `dd`).
  - Applied symmetrical inline padding (`padding-inline: clamp(0.5rem, 1.5vw, 1.25rem)`) to every column, centering the vertical hairline divider bars (`border-left: 1px solid #e5e5e5`) evenly between `Span`, `Width`, and `Height`.
  - Constrained the container width with `max-width: min(100%, 40rem)` and `margin-inline: auto` so the entire dimension block sits in perfect visual center beneath the drone frame.
  - *Previous left-aligned styling strictly preserved as comments in `BatSpecs.tsx` and `globals.css`.*

#### 📍 Section 3: Uniform Typography, Font Size, Weight, and Colors Matching FENIX
- ⏮️ **BEFORE UI STATE**:
  - In `media_1792750232993_41c24faf.png` (FENIX) vs `media_1792750242682_c516df76.png` (BAT):
    - **Labels (`dt`)**: BAT used fixed `text-sm text-neutral-600 tracking-wide`, while FENIX used fluid `clamp(.8rem, .85vw, 1rem)`, color `#656565`, and standard letter tracking.
    - **Performance Values (`dd`)**: BAT used `font-size: clamp(2.5rem, 4vw, 4rem)` with electric cyan `#5ce1e6` and `text-xl` units (`1.25rem`), while FENIX used `font-size: clamp(2.5rem, 3.6vw, 4.25rem)` with `#29b8c2` and `1rem` units.
    - **Payload Item**: BAT had a long string `EO+IR/Mapping/Multispectral` rendering in a tiny font (`clamp(0.875rem, 1.05vw, 1.25rem)`), while FENIX displayed `Payload` with `EO+IR` in the same large fluid typography as other performance metrics.
    - **Dimension Callouts**: BAT dimensions `dd` had `font-weight: 500` and gray `span` unit `#737373`, whereas FENIX used uniform `font-weight: 400` with dark `#171717` inherited units.
    - **Divider Borders**: BAT used darker `#a3a3a3` borders, while FENIX used crisp `#d4d4d4` and `#e5e5e5`.
- ⏭️ **AFTER UI STATE**:
  - Aligned all font sizes, font weights, colors, line heights, and margins in BAT to be 100% uniform with FENIX:
    - **Labels (`dt`)**: Standardized across performance and dimension lists to `font-size: clamp(.8rem, .85vw, 1rem)`, `color: #656565`, `font-weight: 400`, normal letter-spacing.
    - **Performance Values (`dd`)**: Standardized to `font-size: clamp(2.5rem, 3.6vw, 4.25rem)`, `line-height: 1.1`, `color: #29b8c2`, `font-weight: 400`.
    - **Payload Item**: Updated to `Payload` / `EO+IR` matching FENIX, rendering in the same prominent fluid typography `clamp(2.5rem, 3.6vw, 4.25rem)` and `#29b8c2` color.
    - **Units (`dd span`)**: Standardized to `font-size: 1rem` (`.75rem` on mobile) with `margin-left: .6rem` (`.3rem` on mobile), inheriting parent colors.
    - **Dimensions (`dd`)**: Standardized to `font-size: clamp(1.25rem, 1.75vw, 2rem)`, `margin-top: .5rem`, `color: #171717`, `font-weight: 400`, with `mm` inheriting `#171717`.
    - **Borders**: Updated horizontal dividers to `#d4d4d4` and vertical dividers to `#e5e5e5`.
  - *All previous styles and markup blocks are strictly preserved as comments in `BatSpecs.tsx` and `globals.css`.*

#### 📍 Section 3: Updated Physical Dimension Values (Span, Height, Width in Meters)
- ⏮️ **BEFORE UI STATE**:
  - The dimension values displayed in millimeters matching CAD bounds:
    - `Span`: `1273 mm`
    - `Width`: `623 mm`
    - `Height`: `495 mm`
  - The unit was hardcoded to `mm`.
- ⏭️ **AFTER UI STATE**:
  - Updated all physical dimension values to the user-specified meter units:
    1. **`Span`**: `1.25 m`
    2. **`Width`**: `0.62 m`
    3. **`Height`**: `0.68 m`
  - Updated the mapping in `BatSpecs.tsx` to dynamically render the `unit` (`m`) in `<span>{unit || "m"}</span>`.
  - Maintained the uniform Fenix styling (`font-size: clamp(1.25rem, 1.75vw, 2rem)`, `font-weight: 400`, `color: #171717`, centered layout with hairline dividers).
  - *Previous millimeter dimensions and hardcoded unit block are strictly preserved as comments in `BatSpecs.tsx`.*

#### 📍 Section 3: Increased Drone Image Size & Removed 4 Corner Brackets
- ⏮️ **BEFORE UI STATE**:
  - In `media_1792751186117_7ecd9563.png`, four cyan corner marks (`<Corner ... />`) framed the central T-BAT drone figure at `left-0 top-0`, `right-0 top-0`, `bottom-0 left-0`, `bottom-0 right-0`.
  - The drone image was padded by `.bat-specs-frame { padding: clamp(1rem, 2.5vw, 2.5rem); }` and restricted to `max-height: clamp(220px, 46dvh, 52dvh)`, leaving the airframe looking smaller and enclosed within the corner box.
- ⏭️ **AFTER UI STATE**:
  - **Removed the 4 corner edge UI**: Commented out all 4 cyan corner marks from the JSX in `BatSpecs.tsx`.
  - **Increased Drone Image Size**:
    - Removed the confining padding on `.bat-specs-frame` (`padding: 0`).
    - Increased `max-height` to `clamp(280px, 56dvh, 64dvh)`.
    - Applied `transform: scale(1.28)` on desktop (+28% larger) and `scale(1.15)` on mobile screens (`max-width: 767px`).
    - The drone wingspan now spans broadly and heroically across the center column with a clean, open layout matching Fenix.
  - *All previous corner components and unscaled frame styles are strictly preserved as comments in `BatSpecs.tsx` and `globals.css`.*

#### 📍 Section 3: Shifted Left/Right Data Outward, Shifted Bottom Data Down, & Removed Measurement Ticks
- ⏮️ **BEFORE UI STATE**:
  - In `media_1792751406015_8c33aa1a.png`:
    - The left data column (`Range up to`, `Endurance`) sat close to the expanded left wingtip.
    - The right data column (`Cruise Speed`, `Payload`) sat close to the expanded right wingtip, with the wingtip touching the "C" of `Cruise Speed`.
    - The bottom data block (`Span`, `Width`, `Height`) was close to the lower landing gear struts of the drone.
  - In `media_1792751449192_38b629e6.png`:
    - Measurement tick bars (`.bat-specs-ticks`) were rendered along both the far-left and far-right viewport edges.
- ⏭️ **AFTER UI STATE**:
  - **Removed Measurement Ticks**: Commented out `.bat-specs-ticks left-0` and `.bat-specs-ticks right-0` in `BatSpecs.tsx` and hid them via CSS (`display: none !important`), leaving clean left and right screen edges.
  - **Shifted Left Data Column**: Applied `transform: translateX(-clamp(1.25rem, 2.5vw, 3.5rem))` to `.bat-specs-left` on desktop, moving it leftward away from the drone into the cleared edge space.
  - **Shifted Right Data Column**: Applied `transform: translateX(clamp(1.25rem, 2.5vw, 3.5rem))` to `.bat-specs-right` on desktop, moving it rightward away from the drone and completely clearing the right wingtip from `Cruise Speed`.
  - **Shifted Bottom Data Down**: Increased `.bat-specs-dimensions` top margin to `clamp(1.5rem, 3.5dvh, 3rem)`, providing generous vertical breathing room between the bottom landing legs and the dimension hairline border.
  - *All previous unshifted column styles and measurement tick elements are strictly preserved as comments in `BatSpecs.tsx` and `globals.css`.*

---


#### 📍 Section: Bat 3D Flight Sequence Animation Speed ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The 3D flight profile animation ("Transition Forward. Reached Beyond.") played at `SPEED = 1.1`.
  - Pause / dwell time between completed phases (`AUTO_ADVANCE_DELAY`) was `2000 / SPEED` (~1,818 ms).
  - Drone flight transition time (`TRANSITION_MS`) was `2500 / SPEED` (~2,272 ms).
  - Overall full mission profile took nearly ~30 seconds across the 7 phases, feeling slow and protracted between phase transitions.
- ⏭️ **AFTER UI STATE**:
  - Accelerated animation playback speed: increased `SPEED` to `1.45` (+32% faster).
  - Tightened pause between phases: adjusted `AUTO_ADVANCE_DELAY` to `1700 / SPEED` (~1,172 ms).
  - Flight travel & 3D rotation duration (`TRANSITION_MS`) now snaps in at ~1,724 ms (down from ~2,272 ms).
  - Synced framer-motion callouts, dashed trajectory paths, and caption reveals automatically accelerated proportionally.
  - The whole sequence plays ~30% faster (~20s total), feeling significantly more responsive and engaging while keeping the 3D model turns silky smooth and captions easy to read.
  - *All previous speed and delay values are strictly preserved as comments in `Bat3DSequence.tsx`.*

---


### 🌐 PAGE: Global Footer Navigation ([Footer.tsx](file:///e:/Tsalla%20Website/frontend/components/Footer.tsx))

#### 📍 Section: Non-Product Navigation Links Click Navigation Prevention
- ⏮️ **BEFORE UI STATE**:
  - In `media_1792753553108_22f51362.png`:
    - Links in the `COMPANY` column (`About Us`, `Mission Autonomy`, `Our Team`, `Our Culture`, `Careers`) had direct `href` targets (`/about`, `/about#mission`, `/leadership`, etc.) and navigated when clicked.
    - Links in the `MEDIA` column (`Media Coverage`, `Press Releases`, `Blog`) had direct `href` targets (`/newsroom`, `/press-releases`, `/blog`) and navigated when clicked.
    - Links in the `LEGAL` column (`Security`, `Privacy`, `Suppliers`) had direct `href` targets (`/legal/security`, etc.) and navigated when clicked.
    - Clicking any of these links directed the user away from the current page to 404 or empty routes.
- ⏭️ **AFTER UI STATE**:
  - **Retained active product navigation**: Links under `PRODUCTS` (`FENIX` -> `/fenix`, `T-BAT` -> `/bat`, `MANTIS` -> `/mantis`) continue to navigate smoothly to their respective product pages (`STORM` remains disabled).
  - **Prevented redirection for all non-product sections**: All items under `COMPANY`, `MEDIA`, and `LEGAL` now use `href="#"` and invoke `onClick={(e) => e.preventDefault()}`.
  - Clicking any non-product item no longer navigates or redirects anywhere, nor does it jump to the top of the page.
  - Hover states and cyan underline animations remain fully intact for design consistency.
  - *All previous unconditional direct navigation markup is strictly preserved as comments in `Footer.tsx`.*

---


### 🌐 GLOBAL ENVIRONMENT: Antigravity Skills & Multi-Harness Plugin Suite

#### 📍 Section: Global Installation of wshobson/agents (Plugins, Skills, and Agents)
- ⏮️ **BEFORE UI STATE**:
  - The global Antigravity configuration directory (`~/.gemini/config/plugins`) contained no custom external plugins or multi-harness skills from the open-source `wshobson/agents` marketplace.
- ⏭️ **AFTER UI STATE**:
  - **Cloned & Built Repository**: Cloned `https://github.com/wshobson/agents.git` into `C:\Users\TA-SYS-012\agents` and executed artifact generation for Antigravity (`tools/generate.py --harness antigravity --all --prune`), building 849 files across 92 modular plugins.
  - **Global Plugin Linking**: Created directory junctions in `C:\Users\TA-SYS-012\.gemini\config\plugins` pointing to all 92 generated Antigravity plugins (covering frontend, UI design, backend, testing, architecture, cloud, security, and more).
  - **Global Discovery Configuration**:
    - Created `C:\Users\TA-SYS-012\.gemini\config\plugins.json` referencing `C:/Users/TA-SYS-012/.gemini/config/plugins`.
    - Created `C:\Users\TA-SYS-012\.gemini\config\skills.json` declaring all 52 skill suites (185 individual skills) for universal discovery.
  - **Scope**: Applied globally across all workspaces and projects on the machine.

---


### 🌐 PAGE: Home Page (`/`) - Comprehensive Multi-Device Responsiveness & Card Improvements

#### 📍 Section 2: Hero Section Responsiveness ([HeroSection.tsx](file:///e:/Tsalla%20Website/frontend/components/HeroSection.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Top padding was fixed at `pt-44` (176px) on mobile, pushing hero text too far down on short phone screens (e.g. 667px height).
  - Main headline was `text-3xl sm:text-5xl lg:text-[4.375rem]`, which lacked fluid responsiveness on narrow phones (320px-360px) and large ultrawide monitors.
  - Container width was capped at `max-w-4xl`.
- ⏭️ **AFTER UI STATE**:
  - Replaced fixed top padding with fluid `pt-[clamp(5rem,14dvh,9rem)] sm:pt-20`, adapting dynamically to compact and tall phone viewports.
  - Implemented fluid typography `text-[clamp(1.75rem,7vw,2.5rem)] sm:text-5xl lg:text-[4.375rem] 3xl:text-[5.25rem] uw:text-[6.25rem]`, preventing awkward character wraps on 320px screens while giving cinematic scale on 4K/ultrawide displays.
  - Expanded container scaling for larger displays (`max-w-4xl 3xl:max-w-5xl uw:max-w-6xl`).
  - *Previous padding and heading typography are preserved as comments in `HeroSection.tsx`.*

#### 📍 Section 3: Product Cards Height & White Border Visibility ([ProductSection.tsx](file:///e:/Tsalla%20Website/frontend/components/ProductSection.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In `media_1792759216113_c99ee97b.png` and `media_1792759397440_60af2fd0.png`:
    - Mobile card height was `h-[420px] sm:h-[460px]`, clipping the top and bottom of drone airframes tightly.
    - Card border was `border-white/20` (20% opacity), blending into the pitch-black background and appearing completely invisible to users in ambient light.
- ⏭️ **AFTER UI STATE**:
  - **Increased Card Height**: Increased mobile card height by +60px to `h-[480px] sm:h-[520px] lg:h-[500px] 3xl:h-[560px] uw:h-[620px]`, providing generous vertical space to showcase the drone models and clean typography.
  - **Enhanced White Border Visibility**: Updated border styling to `border-white/60 hover:border-white` (with `hover:border-[#5ce1e6]` for active products), rendering a crisp, clear, unmistakable architectural white border around every card.
  - *Previous card height and border classes are preserved as comments in `ProductSection.tsx`.*

#### 📍 Section 4: Velocity Complex Subtitle Centering ([VelocityComplex.tsx](file:///e:/Tsalla%20Website/frontend/components/VelocityComplex.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In `media_1792759246429_fbfaafd4.png`:
    - The bottom tagline "A new standard in defense manufacturing." was aligned to the right edge via `justify-end mr-0` on mobile screens, leaving the layout unbalanced below the centered hero image.
- ⏭️ **AFTER UI STATE**:
  - Updated layout alignment to `flex justify-center sm:justify-end` with `items-center sm:items-start text-center sm:text-left`.
  - The text is now horizontally centered on mobile viewports while retaining its right alignment with the desktop layout.
  - *Previous right-aligned footer row code is preserved as comments in `VelocityComplex.tsx`.*

#### 📍 Section 5: News & Media Card Height & Tablet Layout Fix ([Testimonials.tsx](file:///e:/Tsalla%20Website/frontend/components/Testimonials.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In `media_1792759293174_ab746fa7.png`:
    - Mobile card height was `h-[400px]` (container `h-[420px]`), appearing square/compact on tall mobile displays.
    - On tablets (768px - 1023px), `itemsPerPage` was set to 3 while card CSS width was `md:w-[calc(50%-12px)]` (2 columns), forcing the 3rd item to drop into a clipped row.
- ⏭️ **AFTER UI STATE**:
  - **Increased Card Height**: Increased mobile card height by +80px to `h-[480px] sm:h-[480px]` (container `h-[500px] sm:h-[500px]`), showing significantly more photo detail with balanced spacing.
  - **Tablet Layout Fix**: Updated dynamic resize listener to set `itemsPerPage` to 1 on mobile (< 768px), 2 on tablets (768px - 1023px), and 3 on desktop (>= 1024px), completely resolving the tablet layout break.
  - *Previous card height and itemsPerPage listener are preserved as comments in `Testimonials.tsx`.*

---

### 🌐 PAGE: FENIX Page (`/uncrewedsystems/fenix` & `/fenix`) - Comprehensive Multi-Device Responsiveness

#### 📍 Section 1: Hero Section ([FenixHero.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixHero.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Top padding was fixed at `pt-28` (112px) on mobile, which left insufficient clearance below the fixed navbar on short phone screens (e.g. 568px/667px height like iPhone SE).
  - Headline was fixed at `text-[3.25rem] sm:text-[3.75rem] md:text-[3.75rem] lg:text-[4.5rem]`, lacking fluid downscaling for 320px narrow screens and upper scaling for 2K/4K/ultrawide displays.
  - Paragraph wrapper added redundant horizontal padding (`px-4 sm:px-8`) inside the section container.
  - Content on ultrawide monitors stretched across the entire viewport without max-width bounds, causing the title and paragraph to drift thousands of pixels apart.
- ⏭️ **AFTER UI STATE**:
  - **Fluid Responsive Padding**: Updated content container to `pt-[clamp(5.25rem,14svh,8rem)] pb-[clamp(2.5rem,6svh,4.5rem)] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 3xl:px-28 uw:px-36`, ensuring perfect breathing room across compact and tall phones.
  - **Fluid Headline Typography**: Scaled headline to `text-[clamp(2.75rem,8.5vw,4.5rem)] 3xl:text-[5.5rem] uw:text-[6.5rem]`, preventing clipping on narrow phones while rendering with cinematic impact on 4K/ultrawide monitors.
  - **Ultrawide Max-Width Container**: Added `max-w-[120rem] 3xl:max-w-[140rem] uw:max-w-[170rem] mx-auto` to center and balance content on large displays.
  - *Previous content container, typography, and paragraph code are preserved as comments in `FenixHero.tsx`.*

#### 📍 Section 2: Compact Tactical Intelligence ([FenixCapabilities.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixCapabilities.tsx))
- ⏮️ **BEFORE UI STATE**:
  - In `media_1792760959217_99e08b61.png`:
    - The drone image on mobile was constrained in a `max-w-[15rem]` (240px) box with `scale-[1.3] xs:scale-[1.5] -translate-x-[5%]`, resulting in an effective rendered drone height of only ~98px, appearing small with excessive surrounding whitespace on mobile viewports.
    - `whitespace-nowrap` on `Compact Tactical` forced 16 characters on one line at 2rem (32px) font size, causing horizontal scroll overflow on 320px–360px mobile viewports.
    - Drone image scale on tablet (`md:scale-[2.7] md:-translate-x-[48%]`) enlarged the drone 2.7x on 768px portrait tablets, pushing it into the left margin and causing it to overlap the right-hand text column (`md:translate-x-12`).
    - Vertical padding on mobile was `py-12`, taking up excessive vertical space on short phone screens.
- ⏭️ **AFTER UI STATE**:
  - **Doubled Image Size on Mobile View**: In response to user request, increased the mobile image scale and container size to `scale-[2.4] xs:scale-[2.6] sm:scale-[1.8] -translate-x-[4%] -translate-y-[8%] xs:-translate-y-[10%] sm:translate-y-0` within a `max-w-[20rem] xs:max-w-[24rem] sm:max-w-xs md:max-w-md 3xl:max-w-lg` container. This effectively **doubles the rendered visual size of the drone on mobile** (~200px visible height vs ~98px previously), giving the drone airframe commanding prominence while maintaining a balanced vertical offset above `Compact Tactical Intelligence`.
  - **Responsive Heading Wrapping**: Changed `Compact Tactical` to `block xs:inline whitespace-normal sm:whitespace-nowrap`, eliminating horizontal scroll overflow on narrow screens while preserving clean single-line presentation on tablets and desktop.
  - **Progressive Drone Scaling**: Refined drone scaling across larger breakpoints to `md:scale-[1.9] md:-translate-x-[25%] lg:scale-[2.4] lg:-translate-x-[38%] xl:scale-[2.7] xl:-translate-x-[48%]`.
  - **Tablet Offset Harmony**: Adjusted text column to `md:translate-x-4 lg:translate-x-12 xl:translate-x-20 -translate-y-2 md:-translate-y-8 lg:-translate-y-14 xl:-translate-y-16`, guaranteeing no collision between drone illustration and text.
  - **Adaptive Section Padding**: Updated section to `py-8 xs:py-12 sm:py-16 md:py-20` for balanced height across all screens.
  - *Previous section padding, mobile compact scale, and drone container code are preserved as comments in `FenixCapabilities.tsx`.*

#### 📍 Section 3: GPS Denied Navigation & Lighting ([FenixGPSNavigation.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixGPSNavigation.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Sticky container used `h-screen`, which caused viewport jumping when mobile browser toolbars appeared/disappeared.
  - Top padding was `pt-18` (72px) with text container `pt-4 sm:pt-20` and drone margin `mt-20 sm:mt-16`. On short phone viewports (e.g. 667px height), this pushed the drone down into the bottom "Scroll to navigate" indicator.
  - Drone and text containers lacked explicit max-width scaling for 2K/4K/ultrawide monitors.
- ⏭️ **AFTER UI STATE**:
  - **Stable Mobile Viewport**: Replaced with `h-[100svh] md:h-screen pt-[clamp(4.25rem,10svh,5.5rem)] sm:justify-center sm:pt-0`, maintaining steady layout during scroll on mobile browsers.
  - **Compact Mobile Spacing**: Reduced text container top padding to `pt-2 sm:pt-14 md:pt-16 lg:pt-20` with drone margin `mt-6 xs:mt-10 sm:mt-12 md:mt-0`, ensuring the text, drone, and bottom scroll hint fit comfortably on all mobile heights.
  - **Responsive Image & Indicator**: Set drone image to `w-[86%] sm:w-[80%] 3xl:w-[75%]` and hint position to `bottom-6 xs:bottom-8 sm:bottom-12 3xl:bottom-16`.
  - **Ultrawide Bounds**: Expanded container limits to `3xl:max-w-6xl uw:max-w-7xl` for text and `3xl:max-w-7xl uw:max-w-[90rem]` for the drone stage.
  - *Previous sticky container, text container, wipe padding, and drone wrapper are preserved as comments in `FenixGPSNavigation.tsx`.*

#### 📍 Section 4: Turtle Mode Recovery ([FenixTurtleMode.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Recovery video used `lg:w-[64vw] xl:w-[66vw]` without a max-width or max-height cap. On 4K monitors (3840×2160), the 16:9 video scaled to >2500px wide and >1400px tall, overflowing the 100vh viewport height.
  - On short mobile screens, the top title at `top-14` (56px) and the bottom protocol card at `bottom-12` (48px) collided with the video in the middle.
  - Protocol card paragraphs lacked responsive line clamping on compact phone screens.
- ⏭️ **AFTER UI STATE**:
  - **Bounded Video Scaling**: Constrained video box to `w-[92vw] max-w-[28rem] xs:max-w-[32rem] sm:w-[84vw] sm:max-w-none lg:w-[62vw] xl:w-[64vw] 2xl:max-w-[76rem] 3xl:max-w-[88rem] uw:max-w-[105rem] max-h-[46svh] sm:max-h-[56vh] lg:max-h-[66vh] 3xl:max-h-[72vh]`, keeping the video fully contained within the viewport on both 667px phones and 4K displays.
  - **Fluid Overlay Positioning**: Adjusted title to `top-[clamp(3.75rem,8svh,4.5rem)]` and protocol card to `bottom-[clamp(1.25rem,3.5svh,2.25rem)] left-4 right-4 xs:left-5 xs:right-5 sm:bottom-8 sm:left-auto sm:right-8`. Added `line-clamp-3 xs:line-clamp-4 sm:line-clamp-none` to guarantee zero text collision.
  - **Ultrawide Card Anchoring**: Added `3xl:left-[max(4vw,calc((100vw-120rem)/2))] 3xl:right-[max(4vw,calc((100vw-120rem)/2))]` to keep overlay cards perfectly aligned with the bounded central stage.
  - *Previous video wrapper and overlay card containers are preserved as comments in `FenixTurtleMode.tsx`.*

#### 📍 Section 5: Floor Map Generation ([FenixFloorMap.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFloorMap.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Used `min-h-screen`, which did not adapt to mobile browser URL bar adjustments.
  - Content container lacked ultrawide max-width bounds, causing content to sit at the far left edge on 3440px and 3840px displays.
- ⏭️ **AFTER UI STATE**:
  - **Mobile Height & Ultrawide Container**: Updated section to `min-h-[100svh] md:min-h-screen` and wrapped inner content with `max-w-[120rem] 3xl:max-w-[140rem] uw:max-w-[170rem] mx-auto pointer-events-none`.
  - **Fluid Typography**: Scaled heading margin to `mb-4 sm:mb-6 lg:mb-8 3xl:mb-10` with `gap-x-2 sm:gap-x-3` and paragraph to `text-left sm:text-justify max-w-2xl 3xl:max-w-3xl`.
  - *Previous section and content container are preserved as comments in `FenixFloorMap.tsx`.*

#### 📍 Section 6: Sensor Suite & Situational Awareness ([FenixAwareness.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixAwareness.tsx))
- ⏮️ **BEFORE UI STATE**:
  - On tablets (768px - 1023px), `.awareness-panel` used desktop absolute positioning `right: calc(100% - 30%)` with width `clamp(240px, 23vw, 310px)`. At 768px, this pushed the left edge of the panel to `-24px` (clipped off the left edge of the screen) while overlapping the video.
  - On narrow phones (< 420px), `.awareness-card` forced a 2-column layout (`minmax(0, 1fr) minmax(0, 1fr)`), resulting in cramped text boxes where purpose/values wrapped awkwardly.
  - On 2K, 4K, and ultrawide screens, the stage box was capped at `max-width: min(1440px, 94vw); max-height: min(75dvh, 680px)`, appearing small relative to the screen size.
- ⏭️ **AFTER UI STATE**:
  - **Tablet Layout Repair**: Added dedicated tablet media query `@media (min-width: 768px) and (max-width: 1023px)` setting `.awareness-stage-box` to `max-width: 96vw; max-height: 72dvh;`, anchoring the panel at `left: 0; right: auto; width: clamp(220px, 28vw, 275px);` and shifting media to `transform: translateX(12%) scale(1.12);`, completely resolving tablet clipping and overlap.
  - **Narrow Mobile 1-Column Card**: Added `@media (max-width: 420px)` setting `.awareness-card` to a clean 1-column layout with `gap: 6px; padding: 9px;` and video height `max-height: 24dvh`, preventing any text cramming on small phones.
  - **Ultrawide & 4K Stage Expansion**: Added progressive scaling rules for 1920px (`max-width: min(1680px, 90vw); max-height: min(78dvh, 820px)`), 2560px (`max-width: min(2000px, 88vw); max-height: min(80dvh, 980px); width: clamp(320px, 18vw, 420px)`), and 3440px (`max-width: min(2400px, 84vw); max-height: min(82dvh, 1120px)`).
  - *Previous heading, stage box, and panel styles are preserved as comments in `FenixAwareness.tsx`.*

#### 📍 Section 7: First Responder 4 Phase Operational Environments ([FenixResponder1.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixResponder1.tsx))
- ⏮️ **BEFORE UI STATE**:
  - 4-column title grid (`FENIx`, `As The`, `First`, `Responder`) used `fenix-title-fit` with a minimum clamp of `1rem` (16px). On 320px–360px phones (column width ~70px), the 9-letter word "Responder" overflowed its column.
  - Big drone container was fixed at `bottom-[-37vh] sm:bottom-[-42vh] lg:bottom-[-48vh]`, hiding too much of the drone on short phone viewports (568px–667px height).
  - Drone container width was capped at `max-w-[1440px]`, causing the foreground drone to look undersized compared to the full-bleed 3840px background on ultrawide monitors.
- ⏭️ **AFTER UI STATE**:
  - **Responsive 4-Column Typography**: Added fluid responsive scale `text-[clamp(0.75rem,3.2vw,1.15rem)] sm:text-[clamp(1.1rem,2.8vw,2.25rem)] lg:text-[clamp(1.75rem,3.2vw,3.75rem)] 3xl:text-[clamp(2.5rem,3.5vw,4.5rem)]`, ensuring all 4 words remain perfectly centered and contained within their columns on every screen size.
  - **Adaptive Drone Elevation**: Updated bottom offset to `bottom-[-30vh] xs:bottom-[-34vh] sm:bottom-[-40vh] lg:bottom-[-48vh] 3xl:bottom-[-52vh]`, providing balanced ascent visibility on both compact phones and tall desktops.
  - **Ultrawide Drone Scaling**: Expanded max-width to `3xl:w-[65vw] max-w-[1440px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] uw:max-w-[2100px]`, creating an impressive cinematic presence on 2K/4K/ultrawide displays.
  - *Previous title classes and drone container are preserved as comments in `FenixResponder1.tsx`.*

#### 📍 Section 8: Technical Specifications & Features ([FenixSpecifications.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixSpecifications.tsx), [FenixFUI2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixFUI2.tsx), [globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - In `globals.css`, `.fenix-specs` had a mobile breakpoint `@media (max-width: 767px)`, leaving tablets (768px - 1023px) in the desktop 2-column layout with `transform: translateX(clamp(2rem, 3.5vw, 4.5rem))`. This pushed performance metrics off the right edge of tablet screens and crammed the drone illustration.
  - In `FenixFUI2`, callouts stacked in 5 tall rows below 1024px, causing excessive vertical scrolling on tablets.
  - On ultrawide displays (2560px–3840px), `.fenix-details-image` scaled to `98%` without max bounds, rendering excessively large illustrations.
- ⏭️ **AFTER UI STATE**:
  - **Tablet Specifications Layout**: Added `@media (min-width: 768px) and (max-width: 1023px)` setting `.fenix-specs` to a 1-column stacked layout with centered drone render (`max-w: 44rem; max-height: 48vh; transform: scale(1.15);`), 4 performance specs in a horizontal row with `transform: none`, and 3 dimensions centered below.
  - **Tablet 2-Column Callouts**: Added `@media (min-width: 640px) and (max-width: 1023px)` to `.fenix-details-callouts` with `grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem;`, presenting features in a clean 2-column grid under the drone illustration.
  - **Ultrawide Bounds & Typography**: Capped `.fenix-specs` at `max-w-[120rem] 3xl:max-w-[140rem] mx-auto` with performance metrics scaling up to `5rem`, and capped `.fenix-details-image` at `1100px` (1920px) and `1380px` (2560px+).
  - *Previous section and CSS definitions are preserved as comments in `FenixSpecifications.tsx` and `globals.css`.*

#### 📍 Section 9: Closing CTA Section ([FenixLast.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixLast.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Heading font size was fixed at `text-[60px] xs:text-[72px] md:text-[72px] lg:text-[96px]`. On 320px–375px mobile screens, 60px font size caused words like "DEPLOY" and "OTHERS" to collide and break awkwardly across lines.
  - Content container used `translate-y-[14vh]` on all screen sizes. On short mobile viewports (e.g. 667px height), 14vh pushed the text and CTA button down by ~93px, colliding with the bottom edge.
  - Container used `min-h-screen` without mobile browser chrome compensation (`100svh`).
- ⏭️ **AFTER UI STATE**:
  - **Fluid Heading Typography**: Scaled heading to `text-[clamp(1.85rem,7vw,2.75rem)] xs:text-[clamp(2.25rem,7.5vw,3.5rem)] sm:text-6xl md:text-7xl lg:text-8xl 3xl:text-9xl uw:text-[10rem]`, preventing awkward word breaks on narrow phones while delivering cinematic grandeur on 4K/ultrawide displays.
  - **Adaptive Vertical Translation**: Replaced fixed 14vh translation with responsive `translate-y-[4vh] xs:translate-y-[6vh] sm:translate-y-[10vh] lg:translate-y-[14vh]`, guaranteeing that the heading, CTA button, and decorative accent remain perfectly centered and fully visible on all viewport heights.
  - **Mobile Height & Ultrawide Container**: Updated section to `min-h-[100svh] md:min-h-screen`, expanded container to `3xl:max-w-[110rem] uw:max-w-[130rem]`, and adjusted CTA button to `mt-6 sm:mt-8 lg:mt-10 3xl:mt-14 3xl:px-10 3xl:py-4 3xl:text-base`.
  - *Previous section container, translation, heading typography, and bottom decorative line are preserved as comments in `FenixLast.tsx`.*

---

## 📅 Session Log: August 27, 2026 (Continued) - FENIX Capabilities Heading Line Gap Fix

### 🎯 Overview of User Request
- Fix the excessive vertical gap between the two lines of the heading on mobile view ("Compact Tactical" and "Intelligence") in the Capabilities section of the FENIX page (`/uncrewedsystems/fenix`).

---

### 🌐 PAGE: FENIX Page (`/uncrewedsystems/fenix` & `/fenix`)

#### 📍 Section 2: Compact Tactical Intelligence ([FenixCapabilities.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixCapabilities.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The `<h1>` title used `<span className="block xs:inline whitespace-normal sm:whitespace-nowrap">Compact Tactical</span>` immediately followed by an unconditional `<br />` tag before `<CharacterReveal text="Intelligence" ... />`.
  - On mobile screens (< 480px / `xs`), the `block` display class forced "Compact Tactical" into a block formatting box, and the following `<br />` immediately triggered a **second line-break**.
  - This generated a full empty blank line box between the two lines (spanning the full font-size and line-height of `~32px+`), causing an unnaturally large vertical gap between "Compact Tactical" and "Intelligence".
- ⏭️ **AFTER UI STATE**:
  - Updated the span to `<span className="inline sm:whitespace-nowrap">Compact Tactical</span>` followed by `<br />`.
  - "Compact Tactical" renders inline on line 1, and the single `<br />` smoothly transitions to "Intelligence" on line 2 without duplicate line-break spacing, resulting in clean, compact, and proportional typographical leading (`leading-none`).
  - *Previous code preserved as comment block in `FenixCapabilities.tsx` (`{/* PREVIOUS UI: ... */}`).*

---

## 📅 Session Log: August 27, 2026 (Continued) - FENIX Turtle Mode Alignment & Sensor Suite Mobile Enhancements

### 🎯 Overview of User Request
- **Turtle Mode Mobile Alignment**: Fix mobile alignment in the Turtle Mode section where the title was pinned to the extreme ceiling, the recovery video was centered with massive dead voids, and the recovery protocol card was jammed against the bottom edge and overlapped by mobile UI / floating action buttons.
- **Sensor Suite Heading & Video Size**:
  - Move "Greater" to the next line in the heading `Every detail. Greater awareness.` so it breaks cleanly into two balanced lines on mobile (`Every detail.` on line 1, `Greater awareness.` on line 2).
  - Significantly increase the video size on mobile view so that the sensor camera payload looks large, bold, and clear.

---

### 🌐 PAGE: FENIX Page (`/uncrewedsystems/fenix` & `/fenix`)

#### 📍 Section 4: Turtle Mode Recovery ([FenixTurtleMode.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixTurtleMode.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The sticky container used standard flex centering without vertical column flow on mobile (`sticky top-0 flex h-[100dvh] w-full items-center justify-center`).
  - The title was positioned with `absolute top-[clamp(3.75rem,8svh,4.5rem)] text-center`, creating an excessive ~250px blank void between the title and the central video.
  - The recovery narrative card was pinned at `absolute bottom-[clamp(1.25rem,3.5svh,2.25rem)] left-4 right-4`, which did not match the video frame width and jammed against the bottom edge of the screen, causing mobile navigation bars and floating buttons to obscure card text.
- ⏭️ **AFTER UI STATE**:
  - **Unified Mobile Column Stage**: Configured the sticky container to `flex-col sm:flex-row items-center justify-center`.
  - **Centered Mobile Title**: Added a dedicated mobile section identity (`sm:hidden mb-3 xs:mb-4 text-center z-20 px-4`) positioning `TURTLE MODE` directly above the recovery video.
  - **Matched Mobile Recovery Card**: Added a dedicated mobile recovery narrative card (`sm:hidden mt-3 xs:mt-4 w-[92vw] max-w-[28rem] xs:max-w-[32rem] border border-neutral-900/10 bg-white/95 p-3.5 xs:p-4`) directly below the video, with its width and drop-shadow perfectly matching the video frame.
  - **Desktop HUD Preservation**: Desktop overlay container set to `hidden sm:block`, preserving all 4 HUD corner cards and camera reticles on tablets and desktop monitors.
  - *Previous absolute positioning and overlay elements preserved as comments in `FenixTurtleMode.tsx` (`{/* PREVIOUS UI: ... */}`).*

#### 📍 Section 6: Sensor Suite & Situational Awareness ([FenixAwareness.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixAwareness.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Heading was `<h2>Every detail. <span>Greater awareness.</span></h2>`. On mobile screens (~360px–430px), "Greater" wrapped with "Every detail." on line 1, leaving only "awareness." orphaned on line 2 (`Every detail. Greater \n awareness.`).
  - In CSS, mobile video sizing was restricted to `max-height: 27dvh; transform: scale(1.18);` (and `max-height: 24dvh;` below 420px). This rendered the central sensor suite camera head small and lost within large empty whitespace.
- ⏭️ **AFTER UI STATE**:
  - **Balanced 2-Line Mobile Heading**: Added `<br className="sm:hidden" />` and `<span className="inline-block whitespace-nowrap sm:whitespace-normal">Greater awareness.</span>` so that on mobile, "Every detail." sits on line 1 and "Greater awareness." cleanly occupies line 2 in vibrant cyan, while maintaining seamless 1-line flow on desktop.
  - **Substantially Enlarged Mobile Video**: Increased video `max-height` to `38dvh` (and `35dvh` on narrow phones) and boosted scale factor to `transform: scale(1.65)` (and `scale(1.6)` below 420px). The drone sensor payload now appears bold, prominent, and detailed in mobile view.
  - *Previous heading and mobile video CSS preserved as comments in `FenixAwareness.tsx` (`{/* PREVIOUS UI: ... */}`).*

---

## 📅 Session Log: August 27, 2026 (Continued) - FENIX Specifications Mobile Centering & Drone Sizing

### 🎯 Overview of User Request
- **Center Mobile Specifications Data**: In the mobile view of the Technical Specifications section (`FenixSpecifications.tsx` / `globals.css`), center-align both the 4 performance metric cards (Lift capacity, Endurance, Altitude, Payload) and the 3 dimension columns (Length, Width, Height) which were previously left-aligned.
- **Enlarge and Move Drone Down**: Increase the visual scale of the drone illustration on mobile and move it down so it has a bolder presence and sits harmoniously between the top padding and the performance specs.

---

### 🌐 PAGE: FENIX Page (`/uncrewedsystems/fenix` & `/fenix`)

#### 📍 Section 8: Technical Specifications & Features ([FenixSpecifications.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/fenix/components/FenixSpecifications.tsx), [globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - In `@media (max-width: 767px)`, the drone illustration was sized at `scale(1.18)` with negative top margin `-.5rem -4vw`, sitting high near the top padding.
  - The 4 performance metric items in `.fenix-specs-performance` (Lift capacity 500g, Endurance 20mins, Altitude 0.5-50m, Payload EO+IR) were left-aligned (`text-align: left`) within their 2 grid columns.
  - The 3 dimension columns in `.fenix-specs-dimensions` (Length 313mm, Width 346mm, Height 108mm) were left-aligned with an asymmetrical `padding-left: .75rem` on the second and third items.
- ⏭️ **AFTER UI STATE**:
  - **Enlarged & Repositioned Drone Illustration**: Updated `.fenix-specs-visual` to `margin: 0.5rem -4vw 1rem;` and `.fenix-specs-render` to `transform: translateX(-1%) translateY(6%) scale(1.48);`, noticeably expanding the drone airframe size and translating it down into the prime optical center of the section.
  - **Centered Performance Metric Cells**: Applied `.fenix-specs-performance > div { text-align: center; }`, ensuring all 4 labels and large values (500g, 20mins, 0.5-50m, EO+IR) are centered cleanly within their columns under the top border lines.
  - **Centered Symmetrical Dimensions**: Applied `.fenix-specs-dimensions > div { text-align: center; }` and `.fenix-specs-dimensions > div + div { padding-left: 0; }`, perfectly centering Length, Width, and Height values and labels across the 3 columns between the vertical dividers.
  - *Previous CSS definitions preserved as comments in `globals.css`.*

---

## 📅 Session Log: August 27, 2026 (Continued) - BAT Page Cross-Device Responsive Overhaul

### 🎯 Overview of User Request
- Implement professional, pixel-perfect responsiveness across all screen sizes (small 320px–360px phones, standard 390px–430px mobiles, landscape smartphones, 768px–1024px tablets, laptops, desktops, and 2K/4K/ultrawide monitors) for the entire BAT page (`/uncrewedsystems/bat` & `/bat`).
- Ensure proper alignment and zero horizontal/vertical clipping in mobile devices while guaranteeing desktop presentation is completely preserved and unaffected.
- Fix internal server error (HTTP 500) caused by syntax error in JSX returns.
- Strictly adhere to non-deletion rules (comment out previous code) and change log documentation requirements.

---

### 🌐 PAGE: BAT Page (`/uncrewedsystems/bat` & `/bat`)

#### 📍 Section 1: Hero Section ([BatHero.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatHero.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Content container used static top/bottom padding (`pt-28 ... pb-10 sm:pb-12 md:pb-16`). On compact mobile screens (320px–375px), 28 (112px) pushed the text and title down, causing vertical crowding against the canvas stage.
  - Subtitle paragraph used `text-justify` across all screens, which generated unnatural gaps/rivers between words on narrow mobile widths.
  - Container had unbounded width on ultrawide monitors (> 1920px), allowing text elements to drift toward extreme browser borders.
- ⏭️ **AFTER UI STATE**:
  - **Fluid Mobile Padding**: Configured responsive padding `pt-20 xs:pt-24 sm:pt-28 pb-8 xs:pb-10 sm:pb-12 md:pb-16` providing balanced spacing above the title on phones and short viewports.
  - **Mobile-Adaptive Typography Alignment**: Updated paragraph text to `text-left sm:text-justify`, eliminating awkward spacing gaps on mobile while retaining clean justified flow on tablets and desktop screens.
  - **Ultrawide Containment**: Bounded hero content container with `max-w-[120rem] 3xl:max-w-[140rem] mx-auto` to maintain cohesive layout framing on 2K/4K displays.
  - *Previous container padding, paragraph alignment, and bounds are preserved as comments in `BatHero.tsx`.*

#### 📍 Section 2: Multi-Role Operating Environments ([BatMultiRole.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatMultiRole.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Title used `ProductHeading` with standard font sizing that caused the 8-letter word "Solution" in column 4 to wrap or clip on narrow 320px–360px mobile viewports.
  - Section container was hardcoded to `h-screen` without mobile browser chrome compensation (`100svh`).
  - Drone container expanded infinitely on ultrawide screens (> 1920px).
- ⏭️ **AFTER UI STATE**:
  - **Dynamic 4-Column Fluid Typography**: Applied `text-[clamp(0.75rem,3.2vw,1.15rem)] sm:text-[clamp(1.1rem,2.8vw,2.25rem)] lg:text-[clamp(1.75rem,3.2vw,3.75rem)] 3xl:text-[clamp(2.5rem,3.5vw,4.5rem)]`, ensuring "Multi", "Role", "Single", "Solution" fit their columns across all screen sizes with zero clipping.
  - **Mobile Viewport Height**: Updated section to `min-h-[100svh] h-[100dvh] md:h-screen`, perfectly handling dynamic address bars on iOS and Android browsers.
  - **Ultrawide Drone Constraints**: Bounded drone container with `max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] uw:max-w-[2100px]` while maintaining bottom anchor `bottom: 4%` on mobile portrait view.
  - *Previous section height, title sizing, and bounds are preserved as comments in `BatMultiRole.tsx`.*

#### 📍 Section 3: Technical Specifications & Dimensions ([BatSpecs.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatSpecs.tsx), [globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - In `globals.css`, `.bat-specs-row` on mobile lacked centering (`align-items: flex-start; text-align: left`), leaving specs (Range, Endurance, Cruise Speed, Payload) left-aligned under column dividers.
  - `.bat-specs-row` had `min-height: calc(clamp(...) + 4.25rem)` (over 108px per row), adding over 216px of unnecessary empty vertical space and pushing the section off mobile viewports.
  - The drone technical render on mobile was scaled up to `scale(1.28)` with `max-height: 56dvh–64dvh`, overwhelming small screens.
  - Top padding was fixed at `6.5rem` (104px), pushing content down.
- ⏭️ **AFTER UI STATE**:
  - **Centered Mobile Specifications**: Added `.bat-page [data-bat-section="specs"] .bat-specs-row { align-items: center; text-align: center; justify-content: center; min-height: auto; padding-block: 0.75rem 0.85rem; }` and centered `dd` values (`justify-content: center; font-size: clamp(1.75rem, 8vw, 3rem)`).
  - **Proportional Mobile Drone & Padding**: Added `.bat-specs { padding: 5rem 5vw 2.5rem; min-height: 100svh; }` and capped `.bat-page [data-bat-section="specs"] .bat-specs-drone { transform: scale(1.15); max-height: clamp(160px, 30vh, 230px); }`.
  - **Tucked Mobile Dimensions**: Set `.bat-specs-dimensions { margin-top: 1.25rem; }` on `< 768px`, centering Span, Width, Height neatly beneath the drone airframe.
  - **Ultrawide Containment**: Added `max-w-[120rem] 3xl:max-w-[140rem] mx-auto` to the outer `<section>`.
  - *Previous section and CSS definitions are preserved as comments in `BatSpecs.tsx` and `globals.css`.*

#### 📍 Section 4: Payloads & Sensors Carousel ([BatPayLoad2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatPayLoad2.tsx), [globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - In `@media (max-width: 767px)`, `.bat-payload-controls` used `grid-template-columns: repeat(2, minmax(0, 1fr))`. With 5 payload items, button 5 ("Munition") was isolated in column 1 of row 3, leaving column 2 completely empty and asymmetrical.
  - On compact phones (< 400px), buttons at `min-height: 4.75rem` combined with the stage canvas pushed the controls slightly past the viewport boundary.
- ⏭️ **AFTER UI STATE**:
  - **Balanced 2-2-1 Mobile Grid**: Added `.bat-page .bat-payload-controls > .bat-payload-button:last-child { grid-column: 1 / -1; }` on `< 768px`, allowing the "Munition" HE explosive payload button to span symmetrically across both columns at the bottom.
  - **Compact Phone Sizing**: Added `@media (max-width: 400px) { .bat-page .bat-payload-button { min-height: 4.25rem; } }`, guaranteeing the full payload switcher comfortably fits inside 100dvh on devices like iPhone SE.
  - **Ultrawide Containment**: Added `max-w-[120rem] 3xl:max-w-[140rem] mx-auto` to `<section>`.
  - *Previous button grid and section container preserved as comments in `BatPayLoad2.tsx` and `globals.css`.*

#### 📍 Section 5: Battery Swapping & Power ([BatBatterySwap.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatBatterySwap.tsx), [globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - On mobile displays, the battery swapping video was cropped by `object-fit: cover` with `aspect-ratio: auto`, which caused the lower portion of the drone and its battery docking mechanism to sit too close to the bottom edge.
- ⏭️ **AFTER UI STATE**:
  - **Mobile Video Translation**: Added `.bat-page .bat-battery-stage video { transform: translateY(0.5rem) scale(1.05); }` on `< 768px`, centering the battery docking operation right in the optical sweet spot of mobile screens.
  - **Ultrawide Containment**: Added `max-w-[120rem] 3xl:max-w-[140rem] mx-auto` to `<section>`.
  - *Previous CSS definitions and section container preserved as comments in `BatBatterySwap.tsx` and `globals.css`.*

#### 📍 Section 6: Autonomous 3D Transition Sequence ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Background watermark text used `text-[clamp(2rem,5.2vw,5.8rem)] whitespace-nowrap` with `translate-x-[2vw]`. On 320px–360px phones, 2rem minimum size caused "Transition Forward." to clip past the right edge.
  - Phase captions used `whitespace-nowrap text-[14px]` which caused long 33-character titles (such as "TRANSITION TO HORIZONTAL POSITION") to exceed screen borders or collide with the 3D model on small screens.
  - A JSX comment placed directly after `return (` inside a function caused Next.js SWC compilation error (HTTP 500).
- ⏭️ **AFTER UI STATE**:
  - **Non-Clipping Fluid Watermark**: Updated watermark to `text-[clamp(1.15rem,5.5vw,5.8rem)]` with responsive translation `translate-x-0 sm:translate-x-[2vw] px-4 text-center`, fitting completely within 320px viewports without horizontal scroll or cutoff.
  - **Responsive Adaptive Phase Captions**: Updated caption cards to `max-w-[13rem] xs:max-w-[16rem] sm:max-w-none whitespace-normal sm:whitespace-nowrap`, with responsive typography `text-[13px] sm:text-[16px]` for index, `text-[11px] sm:text-[14px]` for title, and `text-[9.5px] sm:text-[11px]` for subtitle.
  - **Syntax Correction**: Converted comments directly preceding JSX root elements to standard JS comments (`// PREVIOUS UI:`), eliminating the 500 compilation error.
  - *Previous watermark and caption code blocks preserved as comments in `Bat3DSequence.tsx`.*

#### 📍 Section 7: Closing Call-To-Action Section ([BatLast.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatLast.tsx))
- ⏮️ **BEFORE UI STATE**:
  - Heading font size was hardcoded to `text-[60px] xs:text-[72px] md:text-[72px] lg:text-[96px]`. On mobile screens, 60px font size broke words across lines and forced the CTA button down.
  - Content container used static `translate-y-[14vh]` on all screen sizes, pushing content down by nearly 100px on short phones and causing the "Request a Demo" button to clip against the bottom edge.
  - Section used `h-screen` without mobile browser chrome compensation (`100svh`).
- ⏭️ **AFTER UI STATE**:
  - **Fluid Heading Typography**: Scaled heading to `text-[clamp(1.85rem,7vw,2.75rem)] xs:text-[clamp(2.25rem,7.5vw,3.5rem)] sm:text-6xl md:text-7xl lg:text-8xl 3xl:text-9xl uw:text-[10rem]`, perfectly balancing word breaks across all viewport widths.
  - **Adaptive Vertical Translation**: Replaced fixed 14vh translation with responsive `translate-y-[4vh] xs:translate-y-[6vh] sm:translate-y-[10vh] lg:translate-y-[14vh]`, keeping the heading, button, and bottom accent line fully visible and centered on phone screens.
  - **Mobile Height & Button Margin**: Updated section to `min-h-[100svh] md:min-h-screen h-[100dvh]`, adjusted button margin to `mt-6 sm:mt-8 lg:mt-12 3xl:mt-14`, and expanded container up to `uw:max-w-[130rem]`.
  - *Previous section height, container translation, heading typography, and button margin are preserved as comments in `BatLast.tsx`.*

---

## 📅 Session Log: August 27, 2026 (Continued) - BAT Mobile Video Centering & Payloads Stage Alignment

### 🎯 Overview of User Request
- **Battery Swapping Video Mobile Centering & Scaling**: In mobile view on the Battery Swapping section (`BatBatterySwap.tsx`), center the video vertically and horizontally in the viewport and increase its size so the drone is clearly visible without being cut off at the bottom.
- **Payloads & Sensors Alignment**: In mobile view on the Payloads & Sensors section (`BatPayLoad2.tsx`), move the drone payload video/animation down into the stage and lift the 2nd part (the caption and the 5 payload selection buttons) up, eliminating the massive dead void in the center and avoiding bottom-edge crowding.

---

### 🌐 PAGE: BAT Page (`/uncrewedsystems/bat` & `/bat`)

#### 📍 Section 4: Payloads & Sensors Carousel ([BatPayLoad2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatPayLoad2.tsx), [globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - The drone payload animation film (`.bat-payload-film`) was stuck at `top: 0`, jammed immediately beneath the "Payloads & Sensors" heading.
  - The caption (`03 / 05 DE2 Optical sensor`) was pinned to `bottom: 0` of the stage, leaving an empty black void of ~300px between the drone and the caption.
  - The 5 payload control buttons (`.bat-payload-controls`) were pushed against the very bottom edge of mobile displays, overlapping with gesture navigation bars.
- ⏭️ **AFTER UI STATE**:
  - **Moved Drone Visual Down**: Applied `.bat-page .bat-payload-film { top: clamp(1.25rem, 3.5svh, 2.5rem); transform: scale(1.08); transform-origin: center top; }` on `< 768px`, translating the drone visual comfortably down into the upper-middle of the stage.
  - **Moved 2nd Part (Caption & Buttons) Up**: Added `.bat-page .bat-payload-controls { margin-bottom: clamp(1.5rem, 4svh, 2.5rem); }` and `.bat-page .bat-payload-stage-caption { bottom: clamp(0.5rem, 1.5svh, 1rem); padding-block: 0.65rem; }`, closing the central void and lifting all buttons safely away from the bottom browser chrome.
  - *Previous CSS definitions preserved as comments in `globals.css`.*

#### 📍 Section 5: Battery Swapping & Power ([BatBatterySwap.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatBatterySwap.tsx), [globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - The video element was styled with `object-position: center bottom` and `transform: translateY(0.5rem) scale(1.05)`, causing the drone video to sink to the bottom floor of the screen with its lower half clipped below the edge and leaving excessive empty black space above it.
- ⏭️ **AFTER UI STATE**:
  - **Centered Mobile Video**: Configured `.bat-page .bat-battery-stage video { object-position: center center; transform-origin: center center; }` on `< 768px`, centering the battery docking operation vertically and horizontally in the available stage.
  - **Increased Video Size**: Set `transform: scale(1.28);`, noticeably expanding the drone dimensions so the mechanism is prominent and easily visible.
  - **Mobile Safe Area**: Added `.bat-page .bat-battery-section { padding-bottom: clamp(1rem, 3svh, 2.5rem); }`, ensuring clear distance from mobile bottom navigation controls.
  - *Previous CSS definitions preserved as comments in `globals.css`.*

---

## 📅 Session Log: August 27, 2026 (Continued) - BAT 3D Sequence Mobile Proportional Scaling

### 🎯 Overview of User Request
- **Reduce 3D Model Size in Mobile View**: In mobile view on the 3D Transition Sequence section (`Bat3DSequence.tsx`), significantly reduce the 3D drone model canvas size and ghost snapshot scale so the drone wingspan fits naturally on phones without spanning edge-to-edge.
- **Reduce Content Size in Mobile View**: Reduce the font sizes of the telemetry phase captions (phase index number, uppercase phase title, and subtitle description) so the labels look clean, sharp, and proportional to the reduced drone.
- **Reduce Title Size in Mobile View**: Scale down the background watermark title ("Transition Forward. Reached Beyond.") and reduce its opacity so it doesn't collide with or crowd the 3D model.

---

### 🌐 PAGE: BAT Page (`/uncrewedsystems/bat` & `/bat`)

#### 📍 Section 6: Autonomous 3D Transition Sequence ([Bat3DSequence.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/Bat3DSequence.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The 3D drone canvas container and ghost snapshot images were hardcoded to a fixed desktop size `width: 990px; height: 990px` (`p.drone.size` / `liveDrone.size`). On 360px–390px mobile screens, the wingspan spanned almost 100% of the viewport width, colliding with text and background elements.
  - Phase captions used large typography (`text-[13px]` index, `text-[11px]` title, `text-[9.5px]` subtitle), crowding the screen on phones.
  - Background watermark title used `text-[clamp(1.15rem,5.5vw,5.8rem)]` with `opacity-[0.3]`, sitting directly behind the drone wings and creating heavy visual clutter.
- ⏭️ **AFTER UI STATE**:
  - **Proportional 3D Model Scaling**: Introduced dynamic responsive scale factor (`scaleFactor = 0.44` on phones < 480px, `0.58` on 480px–768px, `0.78` on tablets, and `1.0` on desktop), scaling the canvas container and ghost snapshots down to ~435px on phones. The drone wingspan now comfortably spans ~210px–220px, framed neatly with generous breathing room.
  - **Refined Telemetry Content Typography**: Reduced phase captions on mobile to `text-[9.5px] sm:text-[16px]` for index `01`/`02`, `text-[8.5px] sm:text-[14px]` for titles (`VERTICAL TAKEOFF AND LANDING`, `PRESET ALTITUDE`), and `text-[7px] sm:text-[11px]` for subtitle descriptions, delivering ultra-crisp, high-tech telemetry styling.
  - **Subtle Background Watermark Title**: Reduced watermark typography to `text-[clamp(0.85rem,3.8vw,1.4rem)] sm:text-[clamp(2rem,5.2vw,5.8rem)]` with softened opacity `opacity-[0.16] sm:opacity-[0.3]`, letting the title function as an elegant, non-intrusive backdrop.
  - *Previous unscaled drone dimensions, title typography, and caption sizes are preserved as comments in `Bat3DSequence.tsx`.*

---

## 📅 Session Log: August 27, 2026 (Continued) - BAT Payloads & Sensors Video Shift & Lower Content Elevation

### 🎯 Overview of User Request
- **Move Drone Video Down Further**: In mobile view on the Payloads & Sensors section (`BatPayLoad2.tsx`), translate the drone animation ("the video") further down from the ceiling heading into the open upper-middle region of the stage.
- **Move Content Up (Caption & Buttons)**: Move the lower content ("03 / 05 DE2 Optical sensor" caption and the 5 selection buttons) further up, pulling button 05 ("Munition") completely off the bottom border to clear navigation overlays.

---

### 🌐 PAGE: BAT Page (`/uncrewedsystems/bat` & `/bat`)

#### 📍 Section 4: Payloads & Sensors Carousel ([BatPayLoad2.tsx](file:///e:/Tsalla%20Website/frontend/app/uncrewedsystems/bat/components/BatPayLoad2.tsx), [globals.css](file:///e:/Tsalla%20Website/frontend/app/globals.css))
- ⏮️ **BEFORE UI STATE**:
  - The drone animation film (`.bat-payload-film`) was positioned at `top: clamp(1.25rem, 3.5svh, 2.5rem)`, still sitting too close to the "Payloads & Sensors" title.
  - The caption (`03 / 05 DE2`) was positioned low at `bottom: clamp(0.5rem, 1.5svh, 1rem)`.
  - The 5 buttons (`.bat-payload-controls`) had `min-height: 4.75rem` and sat against the bottom edge of mobile viewports, with button 05 ("Munition") colliding with navigation bars / badges.
- ⏭️ **AFTER UI STATE**:
  - **Translated Drone Visual Down**: Increased offset to `.bat-page .bat-payload-film { top: clamp(2.75rem, 7svh, 5rem); transform: scale(1.1); transform-origin: center top; }`, providing ~50px–75px of clean breathing space beneath the heading and centering the drone in the stage.
  - **Elevated Lower Content (Caption & Buttons) Up**:
    - Shifted button grid up with `.bat-page .bat-payload-controls { transform: translateY(calc(-1 * clamp(1.25rem, 3svh, 2rem))); margin-bottom: clamp(0.75rem, 2svh, 1.5rem); }`.
    - Compacted button height to `.bat-page .bat-payload-button { min-height: 4.25rem; }` across all mobile screens (< 768px).
    - Lifted caption up with `.bat-page .bat-payload-stage-caption { bottom: clamp(1.5rem, 4svh, 2.5rem); padding-block: 0.5rem; }`.
    - Button 05 ("Munition") now sits comfortably above the screen edge with full clearance, and the central void is smoothly closed.
  - *Previous CSS definitions preserved as comments in `globals.css`.*

---

## 📅 Session Log: August 27, 2026 (Continued) - AI Pilot Modularity Description Refinement

### 🎯 Overview of User Request
- In the AI Pilot page (`/maverick/ai-pilot` & `/ai-pilot`), update the copy for the "Modularity" capability in `AICapabilities.tsx`:
  - Remove `"any"`
  - Remove `"-from"`
  - Replace `"UAVs"` with `"UAS"`
  - Replace `" and ground vehicles "` with `" from ground vehicles "`

---

### 🌐 PAGE: AI Pilot Page (`/maverick/ai-pilot` & `/ai-pilot`)

#### 📍 Section 2: Core Capabilities Carousel ([AICapabilities.tsx](file:///e:/Tsalla%20Website/frontend/app/maverick/ai-pilot/components/AICapabilities.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The description for the "Modularity" capability card was:
    `"Transforms any next-generation or legacy platform—from UAVs and ground vehicles to fighter aircraft, into a fully autonomous asset capable of navigating evolving threats."`
- ⏭️ **AFTER UI STATE**:
  - Refined description according to the exact requests:
    `"Transforms next-generation or legacy platform, UAS from ground vehicles to fighter aircraft, into a fully autonomous asset capable of navigating evolving threats."`
  - *Previous description text is preserved as a comment in `AICapabilities.tsx` (`// PREVIOUS UI: ...`).*

---

## 📅 Session Log: August 27, 2026 (Continued) - AI Pilot Interoperability Copy Refinement

### 🎯 Overview of User Request
- In the AI Pilot page (`/maverick/ai-pilot` & `/ai-pilot`), replace `" integrates"` with `" integrate"` in the "Interoperability" capability card description.

---

### 🌐 PAGE: AI Pilot Page (`/maverick/ai-pilot` & `/ai-pilot`)

#### 📍 Section 2: Core Capabilities Carousel ([AICapabilities.tsx](file:///e:/Tsalla%20Website/frontend/app/maverick/ai-pilot/components/AICapabilities.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The description for the "Interoperability" capability card read:
    `"Seamlessly integrates across disparate systems and coalition networks to ensure unified mission coordination and real-time data synchronization in contested environments."`
- ⏭️ **AFTER UI STATE**:
  - Replaced `" integrates"` with `" integrate"`, updating the description to:
    `"Seamlessly integrate across disparate systems and coalition networks to ensure unified mission coordination and real-time data synchronization in contested environments."`
  - *Previous description text is preserved as a comment in `AICapabilities.tsx` (`// PREVIOUS UI: ...`).*

---

## 📅 Session Log: August 27, 2026 (Continued) - AI Pilot Right Side Content Elevation

### 🎯 Overview of User Request
- In the AI Pilot page (`/maverick/ai-pilot` & `/ai-pilot`), move the right side capability content (title & description card) a little up so it balances cleanly against the hardware unit on the left.

---

### 🌐 PAGE: AI Pilot Page (`/maverick/ai-pilot` & `/ai-pilot`)

#### 📍 Section 2: Core Capabilities Carousel ([AICapabilities.tsx](file:///e:/Tsalla%20Website/frontend/app/maverick/ai-pilot/components/AICapabilities.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The capability cards (`.ai-cap-panel`) in the right-side carousel were positioned at `top: 50%`, aligning the vertical midpoint of the text card with the midpoint of the grid cell.
  - Because the hardware unit on the left starts high up (Y ~310px), the title "Modularity" and descriptive text sat visibly lower in the bottom half of the right column.
- ⏭️ **AFTER UI STATE**:
  - **Elevated Right Side Content**: Updated `.ai-cap-panel` to `top: calc(50% - clamp(2.5rem, 5.5vh, 4.25rem))`, moving the capability title and description up by ~55px–60px on desktop viewports.
  - The heading and body copy now sit comfortably in the upper-middle focal region alongside the autonomy computer, creating a harmonious visual balance.
  - In mobile view (`< 1024px`), maintained `top: 50%` to keep the content centered in its stacked row below the hardware visual.
  - *Previous CSS positioning rules are preserved as comments in `AICapabilities.tsx`.*

---

## 📅 Session Log: August 27, 2026 (Continued) - AI Pilot Autonomy Computer Visual Elevation

### 🎯 Overview of User Request
- In the AI Pilot page (`/maverick/ai-pilot` & `/ai-pilot`), move the autonomy computer image on the left side a little up to match the elevation of the right-side capability content.

---

### 🌐 PAGE: AI Pilot Page (`/maverick/ai-pilot` & `/ai-pilot`)

#### 📍 Section 2: Core Capabilities Carousel ([AICapabilities.tsx](file:///e:/Tsalla%20Website/frontend/app/maverick/ai-pilot/components/AICapabilities.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The autonomy computer visual (`.ai-cap-visual img`) was vertically centered within its grid column with no vertical translation.
- ⏭️ **AFTER UI STATE**:
  - **Elevated Hardware Image**: Added `transform: translateY(-clamp(2rem, 5vh, 3.75rem))` to `.ai-cap-visual img` on desktop viewports (~54px upward shift on standard 1080p), raising the hardware unit in tandem with the right-side text.
  - In responsive view (`< 1024px`), set `transform: none` to preserve proper spacing and prevent clipping under mobile navigation headers.
  - *Previous CSS rules are preserved as comments in `AICapabilities.tsx`.*

---

## 📅 Session Log: August 27, 2026 (Continued) - AI Pilot Capability Paragraph Justification

### 🎯 Overview of User Request
- In the AI Pilot page (`/maverick/ai-pilot` & `/ai-pilot`), justify the text alignment of the capability description paragraph in `AICapabilities.tsx`.

---

### 🌐 PAGE: AI Pilot Page (`/maverick/ai-pilot` & `/ai-pilot`)

#### 📍 Section 2: Core Capabilities Carousel ([AICapabilities.tsx](file:///e:/Tsalla%20Website/frontend/app/maverick/ai-pilot/components/AICapabilities.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The capability description paragraph (`.ai-cap-panel p`) had `text-align: left;`, producing a ragged right edge across multiple lines of text.
- ⏭️ **AFTER UI STATE**:
  - **Justified Text Alignment**: Updated `.ai-cap-panel p` to `text-align: justify;`, creating clean, flush left and right margins for the description text across all capability slides.
  - *Previous CSS rules are preserved as comments in `AICapabilities.tsx`.*

---

## 📅 Session Log: August 27, 2026 (Continued) - Global Footer TSALLA Logo Watermark Opacity Reduction

### 🎯 Overview of User Request
- Reduce the opacity of the large "TSALLA" brand watermark logo at the bottom of the global Footer component (`Footer.tsx`).

---

### 🌐 PAGE: Global Footer Component (All Pages)

#### 📍 Section: Footer Watermark ([Footer.tsx](file:///e:/Tsalla%20Website/frontend/components/Footer.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The massive "TSALLA" typographic watermark logo (`/Tsalla.svg`) was rendered with `opacity-70` (70% opacity), appearing very bright grey and competing visually with the navigation columns, text, and action buttons above.
- ⏭️ **AFTER UI STATE**:
  - **Softened Watermark Opacity**: Reduced the opacity of the "TSALLA" logo image to `opacity-20` (20% opacity).
  - The brand logo now serves as a subtle, high-end aerospace background watermark that gracefully recedes into the dark background while keeping footer navigation links and buttons prominent.
  - *Previous opacity setting preserved as a comment in `Footer.tsx`.*

---

## 📅 Session Log: August 27, 2026 (Continued) - Global Footer TSALLA Logo Watermark Opacity Adjustment (50%)

### 🎯 Overview of User Request
- Adjust the opacity of the large "TSALLA" brand watermark logo at the bottom of the global Footer component (`Footer.tsx`) to 50%.

---

### 🌐 PAGE: Global Footer Component (All Pages)

#### 📍 Section: Footer Watermark ([Footer.tsx](file:///e:/Tsalla%20Website/frontend/components/Footer.tsx))
- ⏮️ **BEFORE UI STATE**:
  - The "TSALLA" typographic watermark logo (`/Tsalla.svg`) was rendered with `opacity-20` (20% opacity).
- ⏭️ **AFTER UI STATE**:
  - **Calibrated Watermark Opacity**: Adjusted the opacity of the "TSALLA" logo image to `opacity-50` (50% opacity).
  - Delivers a balanced presentation that provides clear brand presence across the footer while preserving hierarchy over background darkness.
  - *Previous opacity settings (70% and 20%) are preserved as comments in `Footer.tsx`.*

---
