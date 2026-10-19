import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Inter_Tight, Schibsted_Grotesk } from "next/font/google";

import { ContactTracking } from "@/components/contact-tracking";
import { JsonLd } from "@/components/json-ld";
import { SmoothScroll } from "@/components/smooth-scroll";
import { themeScript } from "@/components/theme";
import { profile } from "@/content/profile";
import { siteSchema } from "@/content/structured-data";

import { openGraphBase, siteTitle } from "./shared-metadata";

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
    default: siteTitle,
    template: `%s — ${profile.name}`,
  },
  description: profile.description,
  openGraph: {
    ...openGraphBase,
    title: siteTitle,
    description: profile.description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f6" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The theme script sets data-theme before React hydrates, so the attribute can differ from the server's.
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${interTight.variable} ${schibsted.variable} ${instrumentSerif.variable} ${geist.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <JsonLd data={siteSchema()} />
        <SmoothScroll />
        {children}
      </body>
      {/* Production only, so local development doesn't count as visits. */}
      {process.env.NODE_ENV === "production" && (
        <>
          <GoogleAnalytics gaId={profile.analyticsId} />
          <ContactTracking />
        </>
      )}
    </html>
  );
}
