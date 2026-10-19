import type { Metadata } from "next";
import Link from "next/link";

import { ChatIcon, MailIcon, UserIcon } from "@/components/icons";
import { ProjectSlider } from "@/components/project-slider";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile, whatsappLink } from "@/content/profile";
import { projects } from "@/content/projects";

import { openGraphBase, siteTitle } from "./shared-metadata";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...openGraphBase, title: siteTitle, description: profile.description, url: "/" },
};

export default function Home() {
  return (
    <main className="home">
      <ProjectSlider
        projects={projects}
        actions={
          <>
            <Link href="/sobre" className="btn-icon" aria-label="Sobre mim" title="Sobre mim">
              <UserIcon />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="Conversar no WhatsApp"
              title="WhatsApp"
              data-contact="home"
            >
              <ChatIcon />
            </a>
            <a href={`mailto:${profile.email}`} className="btn-icon" aria-label="Enviar e-mail" title={profile.email} data-contact="home">
              <MailIcon />
            </a>
            <ThemeToggle />
          </>
        }
      />
    </main>
  );
}
