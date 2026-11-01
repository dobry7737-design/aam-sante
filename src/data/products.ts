import type { BillingFrequency, Formula, FormulaId } from "./types";

/**
 * Niveaux de couverture proposés au visiteur.
 *
 * Ce ne sont pas des produits d'assurance : AAM est courtier, et le contrat
 * est porté par une compagnie partenaire. Ces trois niveaux servent à
 * qualifier le besoin — « le nécessaire », « l'équilibre », « l'étendu » —
 * pour que le cabinet interroge le marché sur la bonne base.
 *
 * Les montants ci-dessous sont des **ordres de grandeur de travail**, pas des
 * tarifs négociés. Aucune compagnie ne s'est engagée dessus. Ils doivent être
 * remplacés par les tarifs réels avant toute campagne, et viendront alors des
 * produits santé du CRM.
 *
 * Les points forts ne portent plus de taux ni de plafond chiffré : annoncer
 * « pharmacie à 70 % » ou « hospitalisation jusqu'à 3 000 000 FCFA » engage le
 * cabinet sur des garanties que seule la compagnie fixe, dans le barème du
 * contrat.
 */
export const products: Formula[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    tagline: "Le nécessaire, bien couvert",
    description:
      "Les soins du quotidien : consultations, médicaments, analyses et hospitalisation. L'entrée dans la couverture, sans superflu.",
    adultMonthly: 7500,
    childMonthly: 3200,
    highlights: [
      "Consultations en cabinet et en clinique",
      "Pharmacie sur ordonnance",
      "Hospitalisation médicale et chirurgicale",
    ],
  },
  {
    id: "confort",
    name: "Confort",
    tagline: "Le meilleur équilibre",
    description:
      "Tout le niveau Essentiel, plus la maternité, le dentaire et l'optique. Le niveau que choisissent la plupart des familles.",
    adultMonthly: 11500,
    childMonthly: 4800,
    highlights: [
      "Suivi de grossesse et accouchement",
      "Soins dentaires et optique",
      "Plafonds sensiblement relevés",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Sérénité maximale",
    description:
      "Couverture étendue, plafonds élevés et évacuation sanitaire. Pour ceux qui veulent la tranquillité la plus large.",
    adultMonthly: 18500,
    childMonthly: 7900,
    highlights: [
      "Évacuation sanitaire",
      "Chambre individuelle en clinique",
      "Les plafonds les plus élevés du marché partenaire",
    ],
  },
];

export function getFormula(id: FormulaId): Formula {
  const f = products.find((p) => p.id === id);
  if (!f) throw new Error(`Formule inconnue : ${id}`);
  return f;
}

export const frequencyDiscount: Record<BillingFrequency, number> = {
  mensuel: 0,
  trimestriel: 0.02,
  annuel: 0.05,
};

export const frequencyLabel: Record<BillingFrequency, string> = {
  mensuel: "par mois",
  trimestriel: "par trimestre",
  annuel: "par an",
};

/** Multiplicateur de fréquence (prime de la période). */
export const frequencyMultiplier: Record<BillingFrequency, number> = {
  mensuel: 1,
  trimestriel: 3,
  annuel: 12,
};
