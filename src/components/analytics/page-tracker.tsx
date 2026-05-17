"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackEvent } from "@/lib/tracking"

export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    trackEvent({ type: "page", path: pathname })
  }, [pathname])

  return null
}
