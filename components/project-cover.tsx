import { ViewTransition } from "react"

import type { Project } from "@/content/projects"

import { LoopVideo } from "./loop-video"
import { Surface, WindowShot } from "./surface"

/**
 * The project's first image. The same named transition sits on the home card and on the project page,
 * so opening a project grows the card into place instead of swapping pages. A cover with a video plays it
 * only where `playing` is set; elsewhere, such as the folded cards around the active one, its poster stands in.
 */
export function ProjectCover({
  project,
  morph,
  playing = false,
  eager,
}: {
  project: Project
  morph: boolean
  playing?: boolean
  eager?: boolean
}) {
  const { cover } = project

  const content = (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
      <Surface surface={cover.surface}>
        {cover.video && playing ? (
          <div className="shot shot--window">
            <LoopVideo src={cover.video} poster={cover.image.src} label={cover.alt} controlsWhenReduced={false} />
          </div>
        ) : (
          <WindowShot image={cover.image} alt={cover.alt} sizes="(max-width: 768px) 90vw, 48vw" eager={eager} />
        )}
      </Surface>
    </div>
  )

  if (!morph) return content

  return (
    <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
      {content}
    </ViewTransition>
  )
}
