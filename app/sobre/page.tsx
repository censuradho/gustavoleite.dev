import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

import { ArrowLeftIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { ThemeToggle } from "@/components/theme-toggle";
import { about, profile, services } from "@/content/profile";
import { projects } from "@/content/projects";
import { profilePageSchema } from "@/content/structured-data";

import { openGraphBase } from "../shared-metadata";

const description =
  "Gustavo Leite cria sites, sistemas de gestão e lojas virtuais sob medida em Porto Alegre, com 7 anos de experiência em marcas como Vans, Arezzo e Atacadão.";

export const metadata: Metadata = {
  title: "Sobre",
  description,
  alternates: { canonical: "/sobre" },
  openGraph: {
    ...openGraphBase,
    type: "profile",
    title: `Sobre ${profile.name}`,
    description,
    url: "/sobre",
  },
};

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={profilePageSchema()} />

      <section className="about-intro">
        <div className="intro">
          <h1 className="t-h1 ink">
            <span className="reveal-line">
              <span>{profile.name}</span>
            </span>
          </h1>
          <p className="t-h1 grey">
            <span className="reveal-line" style={{ "--line": 1 } as CSSProperties}>
              <span>{profile.role}</span>
            </span>
          </p>
          <div className="btn-row fade-in" style={{ "--line": 3 } as CSSProperties}>
            <Link href="/" transitionTypes={["nav-back"]} className="btn-icon btn-icon--dark" aria-label="Voltar para os projetos" title="Voltar">
              <ArrowLeftIcon />
            </Link>
            <a href={`mailto:${profile.email}`} className="btn-icon" aria-label="Enviar e-mail" title={profile.email}>
              <MailIcon />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn" title="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub" title="GitHub">
              <GitHubIcon />
            </a>
            <a href={profile.resume} download className="btn-icon" aria-label="Baixar currículo em PDF" title="Currículo (PDF)">
              <DownloadIcon />
            </a>
            <ThemeToggle />
          </div>
        </div>

        <a href="#trajetoria" className="scroll-cue">
          <span className="scroll-cue__inner t-small fade-in" style={{ "--line": 6 } as CSSProperties}>
            <span className="scroll-cue__track" aria-hidden="true" />
            Role para ler mais
          </span>
        </a>
      </section>

      <div id="trajetoria" className="about-body">
        <div>
          {about.intro.map((paragraph) => (
            <p key={paragraph} className="t-body">
              <RichText text={paragraph} />
            </p>
          ))}
        </div>

        <div>
          <h2 className="t-body ink mb-[2.4rem]">O que eu faço</h2>
          <ul className="list t-row">
            {services.map((service) => (
              <li key={service.name} className="!grid-cols-[18rem_1fr] max-md:!grid-cols-1">
                <span className="ink">{service.name}</span>
                <span>{service.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="t-body ink">Projetos</h2>
          <p className="t-body">
            {projects.map((project, index) => (
              <span key={project.slug}>
                {index > 0 && " e "}
                <Link href={`/projetos/${project.slug}`} prefetch className="text-link">
                  {project.name}
                </Link>
                <span>, {project.tagline.toLowerCase()}</span>
              </span>
            ))}
            .
          </p>
        </div>

        <div>
          <h2 className="t-body ink">Alguns resultados</h2>
          {about.highlights.map((item) => (
            <p key={item} className="t-body">
              <RichText text={item} />
            </p>
          ))}
        </div>

        <div>
          <h2 className="t-body ink mb-[2.4rem]">Experiência</h2>
          <ul className="list t-row">
            {about.experience.map((job) => (
              <li key={job.company}>
                <span className="ink">{job.company}</span>
                <span>{job.role}</span>
                <span className="tabular-nums">{job.period}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="t-body ink mb-[2.4rem]">Ferramentas</h2>
          <ul className="list t-row">
            {about.skills.map((skill) => (
              <li key={skill.area} className="!grid-cols-[14rem_1fr] max-md:!grid-cols-1">
                <span className="ink">{skill.area}</span>
                <span>{skill.items}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="t-body">
          <span className="ink">Tem um projeto em mente?</span> Me conte sobre o seu negócio:{" "}
          <a href={`mailto:${profile.email}`} className="text-link">
            {profile.email}
          </a>
          <br />
          <a href={profile.resume} download className="text-link">
            Baixar currículo (PDF)
          </a>
        </p>
      </div>
    </main>
  );
}
