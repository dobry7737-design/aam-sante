"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarClock, Check, MessageCircle, Phone, ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/stores/subscription";
import { lienWhatsAppDemande, resumeDemande } from "@/components/funnel/shared";
import { ease } from "@/lib/motion/tokens";

/**
 * Accusé de transmission d'une demande.
 *
 * Cet écran ne délivre ni contrat, ni carte, ni date de validité : rien de
 * tout cela n'existe tant qu'une compagnie n'a pas accepté le risque et que
 * la prime n'a pas été encaissée. Annoncer le contraire reviendrait à laisser
 * quelqu'un se croire couvert — et le découvrir devant un centre de soins.
 *
 * Ce qu'il fait, en revanche : redonner le lien WhatsApp si l'onglet a été
 * bloqué, afficher le texte exact transmis, et dire la suite.
 */
function ConfirmationSkeleton() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4" aria-hidden>
      <span className="size-10 animate-spin rounded-full border-[3px] border-teal-500 border-t-transparent" />
      <p className="text-[14px] text-muted-foreground">Préparation de votre récapitulatif…</p>
    </div>
  );
}

const ETAPES = [
  {
    titre: "Un conseiller vous rappelle",
    detail:
      "Sous 24 h ouvrées. Il vérifie votre besoin et interroge nos compagnies partenaires.",
    icone: Phone,
  },
  {
    titre: "Vous recevez une proposition chiffrée",
    detail:
      "Garanties, plafonds et prime, au nom de la compagnie qui porte le risque. Rien n'est engagé avant votre accord.",
    icone: ShieldQuestion,
  },
  {
    titre: "La couverture démarre après paiement",
    detail:
      "Votre carte et vos attestations vous sont remises à ce moment-là, pas avant.",
    icone: CalendarClock,
  },
];

export function Confirmation() {
  const router = useRouter();
  const [pret, setPret] = useState(false);
  const [resume, setResume] = useState("");
  const [lien, setLien] = useState("");
  const [prenom, setPrenom] = useState("");

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const s = useSubscription.getState();
      if (!s.completedAt) {
        router.replace("/souscrire");
        return;
      }
      // Capturé avant toute remise à zéro du brouillon.
      setResume(resumeDemande());
      setLien(lienWhatsAppDemande());
      setPrenom(s.principal.firstName.trim());
      setPret(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [router]);

  if (!pret) return <ConfirmationSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: ease.out }}
      className="mx-auto max-w-2xl py-10"
    >
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-teal-100 text-teal-900">
        <Check className="size-6" aria-hidden />
      </span>

      <h1 className="mt-6 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.05] tracking-tight">
        {prenom ? `Merci ${prenom}, ` : "Merci, "}
        votre demande est prête à partir
      </h1>

      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
        Elle s&apos;ouvre dans WhatsApp, sur la ligne du cabinet. Il ne reste
        qu&apos;à l&apos;envoyer — vous gardez la main sur ce que vous transmettez.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="min-h-12">
          <a href={lien} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" aria-hidden />
            Ouvrir WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" size="lg" className="min-h-12">
          <a href="tel:+22320294040">
            <Phone className="size-4" aria-hidden />
            20 29 40 40
          </a>
        </Button>
      </div>

      <details className="mt-8 rounded-[16px] border border-sand-200 bg-white/70 p-4">
        <summary className="cursor-pointer text-[14px] font-semibold">
          Voir le message transmis
        </summary>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-[13px] leading-relaxed text-muted-foreground">
          {resume}
        </pre>
      </details>

      <h2 className="mt-12 font-display text-xl font-bold">La suite</h2>
      <ol className="mt-5 space-y-5">
        {ETAPES.map((e, i) => (
          <li key={e.titre} className="flex gap-4">
            <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-sand-100 text-teal-900">
              <e.icone className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-[15px] font-semibold">
                <span className="text-muted-foreground">{i + 1}.</span> {e.titre}
              </p>
              <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                {e.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-10 rounded-[16px] bg-sand-100 p-4 text-[13.5px] leading-relaxed text-muted-foreground">
        <strong className="text-ink">Vous n&apos;êtes pas encore assuré.</strong> AAM
        est un cabinet de courtage : la couverture est portée par une compagnie
        partenaire et prend effet à la date indiquée sur votre contrat, après
        encaissement de la prime.
      </p>
    </motion.div>
  );
}
