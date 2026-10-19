export const profile = {
  name: "Gustavo Leite",
  fullName: "Gustavo Leite Oliveira",
  role: "Engenheiro de software",
  /** What a client hires: the line under the name on the home and in the default title. */
  headline: "Sites e sistemas sob medida",
  location: "Porto Alegre, RS",
  email: "gustavoleite.dev@gmail.com",
  phone: "+55 51 98239-7632",
  linkedin: "https://www.linkedin.com/in/gustavoleite-dev",
  github: "https://github.com/censuradho",
  resume: "/GustavoLeiteOliveira-Resume.pdf",
  site: "https://gustavoleite.dev",
  description:
    "Gustavo Leite cria sites e sistemas sob medida para empresas de Porto Alegre e de todo o Brasil, do entendimento do negócio ao produto no ar.",
  // Same GA4 property as the previous version of the site, so the history carries over.
  analyticsId: "G-7S7ENB8DS9",
}

/** A WhatsApp chat with the message already typed, so the visitor only has to send it. */
export function whatsappLink(text = "Oi, Gustavo! Vi seu site e queria conversar sobre um projeto.") {
  return `https://wa.me/${profile.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`
}

/** What is on offer, on the about page and in the structured data. */
export const services = [
  { name: "Sites", description: "Institucionais e de produto, rápidos no celular e prontos para aparecer no Google" },
  { name: "Sistemas de gestão", description: "Feitos para a operação do seu negócio, com painéis e portal para os clientes" },
  { name: "Lojas virtuais", description: "E-commerce rápido, que aguenta campanha e tráfego alto" },
  { name: "Produto e design", description: "Do entendimento do negócio ao desenho da interface, antes da primeira linha de código" },
]

/** Paragraphs use `**trecho**` to mark what reads in ink; the rest stays grey. */
export const about = {
  intro: [
    "Crio **sites e sistemas sob medida** para negócios que precisam de mais do que um modelo pronto. São 7 anos entregando produtos, de **lojas virtuais com tráfego intenso** a **plataformas de gestão** usadas por órgãos públicos.",
    "Trabalho de ponta a ponta: entendo **a operação de quem vai usar**, desenho a interface, desenvolvo e coloco no ar. Você fala com quem faz, do primeiro briefing à entrega.",
    "**Nicell** e **Roarch** são dois projetos feitos assim, do começo ao fim: um sistema de gestão para assistências técnicas e o site de um estúdio de interiores.",
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
    "Deixei as lojas virtuais da **Vans, Arezzo e MyShoes** mais rápidas, dentro do padrão de velocidade que o Google usa para ranquear os sites.",
    "Ajudei **Atacadão e Unicred** a crescer suas plataformas com vários times entregando ao mesmo tempo, sem um travar o outro.",
  ],
  skills: [
    { area: "Frontend", items: "React, Next.js, TypeScript, Tailwind, TanStack Query/Table, Shopify headless" },
    { area: "Backend", items: "Node.js, NestJS, Fastify, Prisma, PostgreSQL, REST" },
    { area: "Arquitetura", items: "Micro-Frontends, BFF, Clean Architecture, Design Systems" },
    { area: "DevOps", items: "Docker, Kubernetes, CI/CD, AWS (S3, SQS, EKS), Jenkins, Azure DevOps" },
  ],
}
