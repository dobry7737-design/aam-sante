import type { Metadata, Viewport } from "next";
import { INDEXABLE } from "@/lib/seo";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://sante.aamassistances.com"),
  title: {
    default: "AAM Santé — Votre assurance santé au Mali, bien choisie",
    template: "%s · AAM Santé",
  },
  description:
    "AAM Assistances Assurances Mali compare les offres santé de ses compagnies partenaires, pour les particuliers, les familles et les entreprises. Proposition chiffrée sous 24 h.",
  keywords: [
    "assurance santé Mali",
    "mutuelle Bamako",
    "courtier assurance Mali",
    "assurance santé entreprise Bamako",
    "AAM Assistances Assurances Mali",
  ],
  openGraph: {
    title: "AAM Santé — Votre assurance santé, bien choisie",
    description:
      "Neuf compagnies partenaires comparées pour vous, à Bamako. Proposition chiffrée sous 24 h.",
    locale: "fr_ML",
    type: "website",
    siteName: "AAM Santé",
  },
  twitter: {
    card: "summary_large_image",
    title: "AAM Santé — Votre assurance santé, bien choisie",
    description:
      "Neuf compagnies partenaires comparées pour vous, à Bamako. Proposition chiffrée sous 24 h.",
  },
  // `robots.txt` empêche l'exploration ; cette balise empêche l'indexation,
  // qui peut survenir sans exploration si la page est liée ailleurs. Les deux
  // sont nécessaires tant que le site n'est pas validé.
  robots: INDEXABLE ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0B1F1E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
