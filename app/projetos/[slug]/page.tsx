import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type CSSProperties } from "react";

import { ArrowLeftIcon, ExternalIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { ProjectBlock } from "@/components/project-blocks";
import { ProjectCover } from "@/components/project-cover";
import { RememberSlide } from "@/components/remember-slide";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProjectMark } from "@/components/wordmarks";
import { getNextProject, getProject, projects } from "@/content/projects";
import { profile, whatsappLink } from "@/content/profile";
import { projectSchema } from "@/content/structured-data";

import { openGraphBase } from "../../shared-metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  const title = `${project.name}: ${project.tagline.toLowerCase()}`;
  const path = `/projetos/${project.slug}`;

  return {
    title,
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      ...openGraphBase,
      title,
      description: project.description,
      url: path,
      images: [{ url: project.og.src, width: project.og.width, height: project.og.height, alt: `${project.name}, ${project.tagline.toLowerCase()}` }],
    },
  };
}

// Everything on the page belongs to one project, so all of it waits on the slug. The links into a project
// prefetch it, which keeps that wait out of the navigation; a direct visit gets it prerendered.
export default function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  return (
    <Suspense>
      <Project params={params} />
    </Suspense>
  );
}

async function Project({ params }: Pick<PageProps<"/projetos/[slug]">, "params">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const host = new URL(project.url).host;

  return (
    <main>
      <JsonLd data={projectSchema(project)} />
      <RememberSlide index={projects.indexOf(project)} />

      <aside className="aside">
        <ProjectMark brand={project.identity.wordmark} />
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
          <ThemeToggle />
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

        <section className="card card--text card--cta">
          <h2 className="t-row ink">Seu projeto</h2>
          <div>
            <p className="t-body">
              <span className="ink">Precisa de algo assim para o seu negócio?</span> Me conte como ele funciona hoje e eu
              volto com uma proposta.
            </p>
            <p className="t-body">
              <a
                href={whatsappLink(`Oi, Gustavo! Vi o projeto ${project.name} no seu site e queria conversar sobre algo parecido.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
                data-contact="projeto"
              >
                Conversar no WhatsApp
              </a>
              <br />
              <a href={`mailto:${profile.email}`} className="text-link" data-contact="projeto">
                {profile.email}
              </a>
            </p>
          </div>
        </section>

        {next.slug !== project.slug && (
          <Link href={`/projetos/${next.slug}`} prefetch transitionTypes={["nav-forward"]} className="card card--next">
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
