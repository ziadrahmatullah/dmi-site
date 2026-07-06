import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import StrukturOrganisasi from "@/components/tentang/StrukturOrganisasi";

export const metadata: Metadata = { title: "Struktur Organisasi — DMI Kuningan" };

function IslamicPatternSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id="tp" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon points="40,4 52,28 76,28 56,44 64,68 40,54 16,68 24,44 4,28 28,28"
            fill="none" stroke="white" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tp)" />
    </svg>
  );
}

export default function StrukturOrganisasiPage() {
  return (
    <div className="min-h-screen bg-dmi-cream">
      {/* Hero */}
      <section
        className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #14532d, #15803d)" }}
      >
        <IslamicPatternSVG />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge label="Tentang Kami" variant="gold" className="mb-4" />
          <h1
            className="text-3xl lg:text-5xl font-bold text-white mb-4 max-w-2xl leading-tight"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Struktur Organisasi
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base leading-relaxed">
            Susunan kepengurusan Dewan Masjid Indonesia Kabupaten Kuningan
            Masa Bhakti 2023–2028.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <StrukturOrganisasi />
      </div>
    </div>
  );
}
