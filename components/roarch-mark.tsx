import type { ReactNode } from "react"

import { RoarchName, RoarchPlan, roarchPlan } from "./wordmarks"

const INK = "#1a1814"
const GRAPHITE = "#5f5a54"
const TERRACOTTA = "#b4532f"
const PAPER = "#f5f1e9"

const mono = { fontFamily: "var(--font-geist-mono), monospace", fontSize: 2.6, fill: GRAPHITE }

/** A sheet on the 64 unit grid of the mark, so every step lines up with the next. */
function Sheet({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure className="mark-step">
      <svg viewBox="0 0 64 64" aria-hidden className="mark-step__sheet">
        {children}
      </svg>
      <figcaption className="mark-step__label font-geist-mono">{label}</figcaption>
    </figure>
  )
}

/** An apartment plan, its bottom left room picked out: the door in its right wall is where the mark starts. */
function FloorPlan() {
  return (
    <>
      <g fill="none" stroke={INK}>
        <rect x="8" y="8" width="48" height="48" strokeWidth="2.4" />
        <path d="M30 8V16 M30 24V42 M30 50V56 M8 36H14 M22 36H30 M30 30H42 M50 30H56" strokeWidth="1.2" />
      </g>
      <g fill={PAPER} stroke={INK} strokeWidth="0.3">
        <rect x="38" y="6.8" width="10" height="2.4" />
        <rect x="6.8" y="16" width="2.4" height="10" />
      </g>
      <path d="M38 8H48 M8 16V26" stroke={INK} strokeWidth="0.3" />
      <path
        d="M30 16H38 M38 16A8 8 0 0 1 30 24 M14 36V28 M14 28A8 8 0 0 1 22 36 M50 30V38 M50 38A8 8 0 0 1 42 30"
        fill="none"
        stroke={GRAPHITE}
        strokeWidth="0.4"
      />
      <path d="M30 42H22 M22 42A8 8 0 0 0 30 50" fill="none" stroke={TERRACOTTA} strokeWidth="0.6" />
      <rect x="10" y="38" width="18" height="16" fill="none" stroke={TERRACOTTA} strokeWidth="0.5" strokeDasharray="1.2 1" />
    </>
  )
}

/** The room on its own, walls hatched as a cut, the door open over its swing. */
function Room() {
  return (
    <>
      <defs>
        <pattern id="roarch-poche" width="1.6" height="1.6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="1.6" stroke={INK} strokeWidth="0.35" />
        </pattern>
      </defs>
      <path
        d="M52.5 26V11.5H11.5V52.5H52.5V38H45.5V45.5H18.5V18.5H45.5V26Z"
        fill="url(#roarch-poche)"
        stroke={INK}
        strokeWidth="0.6"
      />
      <path d="M45.5 26H33.5" stroke={TERRACOTTA} strokeWidth="0.9" />
      <path d="M33.5 26A12 12 0 0 0 45.5 38" fill="none" stroke={TERRACOTTA} strokeWidth="0.35" strokeDasharray="1 0.8" />
    </>
  )
}

/** A measured dimension: the line, a tick at each end and the figure beside it. */
function Dimension({ d, ticks, label, x, y }: { d: string; ticks: string; label: string; x: number; y: number }) {
  return (
    <>
      <path d={`${d} ${ticks}`} fill="none" stroke={GRAPHITE} strokeWidth="0.25" />
      <text x={x} y={y} textAnchor="middle" style={mono}>
        {label}
      </text>
    </>
  )
}

/** The walls reduced to strokes on a 4 unit grid: a 34 square, walls 7 thick, a 12 opening. */
function Measures() {
  const grid = Array.from({ length: 15 }, (_, i) => (i + 1) * 4)
  const lines = grid.map((v) => `M${v} 0V64 M0 ${v}H64`).join(" ")

  return (
    <>
      <path d={lines} stroke={INK} strokeOpacity="0.08" strokeWidth="0.15" />
      <path d={roarchPlan.walls} fill="none" stroke={INK} strokeOpacity="0.14" strokeWidth={roarchPlan.wall} strokeLinecap="square" />
      <path d={roarchPlan.walls} fill="none" stroke={INK} strokeWidth="0.3" strokeDasharray="1 0.8" />
      <path d={roarchPlan.door} stroke={TERRACOTTA} strokeWidth="0.5" />
      <Dimension d="M15 6H49" ticks="M15 4.8V7.2 M49 4.8V7.2" label="34" x={32} y={4.2} />
      <Dimension d="M11.5 58H18.5" ticks="M11.5 56.8V59.2 M18.5 56.8V59.2" label="7" x={15} y={62.4} />
      <Dimension d="M57 26V38" ticks="M55.8 26H58.2 M55.8 38H58.2" label="12" x={60.8} y={32.9} />
    </>
  )
}

/** From the floor plan to the mark, in four sheets. */
export function RoarchMarkConstruction() {
  return (
    <div className="mark-steps">
      <Sheet label="01 Planta baixa">
        <FloorPlan />
      </Sheet>
      <Sheet label="02 O cômodo">
        <Room />
      </Sheet>
      <Sheet label="03 Medidas">
        <Measures />
      </Sheet>
      <Sheet label="04 A marca">
        <RoarchPlan walls={INK} door={TERRACOTTA} />
      </Sheet>
    </div>
  )
}

const variants = [
  { name: "Papel", sheet: "#f4efe6", walls: "#1c1a16", door: "#b9532c" },
  { name: "Cianotipia", sheet: "#132741", walls: PAPER, door: "#e07a4d" },
  { name: "Nanquim", sheet: "#1c1a16", walls: "#f4efe6", door: "#e07a4d" },
]

/** The finished lockup over the icon on each of the site's grounds. */
export function RoarchMarkFinal() {
  return (
    <div className="mark-final">
      <span className="mark-final__lockup" style={{ color: INK }}>
        <svg viewBox="8 8 48 48" aria-hidden>
          <RoarchPlan walls="currentColor" door={TERRACOTTA} />
        </svg>
        <RoarchName />
      </span>

      <ul className="mark-final__icons">
        {variants.map((variant) => (
          <li key={variant.name}>
            <svg viewBox="0 0 64 64" aria-hidden>
              <rect width="64" height="64" rx="12" fill={variant.sheet} />
              <RoarchPlan walls={variant.walls} door={variant.door} />
            </svg>
            <span className="mark-step__label font-geist-mono">{variant.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
