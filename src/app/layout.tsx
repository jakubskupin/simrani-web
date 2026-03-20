import type { Metadata } from "next";
import { Fraunces, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  axes: ["WONK", "SOFT", "opsz"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simrani.cz"),
  title: "Šimrání — Podcast o intimitě, sexualitě & BDSM",
  description:
    "Otevřené rozhovory o tom, o čem se běžně nemluví. S lehkostí, respektem a zvědavostí. Protože intimita si zaslouží vlastní hlas.",
  openGraph: {
    title: "Šimrání — Podcast o intimitě",
    description:
      "Otevřené rozhovory o tom, o čem se běžně nemluví. S lehkostí, respektem a zvědavostí.",
    type: "website",
    locale: "cs_CZ",
    siteName: "Šimrání",
    images: [
      {
        url: "/og-simrani.png",
        width: 1200,
        height: 630,
        alt: "Šimrání — Podcast o intimitě",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Šimrání — Podcast o intimitě",
    description:
      "Otevřené rozhovory o tom, o čem se běžně nemluví. S lehkostí, respektem a zvědavostí.",
    images: ["/og-simrani.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${fraunces.variable} ${bricolage.variable} font-body bg-[var(--deep)] text-[var(--cream)] antialiased font-light`}
      >
        {children}
      </body>
    </html>
  );
}
