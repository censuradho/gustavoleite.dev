import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Inter_Tight, Schibsted_Grotesk } from "next/font/google";

import { SmoothScroll } from "@/components/smooth-scroll";
import { profile } from "@/content/profile";

import "lenis/dist/lenis.css";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400"],
});

// The project identity cards set specimens in each project's own typefaces.
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["500"],
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  preload: false,
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Portfólio de Gustavo Leite, engenheiro de software em Porto Alegre. Projetos de produto do começo ao fim: Nicell e Roarch.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: profile.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f6f6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${interTight.variable} ${schibsted.variable} ${instrumentSerif.variable} ${geist.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
      {/* Production only, so local development doesn't count as visits. */}
      {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId={profile.analyticsId} />}
    </html>
  );
}
