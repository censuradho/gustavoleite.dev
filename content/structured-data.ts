import { about, profile, services } from "./profile"
import type { Project } from "./projects"

/** Nodes repeated across pages share an `@id`, so search engines read them as the same person and site. */
const personId = `${profile.site}/#person`
const websiteId = `${profile.site}/#website`
const businessId = `${profile.site}/#business`

const absolute = (path: string) => new URL(path, profile.site).href

const [city, region] = profile.location.split(", ")
const address = { "@type": "PostalAddress", addressLocality: city, addressRegion: region, addressCountry: "BR" }

function person() {
  const current = about.experience.find((job) => job.period.endsWith("hoje"))

  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: profile.fullName,
    url: absolute("/"),
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    ...(current && { worksFor: { "@type": "Organization", name: current.company } }),
    address,
    sameAs: [profile.linkedin, profile.github],
    // Commas inside parentheses belong to one item, as in "AWS (S3, SQS, EKS)".
    knowsAbout: about.skills.flatMap((skill) => skill.items.split(/,\s*(?![^(]*\))/)),
  }
}

/** The freelance work, kept apart from the person, whose `worksFor` is the current job. */
function business() {
  return {
    "@type": "ProfessionalService",
    "@id": businessId,
    name: `${profile.name}, ${profile.headline.toLowerCase()}`,
    description: profile.description,
    url: absolute("/"),
    email: profile.email,
    telephone: profile.phone,
    image: absolute("/opengraph-image.png"),
    address,
    areaServed: [
      { "@type": "City", name: city },
      { "@type": "Country", name: "Brasil" },
    ],
    founder: { "@id": personId },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.name, description: service.description },
      })),
    },
  }
}

/** On every page: the site, the person behind it and what they offer. */
export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absolute("/"),
        name: profile.name,
        description: profile.description,
        inLanguage: "pt-BR",
        author: { "@id": personId },
        publisher: { "@id": businessId },
      },
      person(),
      business(),
    ],
  }
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absolute("/sobre"),
    inLanguage: "pt-BR",
    isPartOf: { "@id": websiteId },
    mainEntity: person(),
  }
}

export function projectSchema(project: Project) {
  const url = absolute(`/projetos/${project.slug}`)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: project.name,
        description: project.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": `${url}#project` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: project.name,
        alternativeHeadline: project.tagline,
        description: project.description,
        url: project.url,
        image: absolute(project.cover.image.src),
        dateCreated: project.year,
        inLanguage: "pt-BR",
        creator: { "@id": personId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Projetos", item: absolute("/") },
          { "@type": "ListItem", position: 2, name: project.name, item: url },
        ],
      },
    ],
  }
}
