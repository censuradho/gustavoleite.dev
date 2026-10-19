export const profile = {
  name: "Gustavo Leite",
  fullName: "Gustavo Leite Oliveira",
  role: "Engenheiro de software",
  location: "Porto Alegre, RS",
  email: "gustavoleite.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/gustavoleite-dev",
  github: "https://github.com/censuradho",
  resume: "/GustavoLeiteOliveira-Resume.pdf",
  site: "https://gustavoleite.dev",
  // Same GA4 property as the previous version of the site, so the history carries over.
  analyticsId: "G-7S7ENB8DS9",
}

/** Paragraphs use `**trecho**` to mark what reads in ink; the rest stays grey. */
export const about = {
  intro: [
    "**Engenheiro de software** com 7 anos entregando produtos de alta performance, de **e-commerces com tráfego intenso** a **plataformas de gestão** usadas por órgãos públicos.",
    "Especialista em **React e Next.js**, com domínio de Micro-Frontends, BFF e Core Web Vitals. Hoje atuo de ponta a ponta com **NestJS, PostgreSQL e AWS**.",
    "Gosto de produto: entender a operação de quem usa, desenhar a interface e levar até produção. **Nicell** e **Roarch** são dois projetos que levei assim, do começo ao fim.",
  ],
  experience: [
    { company: "Encibra", role: "Senior Frontend Engineer / Fullstack", period: "2026 — hoje" },
    { company: "Vortigo", role: "Senior Frontend Engineer / Fullstack", period: "2023 — 2026" },
    { company: "Ritualiza", role: "Frontend / Fullstack (freelance)", period: "2023" },
    { company: "CWI Software", role: "Software Developer", period: "2022 — 2023" },
    { company: "Ubistart", role: "Frontend Developer", period: "2021 — 2022" },
    { company: "Openbox.ai", role: "Desenvolvedor Web", period: "2019 — 2021" },
  ],
  highlights: [
    "Liderei a criação de um **Design System do zero**, adotado por múltiplos times na Vortigo.",
    "Escalei **Atacadão e Unicred** com Micro-Frontends (Single-SPA e Module Federation), cada um com um BFF em NestJS.",
    "Levei os **Core Web Vitals ao verde** em Vans, Arezzo e MyShoes com SSR, SSG e otimização de imagens.",
    "Reduzi o tempo de build em **~60%** migrando aplicações de Create React App para Vite.",
  ],
  skills: [
    { area: "Frontend", items: "React, Next.js, TypeScript, Tailwind, TanStack Query/Table, Shopify headless" },
    { area: "Backend", items: "Node.js, NestJS, Fastify, Prisma, PostgreSQL, REST" },
    { area: "Arquitetura", items: "Micro-Frontends, BFF, Clean Architecture, Design Systems" },
    { area: "DevOps", items: "Docker, Kubernetes, CI/CD, AWS (S3, SQS, EKS), Jenkins, Azure DevOps" },
  ],
}
