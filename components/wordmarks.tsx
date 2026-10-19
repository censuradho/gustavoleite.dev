import type { Identity } from "@/content/projects"

/** Nicell's wordmark, drawn as single strokes like on nicell.com.br. */
export function NicellWordmark({ className }: { className?: string }) {
  return (
    <svg viewBox="6 5 184 70" role="img" aria-label="Nicell" className={className}>
      <g fill="none" stroke="#15171c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 56V32.5L50 67.5V32.5" />
        <path d="M64 67.5V32.5" />
        <path d="M107.87 37.63A17.5 17.5 0 1 0 107.87 62.37" />
        <path d="M118.9 50H153.9A17.5 17.5 0 1 0 148.77 62.37" />
        <path d="M167.9 67.5V12.5" />
        <path d="M181.9 67.5V12.5" />
      </g>
    </svg>
  )
}

/** Roarch's mark (a room plan with a terracotta door) beside the name in Instrument Serif italic. */
export function RoarchWordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.35em] ${className ?? ""}`} role="img" aria-label="Roarch">
      <svg viewBox="8 8 48 48" aria-hidden className="h-[0.8em] w-[0.8em]">
        <path
          d="M15 15 H49 M15 15 V49 M15 49 H49 M49 15 V26 M49 38 V49"
          fill="none"
          stroke="#1a1814"
          strokeWidth="7"
          strokeLinecap="square"
        />
        <path d="M49 26 V38" fill="none" stroke="#b4532f" strokeWidth="5" />
      </svg>
      <span className="font-instrument italic text-[#1a1814]">Roarch</span>
    </span>
  )
}

/** Nicell's app icon: the stroke "n" on the product's ink, as in its favicon. */
function NicellMark() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <rect width="100" height="100" fill="#15171c" />
      <path
        d="M23.6 59.8V25.15L76.4 76.85V25.15"
        fill="none"
        stroke="#fff"
        strokeWidth="8.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Roarch's app icon: the room plan on drafting paper, its door gap in terracotta. */
function RoarchMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <rect width="64" height="64" fill="#f4efe6" />
      <path
        d="M15 15 H49 M15 15 V49 M15 49 H49 M49 15 V26 M49 38 V49"
        fill="none"
        stroke="#1c1a16"
        strokeWidth="7"
        strokeLinecap="square"
      />
      <path d="M49 26 V38" fill="none" stroke="#b9532c" strokeWidth="5" />
    </svg>
  )
}

const marks = { nicell: NicellMark, roarch: RoarchMark }

/** The project's app icon, cut to the same tile as the site's buttons so every project page lines up. */
export function ProjectMark({ brand }: { brand: Identity["wordmark"] }) {
  const Mark = marks[brand]
  return (
    <span className="project-mark fade-in">
      <Mark />
    </span>
  )
}
