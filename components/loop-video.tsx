"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A silent loop that plays only while it is on screen. For viewers who ask for less motion it stays on its poster
 * with controls, so playing it is their choice.
 */
export function LoopVideo({
  src,
  poster,
  label,
  controlsWhenReduced = true,
}: {
  src: string
  poster: string
  label: string
  /** Off where the video sits inside a link, so a click opens the link instead of the player. */
  controlsWhenReduced?: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    if (query.matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reduced && controlsWhenReduced}
    />
  )
}
