"use client";

import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export const products = [
  {
    title: "Company Culture",
    link: "/about",
    thumbnail: "/shared/culture/culture1.webp",
  },
  {
    title: "Innovation Lab",
    link: "/about",
    thumbnail: "/shared/culture/culture2.jpg",
  },
  {
    title: "Team Collaboration",
    link: "/about",
    thumbnail: "/shared/culture/culture3.jpg",
  },
  {
    title: "Our Workspace",
    link: "/about",
    thumbnail: "/shared/culture/culture4.jpg",
  },
  {
    title: "Engineering Excellence",
    link: "/about",
    thumbnail: "/shared/culture/culture5.jpg",
  },
  {
    title: "Future of Aerospace",
    link: "/about",
    thumbnail: "/shared/culture/culture6.webp",
  },
  {
    title: "Design Process",
    link: "/about",
    thumbnail: "/shared/culture/culture7.png",
  },
  {
    title: "Product Development",
    link: "/about",
    thumbnail: "/shared/culture/culture8.webp",
  },
  {
    title: "Aerial Testing",
    link: "/about",
    thumbnail: "/shared/culture/culture9.webp",
  },
  {
    title: "Manufacturing",
    link: "/about",
    thumbnail: "/shared/culture/culture10.jpg",
  },
  {
    title: "Fenix Systems",
    link: "/fenix",
    thumbnail: "/shared/missions/CounterTerrorism.jpg",
  },
  {
    title: "Search & Rescue",
    link: "/fenix",
    thumbnail: "/shared/missions/Search_Rescue.jpg",
  },
  {
    title: "Warehouse Logistics",
    link: "/fenix",
    thumbnail: "/shared/missions/WarehouseManagement.jpeg",
  },
  {
    title: "Mission Excellence",
    link: "/fenix",
    thumbnail: "/shared/missions/CounterInversion.webp",
  },
  {
    title: "Advanced Navigation",
    link: "/fenix",
    thumbnail: "/about/ptop.jpg",
  },
];

export default function AboutUsVideoPage() {
  return (
    <div className="bg-white">
      <HeroParallax
        products={products}
        title={
          <>
            Who We <span className="text-[#5ce1e6]">Build For</span>
          </>
        }
        description="Born from curiosity and built on expertise, we turn bold ideas into real-world impact through cutting-edge engineering."
      />
    </div>
  );
}
