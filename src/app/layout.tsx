import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const nunito = Nunito({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dewan Masjid Indonesia",
    default: "Dewan Masjid Indonesia — Memakmurkan Masjid, Memakmurkan Umat",
  },
  description:
    "Dewan Masjid Indonesia (DMI) adalah organisasi nasional yang membina dan memakmurkan masjid-masjid di seluruh Indonesia sejak 1972.",
  keywords: ["DMI", "Dewan Masjid Indonesia", "masjid", "islam", "indonesia", "qurban", "infaq"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Dewan Masjid Indonesia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunito.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-dmi-cream">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
