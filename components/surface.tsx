import Image, { type StaticImageData } from "next/image"
import type { CSSProperties, ReactNode } from "react"

import type { Surface as SurfaceData } from "@/content/projects"

export function Surface({ surface, children }: { surface: SurfaceData; children?: ReactNode }) {
  return (
    <div
      className={`surface ${surface.pattern ? `surface--${surface.pattern}` : ""}`}
      style={{ backgroundColor: surface.color }}
    >
      {surface.image && (
        <Image src={surface.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="surface__image" />
      )}
      {children}
    </div>
  )
}

type ShotProps = {
  image: StaticImageData
  alt: string
  sizes: string
  eager?: boolean
}

/** A full page screenshot floating on the surface. */
export function WindowShot({ image, alt, sizes, eager }: ShotProps) {
  return (
    <div className="shot shot--window">
      <Image
        src={image}
        alt={alt}
        sizes={sizes}
        placeholder="blur"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
    </div>
  )
}

/** A piece of interface cut out of the page. `width` is a percentage of the card. */
export function FloatShot({ image, alt, sizes, width }: ShotProps & { width: number }) {
  return (
    <div className="shot shot--float" style={{ "--w": width } as CSSProperties}>
      <Image src={image} alt={alt} sizes={sizes} placeholder="blur" />
    </div>
  )
}

export function Phones({ shots }: { shots: { image: StaticImageData; alt: string }[] }) {
  return (
    <div className="phones">
      {shots.map((shot) => (
        <div key={shot.alt} className="phone">
          <Image src={shot.image} alt={shot.alt} sizes="(max-width: 768px) 40vw, 18vw" placeholder="blur" />
        </div>
      ))}
    </div>
  )
}
