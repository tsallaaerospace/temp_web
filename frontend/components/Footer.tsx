"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, ArrowUp, Linkedin, Youtube, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isFenixPage = pathname === "/fenix" || pathname === "/uncrewedsystems/fenix";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* PREVIOUS UI (Original Placeholder Products & Links):
  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Mission Autonomy", href: "/mission-autonomy" },
      { name: "Our Team", href: "/our-team" },
      { name: "Our Culture", href: "/careers/culture" },
      { name: "Careers", href: "/careers" },
    ],
    products: [
      { name: "Roadrunner", href: "/products/roadrunner" },
      { name: "Hardware", href: "/products/hardware" },
      { name: "Mission Systems", href: "/products/mission-systems" },
    ],
    media: [
      { name: "Media Coverage", href: "/newsroom" },
      { name: "Press Releases", href: "/press-releases" },
      { name: "Blog", href: "/blog" },
    ],
    legal: [
      { name: "Security", href: "/legal/security" },
      { name: "Privacy", href: "/legal/privacy" },
      { name: "Suppliers", href: "/legal/suppliers" },
    ],
  };
  */

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Mission Autonomy", href: "/about#mission" },
      { name: "Our Team", href: "/leadership" },
      { name: "Our Culture", href: "/careers/culture" },
      { name: "Careers", href: "/careers" },
    ],
    products: [
      { name: "FENIX", href: "/fenix" },
      { name: "T-BAT", href: "/bat" },
      { name: "STORM", href: "/storm" },
      { name: "DEXTER", href: "/dexter" },
      { name: "MAVERICK", href: "/maverick" },
    ],
    media: [
      { name: "Media Coverage", href: "/newsroom" },
      { name: "Press Releases", href: "/press-releases" },
      { name: "Blog", href: "/blog" },
    ],
    legal: [
      { name: "Security", href: "/legal/security" },
      { name: "Privacy", href: "/legal/privacy" },
      { name: "Suppliers", href: "/legal/suppliers" },
    ],
  };

  return (
    <footer className="footer-short-mobile relative w-full bg-[#050505] text-white flex flex-col items-center pt-16 sm:pt-20 lg:pt-32 uw:pt-8 overflow-hidden z-[10]">
      {/* PREVIOUS SHORT-SCREEN UI: no height-aware footer class was applied. */}
      {/* PREVIOUS UI: <footer className="relative w-full bg-[#050505] text-white flex flex-col items-center pt-10 sm:pt-20 lg:pt-32 uw:pt-8 overflow-hidden z-[10]"> */}
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#5ce1e6]/20" />
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#5ce1e6] to-transparent" />
      <div className="absolute top-0 left-0 w-full h-[4px] bg-[#5ce1e6]/30 blur-[4px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[100rem] h-[120px] uw:h-[60px] bg-[#5ce1e6]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* PREVIOUS UI: <div className="w-full max-w-[90rem] px-6 lg:px-6 3xl:px-4 uw:px-4 uw:mt-6 mb-4 sm:mb-10"> */}
      <div className="footer-short-main w-full max-w-[90rem] px-6 lg:px-6 3xl:px-4 uw:px-4 uw:mt-6 mb-8 sm:mb-10">
        {/* PREVIOUS UI: <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-16 lg:gap-8 items-start"> */}
        <div className="footer-short-grid grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-8 items-start">
          {/* ========== Left Column (Brand) ========== */}
          {/* PREVIOUS UI: <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-4 sm:space-y-8"> */}
          <div className="footer-short-brand lg:col-span-5 flex flex-col items-center lg:items-start space-y-6 sm:space-y-8">
            <Link href="/" className="group transition-transform duration-500 hover:scale-105">
              <Image
                src="/tsalla_main.svg"
                alt="Tsalla Aerospace"
                width={300}
                height={80}
                className="h-14 sm:h-16 lg:h-20 w-auto brightness-125"
                priority
              />
            </Link>
            <p className="text-white/50 text-center lg:text-justify max-w-md font-orbit text-xs sm:text-sm leading-snug sm:leading-relaxed tracking-wide">
              Pioneering the next generation of autonomous aerospace solutions. Driven by innovation, engineered for excellence, and committed to the future of flight.
            </p>

            <div className="flex gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group relative px-4 py-2 sm:px-6 sm:py-3 bg-white/5 border border-white/10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 font-orbit text-[10px] sm:text-xs tracking-widest group-hover:text-black transition-colors duration-300">
                  CONNECT WITH US
                </span>
              </Link>
              <Link
                href="#"
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                  }
                }}
                className="group relative px-4 py-2 sm:px-6 sm:py-3 bg-transparent border border-white/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 font-orbit text-[10px] sm:text-xs tracking-widest group-hover:text-black transition-colors duration-300">
                  VIEW CAREERS
                </span>
              </Link>
            </div>
          </div>

          {/* ========== Right Column (Navigation) ========== */}
          {/* PREVIOUS UI: <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-6 sm:gap-y-12 pl-4 sm:pl-8 md:pl-0"> */}
          <div className="footer-short-nav lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-12 pl-4 sm:pl-8 md:pl-0">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="footer-short-link-group flex flex-col space-y-3 sm:space-y-6">
                <h4 className="font-orbit text-[#5ce1e6] text-xs font-bold uppercase tracking-[0.2em]">
                  {title}
                </h4>
                {/* PREVIOUS UI: <ul className="flex flex-col space-y-1.5 sm:space-y-3"> */}
                <ul className="footer-short-links flex flex-col space-y-2.5 sm:space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href="#"
                        onClick={(e) => {
                          if (pathname === "/") {
                            e.preventDefault();
                          }
                        }}
                        className="text-white/60 hover:text-white text-sm transition-colors duration-300 font-orbit whitespace-nowrap block relative group w-fit"
                      >
                        {link.name}
                        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#5ce1e6] transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Massive Brand Watermark */}
      {/* PREVIOUS UI: <div className="relative w-full overflow-hidden flex justify-center pointer-events-none select-none z-0 mt-2 sm:mt-8 mb-2 sm:mb-8 md:mt-[-5vw] md:mb-[-5vw]"> */}
      <div className="footer-short-watermark relative w-full overflow-hidden flex justify-center pointer-events-none select-none z-0 mt-6 sm:mt-8 mb-6 sm:mb-8 md:mt-[-5vw] md:mb-[-5vw]">
        <div className="footer-short-watermark-mark relative w-[140vw] h-[22vw] sm:h-[25vw] opacity-[0.03]">
          <Image
            src="/Tsalla.svg"
            alt="Tsalla"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Bar */}
      {/* PREVIOUS UI: <div className="w-full border-t border-white/10 relative bg-black/40 backdrop-blur-md py-4 sm:py-8"> */}
      <div className="footer-short-bottom w-full border-t border-white/10 relative bg-black/40 backdrop-blur-md py-6 sm:py-8">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#5ce1e6]/30 to-transparent" />
        <div className="footer-short-bottom-inner max-w-[90rem] mx-auto px-6 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex items-center space-x-8 order-2 md:order-1">
            <p className="text-white/30 font-orbit text-[10px] uppercase tracking-widest">
              © {new Date().getFullYear()} Tsalla Aerospace. All rights reserved.
            </p>
          </div>

          {/* Social Icons Overlay */}
          <div className="flex items-center space-x-6 order-1 md:order-2">
            {[
              { icon: Instagram, href: "https://www.instagram.com/tsallaaerospace/?hl=en" },
              { icon: Linkedin, href: "https://www.linkedin.com/company/tsallaaerospace/" },
              { icon: Youtube, href: "https://www.youtube.com/@tsallaaerospace6378" },
              { icon: Twitter, href: "https://x.com/TsallaAerospace" }
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                target="_blank"
                className="text-white/40 hover:text-[#5ce1e6] transition-colors duration-300"
              >
                <social.icon size={18} />
              </Link>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-orbit text-[10px] text-white/40 hover:text-white transition-colors duration-300 order-3 uppercase tracking-tighter"
          >
            <span className="hidden sm:inline">Back to top</span>
            <div className="p-2 border border-white/10 group-hover:border-[#5ce1e6]/50 transition-colors">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
