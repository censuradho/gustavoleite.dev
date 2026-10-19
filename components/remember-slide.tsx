"use client"

import { useEffect } from "react"

import { sliderMemory } from "./slider-memory"

/** Points the home slider at this project, so going back lands on its card. */
export function RememberSlide({ index }: { index: number }) {
  useEffect(() => {
    sliderMemory.set(index)
  }, [index])

  return null
}
