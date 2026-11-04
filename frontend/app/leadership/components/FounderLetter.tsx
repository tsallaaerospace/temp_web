"use client"

import { Caveat } from "next/font/google"
import { motion, useReducedMotion } from "framer-motion"

// Handwritten letter face for the founder's note (loaded like the site's Inter/Farro in app/layout.tsx)
const handwriting = Caveat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

// Key phrases in the accent cyan (#00a3cc reads on white; the lighter #5ce1e6 is for dark sections)
const Mark = ({ children }: { children: React.ReactNode }) => <span className="text-[#00a3cc]">{children}</span>

// PREVIOUS UI: the Leadership page used about/components/AwardsAndCertification.tsx here ("GET IN TOUCH" over a
// drone photo with Connect with us / Join the Mission buttons). That file is unchanged and still used by the About page.
export default function FounderLetter() {
  const reduceMotion = useReducedMotion()
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }

  return (
    <section aria-labelledby="founder-letter-title" className="relative w-full min-h-screen bg-white text-neutral-900 px-6 py-24 md:py-32">
      <motion.article {...reveal} className="mx-auto w-full max-w-3xl">
        <p className="font-orbit text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-500">A note from the founder</p>

        <h2 id="founder-letter-title" className={`${handwriting.className} mt-6 text-4xl md:text-6xl font-semibold leading-tight`}>
          Those who protect us deserve <Mark>the best we can build.</Mark>
        </h2>

        <div className={`${handwriting.className} mt-10 space-y-6 text-[1.375rem] md:text-[1.75rem] leading-[1.45] text-neutral-800`}>
          <p>
            I started Tsalla Aerospace with a conviction: <Mark>India has the talent</Mark> to build technology that our armed
            forces can depend on. Making that happen is <Mark>our responsibility</Mark>.
          </p>
          <p>
            For someone serving at a remote border or at sea, the limits of their equipment have <Mark>real consequences</Mark>.
            That gives our work its purpose—and sets the standard we have to meet.
          </p>
          <p>
            We have chosen <Mark>difficult problems</Mark>. There will be designs that fail, flights that challenge our
            assumptions, and days when progress has to be earned all over again. We must be honest about what isn’t working,
            learn from the evidence, and <Mark>take responsibility</Mark> for making it better.
          </p>
          <p>
            I want to build a company where people can do <Mark>the most meaningful work of their lives</Mark>. Where a young
            engineer can challenge my thinking. Where experience from the field shapes decisions in the lab. Where you have the
            freedom to pursue an idea and the support to see it through.
          </p>
          <p>
            If you join us, you will help decide what we build, how well we build it, and whether it <Mark>earns the trust</Mark> of
            those who use it.
          </p>
          <p>
            That is the <Mark>opportunity</Mark>. That is the <Mark>responsibility</Mark>.
          </p>
          <p>
            Let’s build something <Mark>worthy of their trust</Mark>.
          </p>
        </div>

        <footer className="mt-14">
          <p className={`${handwriting.className} text-4xl md:text-5xl font-bold text-neutral-900`}>Vinayak Tsalla</p>
          <p className="font-orbit mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-neutral-500">Founder &amp; CEO, Tsalla Aerospace</p>
        </footer>
      </motion.article>
    </section>
  )
}
