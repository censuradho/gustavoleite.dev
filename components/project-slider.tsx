"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

import type { Project } from "@/content/projects"
import { profile } from "@/content/profile"

import { ProjectCover } from "./project-cover"
import { sliderMemory } from "./slider-memory"

/** Cards drawn on each side of the active one; the outermost stay invisible so cards enter and leave unseen. */
const REACH = 3
const WHEEL_THRESHOLD = 24
const STEP_LOCK_MS = 900

const wrap = (value: number, length: number) => ((value % length) + length) % length

/** The home: name and role on the left, the projects stacked on a wheel on the right. */
export function ProjectSlider({ projects, actions }: { projects: Project[]; actions: ReactNode }) {
  const [cursor, setCursor] = useState(sliderMemory.get)
  const [hovered, setHovered] = useState(false)
  const active = wrap(cursor, projects.length)
  const activeProject = projects[active]

  const lockedUntil = useRef(0)
  const wheelTotal = useRef(0)
  const touchStart = useRef<number | null>(null)

  const step = useCallback((direction: number) => {
    const now = performance.now()
    if (now < lockedUntil.current) return
    lockedUntil.current = now + STEP_LOCK_MS
    setCursor((value) => value + direction)
  }, [])

  useEffect(() => {
    sliderMemory.set(cursor)
  }, [cursor])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      // Trackpads keep sending momentum after a step; drop it instead of letting it queue another one.
      if (performance.now() < lockedUntil.current) {
        wheelTotal.current = 0
        return
      }
      wheelTotal.current += event.deltaY
      if (Math.abs(wheelTotal.current) < WHEEL_THRESHOLD) return
      step(Math.sign(wheelTotal.current))
      wheelTotal.current = 0
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") step(1)
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") step(-1)
    }
    const onTouchStart = (event: TouchEvent) => {
      touchStart.current = event.touches[0].clientY
    }
    const onTouchEnd = (event: TouchEvent) => {
      if (touchStart.current === null) return
      const delta = touchStart.current - event.changedTouches[0].clientY
      touchStart.current = null
      if (Math.abs(delta) > 40) step(Math.sign(delta))
    }

    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("keydown", onKey)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd)
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [step])

  const slots = Array.from({ length: REACH * 2 + 1 }, (_, i) => i - REACH)

  return (
    <>
      <div className="intro">
        <h1 className="t-h1 ink">
          <span className="reveal-line">
            <span>{profile.name}</span>
          </span>
        </h1>
        <p className="t-h1 grey">
          <span className="sr-only">{profile.headline}</span>
          <span className="reveal-line" style={{ "--line": 1 } as CSSProperties} aria-hidden>
            <span>
              <span className="swap" data-swapped={hovered}>
                <span>{profile.headline}</span>
                <span>
                  {activeProject.tagline}, {activeProject.year}
                </span>
              </span>
            </span>
          </span>
        </p>
        <div className="btn-row fade-in" style={{ "--line": 3 } as CSSProperties}>
          {actions}
        </div>
      </div>

      <section className="slider" aria-roledescription="carrossel" aria-label="Projetos">
        {slots.map((offset) => {
          const position = cursor + offset
          const project = projects[wrap(position, projects.length)]
          const isActive = offset === 0
          const hidden = Math.abs(offset) === REACH

          return (
            <div
              key={position}
              className="slide"
              data-offset={offset}
              aria-hidden={!isActive}
            >
              <ProjectCover project={project} morph={isActive} playing={isActive} eager={Math.abs(offset) <= 1} />
              <div className="slide__fog" />
              {project.cover.surface.tone === "light" && <div className="slide__shade" />}
              <span className="slide__title" data-tone={project.cover.surface.tone}>
                {project.name}
              </span>
              {isActive ? (
                <Link
                  href={`/projetos/${project.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="slide__link"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onFocus={() => setHovered(true)}
                  onBlur={() => setHovered(false)}
                >
                  <span className="sr-only">
                    Abrir o projeto {project.name}: {project.tagline}
                  </span>
                </Link>
              ) : (
                !hidden && (
                  <button
                    type="button"
                    className="slide__button"
                    tabIndex={-1}
                    onClick={() => step(Math.sign(offset))}
                  >
                    <span className="sr-only">Mostrar {project.name}</span>
                  </button>
                )
              )}
            </div>
          )
        })}
      </section>

      <nav className="dots" aria-label="Escolher projeto">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            aria-current={index === active}
            aria-label={project.name}
            onClick={() => setCursor((value) => value + (index - active))}
          />
        ))}
      </nav>
    </>
  )
}
