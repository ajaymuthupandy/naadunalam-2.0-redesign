"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Layout, { topCats } from "@/components/Layout";
import { Arrow, ProductCard, SecHead, SplitName, full, thumb } from "@/components/ui";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

const HERO_ELEMENTS = [
  { img: "/images/el-earth.webp", tint: "#E0A640", ta: "நிலம்", en: "Earth" },
  { img: "/images/el-water.webp", tint: "#8CC3CF", ta: "நீர்", en: "Water" },
  { img: "/images/el-fire.webp", tint: "#FF8A2A", ta: "நெருப்பு", en: "Fire", glow: true },
  { img: "/images/el-air.webp", tint: "#E4EEDF", ta: "காற்று", en: "Air" },
  { img: "/images/el-space.webp", tint: "#A9B6E3", ta: "ஆகாயம்", en: "Space", night: true },
];

const GENERATIONS = [
  { ta: "தாய் தந்தை", en: "Parents", img: "/images/gen-1.webp", pos: "50% 30%" },
  { ta: "தாத்தா பாட்டி", en: "Grandparents", img: "/images/gen-2.webp", pos: "42% 50%" },
  { ta: "பாட்டன் பாட்டி", en: "Great-grandparents", img: "/images/gen-3.webp", pos: "62% 50%" },
  { ta: "பூட்டன் பூட்டி", en: "2× great-grandparents", img: "/images/gen-4.webp", pos: "50% 30%" },
  { ta: "ஓட்டன் ஓட்டி", en: "3× great-grandparents", img: "/images/gen-5.jpg", pos: "50% 30%" },
  { ta: "சேயோன் சேயோள்", en: "4× great-grandparents", img: "/images/gen-6.webp", pos: "50% 50%" },
  { ta: "பரன் பரை", en: "5× great-grandparents", img: "/images/gen-7.jpg", pos: "50% 50%" },
];
const TAMIL_NUM = ["௧", "௨", "௩", "௪", "௫", "௬", "௭"];

const ELEMENTS = [
  { ta: "நிலம்", en: "Earth", img: "/images/el-earth.webp" },
  { ta: "நீர்", en: "Water", img: "/images/el-water.webp" },
  { ta: "நெருப்பு", en: "Fire", img: "/images/el-fire.webp" },
  { ta: "காற்று", en: "Air", img: "/images/el-air.webp" },
  { ta: "ஆகாயம்", en: "Space", img: "/images/el-space.webp" },
];
// concave arc: edges come toward the viewer and turn to face the centre
const ARC = [-44, -22, 0, 22, 44].map((a) => {
  const r = (a * Math.PI) / 180;
  const R = 440;
  return { x: Math.round(R * Math.sin(r)), z: Math.round(R * (1 - Math.cos(r))), a };
});

const promoCards = [
  { eyebrow: "Naturally Sweet", title: "Natural Sweeteners", price: "From ₹98", img: "/2026/08/Urundai-Vellam-300x300.webp", href: "/product-category/natural-sweeteners/" },
  { eyebrow: "Kitchen Essentials", title: "Ghee & Oil", price: "From ₹275", img: "/2026/08/Mallamaattu-Nei-300x300.webp", href: "/product-category/oil-vinegers/" },
  { eyebrow: "Pantry Staples", title: "Rice & Grains", price: "From ₹165", img: "/2026/08/Parambariya-Arisi-Vagaigal-300x300.webp", href: "/product-category/rice-grains/" },
];

const categories = [
  { name: "Aval / Flakes (அவல் வகைகள்)", img: "/2026/09/Aval-Vagaigal-300x300.webp", href: "/product-category/aval-flakes/" },
  { name: "Ghee & Oil (நெய் & எண்ணெய் வகைகள்)", img: "/2026/07/25-product-coconut-oil-300x300.webp", href: "/product-category/oil-vinegers/" },
  { name: "Health Mixes (ஆரோக்கிய மாவுகள்)", img: "/2026/08/Kali-Kanji-Maavu-300x300.webp", href: "/product-category/health-mixes/" },
  { name: "Millets (சிறுதானியங்கள்)", img: "/2026/08/Samai-Arisi-300x300.webp", href: "/product-category/siruthaniyam/" },
  { name: "Natural Sweeteners (இயற்கை இனிப்புகள்)", img: "/2026/08/Karuppatti-300x300.webp", href: "/product-category/natural-sweeteners/" },
  { name: "Traditional Rice (பாரம்பரிய அரிசி வகைகள்)", img: "/2026/08/Parambariya-Arisi-Vagaigal-300x300.webp", href: "/product-category/rice-grains/" },
];

const showcaseCats = [
  { name: "Aval / Flakes", count: 17, img: "/2026/09/Aval-Vagaigal-300x300.webp" },
  { name: "Traditional Rice", count: 17, img: "/2026/08/Parambariya-Arisi-Vagaigal-300x300.webp" },
  { name: "Lentils and Pulses", count: 12, img: "/2026/08/Kadalai-Paruppu-300x300.webp" },
  { name: "Health Mixes", count: 9, img: "/2026/08/Kali-Kanji-Maavu-300x300.webp" },
  { name: "Millets", count: 7, img: "/2026/08/Samai-Arisi-300x300.webp" },
  { name: "Natural Sweeteners", count: 5, img: "/2026/08/Karuppatti-300x300.webp" },
  { name: "Masala & Powders", count: 5, img: "/2026/08/Sambar-Podi-300x300.webp" },
  { name: "Ghee & Oil", count: 5, img: "/2026/08/Nallennai-300x300.webp" },
  { name: "Other Rice", count: 3, img: "/2026/07/16-product-basmati-rice-300x300.webp" },
  { name: "Personal Care", count: 2, img: "/2026/09/nn-personal-care-category-300x300.webp" },
  { name: "Honey", count: 1, img: "/2026/07/20-product-raw-honey-300x300.webp" },
];

const products = [
  { name: "Kalanamak Aval (காலா நமக் அவல்)", price: "₹195.00", size: "500 g", img: "/2026/09/Kudavaazhai-Aval-300x300.webp", href: "/product/kalanamak-aval/" },
  { name: "Kallundai Samba Aval (கல்லுண்டை சம்பா அவல்)", price: "₹165.00", size: "500 g", img: "/2026/09/Karudan-Samba-Aval-300x300.webp", href: "/product/kallundai-samba-aval/" },
  { name: "Aathur Kichadi Samba Aval (ஆத்தூர் கிச்சடி சம்பா அவல்)", price: "₹160.00", size: "500 g", img: "/2026/09/Kichadi-Samba-Aval-300x300.webp", href: "/product/aathur-kichadi-samba-aval/" },
  { name: "Iluppai Poo Samba Aval (இலுப்பைப் பூ சம்பா அவல்)", price: "₹175.00", size: "500 g", img: "/2026/09/Karudan-Samba-Aval-300x300.webp", href: "/product/iluppai-poo-samba-aval/" },
  { name: "Arubathaam Kuruvai Aval (அறுபதாம் குறுவை அவல்)", price: "₹150.00", size: "500 g", img: "/2026/09/Kichadi-Samba-Aval-300x300.webp", href: "/product/arubathaam-kuruvai-aval/" },
  { name: "Kudavaazhai Aval (குடவாழை அவல்)", price: "₹155.00", size: "500 g", img: "/2026/09/Kudavaazhai-Aval-300x300.webp", href: "/product/kudavaazhai-aval/" },
  { name: "Karudan Samba Aval (கருடன் சம்பா அவல்)", price: "₹155.00", size: "500 g", img: "/2026/09/Karudan-Samba-Aval-300x300.webp", href: "/product/karudan-samba-aval/" },
  { name: "Kichadi Samba Aval (கிச்சடி சம்பா அவல்)", price: "₹145.00", size: "500 g", img: "/2026/09/Kichadi-Samba-Aval-300x300.webp", href: "/product/kichadi-samba-aval/" },
];

const collections = [
  { name: "Cold-Pressed Oils", desc: "Sesame, groundnut and coconut — pressed without heat.", img: "/2026/07/25-product-coconut-oil-300x300.webp", href: "/product-category/oil-vinegers/" },
  { name: "Lentils & Pulses", desc: "Toor, moong, urad and Bengal gram dals, plus chickpeas and green gram.", img: "/2026/08/Kadalai-Paruppu-300x300.webp", href: "/product-category/paruppu-pulses/" },
  { name: "Other Rice", desc: "Ponni, idli rice and barley rice for everyday meals.", img: "/2026/08/Ponni-Arisi-300x300.webp", href: "/product-category/other-rice/" },
  { name: "Personal Care", desc: "Traditional herbal bathing powder and shikakai powder.", img: "/2026/08/Kuliyal-Podi-300x300.webp", href: "/product-category/personal-care/" },
];

const whyItems = [
  { title: "Sourced Close to Home", desc: "Naadu Nalam works with local growers and small producers rather than anonymous supply chains." },
  { title: "Every Seller Has a Storefront", desc: "Each vendor has their own store page, so you can see who you are buying from before you add to cart." },
  { title: "Traditional Staples", desc: "Cold-pressed oils, native rice, whole spices and raw honey — stocked the way Indian kitchens actually use them." },
  { title: "Clear, Upfront Pricing", desc: "Every listing shows its regular price alongside the current price, so you always see what you are paying." },
];

const trust = [
  { t: "Flat ₹50 Delivery", d: "Across Tamil Nadu" },
  { t: "Sourced Close to Home", d: "From trusted local farmers" },
  { t: "Every Seller Has a Storefront", d: "Verified & transparent" },
  { t: "Clear, Upfront Pricing", d: "No hidden costs" },
];

export default function Home() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [gen, setGen] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  const slide = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <Layout>
      <main>
        {/* ───────── Hero: green field — words on the left, copper 3D arch + five elements on the right ───────── */}
        <section id="home" className="nn-hero relative isolate overflow-clip bg-nn-leaf nn-botanic flex flex-col">
          <div className="nn-wrap flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-[minmax(0,1fr)] lg:items-center lg:gap-8">
            <div data-orbit-clear className="relative z-10 max-w-[560px] mx-auto lg:mx-0 pt-[clamp(36px,6vh,64px)] lg:py-[clamp(36px,6vh,64px)] text-center lg:text-left">
              <p className="nn-rise nn-eyebrow text-nn-gold-lt inline-flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-nn-gold" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" /></svg>
                100% Natural · Locally Sourced
              </p>
              <h1 className="nn-rise nn-display text-nn-cream mt-5 text-[clamp(40px,min(4.6vw,8.4vh),76px)]" style={{ "--d": "90ms" } as React.CSSProperties}>
                <span className="block">Naturally Grown Food,</span>
                <span className="block text-nn-gold [text-wrap:balance]">Straight From Local Sellers</span>
              </h1>
              <p className="nn-rise nn-lead text-nn-cream/80 mt-6 max-w-[480px] mx-auto lg:mx-0 [text-wrap:pretty]" style={{ "--d": "200ms" } as React.CSSProperties}>
                Cold-pressed oils, native rice, whole spices and pure honey, from independent growers and small producers across Tamil Nadu.
              </p>
              <div className="nn-rise flex flex-wrap justify-center lg:justify-start gap-3 mt-8" style={{ "--d": "300ms" } as React.CSSProperties}>
                <a href="/shop/" className="nn-pill nn-pill-gold">Shop the Marketplace <Arrow /></a>
                <a href="#categories" className="nn-pill nn-pill-line text-nn-cream">Explore Categories</a>
              </div>
              <ul className="nn-rise flex flex-wrap justify-center lg:justify-start gap-x-7 gap-y-2 mt-10 pt-6 border-t border-nn-cream/15 text-[14.5px] font-medium text-nn-cream/80" style={{ "--d": "400ms" } as React.CSSProperties}>
                {["Flat ₹50 delivery", "Verified local sellers", "No hidden costs"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 text-nn-gold" fill="none" stroke="currentColor" strokeWidth="2.6" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5L20 7" /></svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* the 3D stage runs to the right edge on desktop; on phones it is its own full-width band under the text */}
            <div className="relative z-0 pointer-events-none mx-[calc(50%-50vw)] lg:mx-0 lg:-mr-[var(--gutter)] mt-4 lg:mt-0 h-[min(56svh,440px)] lg:h-full lg:self-stretch">
              <Hero3D photo="/images/hero-farmer.webp" focusY={0.18} elements={HERO_ELEMENTS} label="A smiling farmer holding a basket of fresh vegetables inside a copper temple arch, circled by earth, water, fire, air and sky" />
            </div>
          </div>
        </section>

        {/* ───────── Ribbons crossing in 3D ───────── */}
        <section aria-label="Popular Categories" className="relative overflow-clip bg-nn-cream py-[clamp(56px,5vw,72px)] [perspective:900px]">
          <div className="nn-marquee-wrap bg-nn-gold text-nn-soil-dk py-3.5 [transform:rotate(-2deg)_rotateX(14deg)] shadow-nn relative z-10 -mx-6">
            <div className="nn-marquee">
              {[0, 1].map((k) => (
                <div key={k} className="flex items-center shrink-0" aria-hidden={k === 1}>
                  <span className="font-display text-[26px] px-8">Popular Categories</span>
                  {topCats.map((c) => (
                    <a key={c.name + k} href={c.href} tabIndex={k === 1 ? -1 : undefined} className="flex items-center gap-8 shrink-0 hover:underline underline-offset-4">
                      <span className="text-nn-soil">✦</span>
                      <span className="text-[18px] font-semibold whitespace-nowrap pr-8">{c.name.split("(")[0].trim()} <span className="font-tamil text-[15px] opacity-75">({c.name.match(/\(([^)]+)\)/)?.[1]})</span></span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="nn-marquee-wrap bg-nn-green text-nn-gold py-3 [transform:rotate(1.6deg)_rotateX(-12deg)] -mt-2 -mx-6">
            <div className="nn-marquee rev">
              {[0, 1].map((k) => (
                <div key={k} className="flex items-center shrink-0" aria-hidden={k === 1}>
                  {trust.map((t) => (
                    <span key={t.t + k} className="flex items-center gap-3 px-8 whitespace-nowrap">
                      <span className="font-display text-[22px]">{t.t}</span>
                      <span className="text-nn-cream/75 text-[15px]">{t.d}</span>
                      <span className="text-nn-gold/60 pl-5">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Seven generations: all seven arches on one tilted 3D wall, lineage list beside it ───────── */}
        <section id="generations" className="nn-sec nn-frame nn-paper-bg nn-botanic">
          <div className="nn-wrap grid lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.6fr)] gap-6 lg:gap-12 items-center">
            <div className="text-center lg:text-left relative z-10">
              <p className="font-tamil text-nn-soil text-[18px] font-semibold mb-1">பரம்பரை</p>
              <h2 data-split className="font-tamil font-extrabold text-nn-soil text-[clamp(38px,min(3.9vw,8vh),62px)] leading-[1.05] mb-[2.4vh]">ஏழு தலைமுறை</h2>
              <ol className="hidden lg:block relative text-left" aria-label="ஏழு தலைமுறை">
                <span aria-hidden="true" className="absolute left-4 top-4 bottom-4 w-px bg-nn-gold" />
                {GENERATIONS.map((g, i) => (
                  <li key={g.ta} onMouseEnter={() => setGen(i)} onMouseLeave={() => setGen(null)} className="relative flex items-center gap-4 py-[min(0.7vh,6px)]">
                    <span className={`relative z-10 w-8 h-8 shrink-0 rounded-full grid place-items-center font-tamil text-[15px] font-bold border transition-colors duration-300 ${gen === i ? "bg-nn-soil text-nn-gold border-nn-soil" : "bg-nn-cream text-nn-soil border-nn-gold"}`}>{TAMIL_NUM[i]}</span>
                    <span className="leading-tight">
                      <span className={`block font-tamil text-[16px] font-semibold transition-colors duration-300 ${gen === i ? "text-nn-soil" : "text-nn-ink"}`}>{g.ta}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative nn-fill [perspective:1700px]">
              <div data-turn="-9,9" className="h-full nn-preserve">
                <ol data-reveal="group" className="h-full flex flex-wrap justify-center content-center gap-3 lg:gap-4 nn-preserve">
                  {GENERATIONS.map((g, i) => (
                    <li
                      key={g.ta}
                      onMouseEnter={() => setGen(i)}
                      onMouseLeave={() => setGen(null)}
                      className={`nn-preserve h-[clamp(150px,40vw,230px)] lg:h-[calc((100%-16px)/2)] ${i === 6 ? "w-full" : "w-[calc(50%-6px)]"} lg:w-[calc((100%-48px)/4)]`}
                    >
                      <figure className={`relative w-full h-full rounded-[999px_999px_22px_22px] overflow-hidden border-[3px] border-nn-gold bg-nn-soil shadow-nn-hover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${gen === i ? "[transform:translateZ(70px)_translateY(-8px)]" : ""}`}>
                        <img src={g.img} alt={`${g.ta} — ${g.en}`} className="w-full h-full object-cover" style={{ objectPosition: g.pos, filter: `sepia(${Math.min(0.8, i * 0.13)})` }} />
                        <figcaption className="absolute inset-x-0 bottom-0 px-2 pb-2.5 lg:pb-3 pt-8 lg:pt-12 bg-gradient-to-t from-nn-soil-dk via-nn-soil-dk/70 to-transparent text-center">
                          <span className="block font-tamil text-nn-gold text-[18px] lg:text-[20px] font-bold leading-none">{TAMIL_NUM[i]}</span>
                          <span className="block font-tamil text-nn-cream text-[15px] font-bold leading-snug mt-1">{g.ta}</span>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Panchabhootham around Thaayanbu: concave 3D arc ───────── */}
        <section id="panchabhootham" className="nn-sec nn-frame nn-soil-bg nn-botanic nn-grain">
          <div className="nn-wrap grid lg:grid-cols-[0.72fr_1.6fr] gap-8 lg:gap-6 items-center">
            <div className="text-center lg:text-left relative z-10">
              <p className="font-tamil text-nn-gold-lt text-[18px] font-semibold mb-1">இயற்கை</p>
              <h2 data-split className="font-tamil font-extrabold text-nn-gold text-[clamp(40px,min(5vw,9vh),78px)] leading-[1.05] mb-[2.4vh]">பஞ்சபூதம்</h2>
              <figure className="relative mx-auto lg:mx-0 w-[min(100%,280px)] lg:w-[min(100%,340px)]" data-reveal>
                <div className="nn-tilt rounded-[999px_999px_26px_26px] overflow-hidden border-4 border-nn-gold h-[clamp(220px,40vh,360px)] lg:h-[calc(var(--frame-in)-clamp(150px,22vh,200px))]">
                  <img src="/images/thaayanbu.webp" alt="தாயன்பு — a mother holding her baby" className="w-full h-full object-cover" style={{ objectPosition: "55% 40%" }} />
                </div>
                <figcaption className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-nn-gold text-nn-soil-dk rounded-full px-6 py-1.5 font-tamil font-bold text-[18px] whitespace-nowrap shadow-nn">தாயன்பு</figcaption>
              </figure>
            </div>

            {/* desktop: 3D arc */}
            <div className="hidden lg:flex relative nn-fill items-center justify-center [perspective:1300px]">
              <div data-turn="-12,12" className="relative w-0 h-0 nn-preserve lg:scale-[.86] xl:scale-[.95] 2xl:scale-100 [--eh:clamp(270px,calc(var(--frame-in)*0.66),460px)]">
                {ELEMENTS.map((e, i) => (
                  <figure
                    key={e.en}
                    className="group absolute w-[180px] h-[var(--eh)] -left-[90px] top-[calc(var(--eh)/-2)] nn-preserve"
                    style={{ transform: `translateX(${ARC[i].x}px) translateZ(${ARC[i].z}px) rotateY(${-ARC[i].a}deg)` }}
                  >
                    <div className="absolute inset-0 rounded-[999px_999px_20px_20px] overflow-hidden shadow-nn-hover border-[3px] border-nn-gold/80 transition-transform duration-700 group-hover:[transform:translateZ(50px)]">
                      <img src={e.img} alt={`${e.ta} — ${e.en}`} className="w-full h-full object-cover" />
                      <figcaption className="absolute inset-x-0 bottom-0 p-3 pt-14 bg-gradient-to-t from-nn-soil-dk/95 to-transparent text-center">
                        <span className="block font-tamil text-[21px] font-bold text-nn-cream leading-tight">{e.ta}</span>

                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </div>
            {/* phone / tablet: grid */}
            <div className="lg:hidden flex flex-wrap justify-center gap-2 sm:gap-3" data-reveal="group">
              {ELEMENTS.map((e) => (
                <figure key={e.en} className="relative rounded-[999px_999px_18px_18px] overflow-hidden border-2 border-nn-gold/80 aspect-[3/4.2] w-[calc((100%-16px)/3)] sm:w-[calc((100%-48px)/5)]">
                  <img src={e.img} alt={`${e.ta} — ${e.en}`} className="w-full h-full object-cover" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-nn-soil-dk/95 to-transparent text-center">
                    <span className="block font-tamil text-[19px] font-bold text-nn-cream">{e.ta}</span>

                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Promo + Popular categories ───────── */}
        <section id="categories" className="nn-sec nn-frame nn-cream-bg nn-botanic">
          <div className="nn-wrap flex flex-col gap-[clamp(16px,3vh,30px)]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <SecHead kicker="Browse the Marketplace" title="Popular Categories" intro="Everything on Naadu Nalam, grouped the way an Indian kitchen actually shops." size="sm" />
              <a href="/shop/" className="nn-pill nn-pill-soil self-start md:self-auto shrink-0">View All Categories <Arrow /></a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-reveal="group">
              {promoCards.map((c, i) => (
                <a key={c.title} href={c.href} className={`group nn-tilt relative rounded-[24px] px-6 py-[clamp(10px,1.8vh,18px)] flex items-center gap-4 overflow-hidden ${i === 1 ? "bg-nn-green text-nn-cream" : "bg-nn-paper text-nn-soil"}`}>
                  <div className="flex-1">
                    <p className={`nn-eyebrow !text-[11.5px] mb-1 ${i === 1 ? "text-nn-gold" : "text-nn-soil/80"}`}>{c.eyebrow}</p>
                    <h3 className="font-display text-[clamp(22px,2vw,30px)] leading-none mb-1">{c.title}</h3>
                    <p className="text-[14px] opacity-75 mb-1">{c.price}</p>
                    <span className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wide">Shop Now <Arrow /></span>
                  </div>
                  <img src={full(c.img)} alt={c.title} className="w-[clamp(72px,11vh,112px)] h-[clamp(72px,11vh,112px)] rounded-full object-cover ring-4 ring-nn-gold/60 transition-transform duration-700 group-hover:[transform:rotate(-8deg)_scale(1.04)]" />
                </a>
              ))}
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-6 lg:grid-rows-[minmax(0,1fr)] gap-3 lg:gap-4 nn-grow" data-reveal="group">
              {categories.map((cat) => (
                <a key={cat.name} href={cat.href} className="group text-center flex flex-col min-h-0">
                  <div className="nn-tilt relative rounded-[999px_999px_22px_22px] overflow-hidden bg-nn-paper h-[clamp(110px,22vh,220px)] lg:h-auto lg:flex-1 lg:min-h-[80px] mb-2.5">
                    <img src={full(cat.img)} alt={cat.name} className="nn-tilt-img absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <SplitName name={cat.name} className="block font-display text-[clamp(15px,1.25vw,19px)] text-nn-soil leading-none shrink-0 min-h-[3.2em] lg:min-h-[4.3em]" taClass="!font-tamil normal-case text-nn-muted leading-[1.25]" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Top picks ───────── */}
        <section className="nn-sec nn-frame nn-paper-bg nn-botanic">
          <div className="nn-wrap flex flex-col gap-[clamp(12px,2.2vh,24px)] min-h-0">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <SecHead kicker="From Our Sellers" title="Top Picks from Our Sellers" intro="Choose a category, then browse what’s newly listed or currently on sale." size="sm" />
              <div className="flex items-center gap-1 p-1 bg-nn-card rounded-full shadow-nn self-start lg:self-auto overflow-x-auto max-w-full shrink-0">
                {["New", "Sale", "Best Selling", "Top Rated"].map((tab, i) => (
                  <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 h-10 rounded-full text-[14px] font-bold uppercase tracking-wide whitespace-nowrap transition-colors duration-300 ${activeTab === i ? "bg-nn-soil text-nn-gold" : "text-nn-ink hover:text-nn-soil"}`}>{tab}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <p className="nn-eyebrow text-nn-soil shrink-0 hidden sm:block">Categories <span className="ml-1 bg-nn-gold text-nn-soil-dk px-2 py-0.5 rounded-full text-[11px]">11</span></p>
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] min-w-0">
                {showcaseCats.map((c, i) => (
                  <button key={c.name} onClick={() => setActiveCat(i)} className={`shrink-0 flex items-center gap-2 pl-1 pr-4 h-11 rounded-full border transition-colors duration-300 ${activeCat === i ? "bg-nn-soil text-nn-gold border-nn-soil" : "bg-nn-card border-nn-line text-nn-ink hover:border-nn-soil"}`}>
                    <img src={thumb(c.img)} alt="" className="w-9 h-9 rounded-full object-cover" />
                    <span className="text-[14px] font-semibold whitespace-nowrap">{c.name}</span>
                    <span className={`text-[12px] whitespace-nowrap ${activeCat === i ? "text-nn-gold-lt" : "text-nn-muted"}`}>{c.count} products</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-[clamp(20px,1.7vw,26px)] text-nn-soil">New in Aval / Flakes <span className="font-tamil normal-case text-[16px] text-nn-muted">(அவல் வகைகள்)</span></p>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => slide(-1)} aria-label="Previous products" className="nn-round !w-11 !h-11 !bg-nn-soil !text-nn-gold"><Arrow className="w-4 h-4 rotate-180" /></button>
                <button onClick={() => slide(1)} aria-label="Next products" className="nn-round !w-11 !h-11 !bg-nn-soil !text-nn-gold"><Arrow /></button>
              </div>
            </div>
            <div ref={rail} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pt-2 pb-4 -mt-2 -mb-4 [scrollbar-width:none]">
              {products.map((p) => (
                <div key={p.name} className="snap-start shrink-0 w-[max(200px,min(46vw,calc((100%-48px)/4),34vh))]">
                  <ProductCard name={p.name} price={p.price} size={p.size} img={full(p.img)} href={p.href} badge="New" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Collections ───────── */}
        <section id="collections" className="nn-sec nn-frame nn-forest-bg nn-botanic nn-grain">
          <div className="nn-wrap flex flex-col gap-[clamp(18px,3.5vh,40px)]">
            <SecHead kicker="Shop by Need" title="Collections Built Around Real Cooking" intro="Four staples an Indian kitchen keeps stocked — each one a live category on the marketplace." light size="sm" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 nn-grow" data-reveal="group">
              {collections.map((c) => (
                <a key={c.name} href={c.href} className="group nn-tilt relative rounded-[26px] overflow-hidden h-[clamp(260px,48vh,460px)] lg:!h-full flex flex-col justify-end text-nn-cream">
                  <img src={full(c.img)} alt={c.name} className="nn-tilt-img absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-nn-green-dk via-nn-green-dk/50 to-transparent" />
                  <div className="relative p-5">
                    <h3 className="font-display text-[clamp(24px,2.2vw,34px)] text-nn-gold leading-none mb-2">{c.name}</h3>
                    <p className="text-[14.5px] text-nn-cream/85 mb-3">{c.desc}</p>
                    <span className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wide text-nn-gold">Shop {c.name.split(" ")[0]} <Arrow /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Multi-vendor: fanned 3D deck ───────── */}
        <section className="nn-sec nn-frame nn-cream-bg nn-botanic">
          <div className="nn-wrap grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
            <div className="lg:h-full flex flex-col justify-between gap-6">
              <SecHead kicker="A Multi-Vendor Marketplace" title="Many Sellers. One Basket." size="sm" />
              <p data-scrub className="font-display !normal-case !tracking-normal !font-semibold text-[clamp(22px,2vw,31px)] !leading-[1.25] text-nn-soil" style={{ fontVariationSettings: '"wdth" 92' }}>
                Naadu Nalam is a marketplace, not a single shop. Independent growers, home producers and small brands each run their own storefront here — you browse them side by side and check out once.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/my-account/" className="nn-pill nn-pill-soil">Become a Seller <Arrow /></a>
                <a href="/store-listing/" className="nn-pill nn-pill-line text-nn-soil">Browse the Marketplace</a>
              </div>
            </div>
            <div className="[perspective:1400px]">
              <div className="grid gap-4 nn-preserve lg:[transform:rotateY(-14deg)_rotateX(6deg)]" data-reveal="group">
                {[
                  { t: "Independent Storefronts", d: "Every seller manages their own listings, pricing and stock." },
                  { t: "One Cart, One Checkout", d: "Add items from different sellers and pay in a single order." },
                  { t: "Open to New Sellers", d: "Growers and small producers can register and open a store on Naadu Nalam." },
                ].map((item, i) => (
                  <div key={item.t} className={`nn-tilt rounded-[24px] p-[clamp(20px,3.2vh,32px)] shadow-nn-hover ${i === 1 ? "bg-nn-soil text-nn-cream" : "bg-nn-card"}`} style={{ marginLeft: `${i * 22}px` }}>
                    <h3 className={`font-display text-[clamp(22px,1.9vw,28px)] leading-none mb-2 ${i === 1 ? "text-nn-gold" : "text-nn-soil"}`}>{item.t}</h3>
                    <p className={`text-[15px] ${i === 1 ? "text-nn-cream/80" : "text-nn-muted"}`}>{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Featured spices: 3D coin flips with scroll ───────── */}
        <section className="nn-sec nn-frame nn-soil-bg nn-botanic nn-grain">
          <div className="nn-wrap grid md:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <p className="nn-eyebrow text-nn-gold-lt mb-3">Featured Category</p>
              <h2 data-split className="nn-display nn-h2-sm text-nn-gold">Whole Spices, Straight From the Source</h2>
              <p className="nn-lead text-nn-cream/80 mt-5 mb-5 max-w-lg">Eighteen varieties listed on the marketplace right now — cumin, coriander, cardamom, cloves, mustard, fenugreek and more. Bought whole, ground in your own kitchen.</p>
              <p className="font-display text-[34px] text-nn-gold-lt mb-6">Starting at ₹40</p>
              <a href="/product-category/spices/" className="nn-pill nn-pill-gold">Shop Spices <Arrow /></a>
            </div>
            <div className="[perspective:1600px] flex justify-center">
              <div data-coin className="group relative w-[min(100%,54vh,460px)] lg:w-[min(100%,var(--frame-in),640px)] aspect-square nn-preserve">
                <div className="absolute inset-0 nn-preserve transition-transform duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 rounded-full overflow-hidden border-[10px] border-nn-gold shadow-nn-hover [backface-visibility:hidden] bg-white">
                  <img src={full("/2026/07/13-product-whole-spices-300x300.webp")} alt="Mixed whole spices" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 rounded-full bg-nn-gold border-[10px] border-nn-gold-lt [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center text-nn-soil-dk text-center p-10">
                  <span className="nn-eyebrow">Whole Spices</span>
                  <span className="font-display text-[clamp(56px,6vw,96px)]">₹40</span>
                  <span className="nn-eyebrow">Starting at</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Why Naadu Nalam ───────── */}
        <section className="nn-sec nn-frame nn-paper-bg nn-botanic">
          <div className="nn-wrap flex flex-col gap-[clamp(20px,4vh,48px)]">
            <SecHead kicker="Why Naadu Nalam" title="Built Around Trust, Not Volume" center />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-1 gap-4 nn-grow" data-reveal="group">
              {whyItems.map((item, i) => (
                <div key={item.title} className={`group nn-tilt rounded-[26px] p-3 flex flex-col ${i % 2 ? "bg-nn-soil text-nn-cream" : "bg-nn-card"} shadow-nn`}>
                  <div className="relative rounded-[999px_999px_18px_18px] overflow-hidden h-[150px] lg:h-auto lg:flex-1 lg:min-h-[110px]"><img src={["/images/el-earth.webp", "/images/gen-1.webp", "/images/el-fire.webp", "/images/gen-2.webp"][i]} alt="" className="nn-tilt-img absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "50% 35%" }} /></div>
                  <h3 className={`font-display text-[clamp(22px,1.9vw,28px)] leading-none lg:min-h-[2em] mt-5 mb-3 px-3 ${i % 2 ? "text-nn-gold" : "text-nn-soil"}`}>{item.title}</h3>
                  <p className={`text-[15.5px] leading-relaxed px-3 pb-3 ${i % 2 ? "text-nn-cream/80" : "text-nn-muted"}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
