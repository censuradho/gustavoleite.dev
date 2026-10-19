import type { Metadata } from "next";

import { profile } from "@/content/profile";

export const siteTitle = `${profile.name} — ${profile.headline} em ${profile.location.split(", ")[0]}`;

/** Served by `app/opengraph-image.png`; the file itself only reaches pages that don't set `openGraph`. */
export const siteImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Gustavo Leite, engenheiro de software, ao lado dos projetos Nicell e Roarch",
};

/** A page that sets `openGraph` replaces the layout's whole object, so every page spreads this in. */
export const openGraphBase = {
  type: "website",
  locale: "pt_BR",
  siteName: profile.name,
  images: [siteImage],
} satisfies Metadata["openGraph"];
