import { ArrowUpRight } from "lucide-react"

export default function ContactSection() {
    return (
        // PREVIOUS UI: py-16 md:py-24 gave the content more top spacing.
        // PREVIOUS UI: pt-12 md:pt-20.
        // contact-section: tablet and phone sizing lives in globals.css.
        <section aria-labelledby="contact-title" className="contact-section bg-black px-6 pb-16 pt-8 font-orbit text-white md:px-12 md:pb-24 md:pt-16 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <header className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-2 lg:items-end lg:gap-16">
                    <div>
                        <p className="mb-5 text-xs font-normal uppercase tracking-[0.2em] text-[#5ce1e6]">Contact Tsalla Aerospace</p>
                        {/* PREVIOUS UI: text-4xl md:text-5xl lg:text-6xl, with a forced break after Reach out. */}
                        <h1 id="contact-title" className="whitespace-nowrap text-[clamp(1rem,6vw,2.25rem)] font-medium uppercase leading-tight tracking-tight md:text-5xl lg:text-[clamp(2rem,3.5vw,3.75rem)]">
                            Reach out to us<span className="text-[#5ce1e6]">.</span>
                        </h1>
                    </div>
                    {/* PREVIOUS UI: Introduction paragraph used default left alignment. */}
                    <p className="max-w-lg text-justify text-lg font-light leading-relaxed text-neutral-400 md:text-xl">
                        Have a question, an idea, or a collaboration in mind? Let’s start a conversation.
                    </p>
                </header>

                <div className="grid border-y border-white/15 lg:grid-cols-2">
                    <div className="min-w-0 py-10 lg:py-12 lg:pr-12">
                        <p className="mb-3 text-xs uppercase tracking-[0.15em] text-neutral-400">Get in touch</p>
                        <h2 className="text-2xl font-medium leading-snug md:text-3xl">Connect with our team</h2>
                        <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-400">
                            For enquiries and partnerships, reach our team directly by email or phone.
                        </p>

                        <dl className="mt-10 space-y-7">
                            <div>
                                <dt className="mb-2 text-xs uppercase tracking-[0.15em] text-neutral-400">Email</dt>
                                <dd>
                                    <a href="mailto:info@tsallaaerospace.com" className="inline-block max-w-full break-words text-base font-normal leading-relaxed text-white underline decoration-white/30 underline-offset-8 transition-colors [@media(hover:hover)]:hover:text-[#5ce1e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#5ce1e6] sm:text-xl">
                                        info@tsallaaerospace.com
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt className="mb-2 text-xs uppercase tracking-[0.15em] text-neutral-400">Phone</dt>
                                <dd>
                                    <a href="tel:+919535720540" className="inline-flex min-h-11 items-center text-lg leading-relaxed transition-colors [@media(hover:hover)]:hover:text-[#5ce1e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ce1e6]">
                                        +91 95357 20540
                                    </a>
                                </dd>
                            </div>
                        </dl>

                        <a href="mailto:info@tsallaaerospace.com" className="mt-10 inline-flex min-h-12 items-center justify-center gap-8 border border-white px-6 py-3 text-sm font-normal transition-colors [@media(hover:hover)]:hover:bg-white [@media(hover:hover)]:hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ce1e6]">
                            Compose email
                            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                        </a>
                    </div>

                    <div className="min-w-0 border-t border-white/15 py-10 lg:border-l lg:border-t-0 lg:py-12 lg:pl-12">
                        <div className="mb-6">
                            <p className="mb-3 text-xs uppercase tracking-[0.15em] text-neutral-400">Our headquarters</p>
                            {/* PREVIOUS UI: Bengaluru inherited white text. */}
                            <h2 className="text-2xl font-medium leading-snug md:text-3xl"><span className="text-[#5ce1e6]">Bengaluru</span>, India</h2>
                            <address className="mt-3 text-base not-italic leading-relaxed text-neutral-400">Bengaluru, Karnataka 560012</address>
                        </div>
                        <div className="relative h-72 overflow-hidden border border-white/15 bg-neutral-900 sm:h-80">
                            <iframe
                                width="100%"
                                height="100%"
                                className="absolute inset-0 h-full w-full border-0 grayscale"
                                title="Tsalla Aerospace headquarters location in Bengaluru"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src="https://maps.google.com/maps?q=13.013616,77.568779&z=15&output=embed"
                            />
                        </div>
                        <a href="https://www.google.com/maps/search/?api=1&query=13.013616,77.568779" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-3 text-sm text-neutral-300 transition-colors [@media(hover:hover)]:hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ce1e6]">
                            Open in Google Maps <span className="sr-only">(opens in a new tab)</span>
                            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
