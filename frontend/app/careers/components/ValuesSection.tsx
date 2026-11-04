"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ContentWrapper } from "@/components/ContentWrapper"
import content from "../content.json"

export default function ValuesSection() {
  const values = [
    {
      title: "Impact",
      // PREVIOUS CONTENT: We build for environments where failure is not an option. Every contribution influences mission success.
      headline: content.values.items[0].headline,
      description: content.values.items[0].description,
      image:
        // PREVIOUS UI: "https://cdn.sanity.io/images/z5s3oquj/production/3647a8b9537089b773eaa34114f918b87f2b8ab1-1295x864.jpg?auto=format&fit=max&w=1200&q=90"
        "/careers/how%20we%20operate/IMPACT.jpg",
    },
    {
      title: "Autonomy",
      // PREVIOUS CONTENT: Self-motivation is vital. You’re empowered to act on your ideas — show, don’t tell.
      headline: content.values.items[1].headline,
      description: content.values.items[1].description,
      // PREVIOUS UI: image: "https://cdn.sanity.io/images/z5s3oquj/production/bbb0f40d0f389e428cfb75c2dece4ff485db0503-7892x5264.jpg?auto=format&fit=max&w=1200&q=90"
      // PREVIOUS UI: image: "/careers/how%20we%20operate/20260316_151102.JPG",
      image: "/careers/how%20we%20operate/Autonomy.png",
    },
    {
      title: "Speed",
      // PREVIOUS CONTENT: We operate with urgency and clarity. Concepts move rapidly from validation to refinement to deployment.
      headline: content.values.items[2].headline,
      description: content.values.items[2].description,
      // PREVIOUS UI: image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
      // PREVIOUS UI: image: "/careers/how%20we%20operate/20240810_172134.JPG",
      image: "/careers/how%20we%20operate/Speed.png",
    },
    {
      title: "Ownership",
      // PREVIOUS CONTENT: Everyone at Tsalla Aerospace has the ability to be a catalyst. You are encouraged to make your mark from day one and be supported every day after.
      headline: content.values.items[3].headline,
      description: content.values.items[3].description,
      image: // PREVIOUS UI: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80"
        "/careers/how%20we%20operate/Ownership.jpg",
    },
    {
      title: "Innovation",
      // PREVIOUS CONTENT: Hard problems demand engineering depth and not quick fixes – resulting in solutions that are robust and reliable.
      headline: content.values.items[4].headline,
      description: content.values.items[4].description,
      // PREVIOUS UI: image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
      image: "/careers/how%20we%20operate/Innovation.JPG",
    },
    {
      title: "Excellence",
      // PREVIOUS CONTENT: End-to-end ownership defines our work. Urgency does not dilute quality and mediocrity has no place in how we build.
      headline: content.values.items[5].headline,
      description: content.values.items[5].description,
      // PREVIOUS UI: image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80"
      // PREVIOUS UI: image: "/careers/how%20we%20operate/20240529_153120.JPG",
      // PREVIOUS UI: image: "/careers/how%20we%20operate/Excellence.JPG",
      image: "/careers/how%20we%20operate/Excellence.png",
    }
  ]

  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = values[selectedIndex]
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % values.length)
    }, 5000)
  }

  useEffect(() => {
    startAutoPlay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleTabClick = (index: number) => {
    setSelectedIndex(index)
    startAutoPlay()
  }

  return (
    <section id="how-we-operate" className="min-h-[100svh] flex flex-col justify-center bg-black text-white py-36 font-orbit">
      <ContentWrapper>
        <div className="careers-values-layout max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-[110rem] mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Heading and description */}
          <div className="careers-values-intro md:-mt-39 md:-ml-6 lg:-ml-0 xl:-ml-12 2xl:-ml-3">
            <h2 className="careers-section-title text-white mb-6 uppercase">
              {/* Our Key Values
               */}
              How we Operate

            </h2>
            <p className="careers-label text-[#5ce1e6] mb-4">{content.values.tagline}</p>
            <p className="careers-body text-gray-300 text-justify mb-8">
              {/* PREVIOUS CONTENT: Tsalla Aerospace is where visionaries and veterans converge to reimagine what's possible in flight and defense. We prototype by sunrise, refine by midnight, and never settle for ordinary. Shaped by lived experience and fearless innovation, our team transforms challenges into breakthroughs. */}
              {content.values.description}
            </p>

            {/* Tabs */}
            {/* Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-2 gap-y-4 w-full ">
              {values.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`group relative px-4 py-3 border border-white text-sm md:text-base font-medium transition-all text-left overflow-hidden ${index === selectedIndex
                    ? "bg-neutral-800 text-white"
                    : "bg-black text-gray-400"
                    }`}
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className={`relative z-10 transition-colors duration-300 group-hover:text-black uppercase tracking-[0.1em] ${index === selectedIndex ? 'text-white' : 'text-gray-400'}`}>
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Image + title + description */}
          <div className="careers-values-visual relative h-[20rem] sm:h-[22rem] md:h-[31.25rem] w-full p-2 md:p-3 border border-transparent">

            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={selected.image || "/shared/placeholders/placeholder.svg"}
                alt={selected.title}
                fill
                className="object-cover brightness-125"
                priority
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-8">
                <h3
                  key={selected.title + selectedIndex}
                  className="careers-card-title border-b border-white pb-2 mb-4 animate-text-up uppercase"
                >
                  {/* PREVIOUS CONTENT: selected.title */}
                  {selected.headline}
                </h3>
                <p
                  key={selected.description + selectedIndex}
                  className="careers-body text-gray-200 max-w-xl animate-text-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  {selected.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  )
}
