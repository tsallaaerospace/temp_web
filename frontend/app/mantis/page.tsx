import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import SectionSnap from "@/components/SectionSnap"
import MantisSpecifications from "./components/MantisSpecifications"
import MantisDetails from "./components/MantisDetails"
import MantisThreePhase from "./components/MantisThreePhase"
import MantisLast from "./components/MantisLast"
import ProductHeading, { ProductHeroTitle } from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

export const metadata: Metadata = {
  title: "MANTIS - Tsalla Aerospace",
}

export default function MantisPage() {
  return (
    <PageWrapper hasHero className="mantis-page font-orbit">
      <SectionSnap panels=".mantis-page > section, footer" />
      <section data-mantis-section="hero" data-navbar-text="white" className="relative isolate h-[100svh] min-h-[30rem] w-full overflow-hidden bg-black">
        <picture>
          <source media="(max-width: 767px)" srcSet="/product/Mantis/mantis-hero-mobile-bg.webp" />
        <img
          src="/product/Mantis/here_bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        </picture>
        <picture>
          <source media="(max-width: 767px)" srcSet="/product/Mantis/mantis-hero-mobile-drone.webp" />
        <img
          src="/product/Mantis/Mantis-hero.png"
          alt="MANTIS drone in an illuminated hangar"
          className="mantis-hero-drone pointer-events-none absolute inset-0 z-10 h-full w-full translate-y-[3%] scale-[0.9] object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
        </picture>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        {/* PREVIOUS UI: hero title used clamp(3.5rem,8vw,9rem). */}
        <ProductHeroTitle className="absolute bottom-[clamp(2rem,7vh,6rem)] left-[var(--fenix-title-inset)] z-30 m-0 text-white">
          MANTIS
        </ProductHeroTitle>
      </section>
      <MantisThreePhase />
      <MantisSpecifications />
      <section aria-labelledby="mantis-perspective-title" className="relative isolate h-[100svh] w-full overflow-hidden bg-black font-orbit text-white">
        <img
          src="/product/Mantis/Mantis-Back-Transparent.png"
          alt="Close rear view of the MANTIS drone showing its wings and four propellers"
          className="absolute inset-0 z-10 h-full w-full object-cover object-center pointer-events-none"
          loading="lazy"
          decoding="async"
        />
        {/* PREVIOUS UI (top-[clamp(6.5rem,15vh,11rem)] title position):
        <ProductHeading id="mantis-perspective-title" className="absolute inset-x-0 top-[clamp(6.5rem,15vh,11rem)] z-0 px-[clamp(1.25rem,5vw,7rem)] !text-[clamp(2rem,4vw,4.5rem)] text-center tracking-[-0.03em]">
          A new perspective on <CharacterReveal text="flight." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />
        </ProductHeading>
        */}
        {/* PREVIOUS UI (top-left, in front of the drone): className="product-title-position z-20 tracking-[-0.03em]"
            Now centred, lower down, a little larger than the shared title size, and behind the drone (z-0 under the image's z-10). */}
        {/* PREVIOUS UI ("A new perspective on flight."):
        <ProductHeading id="mantis-perspective-title" className="absolute inset-x-0 top-[19%] z-0 px-[var(--fenix-title-inset)] !text-[clamp(2.75rem,4.2vw,5rem)] text-center tracking-[-0.03em]">
          A new perspective on <CharacterReveal text="flight." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />
        </ProductHeading>
        */}
        {/* PREVIOUS UI ("A new perspective on strike." with lowercase s):
        <ProductHeading id="mantis-perspective-title" className="absolute inset-x-0 top-[19%] z-0 px-[var(--fenix-title-inset)] !text-[clamp(2.75rem,4.2vw,5rem)] text-center tracking-[-0.03em]">
          A new perspective on <CharacterReveal text="strike." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />
        </ProductHeading>
        */}
        <ProductHeading id="mantis-perspective-title" className="absolute inset-x-0 top-[19%] z-0 px-[var(--fenix-title-inset)] !text-[clamp(2.75rem,4.2vw,5rem)] text-center tracking-[-0.03em]">
          A new perspective on <CharacterReveal text="Strike." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />
        </ProductHeading>
      </section>
      <MantisDetails />
      <section aria-label="MANTIS swarm across day and night" className="relative isolate h-[100svh] w-full overflow-hidden bg-black">
        <img
          src="/product/Mantis/Day_night.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/product/Mantis/Mantis-swarm.png"
          alt="A formation of MANTIS drones flying across a day and night sky"
          className="mantis-swarm-drone absolute inset-0 h-full w-full scale-[0.9] object-contain sm:object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </section>
      <MantisLast />
    </PageWrapper>
  )
}
