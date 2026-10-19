"use client"

import { sendGAEvent } from "@next/third-parties/google"
import { useEffect } from "react"

/**
 * Sends a `contact` event to Analytics for every click on a link marked `data-contact`, with the channel taken
 * from the link and the placement from the attribute. One listener covers every page, server components included.
 */
export function ContactTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[data-contact]")
      if (!link) return
      sendGAEvent("event", "contact", {
        method: link.href.startsWith("mailto:") ? "email" : "whatsapp",
        placement: link.dataset.contact,
      })
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}
