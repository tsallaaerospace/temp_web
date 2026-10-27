import type React from "react"

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  hasHero?: boolean
}

export default function PageWrapper({ children, className = "", hasHero = false }: PageWrapperProps) {
  return <div className={`min-h-screen bg-black text-white ${hasHero ? "" : "pt-[4.5rem]"} ${className}`}>{children}</div>
}
