"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Users, Smartphone, Calculator, BadgeCheck } from "lucide-react";
import { gsap, initGsap, ScrollTrigger } from "@/lib/motion/gsap";
import { duration, ease } from "@/lib/motion/tokens";
import { quote } from "@/lib/pricing";
import { formatFcfa } from "@/lib/utils/format";
import { Eyebrow, Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { stagger } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/**
 * « Du papier au digital » — storytelling épinglé en 4 étapes.
 * À gauche les étapes, à droite une maquette d'interface qui se transforme.
 */
/**
 * Le parcours tel qu'il se passe aujourd'hui.
 *
 * La version précédente décrivait une souscription payée en ligne, une carte
 * à QR code reçue dans l'instant et un remboursement Mobile Money sous 72 h.
 * Rien de cela n'est en service : ces étapes viendront avec l'espace assuré.
 * Celles ci-dessous sont celles que le cabinet tient.
 */
const steps = [
  {
    id: 1,
    icon: Calculator,
    title: "J'estime mon budget",
    text: "Trois questions suffisent pour situer l'ordre de grandeur : qui couvrir, à quel âge, à quel niveau. Sans engagement et sans donner son nom.",
  },
  {
    id: 2,
    icon: Smartphone,
    title: "Je décris ce que je veux couvrir",
    text: "Les personnes, le niveau de garanties, les pièces. La demande part sur la ligne du cabinet — vous voyez exactement ce que vous transmettez.",
  },
  {
    id: 3,
    icon: Users,
    title: "AAM met les compagnies en concurrence",
    text: "Un conseiller vous rappelle sous 24 h ouvrées, interroge nos neuf partenaires santé et vous remet une proposition chiffrée, au nom de la compagnie qui porte le risque.",
  },
  {
    id: 4,
    icon: Bell,
    title: "Je suis accompagné après la signature",
    text: "Incorporation d'un proche, renouvellement, remboursement contesté : votre interlocuteur reste le même, et c'est lui qui parle à la compagnie.",
  },
];

/** Montant du mock calculé par le moteur réel (mêmes données que le simulateur express). */
const MOCK_MONTHLY = quote({
  coverage: "famille",
  children: 2,
  age: 32,
  formula: "confort",
  frequency: "mensuel",
}).monthly;

/** Maquettes d'interface (mocks purement décoratifs). */
function Panel({ index }: { index: number }) {
  if (index === 0) {
    return (
      <MockShell title="Simulateur — 30 secondes">
        <div className="space-y-3">
          <div className="flex gap-2">
            {["Seul·e", "Couple", "Famille"].map((c, i) => (
              <span key={c} className={cn("flex-1 rounded-lg px-2 py-1.5 text-center text-[11px] font-semibold", i === 2 ? "bg-teal-900 text-sand-50" : "bg-sand-100 text-muted-foreground")}>
                {c}
              </span>
            ))}
          </div>
          <div className="rounded-xl border border-sand-200 bg-white p-3">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-muted-foreground">2 adultes · 2 enfants</span>
              <span className="tnum font-bold text-teal-900">{formatFcfa(MOCK_MONTHLY)}/mois</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand-200">
              <div className="h-full w-[68%] rounded-full bg-teal-500" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-teal-100 p-3 text-[12px] font-semibold text-teal-900">
            <span>Formule Confort recommandée</span>
            <BadgeCheck className="size-4" />
          </div>
        </div>
      </MockShell>
    );
  }
  if (index === 1) {
    return (
      <MockShell title="Ma demande — récapitulatif">
        <div className="space-y-2.5">
          {[
            ["Qui assurer", "Ma famille · 2 enfants"],
            ["Niveau souhaité", "Confort"],
            ["Commune", "Bamako — Hamdallaye"],
          ].map(([cle, valeur]) => (
            <div key={cle} className="flex items-baseline justify-between gap-3 text-[12px]">
              <span className="text-muted-foreground">{cle}</span>
              <span className="font-semibold text-ink">{valeur}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-xl bg-teal-100 p-3 text-[12px] font-semibold text-teal-900">
            <Smartphone className="size-4 shrink-0" />
            Envoyé sur la ligne du cabinet
          </div>
        </div>
      </MockShell>
    );
  }
  if (index === 2) {
    return (
      <MockShell title="Propositions reçues">
        <div className="space-y-2">
          {[
            ["Compagnie A", true],
            ["Compagnie B", false],
            ["Compagnie C", false],
          ].map(([nom, retenue], i) => (
            <div
              key={String(nom)}
              className={cn(
                "flex items-center justify-between rounded-xl p-2.5 text-[12px] ring-1",
                retenue
                  ? "bg-teal-100 font-semibold text-teal-900 ring-teal-700/30"
                  : "bg-white text-muted-foreground ring-sand-200"
              )}
            >
              <span>{nom}</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-10 overflow-hidden rounded-full bg-sand-200">
                  <span
                    className={cn("block h-full rounded-full", retenue ? "bg-teal-500" : "bg-sand-300")}
                    style={{ width: `${[92, 74, 61][i]}%` }}
                  />
                </span>
                {retenue && <BadgeCheck className="size-4" />}
              </span>
            </div>
          ))}
          <p className="pl-1 text-[11px] text-muted-foreground">
            Garanties et prime comparées poste par poste.
          </p>
        </div>
      </MockShell>
    );
  }
  return (
    <MockShell title="Mon conseiller">
      <div className="space-y-2.5">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: duration.base, ease: ease.out }}
          className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-sand-200"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-ochre-100 text-ochre-500">
            <Bell className="size-4" />
          </span>
          <div>
            <p className="text-[12px] font-bold text-ink">Incorporation d&rsquo;un enfant</p>
            <p className="text-[12px] text-success">Transmise à la compagnie</p>
          </div>
        </motion.div>
        <p className="pl-1 text-[11px] text-muted-foreground">
          Votre interlocuteur reste le même d&rsquo;une année sur l&rsquo;autre.
        </p>
        <div className="flex items-center gap-2 rounded-xl bg-teal-100 p-3 text-[12px] font-semibold text-teal-900">
          <Users className="size-4 shrink-0" />
          Un conseiller dédié à Bamako
        </div>
      </div>
    </MockShell>
  );
}

function MockShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[330px] rounded-[16px] glass-panel p-4 shadow-lift">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-teal-900">
        <span className="size-1.5 rounded-full bg-teal-500" /> {title}
      </p>
      {children}
    </div>
  );
}

export function PaperToDigital() {
  const wrapRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      initGsap();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setActive(Math.min(3, Math.floor(self.progress * 4.35)));
          const line = lineRef.current?.querySelector(".progress-line");
          if (line) line.setAttribute("y2", String(220 * self.progress));
        },
      });
    },
    { scope: wrapRef }
  );

  return (
    <section ref={wrapRef} className="relative h-[380vh] bg-ink text-sand-50" aria-label="Comment AAM Santé fonctionne">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-ams grid items-center gap-10 py-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Eyebrow tone="light">Du papier au digital</Eyebrow>
            <SplitHeading className="mt-5 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-bold">
              Le parcours de soin, simplifié.
            </SplitHeading>

            {/* barre de progression verticale SVG */}
            <div className="relative mt-10 hidden lg:block">
              <svg ref={lineRef} viewBox="0 0 4 220" className="absolute -left-6 top-2 h-[200px] w-1" aria-hidden>
                <line x1="2" y1="0" x2="2" y2="220" stroke="rgba(247,244,238,0.15)" strokeWidth="2" />
                <line className="progress-line" x1="2" y1="0" x2="2" y2="220" stroke="#17A398" strokeWidth="2" />
              </svg>
              <ol className="space-y-6">
                {steps.map((s, i) => (
                  <li key={s.id} className="flex gap-4">
                    <span
                      className={cn(
                        "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ease-ams-out",
                        i <= active
                          ? "border-teal-500 bg-teal-500/20 text-teal-300"
                          : "border-white/12 text-sand-50/40"
                      )}
                    >
                      <s.icon className="size-[18px]" />
                    </span>
                    <div>
                      <p className={cn(
                        "font-display text-[17px] font-semibold transition-colors duration-300 ease-ams-out",
                        i === active ? "text-sand-50" : "text-sand-50/60"
                      )}>
                        {s.title}
                      </p>
                      <p className={cn(
                        "mt-1 max-w-[440px] text-[14px] leading-relaxed transition-colors duration-300 ease-ams-out",
                        i === active ? "text-sand-50/80" : "text-sand-50/60"
                      )}>
                        {s.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* panneau transformant */}
          <div className="relative hidden h-[420px] items-center justify-center lg:flex" aria-hidden>
            <div className="absolute inset-x-8 top-1/2 -z-0 h-56 -translate-y-1/2 rounded-full bg-teal-500/15 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 26, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -26, scale: 0.98 }}
                transition={{ duration: duration.base, ease: ease.out }}
                className="flex w-full justify-center"
              >
                <Panel index={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* version mobile : liste simple */}
          <div className="lg:hidden">
            <ol className="space-y-5">
              {steps.map((s, i) => (
                <Reveal key={s.id} delay={i * stagger.tight}>
                  <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="flex items-center gap-2.5 font-display text-[16px] font-semibold">
                      <s.icon className="size-4 text-teal-300" /> {s.title}
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-sand-50/60">{s.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
