import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import KontakForm from "@/components/kontak/KontakForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Kontak" };

const infoKontak = [
  { icon: MapPin, label: "Alamat", value: "Jl. Matraman Raya No.43, Jakarta Timur 13150", color: "text-dmi-green", bg: "bg-dmi-green/10" },
  { icon: Phone, label: "Telepon", value: "(021) 8564-8400", color: "text-dmi-gold", bg: "bg-dmi-gold/10" },
  { icon: Mail, label: "Email", value: "info@dmi.or.id", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Clock, label: "Jam Operasional", value: "Senin–Jumat, 08.00–17.00 WIB", color: "text-purple-600", bg: "bg-purple-50" },
];

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-dmi-cream">
      {/* Hero */}
      <section
        className="pt-28 pb-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #14532d, #15803d)" }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="kp" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,4 52,28 76,28 56,44 64,68 40,54 16,68 24,44 4,28 28,28"
                fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kp)" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge label="Hubungi Kami" variant="gold" className="mb-4" />
          <h1
            className="text-3xl lg:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Kontak DMI
          </h1>
          <p className="text-white/70 max-w-xl text-sm sm:text-base">
            Kami siap membantu Anda. Kirimkan pesan, pertanyaan, atau saran kepada kami.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Kontak */}
          <div className="lg:col-span-1 space-y-4">
            <h2
              className="text-xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Informasi Kontak
            </h2>
            {infoKontak.map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-gray-800">{value}</p>
                </div>
              </div>
            ))}

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4208889827356!2d106.86162731476913!3d-6.208430295488577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f3c2b2b2b3%3A0x1234567890abcdef!2sJl.%20Matraman%20Raya%20No.43%2C%20Jakarta%20Timur!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Kantor DMI"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
              <h2
                className="text-xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Kirim Pesan
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Isi formulir di bawah ini dan tim kami akan membalas dalam 1-2 hari kerja.
              </p>
              <KontakForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
