"use client"

import type { MouseEvent } from "react"

import { ThemeIcon } from "./icons"
import { THEME_KEY } from "./theme"

/** Flips whichever theme is showing, the system's included, and remembers the choice in this browser. */
export function ThemeToggle() {
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement
    const current = root.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    const next = current === "dark" ? "light" : "dark"

    const apply = () => {
      root.dataset.theme = next
      try {
        localStorage.setItem(THEME_KEY, next)
      } catch {
        // Storage can be blocked; the choice then lasts until the page is left.
      }
    }

    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply()
      return
    }

    // The new theme opens as a circle from the button, wide enough to reach the farthest corner.
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    root.style.setProperty("--reveal-x", `${x}px`)
    root.style.setProperty("--reveal-y", `${y}px`)
    root.style.setProperty("--reveal-r", `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`)

    root.classList.add("theme-switch")
    document.startViewTransition(apply).finished.finally(() => root.classList.remove("theme-switch"))
  }

  return (
    <button type="button" className="btn-icon" onClick={toggle} aria-label="Alternar entre tema claro e escuro" title="Tema claro ou escuro">
      <ThemeIcon />
    </button>
  )
}
