import type { Transaksi, GalleryItem, Artikel, ArtikelDetail, QurbanPaket } from "@/types";

export async function fetchTransaksi(): Promise<Transaksi[]> {
  /* TODO: isi endpoint API transaksi */
  return [];
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  /* TODO: isi endpoint API gallery */
  return [];
}

export async function fetchArtikel(): Promise<Artikel[]> {
  /* TODO: isi endpoint API artikel */
  return [];
}

export async function fetchArtikelDetail(slug: string): Promise<ArtikelDetail | null> {
  /* TODO: isi endpoint API artikel detail */
  void slug;
  return null;
}

export async function fetchQurban(): Promise<QurbanPaket[]> {
  /* TODO: isi endpoint API paket qurban */
  return [];
}
