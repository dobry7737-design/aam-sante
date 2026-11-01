/**
 * Chiffres mis en avant sur le site.
 *
 * Les valeurs précédentes décrivaient un portefeuille santé qui n'existe pas
 * encore — 12 700 assurés, 120 entreprises, 97 % de tiers payant. Un cabinet
 * de courtage ne peut pas afficher cela : c'est invérifiable, et ce sont
 * précisément les chiffres qu'un prospect retient.
 *
 * Ne figurent ici que des faits constatables aujourd'hui, chacun avec sa
 * source. Les chiffres de portefeuille reviendront quand il y aura un
 * portefeuille, et ils viendront alors du backoffice, pas de ce fichier.
 */
export const STATS = {
  /**
   * Compagnies partenaires pratiquant la branche santé.
   * Source : référentiel des compagnies du CRM (novembre 2026).
   */
  partnerInsurers: 9,
  /**
   * Délai de réponse annoncé à une demande entrante, en minutes.
   * Source : engagement déjà pris sur aamassistances.com.
   */
  responseMinutes: 30,
  /**
   * Délai de rappel après une demande de devis, en heures ouvrées.
   * Source : engagement commercial du cabinet.
   */
  callbackHours: 24,
} as const;
