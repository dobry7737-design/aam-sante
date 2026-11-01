import type { Metadata } from "next";
import { Confirmation } from "@/components/funnel/Confirmation";

export const metadata: Metadata = {
  title: "Demande transmise",
  description:
    "Votre demande de couverture santé est transmise au cabinet. Un conseiller vous rappelle sous 24 h ouvrées.",
  robots: { index: false },
};

export default function ConfirmationPage() {
  return <Confirmation />;
}
