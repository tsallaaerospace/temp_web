"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Briefcase } from "lucide-react"
import { ContentWrapper } from "@/components/ContentWrapper"
import { internships, fullTimeRoles } from "../data/jobs"

export default function JobOpeningsPage() {
  const [activeTab, setActiveTab] = useState("fulltime")

  const jobs = activeTab === "internships" ? internships : fullTimeRoles



  return (
    <section className="w-full min-h-screen bg-black text-white py-20 font-orbit" id="open-positions">
      {/* Title and Description */}
      <div className="w-full px-6 md:px-20">
        <h2
          className="careers-section-title text-white mb-6 uppercase"
        >
          Job Openings
        </h2>
        <p
          className="careers-body careers-jobs-intro text-neutral-400 text-justify mb-10 w-full"
        >
          At Tsalla Aerospace, innovation drives everything we do. Join us and bring your expertise to a team dedicated
          to building exceptional Autonomy solutions. Browse through our current openings and find the role where your
          strengths can truly shine.
        </p>
      </div>

      <ContentWrapper>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-16 px-4">
          <button
            onClick={() => {
              setActiveTab("fulltime")
            }}
            className={`group relative px-8 py-3 bg-black/40 border transition-all duration-300 overflow-hidden ${activeTab === "fulltime" ? "border-white" : "border-white/10"
              }`}
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span
              className={`relative z-10 text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${activeTab === "fulltime"
                ? "text-white group-hover:text-black"
                : "text-white group-hover:text-black"
                }`}
              style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
            >
              Full Time Roles
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("internships")
            }}
            className={`group relative px-8 py-3 bg-black/40 border transition-all duration-300 overflow-hidden ${activeTab === "internships" ? "border-white" : "border-white/10"
              }`}
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span
              className={`relative z-10 text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${activeTab === "internships"
                ? "text-white group-hover:text-black"
                : "text-white group-hover:text-black"
                }`}
            >
              Internships
            </span>
          </button>
        </div>

        {/* Job Listings Header */}
        <p className="flex items-center gap-2 text-neutral-400 text-xs mb-6 md:hidden">
          <MapPin className="w-4 h-4 text-[#5ce1e6] shrink-0" />
          All roles based in Bengaluru, India
        </p>
        <p
          className="text-neutral-600 mb-8 font-light text-xs md:text-sm tracking-wide"
        >
          Showing 1–{jobs.length} Results Out Of Total {jobs.length} Open Jobs...
        </p>

        {/* Job Listings */}
        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6">
          {jobs.map((job, index) => (
            <Link
              href={`/careers/${job.slug}`}
              key={index}
              className="block h-full"
            >
              <div className="relative p-5 md:p-8 min-h-[96px] md:min-h-0 bg-neutral-900/50 border border-white/5 flex flex-col justify-center md:justify-between text-center md:text-left h-full group transition-all duration-300 hover:bg-neutral-900">
                <div>
                  <h3
                    className="careers-card-title text-white md:mb-4 md:min-h-[3.75rem]"
                  >
                    {job.title}
                  </h3>
                  <p className="md:hidden mt-2 text-xs text-neutral-400">
                    {activeTab === "internships" ? "Internship Program" : "Full-Time Role"}
                  </p>

                  {/* Metadata Icons */}
                  <div className="hidden md:flex flex-row flex-wrap items-center gap-6 mb-2 text-neutral-400 text-xs tracking-wide">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#5ce1e6]" />
                      <span>
                        {job.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#5ce1e6]" />
                      <span>
                        {activeTab === "internships" ? "Internship Program" : "Full-Time Role"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ContentWrapper>
    </section>
  )
}
