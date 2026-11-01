import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/seo";

/**
 * Tant que le site n'est pas validé, rien n'est exploré ni indexé : un
 * déploiement de relecture partagé par lien ne doit pas finir dans Google.
 * L'ouverture se fait par `NEXT_PUBLIC_SITE_READY=true`.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dev/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
