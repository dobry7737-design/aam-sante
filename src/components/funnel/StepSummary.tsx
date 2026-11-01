"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { useSubscription } from "@/stores/subscription";
import { quote } from "@/lib/pricing";
import { getFormula, frequencyLabel } from "@/data/products";
import { formatPhone } from "@/lib/utils/format";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AmountDisplay } from "@/components/shared/AmountDisplay";
import { StepCard, StepTitle, FieldError, coverageLabel, relationLabel } from "@/components/funnel/shared";
import { summarySchema, fieldErrors } from "@/components/funnel/schemas";
import { cn } from "@/lib/utils";

function RecapRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <dt className="shrink-0 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-right text-[14.5px] sm:flex-1">{children}</dd>
    </div>
  );
}

/**
 * Étape 5 — Récapitulatif et consentements.
 *
 * Il n'y a plus de « signature par code SMS » : aucun SMS n'était envoyé,
 * n'importe quel code à six chiffres passait, et l'écran annonçait un
 * « contrat signé électroniquement ». Une signature est un acte juridique,
 * elle ne se met pas en décor.
 *
 * Ce que cet écran produit, c'est une demande : l'assuré vérifie ce qu'il
 * transmet, et le cabinet reprend la main.
 */
export function StepSummary({ showErrors }: { showErrors: boolean }) {
  const coverage = useSubscription((s) => s.coverage);
  const childrenCount = useSubscription((s) => s.childrenCount);
  const age = useSubscription((s) => s.age);
  const formulaId = useSubscription((s) => s.formula);
  const frequency = useSubscription((s) => s.frequency);
  const principal = useSubscription((s) => s.principal);
  const beneficiaries = useSubscription((s) => s.beneficiaries);
  const documents = useSubscription((s) => s.documents);
  const consents = useSubscription((s) => s.consents);
  const setConsents = useSubscription((s) => s.setConsents);

  const formula = getFormula(formulaId);
  const children = coverage === "famille" ? childrenCount : 0;
  const q = useMemo(
    () => quote({ coverage, children, age, formula: formulaId, frequency }),
    [coverage, children, age, formulaId, frequency]
  );

  const consentErrors = useMemo(() => {
    const parsed = summarySchema.safeParse(consents);
    return parsed.success ? {} : fieldErrors(parsed.error);
  }, [consents]);
  const visible = showErrors ? consentErrors : {};

  // Comptage aligné aux personnes ACTUELLES (les docs des bénéficiaires
  // retirés sont purgés par le store — ici on ne compte que l'existant).
  const docKeys = ["doc-principal", ...beneficiaries.map((b) => `doc-${b.id}`)];
  const docsAdded = docKeys.filter((k) => documents[k]).length;
  const docsExpected = 1 + beneficiaries.length;

  return (
    <StepCard>
      <StepTitle
        title="Récapitulatif de votre demande"
        hint="Vérifiez chaque ligne : c'est ce qui sera transmis au cabinet."
      />

      {/* ── Récapitulatif ─────────────────────────────────────────── */}
      <div className="space-y-5 rounded-[16px] border border-sand-200 p-5">
        <dl className="space-y-3.5">
          <RecapRow label="Formule">
            <span className="font-semibold">{formula.name}</span>
            <span className="text-muted-foreground"> — {formula.tagline}</span>
          </RecapRow>
          <RecapRow label="Couverture">
            {coverageLabel[coverage]}
            {children > 0 && <span className="tnum text-muted-foreground"> · {children} enfant{children > 1 ? "s" : ""}</span>}
            <span className="text-muted-foreground"> · adhérent de {age} ans</span>
          </RecapRow>
          <RecapRow label="Prime">
            <span className="font-display text-[17px] font-bold text-teal-900">
              <AmountDisplay value={q.period} />
            </span>{" "}
            <span className="text-muted-foreground">{frequencyLabel[frequency]}</span>
            {q.discount > 0 && (
              <span className="ml-2 rounded-full bg-teal-100 px-2.5 py-0.5 text-[12px] font-semibold text-teal-700">
                remise {Math.round(q.discount * 100)} % incluse
              </span>
            )}
          </RecapRow>
          <Separator />
          <RecapRow label="Bénéficiaires">
            {beneficiaries.length === 0 ? (
              <span className="text-muted-foreground">Aucun — vous seul·e êtes couvert·e.</span>
            ) : (
              <ul className="space-y-0.5">
                {beneficiaries.map((b) => (
                  <li key={b.id} className="tnum">
                    <span className="font-semibold">{b.firstName.trim() || "Prénom à compléter"}</span>
                    <span className="text-muted-foreground">
                      {" "}· {relationLabel[b.relation]} · {b.birthDate || "naissance à compléter"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </RecapRow>
          <Separator />
          <RecapRow label="Adhérent">
            {principal.firstName || "…"} {principal.lastName} —{" "}
            <span className="tnum">{formatPhone(principal.phone)}</span>
            {principal.email.trim() !== "" && <span className="text-muted-foreground"> · {principal.email}</span>}
            <br />
            <span className="text-muted-foreground">
              {principal.commune || "Commune à choisir"}
              {principal.quartier.trim() !== "" ? `, ${principal.quartier}` : ""} · pièce{" "}
              <span className="tnum">{principal.idNumber || "—"}</span>
            </span>
          </RecapRow>
          <RecapRow label="Documents">
            <span className={cn(docsAdded === docsExpected ? "text-success" : "text-muted-foreground")}>
              {docsAdded}/{docsExpected} ajoutés
            </span>
          </RecapRow>
        </dl>
      </div>

      {/* ── Consentements ─────────────────────────────────────────── */}
      <div className="mt-6 space-y-3.5">
        <div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent-cgu"
              checked={consents.cgu}
              onCheckedChange={(v) => setConsents({ cgu: v === true })}
              aria-invalid={!!visible["cgu"]}
              className="mt-0.5 size-5"
            />
            <Label htmlFor="consent-cgu" className="text-[14px] font-normal leading-relaxed">
              J&apos;ai lu et j&apos;accepte les{" "}
              <Link href="/legal/cgu" className="font-semibold text-teal-700 underline-offset-2 hover:underline">
                conditions générales
              </Link>{" "}
              de l&apos;assurance santé AAM Santé.
            </Label>
          </div>
          <FieldError message={visible["cgu"]} />
        </div>
        <div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent-data"
              checked={consents.data}
              onCheckedChange={(v) => setConsents({ data: v === true })}
              aria-invalid={!!visible["data"]}
              className="mt-0.5 size-5"
            />
            <Label htmlFor="consent-data" className="text-[14px] font-normal leading-relaxed">
              J&apos;autorise AAM Santé à traiter les données de ce dossier pour la gestion de mon
              contrat et de mes remboursements.
            </Label>
          </div>
          <FieldError message={visible["data"]} />
        </div>
      </div>

      {/* ── Ce qui se passe ensuite ───────────────────────────────── */}
      <div className="mt-6 rounded-[16px] bg-teal-50 p-5">
        <p className="flex items-start gap-2.5 text-[14px] leading-relaxed text-teal-900">
          <Send className="mt-0.5 size-4.5 shrink-0 text-teal-700" aria-hidden />
          <span>
            Votre demande part sur la ligne WhatsApp du cabinet.
            <span className="block text-[13px] text-teal-900/70">
              Un conseiller vous rappelle au{" "}
              <span className="tnum font-semibold">
                {formatPhone(principal.phone) || "numéro indiqué"}
              </span>{" "}
              sous 24 h ouvrées, avec une proposition chiffrée. Rien n&apos;est engagé
              à ce stade : ni contrat, ni paiement.
            </span>
          </span>
        </p>
      </div>
    </StepCard>
  );
}
