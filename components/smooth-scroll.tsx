"use client"

import Lenis from "lenis"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

/**
 * Smooth, eased scrolling for the whole site. Lenis already falls back to plain scrolling for viewers who ask
 * for less motion; the home page is a fixed stage, so there it has nothing to scroll and stays out of the way.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 0.9,
      anchors: true,
      stopInertiaOnNavigate: true,
    })
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // A new page starts at its top; without this Lenis would keep easing towards the old page's position.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true })
  }, [pathname])

  return null
}
