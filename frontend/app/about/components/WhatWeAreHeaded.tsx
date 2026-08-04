"use client"

import Image from "next/image"
import Link from "next/link"

export default function WhatWeAreHeaded() {
  return (
    <section className="bg-black text-white font-orbit w-full overflow-hidden">
      {/* Top Header Section */}
      <div className="w-full px-4 md:px-8 lg:px-20 pt-24 md:pt-32 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-8">
          <div className="max-w-5xl">

            <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] xl:text-[4rem] font-semibold tracking-[0.05em] text-white pt-2 pb-2 uppercase" style={{ lineHeight: 0.9 }}>
              ON A MISSION TO PROTECT OUR PROTECTORS.
            </h2>
          </div>

          <Link
            href="/solutions"
            className="bg-transparent text-white border border-white px-6 py-3 text-[10px] md:text-xs font-semibold hover:bg-white hover:text-black transition-all duration-300 shrink-0 whitespace-nowrap"
          >
            Discover Our Solutions
          </Link>
        </div>
      </div>

      {/* Full Width Image */}
      <div className="w-full h-[40vh] md:h-[60vh] lg:h-[80vh] relative">
        <Image
          src="/images/design-mode/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg"
          alt="Where We're Headed Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Bottom Text Section */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
          {/* Left Column Label */}
          <div className="md:col-span-3 lg:col-span-4">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 block pt-1 md:pt-2">
              {/* Our Vision */}
            </span>
          </div>

          {/* Right Column Content */}
          {/* <div className="md:col-span-8 md:col-start-6 lg:col-span-6 lg:col-start-7 max-w-2xl lg:ml-auto">
            <h3 className="text-lg md:text-xl lg:text-[1.35rem] font-normal leading-[1.6] text-white mb-10 tracking-tight text-justify">
              We envision a world where intelligent aerial systems transcend today's limitations — autonomously
              navigating complex environments, connecting communities, and pushing the
              boundaries of what flight can achieve.
            </h3>


          </div> */}
        </div>
      </div>
    </section>
  )
}
