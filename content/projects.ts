import type { StaticImageData } from "next/image"

import nicellBench from "@/public/projects/nicell/bench.webp"
import nicellDre from "@/public/projects/nicell/dre.webp"
import nicellHero from "@/public/projects/nicell/hero.webp"
import nicellKanban from "@/public/projects/nicell/kanban.webp"
import nicellLosses from "@/public/projects/nicell/losses.webp"
import nicellMobile from "@/public/projects/nicell/mobile.webp"
import nicellOg from "@/public/projects/nicell/og.png"
import nicellOs from "@/public/projects/nicell/os.webp"
import nicellPain from "@/public/projects/nicell/pain.webp"
import nicellPortal from "@/public/projects/nicell/portal.webp"
import nicellSla from "@/public/projects/nicell/sla.webp"
import nicellStock from "@/public/projects/nicell/stock.webp"
import roarchAcougue from "@/public/projects/roarch/acougue.webp"
import roarchBlueprint from "@/public/projects/roarch/blueprint.webp"
import roarchFreijoPoster from "@/public/projects/roarch/cozinha-freijo-poster.webp"
import roarchHero from "@/public/projects/roarch/hero.webp"
import roarchJardim from "@/public/projects/roarch/jardim.webp"
import roarchBedroomChair from "@/public/projects/roarch/bg-quarto-cadeira.webp"
import roarchBedroomMinimal from "@/public/projects/roarch/bg-quarto-minimalista.webp"
import roarchChaise from "@/public/projects/roarch/bg-chaise-branca.webp"
import roarchHangingLights from "@/public/projects/roarch/bg-luminarias-plantas.webp"
import roarchBedroomWood from "@/public/projects/roarch/bg-quarto-madeira.webp"
import roarchLivingBlue from "@/public/projects/roarch/bg-sala-azul.webp"
import roarchLivingFireplace from "@/public/projects/roarch/bg-sala-lareira.webp"
import roarchWindowCacti from "@/public/projects/roarch/bg-janela-cactos.webp"
import roarchManifesto from "@/public/projects/roarch/manifesto.webp"
import roarchMobile from "@/public/projects/roarch/mobile.webp"
import roarchOg from "@/public/projects/roarch/og.png"
import roarchPlan from "@/public/projects/roarch/plan.webp"
import roarchProjects from "@/public/projects/roarch/projects-grid.webp"

/** The ground a screenshot sits on. Each project brings its own, the card around it stays the same. */
export type Surface = {
  color: string
  image?: StaticImageData
  pattern?: "dots" | "ruler" | "blueprint"
  /** Caption colour over this surface. */
  tone: "light" | "dark"
}

type Shot = { image: StaticImageData; alt: string }

export type Block =
  | { kind: "text"; title: string; body: string[]; rows?: { label: string; value: string }[] }
  /** A page screenshot floating on the surface, like a window. */
  | ({ kind: "window"; caption: string; surface: Surface } & Shot)
  /** A piece of interface cut out of the page, at `width` percent of the card. */
  | ({ kind: "float"; caption: string; surface: Surface; width: number } & Shot)
  | { kind: "phones"; caption: string; surface: Surface; shots: Shot[] }
  /** A screen recording, looping silently while it is on screen. */
  | { kind: "video"; src: string; poster: StaticImageData; alt: string; caption: string; surface: Surface }
  | { kind: "identity" }
  /** Roarch's mark drawn in code: how it was built from a floor plan, or the finished lockup and icons. */
  | { kind: "roarch-mark"; stage: "construction" | "final"; alt: string; surface: Surface }

export type Identity = {
  wordmark: "nicell" | "roarch"
  surface: Surface
  fonts: { name: string; role: string; sample: string; className: string }[]
  colors: { name: string; hex: string }[]
}

export type Project = {
  slug: string
  name: string
  tagline: string
  description: string
  url: string
  year: string
  meta: { label: string; value: string }[]
  /** `video` loops in place of the screenshot on the active card; the screenshot stays as its poster. */
  cover: Shot & { surface: Surface; video?: string }
  /** The link preview. PNG, because some networks (LinkedIn among them) don't show WebP and recompress JPEG further. */
  og: StaticImageData
  identity: Identity
  blocks: Block[]
}

const nicellPaper: Surface = { color: "#eef1fa", pattern: "dots", tone: "dark" }
const nicellIndigo: Surface = { color: "#4a63af", tone: "light" }
const nicellBenchSurface: Surface = { color: "#1d9fd0", image: nicellBench, tone: "light" }

const roarchPaper: Surface = { color: "#ece5db", pattern: "ruler", tone: "dark" }
const roarchBlueprintSurface: Surface = { color: "#132741", pattern: "blueprint", tone: "light" }
// Interior photos behind the screenshots, alternating with the sheet's own paper, blueprint and terracotta.
const roarchLivingBlueSurface: Surface = { color: "#3b5670", image: roarchLivingBlue, tone: "light" }
const roarchBedroomWoodSurface: Surface = { color: "#a8754f", image: roarchBedroomWood, tone: "light" }
const roarchBedroomMinimalSurface: Surface = { color: "#8a7a6a", image: roarchBedroomMinimal, tone: "light" }
const roarchLivingFireplaceSurface: Surface = { color: "#b9a48c", image: roarchLivingFireplace, tone: "light" }
const roarchHangingLightsSurface: Surface = { color: "#c99a6e", image: roarchHangingLights, tone: "light" }
const roarchChaiseSurface: Surface = { color: "#e8e6e3", image: roarchChaise, tone: "light" }
const roarchWindowCactiSurface: Surface = { color: "#7a5a3c", image: roarchWindowCacti, tone: "light" }
const roarchBedroomChairSurface: Surface = { color: "#d9c3a5", image: roarchBedroomChair, tone: "light" }

export const projects: Project[] = [
  {
    slug: "nicell",
    name: "Nicell",
    tagline: "Gestão para assistências técnicas",
    description:
      "Nicell, sistema de gestão para assistências técnicas: ordem de serviço, checklist com fotos, estoque, vendas, financeiro e portal do cliente num só lugar.",
    url: "https://nicell.com.br",
    year: "2026",
    meta: [
      { label: "Ano", value: "2026" },
      { label: "Setor", value: "Assistência técnica" },
      { label: "Tipo", value: "Sistema de gestão por assinatura" },
      { label: "Escopo", value: "Produto, design, sistema e site de vendas" },
    ],
    cover: {
      image: nicellHero,
      alt: "Rolagem pela página inicial do Nicell: o DRE do mês, o dia a dia da bancada, o quadro de ordens de serviço, o checklist com fotos e o estoque",
      video: "/projects/nicell/hero.mp4",
      surface: nicellBenchSurface,
    },
    og: nicellOg,
    identity: {
      wordmark: "nicell",
      surface: nicellPaper,
      fonts: [
        { name: "Schibsted Grotesk", role: "Títulos", sample: "Aa", className: "font-schibsted" },
        { name: "Geist", role: "Interface", sample: "Aa", className: "font-geist" },
        { name: "Geist Mono", role: "Números e códigos", sample: "#0412", className: "font-geist-mono" },
      ],
      colors: [
        { name: "Tinta", hex: "#15171c" },
        { name: "Índigo", hex: "#4a63af" },
        { name: "Índigo claro", hex: "#eef1fa" },
        { name: "Papel", hex: "#ffffff" },
        { name: "Pendente", hex: "#fcbb00" },
        { name: "Pronto", hex: "#00bb7f" },
      ],
    },
    blocks: [
      {
        kind: "text",
        title: "Sobre",
        body: [
          "O **Nicell** é um sistema de gestão para **assistências técnicas** de celulares, notebooks e videogames: **ordem de serviço, checklist com fotos, estoque, vendas e financeiro** num só lugar, com um **portal** para o cliente acompanhar o conserto pelo celular.",
          "O site vende o produto respondendo às perguntas de quem toca a loja: **quanto lucrei este mês**, onde estou perdendo dinheiro, o que já está pronto pra entrega.",
        ],
      },
      {
        kind: "window",
        image: nicellDre,
        alt: "Mockup do Nicell mostrando o DRE com receitas, custos e margens mês a mês",
        caption: "DRE por competência, a resposta para “quanto lucrei este mês?”",
        surface: nicellPaper,
      },
      {
        kind: "text",
        title: "O problema",
        body: [
          "Assistência técnica pequena roda em **WhatsApp, caderno e planilha**. O cliente liga para saber do conserto, jura que o aparelho chegou sem defeito, a peça volta da garantia e ninguém lembra de quem comprou.",
          "No fim do mês o dono não sabe **quanto lucrou** nem **onde perdeu dinheiro**.",
        ],
      },
      {
        kind: "window",
        image: nicellPain,
        alt: "Seção do site comparando o dia a dia sem sistema com o dia a dia usando o Nicell",
        caption: "O dia a dia da bancada, e o que muda com o Nicell",
        surface: nicellIndigo,
      },
      {
        kind: "text",
        title: "A abordagem",
        body: [
          "A gestão acontece **dentro da ordem de serviço, não depois dela**. Cada etapa da OS alimenta estoque, financeiro e indicadores, sem digitar a mesma coisa duas vezes.",
          "Por isso o produto gira em torno do **quadro de OS**: mover a ordem de etapa registra o histórico, dispara **alertas de prazo** e atualiza o que o cliente vê no portal.",
        ],
      },
      {
        kind: "float",
        image: nicellKanban,
        alt: "Quadro de ordens de serviço com colunas Pendente, Em reparo e Pronto para entrega",
        caption: "Quadro de ordens de serviço, com prazo vencido em destaque",
        surface: nicellIndigo,
        width: 84,
      },
      {
        kind: "float",
        image: nicellOs,
        alt: "Ordem de serviço com checklist de entrada e de entrega, fotos e assinatura do cliente",
        caption: "Checklist por componente, fotos e assinatura na própria OS",
        surface: nicellPaper,
        width: 84,
      },
      {
        kind: "text",
        title: "O produto",
        body: ["Sete frentes que conversam entre si, **todas presas à OS**:"],
        rows: [
          { label: "Ordens de serviço", value: "Quadro por etapa, prazos e alertas por status" },
          { label: "Checklist e fotos", value: "Entrada e entrega, com assinatura do cliente" },
          { label: "Estoque e compras", value: "Custo, estoque mínimo e fornecedores por peça" },
          { label: "Vendas", value: "Balcão com a margem de cada item antes de confirmar" },
          { label: "Financeiro", value: "Fluxo de caixa, DRE, contas e extrato bancário" },
          { label: "Garantia", value: "Retorno ligado à OS original, com motivo e fornecedor" },
          { label: "Portal do cliente", value: "Link da OS com o andamento e notificação no celular" },
        ],
      },
      {
        kind: "phones",
        caption: "O site no celular e o portal que o cliente recebe",
        surface: nicellBenchSurface,
        shots: [
          { image: nicellMobile, alt: "Página inicial do Nicell no celular" },
          { image: nicellPortal, alt: "Portal do cliente com o andamento da ordem de serviço" },
        ],
      },
      {
        kind: "float",
        image: nicellStock,
        alt: "Lista de produtos e peças com detalhe de estoque, compatibilidade e fornecedores",
        caption: "Estoque com custo e preço de cada fornecedor",
        surface: nicellPaper,
        width: 84,
      },
      { kind: "identity" },
      {
        kind: "text",
        title: "Identidade",
        body: [
          "Uma interface **clara e silenciosa**, para quem passa o dia com a mão no aparelho e o olho na bancada. O preto fica com as ações, o **índigo** marca o que está selecionado e as cores de status (**pendente, em reparo, pronto**) se repetem do quadro ao portal do cliente.",
          "No site, os títulos em **Schibsted Grotesk** falam com o dono da loja; a interface do produto aparece em **Geist**, exatamente como no sistema.",
        ],
      },
      {
        kind: "float",
        image: nicellSla,
        alt: "Configuração de alertas de prazo por status da ordem de serviço",
        caption: "Alertas de prazo por etapa",
        surface: nicellIndigo,
        width: 72,
      },
      {
        kind: "text",
        title: "Pronto para vender",
        body: [
          "O Nicell é vendido **por assinatura**, então o sistema já nasceu cobrando, avisando e protegendo os dados de cada loja sozinho, sem ninguém operando por trás.",
          "Feito em React, NestJS e PostgreSQL, a mesma base de sistemas de grandes empresas.",
        ],
        rows: [
          { label: "Cobrança", value: "Planos mensal, semestral e anual, com teste grátis" },
          { label: "Avisos", value: "E-mail e notificação no celular do cliente" },
          { label: "Documentos", value: "Recibos em PDF gerados na hora" },
          { label: "Fotos", value: "Guardadas com acesso restrito, só quem tem o link vê" },
          { label: "Acesso", value: "Login seguro, com cada loja vendo só os próprios dados" },
          { label: "Site de vendas", value: "Página que explica o produto e leva para o cadastro" },
        ],
      },
      {
        kind: "float",
        image: nicellLosses,
        alt: "Painel de perdas por motivo, por responsável e por tipo de serviço",
        caption: "Onde a loja perde dinheiro, por motivo e por responsável",
        surface: nicellPaper,
        width: 84,
      },
    ],
  },
  {
    slug: "roarch",
    name: "Roarch",
    tagline: "Site de estúdio de interiores",
    description:
      "Roarch: site do grupo de design de interiores de Porto Alegre, desenhado como uma prancha técnica onde a planta vira espaço enquanto você rola.",
    url: "https://roarch.com.br",
    year: "2026",
    meta: [
      { label: "Ano", value: "2026" },
      { label: "Setor", value: "Design de interiores" },
      { label: "Tipo", value: "Site institucional" },
      { label: "Escopo", value: "Marca, conceito, design e desenvolvimento" },
    ],
    cover: {
      image: roarchHero,
      alt: "Página inicial da Roarch: a sala de estar é desenhada a lápis, vira render, e a cozinha é traçada em seguida",
      video: "/projects/roarch/hero.mp4",
      surface: roarchLivingBlueSurface,
    },
    og: roarchOg,
    identity: {
      wordmark: "roarch",
      surface: roarchPaper,
      fonts: [
        { name: "Instrument Serif", role: "Títulos", sample: "Aa", className: "font-instrument" },
        { name: "Geist", role: "Texto", sample: "Aa", className: "font-geist" },
        { name: "Geist Mono", role: "Anotações técnicas", sample: "1:50", className: "font-geist-mono" },
      ],
      colors: [
        { name: "Papel", hex: "#f5f1e9" },
        { name: "Papel fundo", hex: "#ece5db" },
        { name: "Nanquim", hex: "#1a1814" },
        { name: "Grafite", hex: "#5f5a54" },
        { name: "Terracota", hex: "#b4532f" },
        { name: "Cianotipia", hex: "#132741" },
      ],
    },
    blocks: [
      {
        kind: "text",
        title: "Sobre",
        body: [
          "A **Roarch** é o grupo das projetistas **Rosana Inacio Leite e Ana Maria Leite**: interiores comerciais, residenciais e mobiliário sob medida em Porto Alegre e região.",
          "O site precisava mostrar mais de vinte anos de **balcões refrigerados, cozinhas planejadas e lojas inteiras** sem parecer catálogo de móveis, e deixar claro que o trabalho delas é **técnico**: medida, planta e detalhamento para a fábrica.",
        ],
      },
      {
        kind: "window",
        image: roarchJardim,
        alt: "Projeto Apartamento Jardim: planta humanizada vista de cima com pontos numerados",
        caption: "Apartamento Jardim: a planta revela o render a partir dos pontos",
        surface: roarchBedroomWoodSurface,
      },
      {
        kind: "text",
        title: "Conceito",
        body: [
          "**Do traço ao espaço vivido.** O site é uma prancha técnica: papel, régua milimetrada nas bordas, cotas e carimbo. Todo projeto começa como linha e termina como lugar, e a navegação conta essa história.",
          "A tipografia segue a prancha: **Instrument Serif** nos títulos, **Geist Mono** nas anotações e a **terracota** como a tinta de marcação do desenho.",
        ],
      },
      {
        kind: "window",
        image: roarchPlan,
        alt: "Planta baixa desenhada em traço preto sobre papel, com quartos, sala e banheiro",
        caption: "A planta se monta no scroll: paredes, mobiliário e cotas",
        surface: roarchBedroomMinimalSurface,
      },
      {
        kind: "window",
        image: roarchManifesto,
        alt: "Frase Para o projeto inteiro em serifada condensada com peças de madeira espalhadas",
        caption: "Manifesto: as peças soltas se encaixam até virar desenho",
        surface: roarchHangingLightsSurface,
      },
      {
        kind: "text",
        title: "Interações",
        body: ["Cada interação mostra **uma etapa do trabalho** delas, não um efeito pelo efeito:"],
        rows: [
          { label: "Hero", value: "Clique e arraste para ver o desenho técnico sob o render" },
          { label: "Planta", value: "Medidas soltas viram paredes, mobiliário e cotas no scroll" },
          { label: "Projetos", value: "Máscara circular revela render e obra sobre a planta" },
          { label: "Cozinha", value: "Modelo 3D em Three.js, do esboço ao acabamento" },
          { label: "Tema", value: "Alterna entre o papel e a cianotipia" },
        ],
      },
      {
        kind: "video",
        src: "/projects/roarch/cozinha-freijo.mp4",
        poster: roarchFreijoPoster,
        alt: "Modelo 3D da Cozinha Freijó se construindo no scroll: esboço, volumetria, modelo detalhado e finalizado, e depois girando",
        caption: "Cozinha Freijó: o modelo 3D se constrói no scroll, do esboço aos materiais",
        surface: roarchBlueprintSurface,
      },
      {
        kind: "window",
        image: roarchBlueprint,
        alt: "Página inicial da Roarch no tema blueprint, com fundo azul e traço claro",
        caption: "O tema cianotipia, lembrado no navegador de quem escolheu",
        surface: roarchChaiseSurface,
      },
      {
        kind: "window",
        image: roarchAcougue,
        alt: "Projeto Açougue Boutique: foto do balcão refrigerado revelada sobre a planta",
        caption: "Açougue Boutique: a obra aparece por cima da planta",
        surface: roarchWindowCactiSurface,
      },
      {
        kind: "text",
        title: "Marca",
        body: [
          "Criei também a **marca** da Roarch. Ela nasce do desenho que as projetistas fazem todo dia, a **planta baixa**: um cômodo visto de cima, com as paredes em traço grosso e uma porta aberta.",
          "Da planta sobrou só o essencial: um quadrado, paredes de mesma espessura e a abertura da porta. A porta é a única linha que não é parede, por isso vai em **terracota**, a tinta de marcação da prancha. Ao lado, o nome em **Instrument Serif** itálico.",
        ],
      },
      {
        kind: "roarch-mark",
        stage: "construction",
        alt: "Construção da marca em quatro pranchas: a planta baixa de um apartamento com um quarto destacado, o quarto sozinho com a porta aberta, as medidas sobre uma grade e a marca final",
        surface: roarchPaper,
      },
      {
        kind: "roarch-mark",
        stage: "final",
        alt: "A marca da Roarch ao lado do nome em serifada itálica, e o ícone nas versões papel, cianotipia e nanquim",
        surface: roarchPaper,
      },
      {
        kind: "phones",
        caption: "No celular, o mesmo papel e a mesma régua",
        surface: roarchLivingFireplaceSurface,
        shots: [{ image: roarchMobile, alt: "Página inicial da Roarch no celular" }],
      },
      { kind: "identity" },
      {
        kind: "window",
        image: roarchProjects,
        alt: "Índice de projetos com fotos de apartamentos, açougues, cozinhas e adegas",
        caption: "Índice de projetos, de residenciais a refrigeração comercial",
        surface: roarchBedroomChairSurface,
      },
      {
        kind: "text",
        title: "Pronto para trazer clientes",
        body: [
          "Bonito não basta: o site precisa **ser encontrado e virar conversa**. Por isso cada página foi preparada para o Google e para o compartilhamento, e o contato já chega com o que as projetistas precisam para orçar.",
          "Feito em Next.js, com GSAP e Three.js no movimento e no 3D.",
        ],
        rows: [
          { label: "Google", value: "Páginas e mapa do site preparados para a busca" },
          { label: "Compartilhamento", value: "Cada página gera a própria prévia no WhatsApp e nas redes" },
          { label: "Briefing", value: "Tipo de espaço, prazo e orçamento antes da primeira conversa" },
          { label: "Idiomas", value: "Português e inglês, cada um no seu endereço" },
          { label: "Impressos", value: "Cartões de visita gerados pelo próprio site, em PDF" },
          { label: "Acessibilidade", value: "Menos animação para quem prefere" },
        ],
      },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug)
  return projects[(index + 1) % projects.length]
}
