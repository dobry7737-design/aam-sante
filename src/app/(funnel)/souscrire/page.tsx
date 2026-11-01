import type { Metadata } from "next";
import { SubscriptionFunnel } from "@/components/funnel/SubscriptionFunnel";

export const metadata: Metadata = {
  title: "Souscrire en ligne",
  description:
    "Décrivez votre besoin en 5 minutes : niveau de couverture, personnes à assurer, documents. Votre demande part sur la ligne du cabinet, un conseiller vous rappelle sous 24 h.",
  alternates: { canonical: "/souscrire" },
};

export default function SouscrirePage() {
  return <SubscriptionFunnel />;
}
