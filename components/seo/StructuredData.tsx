export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org', 
    '@type': 'WebApplication', 
    name: 'Gamification Éthique', 
    applicationCategory: 'DeveloperApplication', 
    operatingSystem: 'Any', 
    url: 'https://gamification.espinasse.ch', 
    description:
      "Évaluez les risques éthiques des mécaniques de gamification avant leur intégration dans un projet numérique.", 
    author: {
      '@type': 'Person', 
      name: 'Christel Espinasse', 
    }, 
    inLanguage: 'fr-CH', 
    offers: {
      '@type': 'Offer', 
      price: '0', 
      priceCurrency: 'CHF', 
    }, 
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd), 
      }}
    />
  )
}