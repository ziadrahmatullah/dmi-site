import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  BookOpen,
  Leaf,
  Users,
  Stethoscope,
  ChevronRight,
  Clock,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import DashboardTransaksi from "@/components/beranda/DashboardTransaksi";
import DashboardQurban from "@/components/beranda/DashboardQurban";

export const metadata: Metadata = {
  title: "Beranda",
};

function IslamicPatternSVG({ id }: { id: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="60,6 78,42 114,42 84,66 96,102 60,80 24,102 36,66 6,42 42,42"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <circle cx="60" cy="60" r="14" fill="none" stroke="white" strokeWidth="0.6" />
          <rect
            x="44"
            y="44"
            width="32"
            height="32"
            transform="rotate(45 60 60)"
            fill="none"
            stroke="white"
            strokeWidth="0.6"
          />
          <circle cx="0" cy="0" r="4" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="120" cy="0" r="4" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="0" cy="120" r="4" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="120" cy="120" r="4" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const programs = [
  {
    icon: Users,
    title: "Pembinaan SDM",
    description:
      "Program peningkatan kapasitas takmir, imam, dan pengurus masjid melalui pelatihan dan sertifikasi nasional.",
    bgColor: "bg-emerald-50",
    iconColor: "text-dmi-green",
  },
  {
    icon: Heart,
    title: "Ekonomi Masjid",
    description:
      "Pemberdayaan ekonomi berbasis masjid melalui koperasi, UMKM, dan program wirausaha jemaah.",
    bgColor: "bg-amber-50",
    iconColor: "text-dmi-gold",
  },
  {
    icon: Stethoscope,
    title: "Kesehatan Umat",
    description:
      "Layanan kesehatan gratis, posyandu masjid, dan klinik berbasis komunitas di seluruh wilayah Indonesia.",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: BookOpen,
    title: "Pendidikan",
    description:
      "Madrasah diniyah, taman baca masjid, dan program beasiswa bagi putra-putri jemaah kurang mampu.",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Heart,
    title: "Sosial Kemasyarakatan",
    description:
      "Bantuan sosial, santunan yatim piatu, pemberdayaan kaum dhuafa, dan program kemanusiaan lainnya.",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  {
    icon: Leaf,
    title: "Lingkungan Hidup",
    description:
      "Gerakan masjid hijau, pengelolaan sampah, penghijauan, dan edukasi lingkungan berbasis masjid.",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
];

const beritaTerkini = [
  {
    id: "1",
    slug: "rakernas-dmi-2024",
    kategori: "Berita",
    judul: "Rakernas DMI 2024: Memperkuat Sinergi Masjid dan Umat",
    ringkasan:
      "Rapat Kerja Nasional DMI tahun 2024 berlangsung di Jakarta dengan mengusung tema penguatan peran masjid sebagai pusat peradaban Islam.",
    tanggal: "10 Desember 2024",
    thumbnail: "https://picsum.photos/seed/berita1/600/400",
    penulis: "Tim Redaksi DMI",
  },
  {
    id: "2",
    slug: "program-masjid-digital",
    kategori: "Program",
    judul: "DMI Luncurkan Program Masjid Digital untuk 10.000 Masjid",
    ringkasan:
      "Program digitalisasi masjid DMI menyasar 10.000 masjid di seluruh Indonesia dengan menyediakan wifi gratis dan sistem manajemen masjid.",
    tanggal: "5 November 2024",
    thumbnail: "https://picsum.photos/seed/berita2/600/400",
    penulis: "Divisi Komunikasi",
  },
  {
    id: "3",
    slug: "qurban-nasional-2024",
    kategori: "Qurban",
    judul: "DMI Distribusikan 15.000 Paket Qurban ke Pelosok Nusantara",
    ringkasan:
      "Pada Idul Adha 1445H, DMI berhasil mendistribusikan 15.000 paket daging qurban kepada masyarakat di daerah 3T seluruh Indonesia.",
    tanggal: "20 Juni 2024",
    thumbnail: "https://picsum.photos/seed/berita3/600/400",
    penulis: "Panitia Qurban DMI",
  },
];

const jadwalSholat = [
  { waktu: "Subuh", jam: "04:32" },
  { waktu: "Dzuhur", jam: "12:01" },
  { waktu: "Ashar", jam: "15:21" },
  { waktu: "Maghrib", jam: "18:02" },
  { waktu: "Isya", jam: "19:13" },
];

export default function BerandaPage() {
  return (
    <div className="min-h-screen">
      {/* ── 1. Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #14532d 0%, #15803d 40%, #166534 70%, #14532d 100%)",
          }}
        />
        <IslamicPatternSVG id="hero-pattern" />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/50" />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="animate-fade-in mb-6">
            <span className="inline-block px-4 py-1.5 bg-dmi-gold/20 border border-dmi-gold/30 rounded-full text-dmi-gold text-sm font-medium backdrop-blur-sm">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Memakmurkan Masjid,
            <br />
            <span className="text-dmi-gold">Memakmurkan Umat</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            Dewan Masjid Indonesia hadir sebagai motor penggerak kemakmuran
            masjid dan pemberdayaan umat Islam di seluruh penjuru nusantara.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link
              href="/tentang"
              className="inline-flex items-center justify-center gap-2 bg-white text-dmi-green font-semibold px-7 py-3.5 rounded-xl hover:bg-dmi-cream transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
            >
              Tentang DMI <ArrowRight size={18} />
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white hover:text-dmi-green transition-all duration-200 text-base"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Jadwal Sholat Bar ── */}
      <section className="bg-dmi-green py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 text-white shrink-0">
              <Clock size={16} className="text-dmi-gold" />
              <span className="font-semibold text-sm">Jadwal Sholat Jakarta</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-white/20" />
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-1.5">
              {jadwalSholat.map((s) => (
                <div key={s.waktu} className="flex items-center gap-1.5 text-sm">
                  <span className="text-white/60">{s.waktu}</span>
                  <span className="text-white font-bold">{s.jam}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Dashboard Transaksi (bg-white) ── */}
      <DashboardTransaksi />

      {/* ── 3. Dashboard Qurban (bg-gray-50) ── */}
      <DashboardQurban />

      {/* ── 4. Program Unggulan (bg-white) ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge label="Program Kami" variant="gold" className="mb-3" />
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Program Unggulan DMI
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Enam pilar program yang kami jalankan untuk mewujudkan masjid
              sebagai pusat peradaban dan pemberdayaan umat Islam Indonesia.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, i) => {
              const Icon = program.icon;
              return (
                <Card
                  key={program.title}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className={`w-12 h-12 ${program.bgColor} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon size={22} className={program.iconColor} />
                  </div>
                  <h3
                    className="font-bold text-gray-900 text-lg mb-2"
                    style={{ fontFamily: "var(--font-heading), serif" }}
                  >
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {program.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Berita Terkini (bg-gray-50) ── */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge label="Kabar Terbaru" variant="green" className="mb-3" />
              <h2
                className="text-3xl lg:text-4xl font-bold text-gray-900"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Berita Terkini
              </h2>
            </div>
            <Link
              href="/artikel"
              className="inline-flex items-center gap-1 text-dmi-green font-semibold text-sm hover:gap-2 transition-all duration-200 shrink-0"
            >
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beritaTerkini.map((berita, i) => (
              <Link key={berita.id} href={`/artikel/${berita.slug}`}>
                <Card
                  padding={false}
                  className="overflow-hidden group animate-fade-in-up h-full"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={berita.thumbnail}
                      alt={berita.judul}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <Badge
                      label={berita.kategori}
                      variant={
                        berita.kategori === "Berita"
                          ? "green"
                          : berita.kategori === "Qurban"
                          ? "gold"
                          : "gray"
                      }
                      className="mb-3"
                    />
                    <h3
                      className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-dmi-green transition-colors"
                      style={{ fontFamily: "var(--font-heading), serif" }}
                    >
                      {berita.judul}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                      {berita.ringkasan}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{berita.penulis}</span>
                      <span>·</span>
                      <span>{berita.tanggal}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="py-16 lg:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #14532d, #15803d)" }}
      >
        <IslamicPatternSVG id="cta-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Bersama Memakmurkan Masjid Indonesia
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Bergabunglah dengan jutaan umat yang telah bersama DMI dalam
            mewujudkan masjid sebagai pusat peradaban Islam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/qurban"
              className="inline-flex items-center justify-center gap-2 bg-dmi-gold text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-amber-600 transition-all duration-200 shadow-lg"
            >
              Program Qurban <ArrowRight size={18} />
            </Link>
            <Link
              href="/transaksi"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white hover:text-dmi-green transition-all duration-200"
            >
              Layanan Transaksi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
