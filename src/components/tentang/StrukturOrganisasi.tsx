import Badge from "@/components/ui/Badge";

/* ─── Data ─────────────────────────────────────────────────────────── */

const pembina = [
  "Bupati Kuningan",
  "Wakil Bupati Kuningan",
  "Kepala Kemenag Kuningan",
  "Kabag Kesra Pemkab Kuningan",
  "Ketua MUI Kuningan",
];

const majelisMustasyar = [
  { role: "Ketua", name: "Drs. H. R. Yayan Sopyan, MM." },
  { role: "Wakil Ketua", name: "KH. Dodo Murtadlo, LC." },
  { role: "Anggota", name: "Dr. KH. Alan Rusyadi, M.Pd." },
  { role: "Anggota", name: "Dr. H. Iskandar, MM." },
  { role: "Anggota", name: "Dr. H. Barna Subarna, M.Pd." },
  { role: "Anggota", name: "K. Syarif Alimilah, BA." },
];

const majelisEkonomi = [
  { role: "Ketua", name: "Hj. Rini Sujianti, SE., MM." },
  { role: "Wakil Ketua", name: "H. Yogi Tyandaru, S.Sos." },
  { role: "Anggota", name: "Dr. Hj. Dewi Fatmasari, SE., M.Si." },
  { role: "Anggota", name: "H. Taufiek Amier, SH., M.BA., M.Kn." },
];

const dewanPakar = [
  { role: "Ketua", name: "H. Rokhmat Ardiyan, MM." },
  { role: "Wakil Ketua", name: "Dadan Rohmatun, LC." },
  { role: "Anggota", name: "H. Tatang Suharta" },
  { role: "Anggota", name: "H. Dalil Firmansyah" },
  { role: "Anggota", name: "H. Asep Setia Mulyana" },
  { role: "Anggota", name: "Drs. Anwar Bahrudin, M.Pd." },
  { role: "Anggota", name: "H. Andi Budiman, SE." },
  { role: "Anggota", name: "KH. Addin, LC." },
];

const sekretariat = [
  { role: "Sekretaris", name: "Ano Sutarno, M.Pd." },
  { role: "Wakil Sekretaris I", name: "Dr. Arif Fauzan, SE., M.E.I." },
  { role: "Wakil Sekretaris II", name: "Lilis Lismaya, M.Pd." },
];

const bendahara = [
  { role: "Bendahara", name: "Dr. H. Hopidin" },
  { role: "Wakil Bendahara", name: "H. Yaya Cahya, S.E." },
];

const bidang = [
  {
    nama: "Organisasi, SDM, Perpustakaan & Seni Budaya",
    ketua: "Dr. Dadang Solihat, M.Pd.B.I.",
    anggota: ["Rastum", "Tati Rahmawati, M.Pd.", "Abdul Haris, S.Pd."],
  },
  {
    nama: "Dakwah dan Ziswa",
    ketua: "Drs. H. D. Durahman",
    anggota: [
      "Hidayat Muttaqin, SE., M.H.I.",
      "Dr. dr. Asep Hermana, Sp.B., MM.",
      "Dr. Insan N., S.Pd.I., M.Pd.I.",
      "Dr. H. Tatang Sujata, SE.",
      "H. Nana Supriatna",
      "H. Asikin",
    ],
  },
  {
    nama: "Ekonomi Umat & Kewirausahaan",
    ketua: "Drs. Suyono, M.Pd., M.Si.",
    anggota: [
      "H. Saifullah R., S.Ag., S.Kep.Ners., M.Si.",
      "H. Uus Sudiana, M.Pd.I.",
      "Dra. Tita Rianti",
      "Hj. Nunung Nuryati, M.Pd.",
    ],
  },
  {
    nama: "Sosial & Tanggap Bencana",
    ketua: "Drs. H. Eka Komara, M.Pd.",
    anggota: [
      "Arif Rosidin, S.Pd.",
      "Bustanul Arifin",
      "Ending Hasanudin, M.Pd.",
      "Kusnadi, S.Pd.I.",
    ],
  },
  {
    nama: "Kaderisasi Generasi Muda Masjid",
    ketua: "Dr. Rohidin, M.M.Pd.",
    anggota: [
      "Dra. Zulfa Nur",
      "Arif Muhammad F., M.Pd.",
      "H. Cucu Supriatna, S.Sos.",
      "Dr. Iwan Ahenda, M.Ag.",
    ],
  },
  {
    nama: "Kominfo dan Seni Budaya",
    ketua: "Mohamad Soleh, S.Pd.",
    anggota: [
      "Prof. Suwari Akhmaddhian",
      "Drs. Dudi Komaludin, M.Pd.",
      "Iman Jalaludin R., SH.I., MH.",
      "Yani Andriyani, SH., MH.",
    ],
  },
  {
    nama: "Hukum dan Kerjasama",
    ketua: "Mohamad Soleh, S.Pd.",
    anggota: [
      "Prof. Suwari Akhmaddhian",
      "Drs. Dudi Komaludin, M.Pd.",
      "Iman Jalaludin R., SH.I., MH.",
      "Yani Andriyani, SH., MH.",
    ],
  },
  {
    nama: "Pengembangan Potensi Muslimah & Keluarga",
    ketua: "Ani Sarmaningsih, M.Pd.",
    anggota: [
      "Nurwahyuningsih, M.Pd.",
      "Hj. Nurlaela, S.Ag., M.Pd.",
      "Linda Indrawati, S.Pd.",
      "Linda Anjela",
    ],
  },
];

/* ─── SVG Connectors ────────────────────────────────────────────────── */

const LINE_PROPS = {
  stroke: "#15803d",
  strokeWidth: 1.5,
  strokeOpacity: 0.3,
  strokeLinecap: "round" as const,
};

// Single vertical line
function VLine({ height = 32, from = "50%" }: { height?: number; from?: string }) {
  return (
    <svg width="100%" height={height} className="block shrink-0">
      <line x1={from} y1={0} x2={from} y2={height} {...LINE_PROPS} />
    </svg>
  );
}

// Branch: vertical down from `from`, horizontal bar, drops to each point
function Branch({
  from = "50%",
  drops,
  height = 48,
}: {
  from?: string;
  drops: string[];
  height?: number;
}) {
  const mid = height / 2;
  return (
    <svg width="100%" height={height} className="block shrink-0">
      <line x1={from} y1={0} x2={from} y2={mid} {...LINE_PROPS} />
      <line x1={drops[0]} y1={mid} x2={drops[drops.length - 1]} y2={mid} {...LINE_PROPS} />
      {drops.map((d, i) => (
        <line key={i} x1={d} y1={mid} x2={d} y2={height} {...LINE_PROPS} />
      ))}
    </svg>
  );
}

// Merge multiple lines at top → single vertical → branch to drops at bottom
function MergeThenBranch({
  mergeFrom,
  to = "50%",
  drops,
  height = 72,
}: {
  mergeFrom: string[];
  to?: string;
  drops: string[];
  height?: number;
}) {
  const mergeY = Math.round(height * 0.38);
  const branchY = Math.round(height * 0.65);
  return (
    <svg width="100%" height={height} className="block shrink-0">
      {/* Vertical lines coming down from mergeFrom points */}
      {mergeFrom.map((f, i) => (
        <line key={`mf-${i}`} x1={f} y1={0} x2={f} y2={mergeY} {...LINE_PROPS} />
      ))}
      {/* Horizontal bar connecting merge points */}
      <line x1={mergeFrom[0]} y1={mergeY} x2={mergeFrom[mergeFrom.length - 1]} y2={mergeY} {...LINE_PROPS} />
      {/* Vertical from center of bar down to branch point */}
      <line x1={to} y1={mergeY} x2={to} y2={branchY} {...LINE_PROPS} />
      {/* Horizontal bar for branch drops */}
      <line x1={drops[0]} y1={branchY} x2={drops[drops.length - 1]} y2={branchY} {...LINE_PROPS} />
      {/* Vertical drops */}
      {drops.map((d, i) => (
        <line key={`d-${i}`} x1={d} y1={branchY} x2={d} y2={height} {...LINE_PROPS} />
      ))}
    </svg>
  );
}

/* ─── Card primitives ───────────────────────────────────────────────── */

function PrimaryCard({ role, name }: { role: string; name: string }) {
  return (
    <div className="rounded-xl border-2 border-dmi-green bg-white shadow-md p-4 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-dmi-green/60 mb-1">
        {role}
      </p>
      <p
        className="font-bold text-sm text-dmi-green leading-snug"
        style={{ fontFamily: "var(--font-heading), serif" }}
      >
        {name}
      </p>
    </div>
  );
}

function SecondaryCard({ role, name }: { role: string; name: string }) {
  return (
    <div className="rounded-xl border border-dmi-green/25 bg-dmi-green/5 p-3 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-dmi-green/50 mb-1">
        {role}
      </p>
      <p
        className="font-semibold text-xs text-gray-800 leading-snug"
        style={{ fontFamily: "var(--font-heading), serif" }}
      >
        {name}
      </p>
    </div>
  );
}

function InfoCard({
  title,
  sub,
  items,
}: {
  title: string;
  sub?: string;
  items: { role: string; name: string }[];
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-3 h-full">
      <p
        className="font-bold text-xs text-gray-800 mb-0.5 leading-tight"
        style={{ fontFamily: "var(--font-heading), serif" }}
      >
        {title}
      </p>
      {sub && <p className="text-[10px] text-gray-400 italic mb-2">{sub}</p>}
      <div className="space-y-1.5 mt-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-dmi-green/60 whitespace-nowrap pt-0.5 min-w-12">
              {item.role}
            </span>
            <span className="text-[11px] text-gray-700 leading-snug">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminCard({
  title,
  items,
}: {
  title: string;
  items: { role: string; name: string }[];
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-dmi-green/50 mb-2">
        {title}
      </p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-dmi-green/60">
              {item.role}
            </p>
            <p className="text-xs text-gray-800 font-medium leading-snug">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BidangCard({ b }: { b: (typeof bidang)[0] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-3 h-full">
      <svg
        className="w-7 h-7 mb-2 text-dmi-green"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Minaret kiri */}
        <rect x="3" y="14" width="4" height="12" rx="0.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" />
        <rect x="4" y="11" width="2" height="4" rx="0.5" fill="currentColor" />
        <path d="M5 9.5 C5 8.5 4 8 4 7.5 C4 6.5 5 6 5 5.5 C5 6 6 6.5 6 7.5 C6 8 5 8.5 5 9.5Z" fill="currentColor" />
        {/* Minaret kanan */}
        <rect x="25" y="14" width="4" height="12" rx="0.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" />
        <rect x="26" y="11" width="2" height="4" rx="0.5" fill="currentColor" />
        <path d="M27 9.5 C27 8.5 26 8 26 7.5 C26 6.5 27 6 27 5.5 C27 6 28 6.5 28 7.5 C28 8 27 8.5 27 9.5Z" fill="currentColor" />
        {/* Kubah utama */}
        <path d="M9 17 C9 12 12 9 16 8 C20 9 23 12 23 17Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        {/* Badan masjid */}
        <rect x="8" y="17" width="16" height="9" rx="0.5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" />
        {/* Pintu */}
        <path d="M14 26 L14 21 C14 19.9 14.9 19 16 19 C17.1 19 18 19.9 18 21 L18 26Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
        {/* Bulan sabit di kubah */}
        <path d="M15 11.5 C15 10.7 15.6 10 16.4 10 C15.8 10.5 15.8 11.5 16.4 12 C15.6 12 15 11.3 15 11.5Z" fill="currentColor" />
      </svg>
      <p
        className="font-bold text-[11px] text-gray-800 mb-2 leading-snug"
        style={{ fontFamily: "var(--font-heading), serif" }}
      >
        {b.nama}
      </p>
      <p className="text-[9px] font-bold uppercase tracking-wider text-dmi-green/60 mb-0.5">
        Ketua
      </p>
      <p className="text-[11px] text-gray-700 mb-2 leading-snug">{b.ketua}</p>
      {b.anggota.length > 0 && (
        <>
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            Anggota
          </p>
          <ul className="space-y-0.5">
            {b.anggota.map((a, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-dmi-green/40 mt-1 text-[8px] leading-none">▪</span>
                <span className="text-[10px] text-gray-600 leading-snug">{a}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────── */

export default function StrukturOrganisasi() {
  return (
    <section id="struktur">
      {/* Header */}
      <div className="text-center mb-10">
        <Badge label="Kepengurusan" variant="green" className="mb-3" />
        <h2
          className="text-3xl font-bold text-gray-900"
          style={{ fontFamily: "var(--font-heading), serif" }}
        >
          Struktur Organisasi
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Dewan Masjid Indonesia (DMI) Kabupaten Kuningan · Masa Bhakti 2023–2028
        </p>
        <p className="text-gray-400 text-xs mt-1">
          SK Nomor: 107.D/III/SK/PW-DMI JABAR/IV/2025
        </p>
      </div>

      {/* ─── Desktop tree (lg+) ─── */}
      <div className="hidden lg:block">
        {/* Level 0: Pembina */}
        <div className="flex justify-center">
          <div className="w-72 rounded-2xl border-2 border-dmi-gold/40 bg-amber-50 p-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-dmi-gold mb-3">
              Pembina
            </p>
            <ul className="space-y-1.5 text-left">
              {pembina.map((p, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-dmi-gold/20 text-dmi-gold text-[9px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-xs text-gray-700">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Connector: Pembina → 3 branches (12.5%, 50%, 87.5%) */}
        <Branch from="50%" drops={["12.5%", "50%", "87.5%"]} height={48} />

        {/* Level 1: Majelis Mustasyar | Ketua+Wakil | Majelis Ekonomi+Dewan Pakar */}
        <div className="grid grid-cols-4 gap-4">
          {/* Kolom kiri — self-start agar tidak stretch */}
          <div className="self-start">
            <InfoCard title="Majelis Mustasyar" sub="Penasehat" items={majelisMustasyar} />
          </div>

          {/* Kolom tengah — flex-col agar garis tumbuh ke bawah grid */}
          <div className="col-span-2 flex flex-col">
            <PrimaryCard role="Ketua" name="Dr. Ugin Lugina, M.Pd." />
            <div className="flex justify-center">
              <div className="w-px h-3 bg-dmi-green/30" />
            </div>
            <SecondaryCard role="Wakil Ketua I" name="Sopyan, M.Pd.I." />
            {/* Garis memanjang ke bawah hingga ujung grid */}
            <div className="flex-1 min-h-3 flex justify-center">
              <div className="w-px bg-dmi-green/30" />
            </div>
          </div>

          {/* Kolom kanan — self-start */}
          <div className="self-start space-y-3">
            <InfoCard title="Majelis Ekonomi Syariah" items={majelisEkonomi} />
            <InfoCard title="Dewan Pakar" items={dewanPakar} />
          </div>
        </div>

        {/* Connector: dari 50% bawah Wakil Ketua → branch ke Sekretariat(37.5%) + Bendahara(62.5%) */}
        <Branch from="50%" drops={["37.5%", "62.5%"]} height={40} />

        {/* Level 2: (empty) | Sekretariat | Bendahara | (empty) */}
        <div className="grid grid-cols-4 gap-4">
          <div />
          <AdminCard title="Kesekretariatan" items={sekretariat} />
          <AdminCard title="Kebendaharaan" items={bendahara} />
          <div />
        </div>

        {/* Connector: merge dari Sekretariat(37.5%)+Bendahara(62.5%) → 50% → branch ke 4 bidang */}
        <MergeThenBranch
          mergeFrom={["37.5%", "62.5%"]}
          to="50%"
          drops={["12.5%", "37.5%", "62.5%", "87.5%"]}
          height={72}
        />

        {/* Level 3: 8 Bidang in 4-col grid */}
        <div className="grid grid-cols-4 gap-3">
          {bidang.map((b) => (
            <BidangCard key={b.nama} b={b} />
          ))}
        </div>
      </div>

      {/* ─── Mobile layout (< lg) ─── */}
      <div className="lg:hidden space-y-6">
        {/* Pembina */}
        <div className="rounded-2xl border-2 border-dmi-gold/40 bg-amber-50 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-dmi-gold mb-3">Pembina</p>
          <ul className="space-y-1.5">
            {pembina.map((p, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-dmi-gold/20 text-dmi-gold text-[9px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-xs text-gray-700">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <VLine />

        {/* Ketua */}
        <PrimaryCard role="Ketua" name="Dr. Ugin Lugina, M.Pd." />
        <SecondaryCard role="Wakil Ketua I" name="Sopyan, M.Pd.I." />

        <VLine />

        {/* Majelis & Dewan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard title="Majelis Mustasyar" sub="Penasehat" items={majelisMustasyar} />
          <InfoCard title="Majelis Ekonomi Syariah" items={majelisEkonomi} />
          <InfoCard title="Dewan Pakar" items={dewanPakar} />
        </div>

        <VLine />

        {/* Sekretariat & Bendahara */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AdminCard title="Kesekretariatan" items={sekretariat} />
          <AdminCard title="Kebendaharaan" items={bendahara} />
        </div>

        <VLine />

        {/* Bidang */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center mb-4">
            Bidang-bidang Kerja
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bidang.map((b) => (
              <BidangCard key={b.nama} b={b} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
