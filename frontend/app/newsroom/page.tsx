"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import PageWrapper from "@/components/PageWrapper"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Search, X, ExternalLink } from "lucide-react"

interface NewsArticle {
  title: string
  date: string
  image: string
  cardImage?: string
  readMoreLink: string
  category: string
  description: string
}

const newsCategories = [
  { name: "News", value: "news" },
  { name: "Events", value: "events" },
]

const featuredNews = {
  title: "Tsalla Awarded $99.6M for Indian. Army Next Generation Command and Control Prototype",
  date: "7/18/2025",
  image:
    "https://cdn.sanity.io/images/z5s3oquj/production/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg?auto=format&fit=max&w=1920&q=90",
  readMoreLink: "/newsroom/anduril-awarded-army-contract",
  category: "news",
}

const allNewsArticles: NewsArticle[] = [
  // ── NEWS (5) ──
  {
    title: "ICC Summit in Vizag Highlights India's Push for Indigenous Defence Technology",
    date: "23 February 2026",
    image: "https://static.toiimg.com/thumb/msid-128722242,imgsize-46774,width-1280,height-720,resizemode-4/128722242.jpg",
    cardImage: "/images/News/news/The_Times_Of_India_graphic.jpg",
    readMoreLink: "https://timesofindia.indiatimes.com/city/vijayawada/icc-summit-in-vizag-highlights-indias-push-for-indigenous-defence-technology/articleshow/128722251.cms",
    category: "news",
    description: "Visakhapatnam: The ICC Defence Start-up and Autonomous Systems Summit, held in Vizag on 23 February 2026, spotlighted India's rapidly growing defence, aerospace, and autonomous systems sector — and Tsalla Aerospace was among over 50 startups selected to present at the landmark event.\n\nTsalla showcased its GPS-independent autonomous drone platform before an audience of policymakers, armed forces representatives, PSUs, and private industry leaders at the Radisson Blu. Vice Admiral Sanjay Bhalla, Flag Officer Commanding-in-Chief of the Eastern Naval Command, was the chief guest. Dr. G. Satheesh Reddy, President of the Aeronautical Society of India, spoke on Andhra Pradesh's role in strengthening national defence manufacturing.\n\nThe summit, organized by the Indian Chamber of Commerce, aimed to shape policy for 'Make in India' in defence, identify opportunities for SMEs and startups in high-tech areas, and showcase the burgeoning defence startup ecosystem — a platform where Tsalla Aerospace's autonomy-first approach stood out as a serious, field-ready capability.",
  },
  {
    title: "Tsalla Aerospace at ICC Defence Start-Up & Autonomous Systems Summit, Vizag",
    date: "23 February 2026",
    image: "https://static.toiimg.com/thumb/msid-128722243,width-1280,height-720,resizemode-4/128722243.jpg",
    cardImage: "/images/News/news/The_Times_Of_India_graphic.jpg",
    readMoreLink: "https://timesofindia.indiatimes.com/city/vijayawada/icc-summit-in-vizag-highlights-indias-push-for-indigenous-defence-technology/articleshow/128722251.cms",
    category: "news",
    description: "The ICC Defence Start-up and Autonomous Systems Summit in Visakhapatnam brought together policymakers, armed forces, PSUs, and the private industry to advance India's indigenous defence technology ecosystem.\n\nTsalla Aerospace presented its GPS-independent autonomous drone — a system built to operate without human intervention even in GPS and communication-denied environments. Founded in 2019 and incubated at IISc, Tsalla's AI Pilot autonomy stack underpins its hardware-agnostic platform approach.\n\nBeyond the demonstration, the summit underscored the strategic imperative for Indian startups in high-tech defence: closing the gap between innovation and field-readiness. For Tsalla, the visibility at a platform of this calibre is another step in establishing its position at the forefront of India's autonomous systems landscape.",
  },
  {
    title: "Deeptech Startup Tsalla Aerospace Raises $1 Million",
    date: "18 October 2024",
    image: "/images/News/news/Deccan-Herald-Logo.webp",
    cardImage: "/images/News/news/Deccan-Herald-Logo.webp",
    readMoreLink: "https://www.deccanherald.com/business/deeptech-startup-tsalla-aerospace-raises-1-million-3786057",
    category: "news",
    description: "Bengaluru-based deeptech startup Tsalla Aerospace has successfully raised $1 million in its first external funding round led by Sunny Stalnaker, Executive Vice President of ASML.\n\nThe round also saw participation from the Small Industries Development Bank of India (SIDBI) and included equity-free grants from the Ministry of Defence's Innovations for Defence Excellence (iDEX) programme. Founded in 2019 and incubated at IISc, Tsalla specializes in AI-powered autonomy systems for drones and unmanned vehicles.\n\nTsalla currently works with the Indian Navy and Indian Army on key defence projects, including confined-space reconnaissance systems, rapid-deployment VTOL platforms, and high-altitude logistics solutions.",
  },
  {
    title: "Indian Army Selects Tsalla STORM for Border Surveillance Operations",
    date: "6/10/2025",
    image: "/blueprint-background.png",
    readMoreLink: "/newsroom/storm-army-contract",
    category: "news",
    description: "The Indian Army has selected Tsalla Aerospace's STORM unmanned system for deployment along critical border regions. Following a rigorous multi-stage evaluation, STORM demonstrated superior performance in high-altitude, low-temperature environments with consistent 24/7 operational capability.\n\nThe contract covers an initial fleet deployment with provisions for system integration with the Army's existing C2 infrastructure, along with a comprehensive support and maintenance program spanning five years.",
  },
  {
    title: "Tsalla Aerospace Opens New R&D Center in Hyderabad Focused on AI-Driven Defense Systems",
    date: "5/28/2025",
    image: "/blueprint-background.png",
    readMoreLink: "/newsroom/hyderabad-rd-center",
    category: "news",
    description: "Tsalla Aerospace inaugurated its state-of-the-art Research & Development Center in Hyderabad, dedicated to advancing artificial intelligence applications in defense systems. The 120,000 sq. ft. facility will house over 400 engineers and researchers working on autonomy, computer vision, and edge-compute platforms.\n\nThe center marks a significant milestone in Tsalla's expansion roadmap and reinforces India's growing role as a global hub for autonomous defense innovation.",
  },
  {
    title: "Tsalla VULCAN Counter-Drone System Completes Successful Live-Fire Evaluation",
    date: "5/15/2025",
    image: "/blueprint-background.png",
    readMoreLink: "/newsroom/vulcan-evaluation",
    category: "news",
    description: "The VULCAN counter-UAS system developed by Tsalla Aerospace has successfully completed a comprehensive live-fire evaluation at a classified test range. The system demonstrated an intercept success rate exceeding 95% against a variety of drone threat profiles, including swarm configurations and high-speed micro-UAVs.\n\nVULCAN's integrated RF detection, electro-optical tracking, and directed-energy neutralization capabilities establish it as a leading solution for point defense of critical infrastructure and forward operating bases.",
  },
  // ── EVENTS (3) ──
  {
    title: "Tsalla at the Dutch Prime Minister's Visit to IISc, Bangalore",
    date: "20 February 2026 · Indian Institute of Science, Bangalore",
    image: "/images/News/events/event1.png",
    cardImage: "/images/News/events/event1-cover.png",
    readMoreLink: "#",
    category: "events",
    description: "Tsalla Aerospace was among six startups handpicked by the Dutch Embassy to present before H.E. Dick Schoof, Prime Minister of the Netherlands, during his official visit to the Indian Institute of Science. The selection placed Tsalla in rare company — recognized not just as a technology venture, but as a serious player in the future of autonomous systems.\n\nWe walked the Prime Minister through our current platforms, highlighting where our technology stands today and where it is headed — a conversation that reflected growing international interest in what India's defense-tech ecosystem is building.",
  },
  {
    title: "Demonstrating Heavy-Lift Autonomy to Greece's Defence Minister",
    date: "08 February 2026 · Indian Army 515 Base Workshop, Bangalore",
    image: "/images/News/events/event2.png",
    cardImage: "/images/News/events/event2-cover.png",
    readMoreLink: "#",
    category: "events",
    description: "During the official visit of Mr. Nikos Dendias, Defence Minister of Greece, to the Indian Army's 515 Base Workshop, we were among the select teams chosen to present our autonomous systems capabilities — a demonstration that put our heavy-lift multirotor platform, STORM in front of one of Europe's key defence decision-makers.\n\nThe conversation has since moved beyond the demonstration floor — an outcome that speaks to the operational relevance of what we are building and the appetite for capable, field-ready autonomous systems for high-altitude requirements.",
  },
  {
    title: "At the Indian Navy's Table — Swavlamban 2025",
    date: "25 November 2025 · New Delhi",
    image: "/images/News/events/event3.png",
    readMoreLink: "#",
    category: "events",
    description: "Swavlamban is where the Indian Navy brings its problem statements to the innovators solving them. We were there — presenting our autonomous system, FENIx, to naval personnel and decision-makers at one of India's most operationally-focused defense innovation platforms.\n\nBeyond the showcase, the event opened doors for new hardware partnerships, conversations with potential deployment partners, and a clearer line of sight into the Navy's evolving requirements for autonomous systems.",
  },
]

export default function NewsroomPage() {
  const [activeCategory, setActiveCategory] = useState("news")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [panelVisible, setPanelVisible] = useState(false)

  // Lock body scroll when panel is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden"
      setTimeout(() => setPanelVisible(true), 10)
    } else {
      setPanelVisible(false)
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [selectedArticle])

  const closePanel = () => {
    setPanelVisible(false)
    setTimeout(() => setSelectedArticle(null), 400)
  }

  const handleSearch = () => {
    console.log("Searching for:", searchTerm)
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const filteredArticles = useMemo(() => {
    let filtered = allNewsArticles.filter(
      (article) => article.category === activeCategory
    )

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.date.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [activeCategory, searchTerm])

  const shouldShowFeatured =
    activeCategory === "news" &&
    (!searchTerm.trim() || featuredNews.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <PageWrapper>
      <div
        className={`min-h-screen bg-white font-orbit transition-all duration-700 ease-in-out ${panelVisible ? "blur-md opacity-80 pointer-events-none select-none scale-[0.97]" : "blur-0 opacity-100 scale-100"
          }`}
      >

        {/* ── HERO SECTION ── */}
        <div className="relative overflow-hidden bg-white">
          {/* Subtle grid texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Radial glow accent */}
          <div className="absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full bg-[#B4933A]/8 blur-[120px] pointer-events-none" />

          {/* Header container — left aligned */}
          <div className="relative z-10 pl-20 pr-10 pt-24 pb-10">
            {/* Eyebrow label */}
            <p className="font-orbit text-[11px] tracking-[0.28em] uppercase text-black mb-5">
              Newsroom
            </p>

            {/* Page title */}
            <h1 className="font-orbit text-5xl md:text-6xl lg:text-7xl font-semibold text-[#0c0d10] leading-[1.05]">
              News &amp; Insights
            </h1>
          </div>

          {/* Featured article container — centered */}
          <div className={`relative z-10 max-w-6xl mx-auto px-6 ${shouldShowFeatured ? "pb-16" : "pb-2"}`}>
            {/* Featured article — split layout */}
            {shouldShowFeatured && (
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start pt-10">
                {/* Left: text content */}
                <div className="lg:w-1/2 flex flex-col gap-5">
                  <p className="font-orbit text-[11px] tracking-[0.22em] uppercase text-black">
                    {featuredNews.date}
                  </p>
                  <h2 className="font-orbit text-2xl md:text-3xl font-semibold text-[#0c0d10] leading-snug">
                    {featuredNews.title}
                  </h2>
                  <p className="text-black/50 font-orbit text-sm leading-relaxed line-clamp-3">
                    {featuredNews.title}
                  </p>
                  <Link
                    href={featuredNews.readMoreLink}
                    className="inline-flex items-center gap-2 font-orbit text-xs tracking-widest uppercase text-blue-600 group mt-2 w-fit"
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full">
                      Read More
                    </span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Right: featured image */}
                <div className="lg:w-1/2 w-full">
                  <div className="relative aspect-[16/10] overflow-hidden group">
                    <Image
                      src={featuredNews.image || "/placeholder.svg"}
                      alt={featuredNews.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Subtle corner accent */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ── END HERO ── */}

        <div className={`${shouldShowFeatured ? "pt-16" : "pt-6"} pb-16`}>
          <div className="max-w-6xl mx-auto px-6">
            {/* no extra spacer needed */}

            {/* Navigation Categories */}
            <div className="flex flex-wrap gap-6 mb-8 items-center">
              <div className="flex flex-wrap gap-6">
                {newsCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => { setActiveCategory(category.value); document.documentElement.scrollTop = 0; document.body.scrollTop = 0; }}
                    className={`relative text-sm font-medium font-orbit transition-colors pb-1
      ${activeCategory === category.value
                        ? "text-gray-900 after:w-full after:bg-gray-900"
                        : "text-gray-500 hover:text-gray-700 after:bg-gray-400"
                      }
      after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent font-orbit"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-gray-900 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Search"
                  >
                    <Search size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* News Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedArticle(article)}
                    className="group flex flex-col h-full border border-gray-200 hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer"
                  >
                    {/* Tall portrait image */}
                    <div className={`relative aspect-[3/4] w-full overflow-hidden ${article.cardImage?.includes('The_Times_Of_India') ? 'bg-[#ed1c24]' : 'bg-white'}`}>
                      <Image
                        src={article.cardImage || article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className={`${(article.cardImage && article.category === 'news') ? 'object-contain' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    {/* Content panel */}
                    <div className="p-5 flex flex-col flex-1 bg-white border-t border-gray-200">
                      <h3 className="text-sm font-medium text-[#0c0d10] leading-snug font-orbit line-clamp-4 group-hover:text-blue-700 transition-colors duration-200">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-auto pt-4">
                        <span className="w-2.5 h-2.5 bg-[#5ce1e6] flex-shrink-0" />
                        <p className="text-[10px] tracking-[0.18em] uppercase text-gray-500 font-orbit">
                          {article.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-lg font-orbit font-light">
                  No articles found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("news")
                    setSearchTerm("")
                  }}
                  className="mt-4 text-gray-900 font-semibold hover:text-gray-700 transition-colors font-orbit"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── SLIDE-IN ARTICLE DETAIL PANEL ── */}
      {selectedArticle && (
        <div
          className={`fixed inset-0 z-50 flex transition-colors duration-500 ${panelVisible ? "bg-black/40" : "bg-transparent"
            }`}
          onClick={closePanel}
        >
          {/* Left/Blank side — letting the blurred + dimmed main page show through */}
          <div className="hidden lg:block lg:flex-1 h-full cursor-pointer" />

          {/* Right content panel — slides in from right */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col w-full lg:w-[58%] h-full bg-[#f4f3ef] overflow-y-auto shadow-2xl transition-all duration-500 ease-out"
            style={{
              transform: panelVisible ? "translateX(0)" : "translateX(15%)",
              opacity: panelVisible ? 1 : 0,
            }}
          >
            {/* Close button */}
            <button
              onClick={closePanel}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors shadow-sm"
            >
              <X size={18} className="text-black/60" />
            </button>

            <div className="p-10 lg:p-14 pt-20 flex flex-col gap-8">
              {/* Article image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-lg">
                <Image
                  src={selectedArticle.image || "/placeholder.svg"}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                  sizes="60vw"
                />
              </div>

              {/* Title + date */}
              <div className="flex flex-col gap-4">
                <h2 className="font-orbit text-3xl md:text-4xl font-semibold text-[#0c0d10] leading-tight">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-[#5ce1e6] flex-shrink-0" />
                  <p className="text-[11px] tracking-[0.25em] uppercase text-black/60 font-orbit font-medium">
                    {selectedArticle.date}
                  </p>
                </div>
              </div>

              {/* Description paragraphs */}
              <div className="flex flex-col gap-6">
                {selectedArticle.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-800/80 font-orbit text-sm leading-relaxed max-w-2xl">
                    {para}
                  </p>
                ))}
              </div>

              {/* Action row */}
              <div className="flex items-center gap-10 pt-8 border-t border-black/5 mt-4">

                {selectedArticle.category === "news" && (
                  <Link
                    href={selectedArticle.readMoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-orbit text-xs tracking-widest uppercase text-[#0c0d10] hover:text-[#5ce1e6] transition-colors font-bold"
                  >
                    <ExternalLink size={14} />
                    Read Full Article
                  </Link>
                )}
                <button
                  onClick={() => navigator.clipboard?.writeText(selectedArticle.title)}
                  className="inline-flex items-center gap-2 font-orbit text-xs tracking-widest uppercase text-black/40 hover:text-black transition-colors"
                >
                  Copy Title
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </PageWrapper>
  )
}
