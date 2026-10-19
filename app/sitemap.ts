import type { MetadataRoute } from "next";

import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${profile.site}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${profile.site}/sobre`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${profile.site}/projetos/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
