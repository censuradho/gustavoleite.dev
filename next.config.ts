import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Addresses from the previous version of the site. They are permanent so search engines move on,
  // while anyone following an old link still lands somewhere useful.
  async redirects() {
    return [
      { source: "/projetos", destination: "/", permanent: true },
      { source: "/projetos/sorteio-aplicativo-para-sorteio-de-nomes-numeros", destination: "/", permanent: true },
      { source: "/projetos/shrt-fun-ou-encurtador-de-links-com-analytics", destination: "/", permanent: true },
      // The old résumé file name, still linked from past applications and profiles.
      {
        source: "/curriculo%20-%20Gustavo%20Leite%20Oliveira.pdf",
        destination: "/GustavoLeiteOliveira-Resume.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
