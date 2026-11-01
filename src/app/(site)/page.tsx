import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { PartnersBand } from "@/components/home/PartnersBand";
import { PaperToDigital } from "@/components/home/PaperToDigital";
import { ExpressSimulator } from "@/components/home/ExpressSimulator";
import { GuaranteesGrid } from "@/components/home/GuaranteesGrid";
import { ForWho } from "@/components/home/ForWho";
import { StatsTrust } from "@/components/home/StatsTrust";
import { HomeFaq } from "@/components/home/HomeFaq";
import { FinalCta } from "@/components/home/FinalCta";
import { faq, homeFaqIds } from "@/data/faq";
import { products } from "@/data/products";
import { formatFcfa } from "@/lib/utils/format";
import {
  insuranceAgencyJsonLd,
  faqPageJsonLd,
} from "@/lib/seo";

/** Prix d'entrée dérivé de la source unique products.ts (jamais codé en dur). */
const entryPrice = formatFcfa(Math.min(...products.map((p) => p.adultMonthly)));

export const metadata: Metadata = {
  title: "AAM Santé — Assurance santé 100 % digitale au Mali",
  description:
    `AAM compare les offres santé de ses neuf compagnies partenaires, pour vous, votre famille ou vos salariés. Trois niveaux de couverture, à partir de ${entryPrice}/mois à titre indicatif.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const homeFaq = homeFaqIds
    .map((id) => faq.find((f) => f.id === id))
    .filter((f): f is (typeof faq)[number] => Boolean(f));

  return (
    <>
      {/* Données structurées : InsuranceAgency + FAQPage (questions de l'accueil) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(insuranceAgencyJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(homeFaq)) }}
      />

      <Hero />
      <PartnersBand />
      <PaperToDigital />
      <ExpressSimulator />
      <GuaranteesGrid />
      <ForWho />
      <StatsTrust />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
