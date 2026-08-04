"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ContentWrapper } from "@/components/ContentWrapper"

export default function ValuesSection() {
  const values = [
    {
      title: "Impact",
      description:
        "We build for environments where failure is not an option. Every contribution influences mission success.",
      image:
        "https://cdn.sanity.io/images/z5s3oquj/production/3647a8b9537089b773eaa34114f918b87f2b8ab1-1295x864.jpg?auto=format&fit=max&w=1200&q=90",
    },
    {
      title: "Autonomy",
      description: "Self-motivation is vital. You’re empowered to act on your ideas — show, don’t tell.",
      image:
        "https://cdn.sanity.io/images/z5s3oquj/production/bbb0f40d0f389e428cfb75c2dece4ff485db0503-7892x5264.jpg?auto=format&fit=max&w=1200&q=90",
    },
    {
      title: "Speed",
      description: " We operate with urgency and clarity. Concepts move rapidly from validation to refinement to deployment.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Ownership",
      description: "Everyone at Tsalla Aerospace has the ability to be a catalyst. You are encouraged to make your mark from day one and be supported every day after.",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Innovation",
      description: "Hard problems demand engineering depth and not quick fixes – resulting in solutions that are robust and reliable.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Excellence",
      description: "End-to-end ownership defines our work. Urgency does not dilute quality and mediocrity has no place in how we build.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
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
    <section id="how-we-operate" className="bg-black text-white py-36 font-orbit">
      <ContentWrapper>
        <div className="max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-[110rem] mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Heading and description */}
          <div className="md:-mt-39 md:-ml-6 lg:-ml-0 xl:-ml-12 2xl:-ml-3">
            <h2 className="text-white mb-6 uppercase tracking-widest text-4xl sm:text-5xl md:text-5xl lg:text-[3.5rem] xl:text-[4.0rem] font-semibold leading-tight xl:whitespace-nowrap">
              {/* Our Key Values
               */}
              How we Operate

            </h2>
            <p className="text-[15px] sm:text-base lg:text-[0.88rem] font-light leading-relaxed text-gray-300 mb-8 text-justify">              Tsalla Aerospace is where visionaries and veterans converge to reimagine what's possible in flight and
              defense. We prototype by sunrise, refine by midnight, and never settle for ordinary. Shaped by lived
              experience and fearless innovation, our team transforms challenges into breakthroughs.
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
          <div className="relative h-[20rem] sm:h-[22rem] md:h-[31.25rem] w-full p-2 md:p-3 border border-transparent">

            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={selected.image || "/placeholder.svg"}
                alt={selected.title}
                fill
                className="object-cover brightness-125"
                priority
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-8">
                <h3
                  key={selected.title + selectedIndex}
                  className="text-2xl md:text-3xl font-semibold border-b border-white pb-2 mb-4 animate-text-up uppercase tracking-[0.1em]"
                >
                  {selected.title}
                </h3>
                <p
                  key={selected.description + selectedIndex}
                  className="text-gray-200 text-base md:text-lg max-w-xl animate-text-up text-justify"
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
