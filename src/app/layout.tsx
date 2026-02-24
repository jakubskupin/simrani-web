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
  title: "Šimrání — Podcast o intimitě, sexualitě & BDSM",
  description:
    "Otevřené rozhovory o tom, o čem se běžně nemluví. S lehkostí, respektem a zvědavostí. Protože intimita si zaslouží vlastní hlas.",
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
