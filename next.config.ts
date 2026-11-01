import type { NextConfig } from "next";

/**
 * Déploiement sur Vercel : pas de `output: "standalone"`, qui sert à
 * l'auto-hébergement derrière un reverse proxy et oblige à recopier les
 * fichiers statiques à la main après chaque build.
 *
 * Les erreurs de types ne sont plus ignorées. Les masquer sur un site qui
 * parle d'argent et de couverture santé revient à déployer sans savoir ce
 * qu'on déploie.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
