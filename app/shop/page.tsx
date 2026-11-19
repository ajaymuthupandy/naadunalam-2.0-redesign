"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { ProductCard, full } from "@/components/ui";
import { allProducts, categories, priceNum } from "@/lib/data";

type Panel = "cat" | "price" | "pack" | null;

const SORTS = ["Default sorting", "Price: low to high", "Price: high to low", "Name: A to Z"] as const;
const CATS = Object.values(categories)
  .map((c) => ({ ...c, count: allProducts.filter((p) => c.match.test(p.name)).length }))
  .filter((c) => c.count > 0);
const PACKS = Array.from(new Set(allProducts.map((p) => p.size))).map((s) => ({ name: s, count: allProducts.filter((p) => p.size === s).length }));
const MAX_PRICE = Math.ceil(Math.max(...allProducts.map((p) => priceNum(p.price))) / 10) * 10;

export default function Shop() {
  const [open, setOpen] = useState<Panel>(null);
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [packs, setPacks] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<(typeof SORTS)[number]>(SORTS[0]);
  const bar = useRef<HTMLDivElement>(null);
  const area = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  // desktop/laptop: how many whole rows fit in the screen-high frame (null = normal flow, show everything)
  const [fit, setFit] = useState<{ rows: number; cols: number } | null>(null);
  const [page, setPage] = useState(0);
  const remeasure = useRef<() => void>(() => {});

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 600px)");
    let raf = 0;
    const measure = (remeasure.current = () => {
      const a = area.current;
      const g = grid.current;
      if (!mq.matches || !a || !g) return setFit(null);
      const cs = getComputedStyle(g);
      const cols = cs.gridTemplateColumns.split(" ").filter(Boolean).length || 1;
      const gap = parseFloat(cs.rowGap) || 16;
      const card = g.querySelector("article");
      const img = card?.querySelector("a");
      const textH = card && img ? card.offsetHeight - img.offsetHeight : 160;
      const imgW = (a.clientWidth - gap * (cols - 1)) / cols - 24;
      // rows whose images land closest to a slightly landscape photo (0.8 × width), never flatter than 0.5 × width
      const fits = (r: number) => (a.clientHeight - gap * (r - 1)) / r - textH >= imgW * 0.5;
      let rows = Math.max(1, Math.round((a.clientHeight + gap) / (textH + imgW * 0.8 + gap)));
      while (rows > 1 && !fits(rows)) rows--;
      setFit((f) => (f && f.rows === rows && f.cols === cols ? f : { rows, cols }));
    });
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    if (area.current) ro.observe(area.current);
    mq.addEventListener("change", measure);
    measure();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, []);

  // close an open filter panel when clicking elsewhere
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !bar.current?.contains(e.target as Node) && setOpen(null);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // keep the open dropdown inside the viewport (buttons wrap to the right on phones)
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = panel.current;
    if (!open || !el) return;
    el.style.left = "0px";
    const over = el.getBoundingClientRect().right - (document.documentElement.clientWidth - 16);
    if (over > 0) el.style.left = `${-over}px`;
  }, [open]);

  const toggle = (p: Panel) => setOpen((o) => (o === p ? null : p));
  const flip = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const reset = () => {
    setQ("");
    setCats([]);
    setPacks([]);
    setMaxPrice(MAX_PRICE);
    setSort(SORTS[0]);
    setOpen(null);
  };

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = allProducts.filter(
      (p) =>
        (!needle || p.name.toLowerCase().includes(needle)) &&
        (!cats.length || CATS.some((c) => cats.includes(c.title) && c.match.test(p.name))) &&
        (!packs.length || packs.includes(p.size)) &&
        priceNum(p.price) <= maxPrice
    );
    if (sort === "Price: low to high") list.sort((a, b) => priceNum(a.price) - priceNum(b.price));
    if (sort === "Price: high to low") list.sort((a, b) => priceNum(b.price) - priceNum(a.price));
    if (sort === "Name: A to Z") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [q, cats, packs, maxPrice, sort]);

  // cards change their text block in fit mode, and the grid remounts after an empty result
  const hasItems = shown.length > 0;
  useEffect(() => remeasure.current(), [fit === null, hasItems]);

  // any filter/sort change starts again at the first page
  useEffect(() => setPage(0), [q, cats, packs, maxPrice, sort]);
  const per = fit ? fit.rows * fit.cols : shown.length || 1;
  const pages = Math.max(1, Math.ceil(shown.length / per));
  const cur = Math.min(page, pages - 1);
  const visible = shown.slice(cur * per, cur * per + per);
  const from = shown.length ? cur * per + 1 : 0;
  const to = cur * per + visible.length;

  const active = cats.length + packs.length + (maxPrice < MAX_PRICE ? 1 : 0) + (q ? 1 : 0);
  const badge = (n: number) => (n ? <span className="ml-0.5 min-w-5 h-5 px-1 rounded-full bg-nn-gold text-nn-soil-dk text-[11px] flex items-center justify-center">{n}</span> : null);
  const panels: [Panel, string, number][] = [
    ["cat", "Categories", cats.length],
    ["price", "Price", maxPrice < MAX_PRICE ? 1 : 0],
    ["pack", "Pack size", packs.length],
  ];

  return (
    <Layout>
      <main>
        <section className="nn-sec nn-first nn-frame nn-cream-bg !overflow-visible">
          <h1 className="sr-only">Shop All Products</h1>
          <div className="nn-wrap flex flex-col">
            <div ref={bar} className="relative z-20 flex flex-wrap items-center gap-2 mb-5 shrink-0">
              <span className="nn-eyebrow text-nn-soil mr-1">Filter By:</span>
              <label className="relative flex items-center">
                <span className="sr-only">Search products</span>
                <input value={q} onChange={(e) => setQ(e.target.value)} type="search" className="nn-input !min-h-[44px] !w-[220px] !pl-10" placeholder="Search products..." />
                <svg className="absolute left-4 w-4 h-4 text-nn-muted pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              </label>
              {panels.map(([key, label, n]) => (
                <div key={key} className={`relative ${open === key ? "z-30" : ""}`}>
                  <button type="button" onClick={() => toggle(key)} aria-expanded={open === key} className={`nn-pill !min-h-[44px] !px-4 !text-[14px] !shadow-none ${open === key ? "nn-pill-soil" : "bg-nn-card text-nn-soil border border-nn-line"}`}>
                    {label}
                    {badge(n)}
                    <svg className={`w-4 h-4 transition-transform ${open === key ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                  <div ref={open === key ? panel : undefined} className={`absolute left-0 top-full mt-2 w-[min(340px,calc(100vw-32px))] max-h-[70vh] overflow-y-auto bg-nn-card rounded-[22px] shadow-nn-hover p-4 ${open === key ? "block animate-[nnFade_.2s_ease-out]" : "hidden"}`}>
                    {key === "cat" &&
                      CATS.map((c) => (
                        <label key={c.title} className="flex items-center gap-3 py-2 text-[15px] leading-snug text-nn-ink cursor-pointer">
                          <input type="checkbox" checked={cats.includes(c.title)} onChange={() => setCats((l) => flip(l, c.title))} className="w-4 h-4 shrink-0 accent-[#7E3814]" />
                          <span className="flex-1 min-w-0">{c.title}</span>
                          <span className="shrink-0 text-nn-muted text-[13px]">({c.count})</span>
                        </label>
                      ))}
                    {key === "price" && (
                      <div className="py-1">
                        <p className="text-[15px] text-nn-ink mb-3">Up to <span className="font-bold text-nn-soil">₹{maxPrice}</span></p>
                        <input type="range" min={0} max={MAX_PRICE} step={10} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} aria-label="Maximum price" className="w-full accent-[#7E3814]" />
                        <div className="flex justify-between text-[12.5px] text-nn-muted mt-1"><span>₹0</span><span>₹{MAX_PRICE}</span></div>
                      </div>
                    )}
                    {key === "pack" &&
                      PACKS.map((c) => (
                        <label key={c.name} className="flex items-center gap-3 py-2 text-[15px] leading-snug text-nn-ink cursor-pointer">
                          <input type="checkbox" checked={packs.includes(c.name)} onChange={() => setPacks((l) => flip(l, c.name))} className="w-4 h-4 shrink-0 accent-[#7E3814]" />
                          <span className="flex-1 min-w-0">{c.name}</span>
                          <span className="shrink-0 text-nn-muted text-[13px]">({c.count})</span>
                        </label>
                      ))}
                  </div>
                </div>
              ))}
              <button type="button" onClick={reset} disabled={!active && sort === SORTS[0]} className="nn-pill nn-pill-line text-nn-soil !min-h-[44px] !px-4 !text-[14px] disabled:opacity-40 disabled:pointer-events-none">Reset Filter</button>
              <div className="ml-auto flex items-center gap-3">
                <p className="text-[14px] text-nn-muted" aria-live="polite">
                  {pages > 1 ? `Showing ${from}–${to} of ${shown.length} products` : `Showing ${shown.length} of ${allProducts.length} products`}
                </p>
                {pages > 1 && (
                  <nav aria-label="Product pages" className="flex items-center gap-1">
                    <button type="button" onClick={() => setPage(cur - 1)} disabled={cur === 0} aria-label="Previous page" className="w-10 h-10 rounded-full border border-nn-line bg-nn-card text-nn-soil flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none hover:border-nn-soil">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    {Array.from({ length: pages }, (_, i) => (
                      <button key={i} type="button" onClick={() => setPage(i)} aria-label={`Page ${i + 1}`} aria-current={i === cur ? "page" : undefined} className={`w-10 h-10 rounded-full text-[14px] font-bold flex items-center justify-center ${i === cur ? "bg-nn-soil text-nn-cream" : "border border-nn-line bg-nn-card text-nn-soil hover:border-nn-soil"}`}>
                        {i + 1}
                      </button>
                    ))}
                    <button type="button" onClick={() => setPage(cur + 1)} disabled={cur === pages - 1} aria-label="Next page" className="w-10 h-10 rounded-full border border-nn-line bg-nn-card text-nn-soil flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none hover:border-nn-soil">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                  </nav>
                )}
                <select value={sort} onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])} aria-label="Sort products" className="nn-input !min-h-[44px] !w-auto !pr-8 !text-[14px]">
                  {SORTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div ref={area} className="nn-grow relative z-10">
            {shown.length ? (
              <div
                ref={grid}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
                style={fit ? { gridTemplateRows: `repeat(${fit.rows}, minmax(0, 1fr))` } : undefined}
              >
                {visible.map((p) => (
                  <ProductCard key={p.href} name={p.name} price={p.price} size={p.size} img={full(p.img)} href={p.href} fit={!!fit} />
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center bg-nn-card rounded-[28px] shadow-nn py-14 px-6">
                <p className="font-display text-[30px] text-nn-soil">No products match</p>
                <p className="text-[15.5px] text-nn-muted mt-2 mb-6">Try a different search or clear the filters.</p>
                <button type="button" onClick={reset} className="nn-pill nn-pill-soil">Clear filters</button>
              </div>
            )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
