/** Dictionnaire centralisé des textes AAM Santé (fr) — prêt pour i18n (bambara plus tard). */
export const fr = {
  brand: {
    name: "AAM Santé",
    baseline: "Le soin, sans papier",
    /* Le numéro d'agrément est une mention réglementaire : il n'est pas
       inventé ici. Il sera ajouté par le cabinet, avec le RCCM et le NIF. */
    legal:
      "AAM Assistances Assurances Mali — cabinet de courtage en assurances, Bamako. Les garanties sont portées et souscrites auprès de compagnies d'assurance agréées partenaires. Les informations de ce site sont données à titre indicatif et ne constituent pas une offre contractuelle.",
  },
  nav: {
    assurance: "Assurance santé",
    entreprises: "Entreprises",
    prestataires: "Prestataires",
    comment: "Comment ça marche",
    cabinets: "Cabinets",
    login: "Se connecter",
    cta: "Simuler ma prime",
  },
  hero: {
    titleLines: ["Votre santé, couverte.", "Sans papier,", "sans attente."],
    /* La promesse décrit ce que le cabinet fait : comparer et accompagner.
       La souscription en ligne, la carte digitale et le remboursement Mobile
       Money arriveront avec l'espace assuré — les annoncer avant reviendrait
       à vendre ce qui n'existe pas. */
    subtitle:
      "Dites-nous qui couvrir : AAM interroge ses compagnies partenaires et vous remet une proposition chiffrée sous 24 h.",
    primaryCta: "Simuler ma prime",
    secondaryCta: "Je suis une entreprise",
    reinsurance: [
      "Neuf compagnies mises en concurrence",
      "Un conseiller dédié à Bamako",
      "Accompagnement en cas de soins",
    ],
  },
  dock: {
    simuler: "Simuler",
    prestataire: "Trouver un prestataire",
    whatsapp: "WhatsApp",
  },
  footer: {
    tagline:
      "Cabinet de courtage en assurances à Bamako. Nous comparons les offres santé des compagnies partenaires et accompagnons nos assurés au quotidien.",
    columns: {
      produit: "Produit",
      parcours: "Parcours",
      entreprise: "Entreprise",
      aide: "Aide & contact",
    },
    useful: [
      { label: "Service client", value: "+223 20 29 40 40" },
      { label: "Urgences 24 h/24", value: "+223 84 95 95 53" },
      { label: "WhatsApp", value: "+223 84 95 95 53" },
    ],
  },
  connexion: {
    profiles: [
      { id: "assure", title: "Assuré", description: "Ma carte, mes remboursements, mes proches." },
      { id: "entreprise", title: "Entreprise", description: "Salariés, contrats et factures groupe." },
      { id: "prestataire", title: "Prestataire", description: "Tiers payant, patients et versements." },
      { id: "cabinet", title: "Cabinet", description: "Portefeuille, sinistres et commissions." },
    ],
  },
} as const;
