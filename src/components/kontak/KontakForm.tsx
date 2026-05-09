"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { CheckCircle, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  nama: string;
  email: string;
  noHp: string;
  subjek: string;
  pesan: string;
}

export default function KontakForm() {
  const [form, setForm] = useState<FormData>({
    nama: "",
    email: "",
    noHp: "",
    subjek: "",
    pesan: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setFormStatus("success");
  };

  const resetForm = () => {
    setForm({ nama: "", email: "", noHp: "", subjek: "", pesan: "" });
    setFormStatus("idle");
  };

  if (formStatus === "success") {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <div className="w-16 h-16 bg-dmi-green/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-dmi-green" />
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-2">Pesan Terkirim!</h3>
        <p className="text-gray-500 text-sm max-w-sm">
          Terima kasih telah menghubungi kami. Tim DMI akan membalas pesan Anda
          dalam 1-2 hari kerja.
        </p>
        <Button variant="outline" className="mt-6" onClick={resetForm}>
          Kirim Pesan Lain
        </Button>
      </div>
    );
  }

  if (formStatus === "error") {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-2">Gagal Mengirim</h3>
        <p className="text-gray-500 text-sm max-w-sm">
          Terjadi kesalahan. Silakan coba lagi atau hubungi kami via telepon.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setFormStatus("idle")}>
          Coba Lagi
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nama"
          required
          placeholder="Masukkan nama lengkap"
          value={form.nama}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-dmi-green/30 focus:border-dmi-green transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="nama@email.com"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-dmi-green/30 focus:border-dmi-green transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">No. HP</label>
        <input
          type="tel"
          name="noHp"
          placeholder="08xxxxxxxxxx"
          value={form.noHp}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-dmi-green/30 focus:border-dmi-green transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Subjek <span className="text-red-500">*</span>
        </label>
        <select
          name="subjek"
          required
          value={form.subjek}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-dmi-green/30 focus:border-dmi-green transition-colors bg-white"
        >
          <option value="">Pilih subjek...</option>
          <option>Informasi Program</option>
          <option>Kemitraan & Kerjasama</option>
          <option>Donasi & Infaq</option>
          <option>Program Qurban</option>
          <option>Pengaduan & Saran</option>
          <option>Lainnya</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Pesan <span className="text-red-500">*</span>
        </label>
        <textarea
          name="pesan"
          required
          rows={5}
          placeholder="Tuliskan pesan Anda di sini..."
          value={form.pesan}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-dmi-green/30 focus:border-dmi-green transition-colors resize-none"
        />
      </div>

      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          disabled={formStatus === "loading"}
        >
          {formStatus === "loading" ? "Mengirim..." : "Kirim Pesan"}
        </Button>
      </div>
    </form>
  );
}
