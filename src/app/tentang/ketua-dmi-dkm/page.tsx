import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Ketua DMI & DKM Kecamatan — DMI Kuningan" };

const data = [
  { no: 1,  kecamatan: "Ciawigebang",    ketuaDmi: "K. Azis Hasiri, S.Pd",                ketuaDkm: "KH. Miftah" },
  { no: 2,  kecamatan: "Cibingbin",      ketuaDmi: "Drs. H. Shobirin Ilyas, S.Ag, M.Pd", ketuaDkm: "KH. Ikin Hasikin, S.Pd.I" },
  { no: 3,  kecamatan: "Cibeureum",      ketuaDmi: "H. Emot Rahmat",                      ketuaDkm: "H. Emot Rahmat" },
  { no: 4,  kecamatan: "Cidahu",         ketuaDmi: "K. Wahidi",                            ketuaDkm: "K. Saeful Mulki" },
  { no: 5,  kecamatan: "Cigandamekar",   ketuaDmi: "M. Muslihudin",                        ketuaDkm: "M. Muslihudin" },
  { no: 6,  kecamatan: "Cigugur",        ketuaDmi: "K. Cecep Murod",                       ketuaDkm: "K. Apon Saprudin, S.Ag" },
  { no: 7,  kecamatan: "Cilebak",        ketuaDmi: "K. Dadang Sudarno, SE, E.Sos",         ketuaDkm: "K. Dadang Sudarno, SE, E.Sos" },
  { no: 8,  kecamatan: "Cilimus",        ketuaDmi: "Dr. H. Iwan Ahenda, M.Ag",             ketuaDkm: "Drs. H. Jajang Sopandi" },
  { no: 9,  kecamatan: "Cimahi",         ketuaDmi: "—",                                    ketuaDkm: "Hadiana" },
  { no: 10, kecamatan: "Ciniru",         ketuaDmi: "K. Ruja'i",                            ketuaDkm: "K. Timu Ahdi, S.Ag" },
  { no: 11, kecamatan: "Cipicung",       ketuaDmi: "KH. O. Toharudin",                    ketuaDkm: "K. Asep Ahmad. S" },
  { no: 12, kecamatan: "Ciwaru",         ketuaDmi: "Drs. Anwar Hidayat, M.Pd",            ketuaDkm: "K. Yayan Suhyana, S.Pd" },
  { no: 13, kecamatan: "Darma",          ketuaDmi: "H. Aang Saepul Anwar, M.Ag",          ketuaDkm: "Drs. H. Uud Sahudi" },
  { no: 14, kecamatan: "Garawangi",      ketuaDmi: "Tatang Misbahudin, M.M",              ketuaDkm: "Sofyan, M.Pd.I" },
  { no: 15, kecamatan: "Hantara",        ketuaDmi: "Sahnudin, M.Pd",                      ketuaDkm: "Nana H. Mu'min" },
  { no: 16, kecamatan: "Jalaksana",      ketuaDmi: "H. Anwar Solihin, M.MA",              ketuaDkm: "K. Anwar Solihin" },
  { no: 17, kecamatan: "Japara",         ketuaDmi: "Didi Ahdiat, S.Pd.I",                 ketuaDkm: "Samhudi" },
  { no: 18, kecamatan: "Karangkancana",  ketuaDmi: "Yayat Ahdiyat, S.Pd.I",               ketuaDkm: "Yayat Ahdiyat, S.Pd.I" },
  { no: 19, kecamatan: "Kuningan",       ketuaDmi: "—",                                    ketuaDkm: "H. Ahmad Sobandi, SE" },
  { no: 20, kecamatan: "Kadugede",       ketuaDmi: "H. Moh. Apip, S.AP",                  ketuaDkm: "Engkos Kosasih" },
  { no: 21, kecamatan: "Kalimanggis",    ketuaDmi: "—",                                    ketuaDkm: "K. Warsidin, S.Ag" },
  { no: 22, kecamatan: "Kramatmulya",    ketuaDmi: "Asep Hdayatudin, S.Pd.I",             ketuaDkm: "Cucu Nurhayat" },
  { no: 23, kecamatan: "Lebakwangi",     ketuaDmi: "Moh. Opang Sopari, S.Pd.I",           ketuaDkm: "Soleh, S.Pd" },
  { no: 24, kecamatan: "Luragung",       ketuaDmi: "Moh. Soleh, S.Pd",                    ketuaDkm: "Imam Mauludi N, S.Pd.I" },
  { no: 25, kecamatan: "Mandirancan",    ketuaDmi: "Jejen Jaenal Mutakin, S.Th.I",        ketuaDkm: "Jejen Jaenal Mutakin, S.Th.I" },
  { no: 26, kecamatan: "Maleber",        ketuaDmi: "H. Dadan Daniswara, S.Ag",            ketuaDkm: "Supyan, S.AP" },
  { no: 27, kecamatan: "Nusaherang",     ketuaDmi: "Kanda, M.Pd",                         ketuaDkm: "K. Asep Abdul Syukur" },
  { no: 28, kecamatan: "Pancalang",      ketuaDmi: "—",                                    ketuaDkm: "H. Ocid" },
  { no: 29, kecamatan: "Pasawahan",      ketuaDmi: "KH. Hadir S.M.Pd",                    ketuaDkm: "Rusdi Sugandi, S.Pd" },
  { no: 30, kecamatan: "Sindangagung",   ketuaDmi: "Rusdi Sugandi, S.Pd",                 ketuaDkm: "K. Abdul Rosid" },
  { no: 31, kecamatan: "Subang",         ketuaDmi: "Iwa Nurhidayat, E.Sos",               ketuaDkm: "K. Dede Suhendi, M.Pd.I" },
  { no: 32, kecamatan: "Salajambe",      ketuaDmi: "K. Dede Suhendi, M.Pd.I",             ketuaDkm: "—" },
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

export default function KetuaDmiDkmPage() {
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
            Ketua DMI & DKM Kecamatan
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base leading-relaxed">
            Daftar Ketua DMI dan Ketua DKM tingkat kecamatan se-Kabupaten Kuningan.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <p className="text-3xl font-bold text-dmi-green" style={{ fontFamily: "var(--font-heading), serif" }}>
              32
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium">Kecamatan</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <p className="text-3xl font-bold text-dmi-green" style={{ fontFamily: "var(--font-heading), serif" }}>
              {data.filter(d => d.ketuaDmi !== "—").length}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium">Ketua DMI Terdata</p>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <p className="text-3xl font-bold text-dmi-gold" style={{ fontFamily: "var(--font-heading), serif" }}>
              {data.filter(d => d.ketuaDkm !== "—").length}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium">Ketua DKM Terdata</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #14532d, #15803d)" }}>
                  <th className="px-4 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider w-10">
                    No
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">
                    Kecamatan
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">
                    Ketua DMI
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider">
                    Ketua DKM
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((row, i) => (
                  <tr
                    key={row.no}
                    className={`transition-colors hover:bg-dmi-green/5 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="px-4 py-3.5 text-gray-400 text-xs font-medium">
                      {row.no}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-gray-800 text-xs uppercase tracking-wide">
                        {row.kecamatan}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {row.ketuaDmi === "—" ? (
                        <span className="text-gray-300 text-xs">—</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-dmi-green shrink-0" />
                          <span className="text-gray-700 text-xs">{row.ketuaDmi}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      {row.ketuaDkm === "—" ? (
                        <span className="text-gray-300 text-xs">—</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-dmi-gold shrink-0" />
                          <span className="text-gray-700 text-xs">{row.ketuaDkm}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Sumber: PD DMI Kabupaten Kuningan
            </p>
            <p className="text-xs text-gray-400">
              Total: {data.length} kecamatan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
