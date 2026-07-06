"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchArticles } from "@/lib/api/artikel";
import type { Article } from "@/types/artikel";

const ROTATE_INTERVAL = 5000;
const MAX_ITEMS = 4;

export default function HeroHighlightCard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetchArticles({ page: 1, limit: 6 })
      .then((res) => {
        const highlights = res.data.filter((a) => a.is_highlight);
        setArticles(
          (highlights.length ? highlights : res.data).slice(0, MAX_ITEMS)
        );
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (paused || articles.length < 2) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % articles.length),
      ROTATE_INTERVAL
    );
    return () => clearInterval(timer);
  }, [paused, articles.length]);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-2xl">
        <div className="h-44 rounded-xl bg-white/10 animate-pulse mb-4" />
        <div className="h-5 w-full rounded bg-white/10 animate-pulse mb-2" />
        <div className="h-5 w-4/5 rounded bg-white/10 animate-pulse mb-3" />
        <div className="h-4 w-full rounded bg-white/10 animate-pulse mb-2" />
        <div className="h-4 w-2/3 rounded bg-white/10 animate-pulse" />
      </div>
    );
  }

  if (articles.length === 0) return null;

  return (
    <div
      className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide di-stack pada satu sel grid agar crossfade tanpa lompatan tinggi */}
      <div className="grid">
        {articles.map((article, i) => (
          <Link
            key={article.id}
            href={`/artikel/${article.id}`}
            aria-hidden={i !== active}
            tabIndex={i === active ? 0 : -1}
            className={`[grid-area:1/1] group transition-opacity duration-700 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative rounded-xl overflow-hidden mb-4">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 bg-dmi-gold text-white text-xs font-bold rounded-md tracking-wide">
                HIGHLIGHT
              </span>
            </div>
            <h3
              className="text-white font-bold text-lg leading-snug mb-2 line-clamp-2"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              {article.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-4">
              {article.excerpt || article.description}
            </p>
            <span className="inline-flex items-center gap-1.5 text-dmi-gold text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
              Baca Selengkapnya <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>

      {articles.length > 1 && (
        <div className="flex items-center justify-end gap-2 mt-4">
          {articles.map((article, i) => (
            <button
              key={article.id}
              onClick={() => setActive(i)}
              aria-label={`Tampilkan highlight ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === active
                  ? "w-7 bg-dmi-gold"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
