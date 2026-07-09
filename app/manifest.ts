import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gamification Éthique",
    short_name: "Gamification",
    description:
      "Évaluez les risques éthiques des mécaniques de gamification avant leur intégration dans un projet numérique.",

    start_url: "/",
    scope: "/",

    display: "standalone",
    orientation: "portrait",

    background_color: "#F8F4EF",
    theme_color: "#4A2D57",

    lang: "fr",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}