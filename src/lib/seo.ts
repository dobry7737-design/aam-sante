import { faq } from "@/data/faq";
import type { FaqItem } from "@/data/types";

/**
 * Données structurées JSON-LD (§10) : InsuranceAgency sur l'accueil,
 * FAQPage sur l'accueil et le centre d'aide. Aucune donnée inventée
 * présentée comme réelle : les coordonnées sont des placeholders TODO.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://sante.aamassistances.com";

/**
 * Données structurées du cabinet.
 *
 * Elles sont indexées par les moteurs et reprises telles quelles dans les
 * résultats : elles doivent décrire ce que le cabinet fait réellement, et
 * rien de plus. La version précédente annonçait souscription en ligne, carte
 * à QR code, tiers payant conventionné et remboursements Mobile Money —
 * aucun de ces services n'est en service aujourd'hui.
 */
export function insuranceAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: "AAM Assistances Assurances Mali",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-aam.png`,
    description:
      "Cabinet de courtage en assurances à Bamako. AAM compare les offres santé des compagnies partenaires, pour les particuliers, les familles et les entreprises, et accompagne ses assurés dans la gestion de leurs contrats et de leurs remboursements.",
    areaServed: { "@type": "Country", name: "Mali" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bamako",
      addressCountry: "ML",
    },
    telephone: "+223 20 29 40 40",
    openingHours: "Mo-Sa 08:00-20:00",
    availableService: [
      { "@type": "InsuranceService", name: "Courtage en assurance santé — particuliers et familles" },
      { "@type": "InsuranceService", name: "Courtage en assurance santé — contrats groupe" },
    ],
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** FAQ complète (pour /aide). */
export function allFaqJsonLd() {
  return faqPageJsonLd(faq);
}
