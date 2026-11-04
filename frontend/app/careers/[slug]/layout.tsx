import type { ReactNode } from "react"
import { allJobs } from "../data/jobs"

export const dynamicParams = false

export function generateStaticParams() {
  return allJobs.map(({ slug }) => ({ slug }))
}

export default function JobLayout({ children }: { children: ReactNode }) {
  return children
}
