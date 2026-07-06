"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Nav structure ─────────────────────────────────────────────────── */

type Child = { href: string; label: string };
type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; href?: string; children: Child[] };

const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Pendataan",
    children: [
      { href: "/transaksi", label: "Transaksi" },
      { href: "/qurban", label: "Qurban" },
    ],
  },
  {
    label: "Dokumen",
    children: [
      { href: "/artikel", label: "Artikel" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  {
    label: "Tentang",
    href: "/tentang/visi-misi",
    children: [
      { href: "/tentang/visi-misi", label: "Visi & Misi" },
      { href: "/tentang/struktur-organisasi", label: "Struktur Organisasi" },
      { href: "/tentang/ketua-dmi-dkm", label: "Data Ketua DMI & DKM" },
    ],
  },
  { label: "Kontak", href: "/kontak" },
];

/* ─── Desktop Dropdown Item ─────────────────────────────────────────── */

function DesktopDropdown({
  item,
  isTransparent,
  pathname,
}: {
  item: Extract<NavItem, { children: Child[] }>;
  isTransparent: boolean;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = item.children.some((c) => pathname === c.href);

  const open_ = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  const close_ = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={open_}
      onMouseLeave={close_}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-dmi-green text-white"
            : isTransparent
            ? "text-white/90 hover:text-white hover:bg-white/10"
            : "text-gray-700 hover:text-dmi-green hover:bg-dmi-green/5"
        )}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 animate-scale-in z-50"
          onMouseEnter={open_}
          onMouseLeave={close_}
        >
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150",
                pathname === child.href.split("#")[0] && pathname !== "/"
                  ? "text-dmi-green font-semibold bg-dmi-green/5"
                  : "text-gray-700 hover:text-dmi-green hover:bg-dmi-green/5"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-dmi-green/30 shrink-0" />
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Navbar ───────────────────────────────────────────────────── */

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileOpen(null);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/logo.png"
              alt="Logo Dewan Masjid Indonesia"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <div className="hidden sm:block leading-tight">
              <div
                className={cn(
                  "font-bold text-sm transition-colors duration-300",
                  isTransparent ? "text-white" : "text-dmi-green"
                )}
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Dewan Masjid
              </div>
              <div
                className="font-semibold text-sm text-dmi-gold"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Indonesia
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <DesktopDropdown
                    key={item.label}
                    item={item}
                    isTransparent={isTransparent}
                    pathname={pathname}
                  />
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "bg-dmi-green text-white"
                      : isTransparent
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-gray-700 hover:text-dmi-green hover:bg-dmi-green/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors duration-200",
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              if (item.children) {
                const isExpanded = mobileOpen === item.label;
                const isActive = item.children.some((c) => pathname === c.href);

                return (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setMobileOpen(isExpanded ? null : item.label)
                      }
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "bg-dmi-green/10 text-dmi-green"
                          : "text-gray-700 hover:bg-dmi-green/5 hover:text-dmi-green"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>

                    {isExpanded && (
                      <div className="mt-1 ml-4 pl-4 border-l-2 border-dmi-green/20 space-y-1 pb-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-3 py-2.5 rounded-lg text-sm transition-colors duration-150",
                              pathname === child.href.split("#")[0] && pathname !== "/"
                                ? "text-dmi-green font-semibold"
                                : "text-gray-600 hover:text-dmi-green"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200",
                    pathname === item.href
                      ? "bg-dmi-green text-white"
                      : "text-gray-700 hover:bg-dmi-green/5 hover:text-dmi-green"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
