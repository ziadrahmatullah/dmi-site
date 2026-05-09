import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export const metadata: Metadata = { title: "Tentang DMI" };

const milestones = [
  { tahun: "1972", judul: "Pendirian DMI", deskripsi: "DMI didirikan pada 22 November 1972 atas prakarsa para ulama dan tokoh masyarakat dengan misi memakmurkan masjid di seluruh Indonesia." },
  { tahun: "1980", judul: "Ekspansi Nasional", deskripsi: "DMI mulai membentuk Dewan Pimpinan Wilayah di seluruh provinsi dan kabupaten/kota di Indonesia, memperkuat jaringan nasional." },
  { tahun: "1990", judul: "Program Pemberdayaan", deskripsi: "Peluncuran program-program pemberdayaan umat berbasis masjid: pendidikan, kesehatan, dan ekonomi kerakyatan." },
  { tahun: "2000", judul: "Era Reformasi", deskripsi: "Memasuki era reformasi, DMI beradaptasi dengan membuka program-program baru sesuai kebutuhan umat yang terus berkembang." },
  { tahun: "2010", judul: "Transformasi Digital", deskripsi: "DMI mulai memanfaatkan teknologi informasi untuk mengelola dan menghubungkan masjid-masjid di seluruh Indonesia." },
  { tahun: "2020+", judul: "DMI Modern", deskripsi: "DMI bertransformasi menjadi organisasi modern yang inklusif dengan program digitalisasi masjid, green mosque, dan ekonomi syariah." },
];

const strukturOrganisasi = [
  { jabatan: "Ketua Umum", nama: "Dr. H. M. Jusuf Kalla", inisial: "JK", deskripsi: "Wakil Presiden RI ke-10 dan ke-12, memimpin DMI sejak 2012." },
  { jabatan: "Sekretaris Jenderal", nama: "H. Imam Addaruqutni", inisial: "IA", deskripsi: "Memimpin operasional harian dan kesekretariatan DMI Pusat." },
  { jabatan: "Bendahara Umum", nama: "H. Misbahul Munir", inisial: "MM", deskripsi: "Bertanggung jawab atas pengelolaan keuangan dan aset organisasi." },
];

const provinsi = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi",
  "Sumatera Selatan", "Bengkulu", "Lampung", "Kepulauan Bangka Belitung",
  "Kepulauan Riau", "DKI Jakarta", "Jawa Barat", "Jawa Tengah",
  "DI Yogyakarta", "Jawa Timur", "Banten", "Bali",
  "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat",
  "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur",
  "Kalimantan Utara", "Sulawesi Utara", "Sulawesi Tengah",
  "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
  "Maluku", "Maluku Utara", "Papua Barat", "Papua",
];

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

export default function TentangPage() {
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
            Mengenal Dewan Masjid Indonesia
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base leading-relaxed">
            Lebih dari lima dekade menjadi garda terdepan dalam pembinaan, pengelolaan,
            dan pemakmuran masjid di seluruh penjuru Indonesia.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">
        {/* Sejarah */}
        <section>
          <div className="text-center mb-12">
            <Badge label="Perjalanan Kami" variant="green" className="mb-3" />
            <h2
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Sejarah DMI
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-dmi-green/20 -translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.tahun}
                  className={`relative flex gap-6 sm:gap-8 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} flex-row`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"} text-left pl-10 sm:pl-0`}>
                    <Card className="inline-block text-left">
                      <span className="text-dmi-gold font-bold text-sm">{m.tahun}</span>
                      <h3
                        className="font-bold text-gray-900 mt-1 mb-2"
                        style={{ fontFamily: "var(--font-heading), serif" }}
                      >
                        {m.judul}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{m.deskripsi}</p>
                    </Card>
                  </div>
                  <div className="absolute left-4 sm:static sm:flex sm:items-center sm:justify-center sm:w-8 shrink-0 top-6">
                    <div className="w-4 h-4 bg-dmi-green rounded-full border-4 border-white shadow-sm" />
                  </div>
                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section id="visi-misi">
          <div className="text-center mb-12">
            <Badge label="Arah & Tujuan" variant="gold" className="mb-3" />
            <h2
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Visi & Misi DMI
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="rounded-2xl p-8 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #14532d, #15803d)" }}
            >
              <IslamicPatternSVG />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                  <span className="text-white font-bold">V</span>
                </div>
                <h3
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Visi
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Terwujudnya masjid sebagai pusat peradaban Islam yang maju, modern, dan
                  mandiri dalam memberdayakan umat menuju masyarakat yang bertakwa,
                  sejahtera, dan berkeadilan.
                </p>
              </div>
            </div>

            <Card>
              <div className="w-12 h-12 bg-dmi-gold/10 rounded-xl flex items-center justify-center mb-5">
                <span className="text-dmi-gold font-bold">M</span>
              </div>
              <h3
                className="text-2xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Misi
              </h3>
              <ul className="space-y-3">
                {[
                  "Membina dan memberdayakan masjid sebagai pusat kegiatan umat Islam",
                  "Meningkatkan kualitas sumber daya manusia pengelola masjid",
                  "Mengembangkan program ekonomi, pendidikan, dan sosial berbasis masjid",
                  "Memperkuat ukhuwah islamiyah melalui sinergi antar masjid",
                  "Menjadikan masjid sebagai agen perubahan sosial yang positif",
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-dmi-green/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-dmi-green rounded-full" />
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Struktur Organisasi */}
        <section id="struktur">
          <div className="text-center mb-12">
            <Badge label="Kepemimpinan" variant="green" className="mb-3" />
            <h2
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Struktur Organisasi
            </h2>
            <p className="text-gray-500 text-sm mt-3">Pengurus Pusat DMI Periode 2021–2026</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {strukturOrganisasi.map((org) => (
              <Card key={org.jabatan} className="text-center">
                <div className="w-20 h-20 bg-linear-to-br from-dmi-green to-dmi-green-dark rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-sm" style={{ fontFamily: "var(--font-heading), serif" }}>
                  {org.inisial}
                </div>
                <Badge label={org.jabatan} variant="green" className="mb-3" />
                <h3
                  className="font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  {org.nama}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{org.deskripsi}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 34 Provinsi */}
        <section>
          <div className="text-center mb-12">
            <Badge label="Jangkauan Nasional" variant="gold" className="mb-3" />
            <h2
              className="text-3xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              34 Wilayah Kerja
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              DMI hadir di seluruh 34 provinsi di Indonesia melalui Dewan Pimpinan Wilayah (DPW)
              yang aktif membina masjid di masing-masing daerah.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {provinsi.map((p, i) => (
              <div
                key={p}
                className="bg-white rounded-xl p-3 text-center text-xs font-medium text-gray-700 border border-gray-100 hover:border-dmi-green hover:text-dmi-green transition-colors duration-200 animate-fade-in-up"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {p}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
