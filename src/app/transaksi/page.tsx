import type { Metadata } from "next";
import TransaksiDashboard from "@/components/transaksi/TransaksiDashboard";

export const metadata: Metadata = {
  title: "Transaksi",
  description: "Kelola dan pantau data transaksi keuangan masjid Dewan Masjid Indonesia.",
};

export default function TransaksiPage() {
  return <TransaksiDashboard />;
}
