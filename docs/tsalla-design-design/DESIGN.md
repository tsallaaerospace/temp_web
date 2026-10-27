# tsalla-design DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: Tailwind CSS 3.4.17 + React 19 + Next.js 15.2.6
> Colors: 19 · Fonts: 2 · Components: 185
> Icon library: Lucide · State: not detected
> Primary theme: dark · Dark mode toggle: yes · Motion: expressive

---

## 1. Visual Theme & Atmosphere

This is a **dark-themed** interface with a flat, cool visual language. Elevation is achieved through color and border shifts rather than shadows — a clean, industrial aesthetic. Typography pairs **Farro** for display/headings with **Inter** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 14, 16px. The palette is predominantly monochromatic with **#00a3cc** as the single accent color — used sparingly for interactive elements and emphasis. Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| background | `#000000` | background | Page background, darkest surface |
| foreground | `#020817` | surface | Card and panel backgrounds |
| background | `#ffffff` | text-primary | Headings and body text |
| text-muted | `#a3a3a3` | text-muted | Captions, placeholders, secondary info |
| muted-foreground | `#64748b` | text-muted | Captions, placeholders, secondary info |
| muted-foreground | `#94a3b8` | text-muted | Captions, placeholders, secondary info |
| accent | `#00a3cc` | accent | CTAs, links, focus rings, active states |
| destructive | `#ef4444` | danger | Error states, destructive actions |
| info | `#5ce1e6` | info | Informational highlights |
| secondary | `#1e293b` | unknown | Palette color |
| primary | `#0f172a` | unknown | Palette color |
| unknown | `#dcdcdc` | unknown | Palette color |
| secondary | `#f1f5f9` | unknown | Palette color |
| unknown | `#111111` | unknown | Palette color |
| border | `#e2e8f0` | unknown | Palette color |
| unknown | `#737373` | unknown | Palette color |
| destructive | `#7f1d1d` | unknown | Palette color |
| ring | `#cbd5e1` | unknown | Palette color |
| unknown | `#f3e5d8` | unknown | Palette color |

### Dark Mode Token Mapping

| Variable | Light | Dark |
|---|---|---|
| `--background` | `0 0% 100%` | `222.2 84% 4.9%` |
| `--foreground` | `222.2 84% 4.9%` | `210 40% 98%` |
| `--card` | `0 0% 100%` | `222.2 84% 4.9%` |
| `--card-foreground` | `222.2 84% 4.9%` | `210 40% 98%` |
| `--popover` | `0 0% 100%` | `222.2 84% 4.9%` |
| `--popover-foreground` | `222.2 84% 4.9%` | `210 40% 98%` |
| `--primary` | `222.2 47.4% 11.2%` | `210 40% 98%` |
| `--primary-foreground` | `210 40% 98%` | `222.2 47.4% 11.2%` |
| `--secondary` | `210 40% 96.1%` | `217.2 32.6% 17.5%` |
| `--secondary-foreground` | `222.2 47.4% 11.2%` | `210 40% 98%` |
| `--muted` | `210 40% 96.1%` | `217.2 32.6% 17.5%` |
| `--muted-foreground` | `215.4 16.3% 46.9%` | `215 20.2% 65.1%` |
| `--accent` | `210 40% 96.1%` | `217.2 32.6% 17.5%` |
| `--accent-foreground` | `222.2 47.4% 11.2%` | `210 40% 98%` |
| `--destructive` | `0 84.2% 60.2%` | `0 62.8% 30.6%` |
| `--border` | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` |
| `--input` | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` |
| `--ring` | `222.2 84% 4.9%` | `212.7 26.8% 83.9%` |

### CSS Variable Tokens

```css
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--card: 0 0% 100%;
--card-foreground: 222.2 84% 4.9%;
--popover: 0 0% 100%;
--popover-foreground: 222.2 84% 4.9%;
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 210 40% 98%;
--border: 214.3 31.8% 91.4%;
```


---

## 3. Typography Rules

**Font Stack:**
- **Inter** — Heading 1, Heading 2, Heading 3
- **Farro** — Body, Caption

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Inter | 48px / 3rem | 700 |
| Heading 2 | Inter | 32px / 2rem | 600 |
| Heading 3 | Inter | 24px / 1.5rem | 600 |
| Body | Farro | 16px / 1rem | 400 |
| Caption | Farro | 12px / 0.75rem | 400 |

**Typographic Rules:**
- Limit to 2 font families max per screen
- Use **Inter** for body/UI text, **Farro** for display/headings
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (113)

**CommitmentSection** — `components/CommitmentSection.tsx`
- Key Styles: `rounded-2xl`, `bg-black`, `py-0`, `text-xl`, `font-orbit`

```tsx
<section className="bg-black py-0 overflow-hidden">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center">
              <h2 className="text-[#5ce1e6] text-xl md:text-2xl font-orbit tracking-[0.4em] uppercase mb-4">
                WHERE WE’RE HEADED
              </h2>
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-6xl mx-auto px-4" style={{ fontFamily: "'ClashGrotesk Bold (.eot
```

**Footer** — `components/Footer.tsx`
- Props: `top`, `behavior`
- Key Styles: `rounded-full`, `bg-[#050505]`, `pt-16`, `text-xs`, `font-orbit`, `blur-[4px]`, `pointer-events-none`
- Animation: tw-transitions: transition-transform, duration-500, duration-300, transition-colors, transition-all, hover-transforms

```tsx
<footer className="footer-short-mobile relative w-full bg-[#050505] text-white flex flex-col items-center pt-16 sm:pt-20 lg:pt-32 uw:pt-8 overflow-hidden z-[10]">
      {/* PREVIOUS SHORT-SCREEN UI: no height-aware footer class was applied. */}
      {/* PREVIOUS UI: <footer className="relative w-full bg-[#050505] text-white flex flex-col items-center pt-10 sm:pt-20 lg:pt-32 uw:pt-8 overflow-hidden z-[10]"> */}
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#5ce1e6]/20" />
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#5ce1e6] to-transparent" />
      <div className="absolute top-0 left-0 w-full h-[4px] bg-[#5ce1e6]/30 blur-[4px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[100rem] h-[120px] uw:h-[60px] bg-[#5ce1e6]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* PREVIOUS UI: <div className="w-full max-w-[90rem] px-6 lg:px-6 3xl:px-4 uw:px-4 uw:mt-6 mb-4 sm:mb-10"> */}
      <div className="footer-short-main w-full max-w-[90rem] px-6 lg:px-6 3xl:px-4 uw:px-4 uw:mt-6 mb-8 sm:mb-10">
        {/* PREVIOUS UI: <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-16 lg:gap-8 items-start"> */}
```

**Missions** — `components/Missions.tsx`
- Key Styles: `bg-black`, `px-6`, `text-4xl`, `font-bold`
- Animation: tw-transitions: transition-all, duration-700, ease-out
- State: useState, useRef

**PageTransition** — `components/PageTransition.tsx`
- Animation: framer-motion, transition: {duration: 0.5, ease: "easeInOut"}, animate-presence

```tsx
<AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
```

**PageWrapper** — `components/PageWrapper.tsx`
- Props: `children`, `className`, `hasHero`
- Key Styles: `bg-black`

**VelocityComplex** — `components/VelocityComplex.tsx`
- Key Styles: `bg-[#3d3d3d]`, `pt-12`, `text-3xl`, `font-orbit`, `opacity-50`, `hover:opacity-100`
- Animation: framer-motion, tw-transitions: transition-opacity, transition-all, duration-700

```tsx
/* PREVIOUS UI (Standard section container without mobile 100dvh height
```

**3dMarquee** — `components/ui/3d-marquee.tsx`
- Key Styles: `rounded-lg`, `border-gray-200/20`, `bg-zinc-900`, `gap-3`, `font-bold`, `shadow-lg`, `group-hover/news:opacity-100`
- Animation: framer-motion, transition: {duration: 25,
                                    repeat: Infinity,
                                    ease: "linear",}, animate: {y: colIndex % 2 === 0 ? [0, -150, 0] : [-150, 0, -150]}
- State: useState

**BackgroundBeams** — `components/ui/background-beams.tsx`
- Key Styles: `pointer-events-none`
- Animation: framer-motion, transition: {duration: Math.random() * 10 + 10,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    delay: Math.random() * 10,}, animate: {x1: ["0%", "100%"],
                                    x2: ["0%", "95%"],
                                    y1: ["0%", "100%"],
                                    y2: ["0%", `${93 + Math.random() * 8}
- State: memo

```tsx
<div
                className={cn(
                    "absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]",
                    className,
```

*...and 105 more layout components.*

### Navigation (28)

**HeroSection** — `components/HeroSection.tsx`
- Key Styles: `bg-black`, `px-8`, `text-4xl`, `font-bold`
- State: useRef

```tsx
<>
      {/* PREVIOUS UI: section className="relative h-screen w-full bg-black overflow-hidden snap-start snap-always" */}
      <section className="home-hero-screen relative h-[100dvh] sm:h-screen w-full bg-black overflow-hidden snap-start snap-always">
        {/* Background video - fills entire section */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
```

**Navbar** — `components/Navbar.tsx`
- Props: `href`
- Key Styles: `border-white/20`, `bg-black`, `px-4`, `text-sm`, `font-medium`, `shadow-2xl`, `group-hover:text-[#5ce1e6]`
- Animation: framer-motion, transition: {duration: 0.8,
                ease: [0.33, 1, 0.68, 1],}, animate-presence
- State: useState, useRef

**ProductSection** — `components/ProductSection.tsx`
- Key Styles: `rounded-none`, `border-l`, `bg-black`, `p-4`, `font-bold`, `shadow-2xl`, `pointer-events-none`
- Animation: framer-motion, transition: {duration: 0.5, delay: index * 0.1, ease: "easeOut"}, animate-presence
- State: useRef

**TechTools** — `components/TechTools.tsx`
- Key Styles: `rounded-full`, `border-white/20`, `bg-[#050505]`, `mx-auto`, `text-xs`, `font-bold`, `blur-[120px]`, `hover:border-[#5ce1e6]/50`
- Animation: framer-motion, transition: {duration: 0.5}, tw-transitions: transition-all, duration-300, transition-transform, transition-colors

```tsx
<section className="h-screen w-full bg-[#050505] relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <div className="max-w-4xl mx-auto p-4 relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 px-4 py-1.5 border border-white/20 bg-white/5 rounded-full overflow-hidden"
        >
          <span className="text-white text-xs font-bold uppercase tracking-[0.3em] font-orbit">
            Our Technology
          </span>
```

**Testimonials** — `components/Testimonials.tsx`
- Variants: `cover`, `contain`
- Props: `backgroundImage`, `date`, `category`, `title`, `description`, `readMoreLink`, `objectFit`, `bgColor`
- Key Styles: `bg-gradient-to-t`, `mb-2`, `text-sm`, `font-bold`, `group-hover:text-blue-600`
- Animation: motion-variant: variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0
    }, motion-variant: variants={variants}, framer-motion
- State: useState

```tsx
/* PREVIOUS UI (Standard card height without mobile adjustment
```

**Testimonials1** — `components/Testimonials1.tsx`
- Props: `length`
- Key Styles: `rounded-2xl`, `bg-white`, `px-6`, `text-2xl`, `font-sans`, `shadow-xl`, `focus:outline-none`
- Animation: tw-transitions: transition-transform, duration-500, ease-in-out, transition-all, duration-300
- State: useState

**CompanyMenu** — `components/Navbar/CompanyMenu.tsx`
- Props: `onClose`
- Key Styles: `rounded-full`, `border-l-2`, `bg-white`, `p-4`, `text-xl`, `font-orbit`, `shadow-2xl`, `pointer-events-none`
- Animation: framer-motion, transition: {duration: 0.6}, animate: {opacity: 1, y: 0}

```tsx
<div className="flex flex-col xl:flex-row w-full h-auto xl:h-[50vh] bg-white text-black overflow-hidden relative shadow-2xl">
            {/* Left Side - Black Panel */}
            <div className="w-full xl:w-1/3 bg-black text-white p-4 lg:p-12 flex flex-col justify-center relative overflow-hidden z-10 shadow-lg shrink-0">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
                <div className="absolute right-0 top-0 h-full w-1 bg-white/10" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#5ce1e6]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
```

**CounterSystemsMenu** — `components/Navbar/CounterSystemsMenu.tsx`
- Props: `onClose`
- Key Styles: `rounded-full`, `border-l-2`, `bg-white`, `p-4`, `text-xl`, `font-orbit`, `shadow-2xl`, `pointer-events-none`
- Animation: framer-motion, transition: {duration: 0.6}, animate: {opacity: 1, y: 0}

```tsx
<div className="flex flex-col xl:flex-row w-full h-auto xl:h-[50vh] bg-white text-black overflow-hidden relative shadow-2xl font-orbit">
            {/* Left Side - Black Panel */}
            <div className="w-full xl:w-1/3 bg-black text-white p-4 lg:p-12 flex flex-col justify-center relative overflow-hidden z-10 shadow-lg shrink-0">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
                <div className="absolute right-0 top-0 h-full w-1 bg-white/10" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#5ce1e6]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
```

*...and 20 more navigation components.*

### Data Display (2)

**Badge** — `components/ui/badge.tsx`
- Variants: `variant`, `default`, `hover`, `secondary`, `destructive`, `outline`
- Props: `className`, `variant`
- Key Styles: `rounded-full`, `px-2.5`, `text-xs`, `font-semibold`, `focus:outline-none`
- Animation: tw-transitions: transition-colors

```tsx
<div className={cn(badgeVariants({ variant }
```

**Timeline** — `components/ui/timeline.tsx`
- Props: `target`, `offset`
- Key Styles: `rounded-full`, `border-neutral-300`, `bg-white`, `mx-auto`, `text-2xl`, `font-sans`
- Animation: framer-motion
- State: useState, useRef

```tsx
<div className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10" ref={containerRef} > <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 text-center"> <h2 className="text-2xl md:text-5xl mb-4 text-black dark:text-white max-w-4xl mx-auto font-clash font-semibold"> Company Timeline </h2> <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base mx-auto"> Our journey from inception to innovation </p> </div> <div ref={ref} className="relative max-w-7xl mx-auto pb-20"> {data.map((item, index
```

### Data Input (3)

**ContactSection** — `components/ContactSection.tsx`
- Props: `fullName`, `email`, `phone`, `enquiryType`, `message`
- Key Styles: `rounded-sm`, `border-zinc-800`, `bg-black`, `py-16`, `text-4xl`, `font-orbit`, `opacity-80`, `hover:text-[#5ce1e6]`
- Animation: framer-motion, transition: {duration: 0.6}, tw-transitions: transition-colors, transition-opacity, duration-500, duration-300
- State: useState

```tsx
<div className="bg-black text-white py-16 px-4 font-orbit">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="uppercase text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">Reach Out to Us</h1>
                    <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-400 max-w-2xl mx-auto">
                        Got a question, idea, or collaboration in mind? Connect with our team directly via email — our team will be in touch soon.
```

**Input** — `components/ui/input.tsx`
- Key Styles: `rounded-md`, `border-input`, `bg-background`, `px-3`, `text-base`, `disabled:cursor-not-allowed`
- State: forwardRef

```tsx
<input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
```

**Textarea** — `components/ui/textarea.tsx`
- Key Styles: `rounded-md`, `border-input`, `bg-background`, `px-3`, `text-base`, `disabled:cursor-not-allowed`
- State: forwardRef

```tsx
<textarea
      className={cn(
        "flex min-h-[5rem] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
```

### Feedback (1)

**Loading** — `app/roadrunner/loading.tsx`

### Overlay (11)

**InitialLoader** — `components/InitialLoader.tsx`
- Key Styles: `bg-black`, `ml-[4.5rem]`, `filter`
- Animation: framer-motion, animate-presence, tw-transitions: ease-in-out, ease-out
- State: useState

**TestimonialsCarousel** — `components/TestimonialsCarousel.tsx`
- Props: `testimonials`
- Key Styles: `rounded-full`, `bg-white`, `pt-22`, `text-4xl`, `font-bold`, `cursor-pointer`
- Animation: framer-motion, transition: {duration: 0.3}, animate-presence
- State: useState

**BentoGrid01** — `components/ui/bento-grid-01.tsx`
- Key Styles: `rounded-full`, `border-2`, `bg-gradient-to-b`, `gap-3`, `text-4xl`, `font-orbit`
- Animation: framer-motion, transition: {duration: 10, repeat: Infinity, ease: "linear"}, animate-presence
- State: useState

**FeatureSection** — `components/ui/feature-section.tsx`
- Props: `features`, `className`, `title`, `autoPlayInterval`, `imageHeight`
- Key Styles: `rounded-lg`, `border-2`, `bg-gradient-to-t`, `mx-auto`, `text-3xl`, `font-bold`, `shadow-sm`
- Animation: framer-motion, transition: {duration: 0.6, ease: "easeInOut"}, animate-presence
- State: useState

**Map** — `components/ui/map.tsx`
- Props: `dots`, `start`, `lat`, `lng`, `label`, `lineColor`, `showLabels`, `labelClassName` (+8 more)
- Key Styles: `rounded-lg`, `border-gray-200`, `bg-white`, `px-2`, `text-sm`, `font-sans`, `drop-shadow-lg`, `pointer-events-none`
- Animation: motion-variant: variants={{
                                initial: { pathLength: 0, opacity: 0 }, motion-variant: variants={{
                                initial: { scale: 0, opacity: 0 }, motion-variant: variants={{
                                    initial: { opacity: 0, y: 20, scale: 0.95 }
- State: useState, useRef

```tsx
<div className="w-full aspect-[2/1] md:aspect-[2.5/1] lg:aspect-[2/1] dark:bg-black bg-white rounded-lg relative font-sans">
            <Image
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap
```

**OpposingMotionReveal** — `app/careers/components/OpposingMotionReveal.tsx`
- Key Styles: `rounded-none`, `border-neutral-900`, `bg-black`, `px-10`, `text-xs`, `font-black`, `shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]`, `select-none`
- Animation: framer-motion, transition: {duration: 1, ease: "easeOut"}, animate-presence
- State: useState, useRef

**BatLaunchSequence** — `app/uncrewedsystems/bat/components/BatLaunchSequence.tsx`
- Key Styles: `rounded-xl`, `border-2`, `bg-black`, `gap-[20px]`, `text-4xl`, `font-mono`, `opacity-60`, `select-none`
- Animation: framer-motion, transition: {duration: 0.8}, animate-presence
- State: useState, useRef

**Bat3DSequence** — `app/uncrewedsystems/bat/components/Bat3DSequence.tsx`
- Key Styles: `bg-white`, `mb-1`, `font-mono`, `opacity-[0.3]`, `select-none`
- Animation: framer-motion, transition: {delay: ((p.id === 5 && prevPhaseIndex === 4) ? 2.5 : 0) / SPEED, duration: (p.id === 5 ? 0.3 : 0.5) / SPEED}, animate-presence
- State: useState, useRef

*...and 3 more overlay components.*

### Typography (1)

**TextReveal** — `components/TextReveal.tsx`
- Variants: `inherit`
- Props: `lines`, `className`, `lineClassName`, `stagger`, `delay`, `triggerOnScroll`, `glowColor`
- Key Styles: `opacity-0`
- State: useRef

### Other (26)

**3dMarqueeDemo** — `components/3d-marquee-demo.tsx`
- Key Styles: `mx-auto`

```tsx
<div className="mx-auto my-4 lg:my-6 max-w-[95rem] w-full">
            <ThreeDMarquee items={repeatedItems} />
        </div>
```

**CharacterReveal** — `components/CharacterReveal.tsx`
- Variants: `inherit`
- Props: `text`, `className`, `lineClassName`, `stagger`, `delay`, `triggerOnScroll`, `targetColor`, `glowColor` (+1 more)
- State: useRef

**ContentWrapper** — `components/ContentWrapper.tsx`
- Props: `children`, `className`
- Key Styles: `px-6`

**FocusCardsDemo** — `components/focus-cards-demo.tsx`

**GoogleGeminiEffectDemo** — `components/google-gemini-effect-demo.tsx`
- Props: `target`, `offset`
- Key Styles: `rounded-md`, `bg-black`, `pt-40`
- State: useRef

```tsx
<div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
```

**Newsletter** — `components/Newsletter.tsx`

**ScrollToTop** — `components/ScrollToTop.tsx`

**SmoothScroll** — `components/SmoothScroll.tsx`

```tsx
<ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
```

*...and 18 more other components.*



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32
- **Border radius:** 2px, 6px, 8px, 12px, 16px, 50px
- **Max content width:** 1023px
- **Grid usage:** `grid-cols-2`, `grid-cols-1`, `col-span-1`, `grid-cols-3`, `grid-cols-6`
- **Container:** Tailwind `container` class with responsive padding

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

No box-shadow values detected. The design uses a **flat visual style** — elevation is conveyed through background color shifts and borders rather than shadows.

**Elevation Strategy:**
| Level | Technique | Use |
|---|---|---|
| 0 — Base | Background color | Page background |
| 1 — Raised | Lighter surface + subtle border | Cards, panels |
| 2 — Floating | Even lighter surface + stronger border | Dropdowns, popovers |
| 3 — Overlay | Backdrop + modal surface | Modals, dialogs |

**Z-Index Scale:** `1, 10, 20, 40, 50`


---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### Framer Motion Patterns

```tsx
// Standard enter animation
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
/>

// List stagger
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } }
}
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 }
}
```

### CSS Animations

- `@keyframes slideDown`
- `@keyframes slideUp`
- `@keyframes loading`
- `@keyframes megaMenuSlideDown`
- `@keyframes megaMenuSlideUp`
- `@keyframes fadeInUp`
- `@keyframes planeFlyDown`
- `@keyframes logoMoveLeft`

### Animated Components

- **ContactSection**: framer-motion, transition: {duration: 0.6}, tw-transitions: transition-colors, transition-opacity, duration-500, duration-300
- **Footer**: tw-transitions: transition-transform, duration-500, duration-300, transition-colors, transition-all, hover-transforms
- **InitialLoader**: framer-motion, animate-presence, tw-transitions: ease-in-out, ease-out
- **Missions**: tw-transitions: transition-all, duration-700, ease-out
- **Navbar**: framer-motion, transition: {duration: 0.8,
                ease: [0.33, 1, 0.68, 1],}, animate-presence

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#00a3cc` for interactive elements (buttons, links, focus rings)
- Use `#000000` as the primary page background
- Pair **Inter** (body) with **Farro** (display) — these are the only allowed fonts
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use border and background shifts for elevation — not shadows
- Use border-radius from the scale: 2px, 6px, 8px, 12px, 16px
- Reuse existing components from Section 4 before creating new ones
- Use **Lucide** for all icons
- Always use CSS variables for colors — never hardcode hex
- Test both light and dark modes for contrast

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond Inter and Farro
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't add box-shadow — this design system uses flat elevation
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't mix icon libraries — consistency matters

### Anti-Patterns (detected from codebase)

- No box-shadow on any element
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| 3xl | 112.5rem | tailwind |
| uw | 156.25rem | tailwind |
| breakpoint-768px | 768px | css |
| breakpoint-1024px | 1024px | css |
| breakpoint-1575px | 1575px | css |

**Approach:** Mobile-first using Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).
Always design for mobile first, then layer on responsive overrides.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #020817
Border: 1px solid var(--border)
Radius: 12px
Padding: 16px
Font: Inter
No shadows — use borders and surface colors for depth.
```

### Build a Button

```
Primary: bg #00a3cc, text white
Ghost: bg transparent, border var(--border)
Padding: 8px 16px
Radius: 12px
Hover: opacity 0.9 or lighter shade
Focus: ring with #00a3cc
```

### Build a Page Layout

```
Background: #000000
Max-width: 1023px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #020817
Label: #a3a3a3 (muted, 12px, uppercase)
Value: #ffffff (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #000000
Input border: 1px solid var(--border)
Focus: border-color #00a3cc
Label: #a3a3a3 12px
Spacing: 16px between fields
Radius: 12px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Inter, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: flat, surface shifts
```
