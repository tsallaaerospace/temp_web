import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen bg-black font-orbit">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Content */}
        <div className="flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-lg space-y-8 lg:-translate-x-14 lg:-translate-y-24">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-white uppercase">
                Mission
              </h1>

              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-400 text-justify">
                Advanced Systems for a New Defense Paradigm.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="relative">
          <Image
            src="/images/design-mode/istock-drone-image-e1462996105863.jpg"
            alt="Drone flying over vineyard landscape"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
