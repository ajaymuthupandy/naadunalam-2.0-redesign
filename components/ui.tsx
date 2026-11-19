import React from "react";
import { AddToCartButton, WishlistButton } from "./Cart";

export const IMG_BASE = "https://naadunalam.fastfilings.in/wp-content/uploads";
/** Full-size original (strip WordPress -300x300 style suffixes) */
export const full = (p: string) => `${IMG_BASE}${p.replace(/-\d+x\d+(?=\.\w+$)/, "")}`;
export const thumb = (p: string) => `${IMG_BASE}${p}`;

export const Arrow = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
);

/** "English (தமிழ்)" → two lines */
export function SplitName({ name, className = "", taClass = "" }: { name: string; className?: string; taClass?: string }) {
  const en = name.split("(")[0].trim();
  const ta = name.match(/\(([^)]+)\)/)?.[1];
  return (
    <span className={className}>
      <span className="block">{en}</span>
      {ta && <span className={`block font-tamil text-[0.8em] opacity-75 mt-0.5 ${taClass}`}>{ta}</span>}
    </span>
  );
}

/** Product card shared by home, shop, category, wishlist */
export function ProductCard({ name, price, size, img, href, badge, fit = false }: { name: string; price: string; size: string; img: string; href: string; badge?: string; fit?: boolean }) {
  // fit: the image absorbs the card's row height (screen-fitted grids), the name block has a fixed height
  return (
    <article className="group nn-tilt bg-nn-card rounded-[24px] p-3 shadow-nn flex flex-col h-full min-h-0">
      <div className={`relative mb-3 ${fit ? "flex-1 min-h-0" : "aspect-square"}`}>
        <a href={href} className="block h-full rounded-[18px] overflow-hidden bg-nn-paper">
          <img src={img} alt={name} loading="lazy" className="nn-tilt-img w-full h-full object-cover" />
          {badge && <span className="absolute top-2.5 left-2.5 bg-nn-gold text-nn-soil-dk text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">{badge}</span>}
        </a>
        <WishlistButton item={{ href, name, price, size, img }} className="absolute top-2.5 right-2.5 z-[1]" />
      </div>
      <a href={href} title={fit ? name : undefined} className={`block px-1 text-nn-ink text-[15px] font-medium leading-snug hover:text-nn-soil mb-2 ${fit ? "shrink-0 h-[66px] overflow-hidden" : ""}`}>
        <SplitName name={name} className={fit ? "[&>span:first-child]:line-clamp-2" : ""} taClass={fit ? "truncate" : ""} />
      </a>
      <div className="mt-auto shrink-0 px-1 flex items-center justify-between gap-2">
        <p className="text-[16px] font-bold text-nn-soil">{price} <span className="text-[12px] font-normal text-nn-muted">{size}</span></p>
        <AddToCartButton item={{ href, name, price, size, img }} />
      </div>
    </article>
  );
}

/** Inner-page hero: one screen band, giant display title (reference), optional Tamil line and 3D image */
export function PageHero({ title, kicker, intro, children, art }: { title: string; kicker?: string; intro?: React.ReactNode; children?: React.ReactNode; art?: React.ReactNode }) {
  return (
    <section className="nn-sec nn-soil-bg">
      <div className="nn-wrap grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14 items-center">
        <div>
          {kicker && <p className="nn-eyebrow text-nn-gold-lt mb-4">{kicker}</p>}
          <h1 data-split className="nn-display text-[clamp(52px,8vw,128px)] text-nn-gold mb-6">{title}</h1>
          {intro && <div className="nn-lead text-nn-cream/85 max-w-2xl">{intro}</div>}
          {children}
        </div>
        {art && <div className="nn-3d">{art}</div>}
      </div>
    </section>
  );
}

/** Heading block used inside sections */
export function SecHead({ kicker, title, intro, light = false, center = false, size = "lg" }: { kicker?: string; title: React.ReactNode; intro?: React.ReactNode; light?: boolean; center?: boolean; size?: "lg" | "sm" }) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-4xl`}>
      {kicker && <p className={`nn-eyebrow mb-3 ${light ? "text-nn-gold-lt" : "text-nn-soil"}`}>{kicker}</p>}
      <h2 data-split className={`nn-display [text-wrap:balance] ${size === "lg" ? "nn-h2" : "nn-h2-sm"} ${light ? "text-nn-gold" : "text-nn-soil"}`}>{title}</h2>
      {intro && <p className={`nn-lead mt-4 ${center ? "mx-auto" : ""} max-w-2xl ${light ? "text-nn-cream/80" : "text-nn-muted"}`}>{intro}</p>}
    </div>
  );
}

/** Inner-page banner (reference style): breadcrumb, kicker, giant gold title, intro */
export function PageBanner({ title, kicker, intro, crumb, children }: { title: string; kicker?: string; intro?: React.ReactNode; crumb?: string; children?: React.ReactNode }) {
  return (
    <section className="nn-sec nn-soil-bg">
      <div className="nn-wrap">
        <nav aria-label="Breadcrumb" className="text-[13.5px] text-nn-gold-lt/80 mb-4">
          <a href="/" className="hover:text-nn-gold">Home</a> <span className="mx-1.5 opacity-60">/</span> <span>{crumb || title}</span>
        </nav>
        {kicker && <p className="nn-eyebrow text-nn-gold-lt mb-3">{kicker}</p>}
        <h1 data-split className="nn-display text-[clamp(52px,min(8.5vw,15vh),140px)] text-nn-gold">{title}</h1>
        {intro && <p className="nn-lead text-nn-cream/85 max-w-3xl mt-6">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

/** 3D notice card for "coming soon" states on Others pages */
export function NoticeCard({ section, title, body, children, img }: { section: string; title: string; body: string; children?: React.ReactNode; img: string }) {
  return (
    <section className="nn-sec nn-frame nn-cream-bg nn-botanic">
      <div className="nn-wrap grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
        <div>
          <h2 data-split className="nn-display nn-h2-sm text-nn-soil mb-6">{section}</h2>
          <div className="nn-tilt bg-nn-soil text-nn-cream rounded-[28px] p-[clamp(20px,2.2vw,30px)] relative isolate overflow-hidden nn-botanic" data-reveal>
            <h3 className="font-display text-[clamp(24px,2.2vw,34px)] text-nn-gold leading-none mb-3">{title}</h3>
            <p className="nn-lead text-nn-cream/85">{body}</p>
            {children && <div className="mt-6">{children}</div>}
          </div>
        </div>
        <div className="[perspective:1500px] flex justify-center">
          <div data-turn="-14,14" className="relative w-[min(100%,440px)] h-[clamp(300px,58vh,540px)] nn-fill nn-preserve">
            <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover rounded-[999px_999px_30px_30px] border-[5px] border-nn-gold shadow-nn-hover" />
            <span className="absolute -inset-4 rounded-[999px_999px_38px_38px] border-2 border-dashed border-nn-gold/60 [transform:translateZ(-60px)]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Three explainer cards, 3D swing-in */
const TRIO_IMGS = ["/images/el-earth.webp", "/images/thaayanbu.webp", "/images/el-water.webp"];
export function TrioSection({ title, intro, items, tone = "soil", imgs = TRIO_IMGS }: { title: string; intro: string; items: { t: string; d: string }[]; tone?: "soil" | "forest"; imgs?: string[] }) {
  return (
    <section className={`nn-sec nn-frame ${tone === "soil" ? "nn-soil-bg" : "nn-forest-bg"} nn-botanic nn-grain`}>
      <div className="nn-wrap flex flex-col gap-[clamp(20px,4vh,44px)]">
        <SecHead title={title} intro={intro} light />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-rows-1 gap-4 nn-grow [perspective:1400px]" data-reveal="group">
          {items.map((it, i) => (
            <div key={it.t} className={`group nn-tilt rounded-[26px] p-3 flex flex-col ${i === 1 ? "bg-nn-gold text-nn-soil-dk" : "bg-nn-cream text-nn-ink"}`}>
              <div className="relative rounded-[999px_999px_18px_18px] overflow-hidden h-[160px] lg:h-auto lg:flex-1 lg:min-h-[120px]"><img src={imgs[i % imgs.length]} alt="" className="nn-tilt-img absolute inset-0 w-full h-full object-cover" /></div>
              <h3 className="font-display text-[clamp(24px,2vw,32px)] text-nn-soil leading-none mt-5 mb-3 px-3">{it.t}</h3>
              <p className="text-[15.5px] leading-relaxed opacity-85 px-3 pb-3">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing call-to-action band */
export function CtaBand({ title, body, actions }: { title: string; body: string; actions: { label: string; href: string }[] }) {
  return (
    <section className="nn-sec nn-paper-bg nn-botanic">
      <div className="nn-wrap grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
        <div>
          <h2 data-split className="nn-display nn-h2-sm text-nn-soil">{title}</h2>
          <p className="nn-lead text-nn-muted mt-4 max-w-2xl">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          {actions.map((a, i) => (
            <a key={a.label} href={a.href} className={`nn-pill ${i === 0 ? "nn-pill-soil" : "nn-pill-line text-nn-soil"}`}>{a.label}{i === 0 && <Arrow />}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
