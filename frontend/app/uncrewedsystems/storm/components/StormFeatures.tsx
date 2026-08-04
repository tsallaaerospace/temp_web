"use client"

import type React from "react"

interface SpecItemProps {
  label: string
  value: string
}

const SpecItem: React.FC<SpecItemProps> = ({ label, value }) => (
  <div className="border-b border-neutral-300 last:border-b-0">
    <div className="flex justify-between py-3 text-xl leading-tight tracking-tight text-neutral-800">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  </div>
)

// Inline content wrapper so it can be styled here
const ContentWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`w-full px-6 md:px-12 xl:px-24 max-w-[90rem] mx-auto ${className}`}
    style={{ marginLeft: "1.5rem" }} // adjusted to move left
  >
    {children}
  </div>
)

export default function StormFeatures(): React.JSX.Element {
  const specifications: SpecItemProps[] = [
    { label: "Endurance", value: "30+ mins" },
    { label: "Cruise Speed", value: "15 m/s Optimal" },
    { label: "Altitude", value: "500 m AGL" },
    { label: "Lift Capacity", value: "20 - 25 kg" },
    { label: "Communication", value: "Over 15km LOS" },
  ]

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
      `}</style>

      <div className="bg-white min-h-screen w-full flex flex-col">

        {/* SECTION TITLE - Matching Mission Profiles */}
        {/* <div className="pt-12 md:pl-4 md:pr-20 w-full">
          <div className="text-left mb-12">
            <h1 className="section-title text-5xl leading-tight tracking-tight">Key Features</h1>
            <p className="section-description mt-4">
              Each feature unlocks new possibilities — precision, power, and performance built into every flight.
            </p>
          </div>
        </div> */}

        <div className="flex flex-col md:flex-row flex-grow">
          {/* LEFT COLUMN */}
          <div className="md:w-1/2 w-full">
            <ContentWrapper className="pb-16 md:pb-24">
              <div className="max-w-md w-full">
                <p className="section-description mb-12">
                  Where control meets motion, STORM touches down with confidence. Designed for shifting decks and offshore
                  demands, it ensures safe, precise landings when stability is hard to find.
                </p>
                <div className="w-full">
                  {specifications.map((spec, index) => (
                    <SpecItem key={`${spec.label}-${index}`} label={spec.label} value={spec.value} />
                  ))}
                </div>
              </div>
            </ContentWrapper>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:w-1/2 w-full h-72 md:h-screen">
            <img
              src="/images/design-mode/0649dbe96de92e27212722dbfc01e42c576247ad-1080x1235.png"
              alt="STORM Drone in flight"
              className="object-cover w-full h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = `https://placehold.co/800x600/1a1a1a/ffffff?text=Image+Unavailable`
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
