import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Marque AAM.
 *
 * Le logo est une image fournie par le cabinet, pas un tracé redessiné : un
 * monogramme approximatif passe inaperçu à l'écran mais saute aux yeux à côté
 * d'un document officiel, et c'est la même marque qui figure sur les
 * attestations et les bordereaux.
 *
 * Deux déclinaisons existent : le logo complet, avec la signature
 * « Assistances Assurances Mali », et le monogramme seul pour les emplacements
 * étroits.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-aam-monogramme.png"
      alt=""
      width={457}
      height={318}
      className={cn("h-8 w-auto object-contain", className)}
      priority
      aria-hidden
    />
  );
}

export function Logo({
  className,
  variant = "dark",
  wordmark = true,
}: {
  className?: string;
  /** dark = pour fonds clairs ; light = pour fonds sombres (ink) */
  variant?: "dark" | "light";
  wordmark?: boolean;
}) {
  const textColor = variant === "dark" ? "text-ink" : "text-sand-50";

  if (!wordmark) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <LogoMark />
        <span className="sr-only">AAM Assistances Assurances Mali</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Le logo est multicolore sur fond blanc : sur fond sombre il garde sa
          propre pastille, plutôt qu'une version claire qui n'existe pas. */}
      <span
        className={cn(
          "inline-flex items-center rounded-lg",
          variant === "light" && "bg-sand-50 px-1.5 py-1"
        )}
      >
        <LogoMark />
      </span>
      <span
        className={cn(
          "font-display text-[19px] font-bold leading-none tracking-tight",
          textColor
        )}
      >
        AAM
        <span className="ml-1.5 align-super text-[9px] font-semibold uppercase tracking-[0.18em] opacity-60">
          Santé
        </span>
      </span>
      <span className="sr-only">AAM Assistances Assurances Mali — santé</span>
    </span>
  );
}
