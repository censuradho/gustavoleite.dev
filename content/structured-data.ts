import { about, profile } from "./profile"
import type { Project } from "./projects"

/** Nodes repeated across pages share an `@id`, so search engines read them as the same person and site. */
const personId = `${profile.site}/#person`
const websiteId = `${profile.site}/#website`

const absolute = (path: string) => new URL(path, profile.site).href

function person() {
  const [city, region] = profile.location.split(", ")
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
    address: { "@type": "PostalAddress", addressLocality: city, addressRegion: region, addressCountry: "BR" },
    sameAs: [profile.linkedin, profile.github],
    // Commas inside parentheses belong to one item, as in "AWS (S3, SQS, EKS)".
    knowsAbout: about.skills.flatMap((skill) => skill.items.split(/,\s*(?![^(]*\))/)),
  }
}

/** On every page: the site and the person behind it. */
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
      },
      person(),
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
