import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider } from "@/lib/auth-context";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex",
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://groupelipandafamilly.com"),
  title: {
    default: "Groupe Lipanda FAMILY, Du génie intarissable",
    template: "%s · Groupe Lipanda FAMILY",
  },
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  description:
    "Ingénierie multidisciplinaire pour les infrastructures durables d'Afrique centrale. Hydraulique, BTP, études spécialisées, énergies renouvelables, formation professionnelle.",
  keywords: [
    "ingénierie RDC",
    "forage eau potable Kinshasa",
    "BTP Congo",
    "études géophysiques",
    "énergies renouvelables Afrique",
    "formation professionnelle BTP",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Groupe Lipanda FAMILY",
    title: "Groupe Lipanda FAMILY, Du génie intarissable",
    description:
      "Ingénierie multidisciplinaire pour les infrastructures durables d'Afrique centrale.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${plex.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Speed up Firebase & Google Fonts connections */}
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-paper-100 text-ink antialiased">
        <AuthProvider>
          <LanguageProvider>
            <SiteChrome>{children}</SiteChrome>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
