"use client"

import type React from "react"
import ContentWrapper from "../../../components/ContentWrapper"
import MaverickShipText from "./MaverickShipText"

export default function MaverickShip(): React.JSX.Element {
  return (
    <section className="font-orbit bg-black w-full min-h-screen flex items-center py-32">

      <ContentWrapper>
        {/* Main container with a two-column layout */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Image */}
          <div className="w-full md:w-1/2">
            <img
              src="/images/design-mode/Stage-3.png"
              alt="Network of interconnected drones and ships"
              className="w-full h-[135%] object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = "https://placehold.co/600x400/1a1a1a/ffffff?text=Synchronize+Unseen"
              }}
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="w-full md:w-1/2">
            <MaverickShipText />
          </div>
        </div>
      </ContentWrapper>
    </section>
  )
}
