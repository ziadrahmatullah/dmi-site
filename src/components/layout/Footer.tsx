import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Clock } from "lucide-react";

const footerLinks = {
  layanan: [
    { href: "/transaksi", label: "Transaksi" },
    { href: "/qurban", label: "Qurban" },
    { href: "/gallery", label: "Gallery" },
    { href: "/artikel", label: "Artikel" },
  ],
  organisasi: [
    { href: "/tentang", label: "Tentang DMI" },
    { href: "/tentang#visi-misi", label: "Visi & Misi" },
    { href: "/tentang#struktur", label: "Struktur Organisasi" },
    { href: "/kontak", label: "Hubungi Kami" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter/X" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

function IslamicPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="fp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon
            points="40,4 52,28 76,28 56,44 64,68 40,54 16,68 24,44 4,28 28,28"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
          />
          <circle cx="40" cy="40" r="10" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="30" y="30" width="20" height="20" transform="rotate(45 40 40)" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fp)" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#14532d" }}>
      <IslamicPattern />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-dmi-gold rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm tracking-tight" style={{ fontFamily: "serif" }}>
                    DMI
                  </span>
                </div>
                <div>
                  <div className="font-bold text-white text-lg leading-tight" style={{ fontFamily: "var(--font-heading), serif" }}>
                    Dewan Masjid Indonesia
                  </div>
                  <div className="text-dmi-gold text-xs italic mt-0.5">
                    Memakmurkan Masjid, Memakmurkan Umat
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Organisasi nasional yang bertugas membina dan memakmurkan masjid-masjid
                di seluruh Indonesia sejak tahun 1972.
              </p>
              <div className="flex gap-2.5 mt-6">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-dmi-gold hover:text-white transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Layanan */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Layanan
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.layanan.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-dmi-gold text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 bg-dmi-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organisasi */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Organisasi
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.organisasi.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-dmi-gold text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 bg-dmi-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Kontak
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-dmi-gold mt-0.5 shrink-0" />
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Jl. Matraman Raya No.43, Jakarta Timur 13150
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={14} className="text-dmi-gold shrink-0" />
                  <span className="text-gray-300 text-sm">(021) 8564-8400</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={14} className="text-dmi-gold shrink-0" />
                  <span className="text-gray-300 text-sm">info@dmi.or.id</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock size={14} className="text-dmi-gold shrink-0" />
                  <span className="text-gray-300 text-sm">Senin–Jumat, 08.00–17.00 WIB</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Dewan Masjid Indonesia. Hak Cipta Dilindungi.
            </p>
            <p className="text-gray-400 text-xs">Melayani umat sejak 1972</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
