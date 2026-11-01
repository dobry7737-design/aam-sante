import type { MetadataRoute } from "next";

/**
 * Sitemap AAM Santé — toutes les pages publiques indexables.
 * Les tunnels noindex (/entreprises/devis, /souscrire/confirmation)
 * en sont volontairement exclus pour rester cohérents
 * avec leurs directives robots.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://sante.aamassistances.com";

  const entries: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/assurance-sante", priority: 0.9, changeFrequency: "weekly" },
    { path: "/simulateur", priority: 0.9, changeFrequency: "monthly" },
    { path: "/entreprises", priority: 0.8, changeFrequency: "monthly" },
    { path: "/comment-ca-marche", priority: 0.7, changeFrequency: "monthly" },
    { path: "/cabinets", priority: 0.7, changeFrequency: "monthly" },
    { path: "/aide", priority: 0.6, changeFrequency: "weekly" },
    { path: "/souscrire", priority: 0.5, changeFrequency: "monthly" },
    { path: "/legal/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/confidentialite", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/cgu", priority: 0.2, changeFrequency: "yearly" },
  ];

  const lastModified = new Date();

  return entries.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
