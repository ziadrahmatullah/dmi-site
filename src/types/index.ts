export interface Transaksi {
  id: string;
  judul: string;
  kategori: "infaq" | "zakat" | "wakaf" | "donasi";
  jumlah: number;
  tanggal: string;
  donatur: string;
  keterangan: string;
}

export interface GalleryItem {
  id: string;
  judul: string;
  kategori: "kegiatan" | "masjid" | "acara_nasional" | "sosial";
  url: string;
  thumbnail: string;
  tanggal: string;
}

export interface Artikel {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string;
  kategori: "khutbah" | "fiqih" | "berita" | "inspirasi";
  thumbnail: string;
  penulis: string;
  tanggal: string;
}

export interface ArtikelDetail extends Artikel {
  konten: string;
  artikelTerkait: Artikel[];
}

export interface QurbanPaket {
  id: string;
  nama: string;
  hewan: "sapi" | "kambing" | "domba";
  harga: number;
  kuota: number;
  tersisa: number;
  deskripsi: string;
}

export interface QurbanOrder {
  nama: string;
  noHp: string;
  pilihan: string;
  jumlah: number;
  wilayah: string;
}
