import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import { ArrowLeftIcon, ExternalIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { ProjectBlock } from "@/components/project-blocks";
import { ProjectCover } from "@/components/project-cover";
import { RememberSlide } from "@/components/remember-slide";
import { getNextProject, getProject, projects } from "@/content/projects";
import { projectSchema } from "@/content/structured-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [{ url: project.cover.image.src, width: project.cover.image.width, height: project.cover.image.height }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const host = new URL(project.url).host;

  return (
    <main>
      <JsonLd data={projectSchema(project)} />
      <RememberSlide index={projects.indexOf(project)} />

      <aside className="aside">
        <h1 className="t-h1 ink">
          <span className="reveal-line">
            <span>{project.name}</span>
          </span>
        </h1>
        <p className="t-h1 grey">
          <span className="reveal-line" style={{ "--line": 1 } as CSSProperties}>
            <span>{project.tagline}</span>
          </span>
        </p>

        <div className="btn-row fade-in" style={{ "--line": 3 } as CSSProperties}>
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="btn-icon btn-icon--dark"
            aria-label="Voltar para os projetos"
            title="Voltar"
          >
            <ArrowLeftIcon />
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label={`Abrir ${host} em outra aba`}
            title={host}
          >
            <ExternalIcon />
          </a>
        </div>

        <dl className="meta t-small fade-in" style={{ "--line": 4 } as CSSProperties}>
          {project.meta.map((item) => (
            <div key={item.label} className="contents">
              <dt>{item.label}</dt>
              <dd className="ink">{item.value}</dd>
            </div>
          ))}
          <div className="contents">
            <dt>Site</dt>
            <dd>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-link">
                {host}
              </a>
            </dd>
          </div>
        </dl>
      </aside>

      <div className="column">
        <figure className="card card--hero">
          <ProjectCover project={project} morph playing eager />
          <figcaption className="sr-only">{project.cover.alt}</figcaption>
        </figure>

        {project.blocks.map((block, index) => (
          <ProjectBlock key={index} block={block} project={project} />
        ))}

        {next.slug !== project.slug && (
          <Link href={`/projetos/${next.slug}`} transitionTypes={["nav-forward"]} className="card card--next">
            <span className="t-row ink">Próximo projeto</span>
            <span className="t-h1">
              <span className="ink block">{next.name}</span>
              <span className="grey block">{next.tagline}</span>
            </span>
          </Link>
        )}
      </div>
    </main>
  );
}
