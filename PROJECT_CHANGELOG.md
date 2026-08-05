# Tsalla Aerospace - Project Change Log & Activity Record

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

---

*Log last updated: August 05, 2026*
