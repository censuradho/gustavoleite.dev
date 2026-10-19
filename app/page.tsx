import Link from "next/link";

import { MailIcon, UserIcon } from "@/components/icons";
import { ProjectSlider } from "@/components/project-slider";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

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
            <a href={`mailto:${profile.email}`} className="btn-icon" aria-label="Enviar e-mail" title={profile.email}>
              <MailIcon />
            </a>
          </>
        }
      />
    </main>
  );
}
