/**
 * Couche API AAM Santé.
 *
 * Le site n'a pas de serveur à lui : il présente l'offre et qualifie les
 * demandes, que le cabinet reprend ensuite sur WhatsApp ou par téléphone.
 *
 * Les fonctions qui simulaient un backend ont été retirées — souscription,
 * paiement Mobile Money, vérification de carte, annuaire conventionné. Elles
 * fabriquaient des réponses crédibles : un contrat délivré, un paiement
 * « réussi », une attestation « valide » pour n'importe quel code bien formé.
 * Sur un site d'assurance en ligne, ce ne sont pas des maquettes, ce sont des
 * affirmations fausses opposables au cabinet.
 *
 * Ce qui reste ici est un calcul local et vérifiable : l'ordre de grandeur
 * d'une prime, à partir de la grille de travail. Le branchement sur le
 * backoffice se fera par `/api/v1` du CRM, avec authentification par jeton.
 */
import type { BillingFrequency, CoverageType, FormulaId } from "@/data/types";
import { products } from "@/data/products";
import { quote, groupEstimate, type QuoteInput, type QuoteResult } from "@/lib/pricing";

const wait = (ms?: number) =>
  new Promise<void>((r) => setTimeout(r, ms ?? 400 + Math.random() * 800));

// ──────────────────────────────────────────────────────────── Produits

export async function getProducts() {
  await wait();
  return products;
}

export async function quoteApi(input: QuoteInput): Promise<QuoteResult> {
  await wait(300);
  return quote(input);
}

// ─────────────────────────────────────────────── Demande de couverture

/**
 * Demande qualifiée par le tunnel.
 *
 * Elle n'est pas envoyée à un serveur : `lienWhatsAppDemande()` la met en
 * forme et l'assuré la transmet lui-même sur la ligne du cabinet.
 */
export interface SubscriptionPayload {
  coverage: CoverageType;
  formula: FormulaId;
  frequency: BillingFrequency;
  children: number;
  age: number;
  principal: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    commune: string;
    quartier?: string;
    idNumber: string;
  };
  beneficiaries: { firstName: string; lastName: string; birthDate: string; relation: string }[];
  amount: number;
}

// ───────────────────────────────────────── B2B / Partenaires / Démo

export interface B2BQuotePayload {
  company: string;
  sector: string;
  city: string;
  employees: number;
  dependents: number;
  formula: FormulaId;
  contactName: string;
  contactRole: string;
  phone: string;
  email: string;
}

/**
 * Estimation de groupe.
 *
 * Le calcul est local et indicatif ; aucun dossier n'est ouvert et aucune
 * référence n'est délivrée. L'écran oriente vers le cabinet, qui interroge
 * les compagnies et établit la proposition ferme.
 */
export async function submitB2BQuote(payload: B2BQuotePayload) {
  await wait(600);
  return { estimate: groupEstimate(payload.employees, payload.dependents, payload.formula) };
}

export async function requestDemo(_payload: { name: string; email: string; company: string }) {
  await wait(700);
  return { ok: true as const, slot: "sous 48 h" };
}
