import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Visi & Misi — DMI Kuningan" };

function IslamicPatternSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="tp" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon
            points="40,4 52,28 76,28 56,44 64,68 40,54 16,68 24,44 4,28 28,28"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tp)" />
    </svg>
  );
}

export default function VisiMisiPage() {
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
            Visi & Misi DMI Kuningan
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base leading-relaxed">
            Arah dan tujuan Dewan Masjid Indonesia Kabupaten Kuningan dalam
            memakmurkan masjid dan memberdayakan umat.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Kiri: Visi, Misi, Moto */}
          <div className="space-y-6">
            {/* Visi */}
            <div
              className="rounded-2xl p-10 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #14532d 0%, #166534 60%, #15803d 100%)",
              }}
            >
              <IslamicPatternSVG />
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-dmi-gold text-xs font-semibold tracking-widest uppercase mb-4">
                  Visi
                </span>
                <svg
                  className="w-8 h-8 text-white/30 mb-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p
                  className="text-white text-xl sm:text-2xl font-semibold leading-relaxed max-w-2xl"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Terwujudnya Semangat Berjamaah Dalam Masjid Sehat dan Dinamis
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-dmi-green flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <h3
                  className="text-xl font-bold text-gray-900"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Misi
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Mengembangkan masjid sebagai pusat ibadah dan dakwah",
                  "Memotivasi gerakan berjamaah dan manajemen masjid",
                  "Menjadikan masjid tempat pengkajian ilmu dan bakti sosial",
                  "Mewujudkan masjid khidmat, aman, sehat, dan indah",
                  "Menjadikan masjid ramah anak dan program kaderisasi umat",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-dmi-green/5 transition-colors"
                  >
                    <span className="w-7 h-7 rounded-full bg-dmi-green text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Moto */}
            <div className="rounded-2xl border border-dmi-gold/30 bg-amber-50 p-8">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-dmi-gold flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-dmi-gold tracking-widest uppercase mb-1">
                    Moto
                  </p>
                  <p
                    className="text-gray-800 text-lg font-bold"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    Jadikan Masjid, Tempat Favorit Kita
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan: Foto Pimpinan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:sticky lg:top-24">
            <img
              src="/ketua-sekertaris.png"
              alt="Ketua dan Sekretaris PD DMI Kabupaten Kuningan"
              className="w-full object-cover"
            />
            <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100">
              <div className="p-4 text-center">
                <p className="text-[11px] font-semibold text-dmi-gold tracking-widest uppercase mb-1">
                  Ketua DMI
                </p>
                <p
                  className="text-gray-900 font-bold text-sm"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Dr. Ugin Lugina, M.Pd.
                </p>
              </div>
              <div className="p-4 text-center">
                <p className="text-[11px] font-semibold text-dmi-gold tracking-widest uppercase mb-1">
                  Sekretaris DMI
                </p>
                <p
                  className="text-gray-900 font-bold text-sm"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Ano Sutarno, M.Pd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
