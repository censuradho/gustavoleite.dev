import type { CSSProperties } from "react"

import type { Block, Identity, Project } from "@/content/projects"

import { LoopVideo } from "./loop-video"
import { RichText } from "./rich-text"
import { FloatShot, Phones, Surface, WindowShot } from "./surface"
import { NicellWordmark, RoarchWordmark } from "./wordmarks"

const COLUMN_SIZES = "(max-width: 768px) 92vw, 48vw"

export function ProjectBlock({ block, project }: { block: Block; project: Project }) {
  switch (block.kind) {
    case "text":
      return (
        <section className="card card--text">
          <h2 className="t-row ink">{block.title}</h2>
          <div>
            {block.body.map((paragraph) => (
              <p key={paragraph} className="t-body">
                <RichText text={paragraph} />
              </p>
            ))}
            {block.rows && (
              <ul className="rows">
                {block.rows.map((row) => (
                  <li key={row.label} className="t-row">
                    <span className="ink">{row.label}</span>
                    <span>{row.value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )

    case "window":
      return (
        <figure className="card">
          <Surface surface={block.surface}>
            <WindowShot image={block.image} alt={block.alt} sizes={COLUMN_SIZES} />
          </Surface>
          {block.surface.image && <div className="card__shade" />}
          <figcaption className="card__caption" data-tone={block.surface.tone}>
            {block.caption}
          </figcaption>
        </figure>
      )

    case "float":
      return (
        <figure className="card">
          <Surface surface={block.surface}>
            <FloatShot image={block.image} alt={block.alt} sizes={COLUMN_SIZES} width={block.width} />
          </Surface>
          {block.surface.image && <div className="card__shade" />}
          <figcaption className="card__caption" data-tone={block.surface.tone}>
            {block.caption}
          </figcaption>
        </figure>
      )

    case "phones":
      return (
        <figure className="card">
          <Surface surface={block.surface}>
            <Phones shots={block.shots} />
          </Surface>
          {block.surface.image && <div className="card__shade" />}
          <figcaption className="card__caption" data-tone={block.surface.tone}>
            {block.caption}
          </figcaption>
        </figure>
      )

    case "video":
      return (
        <figure className="card">
          <Surface surface={block.surface}>
            <div className="shot shot--window">
              <LoopVideo src={block.src} poster={block.poster.src} label={block.alt} />
            </div>
          </Surface>
          <figcaption className="card__caption" data-tone={block.surface.tone}>
            {block.caption}
          </figcaption>
        </figure>
      )

    case "identity":
      return <IdentityCard identity={project.identity} />
  }
}

/** Typefaces and colours of the project, set in the project's own fonts. */
function IdentityCard({ identity }: { identity: Identity }) {
  const ink = identity.colors.find((color) => ["Tinta", "Nanquim"].includes(color.name))?.hex ?? "#1a1a1a"

  return (
    <figure className="card">
      <Surface surface={identity.surface}>
        <div className="identity" style={{ "--swatch-ink": ink } as CSSProperties}>
          <div className="text-[4.8rem] max-md:text-[3.2rem]">
            {identity.wordmark === "nicell" ? (
              <NicellWordmark className="h-[1em] w-auto" />
            ) : (
              <RoarchWordmark />
            )}
          </div>

          <div className="identity__fonts">
            {identity.fonts.map((font) => (
              <div key={font.name}>
                <p className={`identity__sample ${font.className}`} aria-hidden>
                  {font.sample}
                </p>
                <p className="t-small mt-[1.6rem]" style={{ color: ink }}>
                  {font.name}
                </p>
                <p className="t-small" style={{ color: ink, opacity: 0.55 }}>
                  {font.role}
                </p>
              </div>
            ))}
          </div>

          <ul className="identity__colors">
            {identity.colors.map((color) => (
              <li key={color.hex}>
                <div className="identity__chip" style={{ backgroundColor: color.hex }} />
                <p className="t-small mt-[0.8rem]" style={{ color: ink }}>
                  {color.name}
                </p>
                <p className="t-small font-geist-mono uppercase" style={{ color: ink, opacity: 0.55 }}>
                  {color.hex}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Surface>
      <figcaption className="sr-only">Identidade visual: tipografia e paleta</figcaption>
    </figure>
  )
}
