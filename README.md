# AAM Santé — site public

Site public de l'offre santé d'**AAM Assistances Assurances Mali**, cabinet de
courtage à Bamako. Déployé sur Vercel, domaine `sante.aamassistances.com`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, shadcn/ui, GSAP et
Framer Motion. Pas de base de données : le site présente l'offre et qualifie
les demandes, que le cabinet reprend sur WhatsApp ou par téléphone.

## Ce que le site fait — et ne fait pas

Il **n'est pas** un espace assuré. Il ne délivre aucun contrat, aucune carte,
aucune attestation, et n'encaisse rien. Ces fonctions appartiennent au
backoffice (`crm.aamassistances.com`), qui sait depuis peu gérer les
bénéficiaires, les barèmes de garanties, les feuilles de soins et les cartes.

Une première version de ce site simulait tout cela : souscription délivrant un
numéro de contrat, paiement Mobile Money « réussi » au bout de six secondes,
vérification d'attestation renvoyant « valide » pour n'importe quel code bien
formé, annuaire présentant de vrais hôpitaux comme conventionnés. Ces écrans
ont été retirés. Sur un site d'assurance, ce ne sont pas des maquettes : ce
sont des affirmations fausses, opposables au cabinet.

Ce qui subsiste est soit constatable, soit explicitement indicatif.

## Avant la mise en ligne

Trois points relèvent du cabinet et ne peuvent pas être tranchés dans le code :

1. **Mentions réglementaires** — numéro d'agrément de courtage, RCCM, NIF,
   directeur de publication, hébergeur. Les pages `/legal/*` portent un
   avertissement tant qu'elles ne sont pas validées par un conseil juridique.
2. **Tarifs** — les montants de `src/data/products.ts` sont des ordres de
   grandeur de travail. Aucune compagnie ne s'est engagée dessus. Ils doivent
   être remplacés par les tarifs réels, qui viendront des produits santé du
   CRM, avant toute campagne.
3. **Réseau de soins** — aucun prestataire n'est annoncé comme conventionné
   tant qu'une convention n'est pas signée.

## Branchement sur le backoffice

Prévu, pas encore fait. Le CRM expose `/api/v1` avec authentification par
jeton (`Authorization: Bearer`) et un agrégat `/api/v1/moi` qui rend profil,
contrats, bénéficiaires, garanties, plafonds et feuilles de soins en un appel.

Il faudra ajouter `https://sante.aamassistances.com` à la variable
`ALLOWED_ORIGINS` du projet CRM sur Vercel, faute de quoi le navigateur
bloquera les appels.

## Variables d'environnement

| Variable | Rôle | Valeur en production |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | base des URL canoniques, du sitemap et des métadonnées | `https://sante.aamassistances.com` |
| `NEXT_PUBLIC_SITE_READY` | ouvre l'indexation par les moteurs | `true`, le jour de la mise en ligne |

Sans `NEXT_PUBLIC_APP_URL`, le site retombe sur cette même valeur par défaut.

`NEXT_PUBLIC_SITE_READY` vaut `false` par défaut, et le site est alors en
**noindex** : `robots.txt` interdit l'exploration et chaque page porte la
balise correspondante. C'est voulu — un déploiement partagé pour relecture
ne doit pas finir dans les résultats de recherche, car une page indexée
survit à la correction, et il s'agit de montants et de garanties au nom du
cabinet. À passer à `true` une fois les tarifs, l'agrément et les textes
validés.
