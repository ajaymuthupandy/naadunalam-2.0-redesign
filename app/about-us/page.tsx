"use client";

import React from "react";
import Layout from "@/components/Layout";
import { Arrow, IMG_BASE, SecHead } from "@/components/ui";

const why = [
  { title: "Naturally Sourced", desc: "We focus on products that stay close to their natural form and traditional roots." },
  { title: "Traditional Varieties", desc: "Discover traditional rice varieties, siruthaniyam, pulses and other ingredients deeply connected to Tamil food culture." },
  { title: "Supporting Farmers", desc: "We believe in creating a stronger connection between the people who grow our food and the people who consume it." },
  { title: "From Farm to Family", desc: "Our goal is to make traditional products accessible for everyday households." },
];

const philosophy = [
  { title: "Traditional Rice", list: "Seeraga Samba • Kichili Samba • Karudan Samba • Kudavaazhai • Moongil Arisi", img: "/2026/08/Seeraga-Samba-Arisi.webp", alt: "Seeraga Samba Arisi rice grains", href: "/product-category/rice-grains/" },
  { title: "Siruthaniyam", list: "Samai • Thinai • Kuthiraivali • Varagu • Kambu • Cholam • Kezhvaragu", img: "/2026/08/Samai-Arisi.webp", alt: "Samai Arisi (little millet) grains", href: "/product-category/siruthaniyam/" },
  { title: "Paruppu & Pulses", list: "Kadalai Paruppu • Thuvaram Paruppu • Pachai Payaru • Ulundhu • Kondakadalai", img: "/2026/08/Kadalai-Paruppu.webp", alt: "Kadalai Paruppu — split Bengal gram (chana dal)", href: "/product-category/paruppu-pulses/" },
  { title: "Natural Sweeteners", list: "Naattu Sarkkarai • Karuppatti • Vellam • Panangkarkandu • Then", img: "/2026/08/Karuppatti.webp", alt: "Karuppatti — traditional palm jaggery", href: "/product-category/natural-sweeteners/" },
  { title: "Masala & Powders", list: "Sambar Podi • Kuzhambu Podi • Rasam Podi • Milagai Podi", img: "/2026/08/Sambar-Podi.webp", alt: "Sambar Podi — traditional Tamil sambar powder", href: "/product-category/masala-podi/" },
  { title: "Traditional Oils & Ghee", list: "Nallennai • Kadalai Ennai • Thengai Ennai • Mallamaattu Nei", img: "/2026/08/Nallennai.webp", alt: "Nallennai — cold-pressed sesame oil", href: "/product-category/oil-vinegers/" },
];

const promise = [
  { ta: "நம்பிக்கை" },
  { ta: "நலம்" },
  { ta: "மரபு" },
];

export default function AboutUs() {
  return (
    <Layout>
      <main>
        {/* Hero */}
        <section className="nn-sec nn-frame nn-soil-bg">
          <div className="nn-wrap grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <h1 data-split className="nn-display text-[clamp(52px,min(8vw,14vh),132px)] text-nn-gold">About Naadu Nalam</h1>
              <p className="font-tamil text-[clamp(20px,1.8vw,28px)] font-bold text-nn-gold-lt mt-4">நம்ம மண்ணின் சுவை. நம்ம மக்களின் நலம்.</p>
              <p className="nn-lead text-nn-cream/85 max-w-xl mt-6 mb-7">Naadu Nalam brings the goodness of traditional Tamil Nadu foods and natural products closer to your home.</p>
              <a href="/shop/" className="nn-pill nn-pill-gold">Explore Our Products <Arrow /></a>
            </div>
            <div className="relative h-[clamp(320px,56vh,520px)] nn-fill [perspective:1400px]">
              <div className="absolute inset-0 nn-preserve" data-turn="-16,10">
                <img src={`${IMG_BASE}/2026/08/naadu-nalam-store-banner.webp`} alt="Traditional Tamil Nadu produce — millets, pulses, cold-pressed oils and native vegetables laid on a wooden table before a paddy field" className="absolute left-0 top-0 w-[78%] h-[70%] object-cover rounded-[28px] border-4 border-nn-gold shadow-nn-hover [transform:translateZ(-60px)_rotateY(10deg)]" />
                <img src={`${IMG_BASE}/2026/08/Parambariya-Arisi-Vagaigal.webp`} alt="Parambariya arisi vagaigal — traditional rice varieties" className="absolute right-0 bottom-0 w-[54%] aspect-square object-cover rounded-[999px_999px_28px_28px] border-4 border-nn-gold shadow-nn-hover [transform:translateZ(60px)_rotateY(-8deg)]" />
              </div>
            </div>
          </div>
        </section>

        {/* From our soil */}
        <section className="nn-sec nn-frame nn-cream-bg nn-botanic">
          <div className="nn-wrap grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
            <div className="[perspective:1400px] order-2 lg:order-1">
              <div className="nn-tilt rounded-[999px_999px_30px_30px] overflow-hidden border-4 border-nn-gold h-[clamp(300px,58vh,560px)] nn-fill max-w-[520px] mx-auto" data-reveal>
                <img src="/images/el-earth.webp" alt="Paddy fields and coconut palms" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SecHead title="From Our Soil to Your Home" size="sm" />
              <p className="font-display !normal-case !tracking-normal text-[clamp(22px,2vw,30px)] text-nn-soil mt-6 mb-4" style={{ fontVariationSettings: '"wdth" 92' }}>Good food begins with good soil.</p>
              <p data-scrub className="nn-lead text-nn-ink mb-4">Tamil Nadu has a rich agricultural heritage filled with traditional grains, rice varieties, native ingredients and time-tested food practices.</p>
              <p className="nn-lead text-nn-muted mb-6">At Naadu Nalam, we bring these products together in one place so you can discover and enjoy the foods that have been part of our culture for generations. Traditional. Natural. Authentic.</p>
              <div className="flex flex-wrap gap-2">
                {["Traditional", "Natural", "Authentic"].map((w) => <span key={w} className="nn-pill nn-pill-gold !min-h-[40px] !shadow-none">{w}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="nn-sec nn-frame nn-forest-bg nn-botanic nn-grain">
          <div className="nn-wrap flex flex-col gap-[clamp(20px,4vh,44px)]">
            <SecHead title="Why Naadu Nalam?" light center />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-1 gap-4 nn-grow" data-reveal="group">
              {why.map((w, i) => (
                <div key={w.title} className={`group nn-tilt rounded-[26px] p-3 flex flex-col ${i % 2 ? "bg-nn-gold text-nn-soil-dk" : "bg-nn-cream text-nn-ink"}`}>
                  <div className="relative rounded-[999px_999px_18px_18px] overflow-hidden h-[160px] lg:h-auto lg:flex-1 lg:min-h-[110px]"><img src={["/images/el-earth.webp", "/images/el-water.webp", "/images/gen-2.webp", "/images/gen-1.webp"][i]} alt="" className="nn-tilt-img absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "50% 35%" }} /></div>
                  <h3 className="font-display text-[clamp(24px,2vw,30px)] text-nn-soil leading-none mt-5 mb-3 px-3">{w.title}</h3>
                  <p className="text-[15.5px] leading-relaxed opacity-85 px-3 pb-3">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product philosophy */}
        <section className="nn-sec nn-frame nn-paper-bg nn-botanic">
          <div className="nn-wrap flex flex-col gap-[clamp(18px,3.5vh,36px)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SecHead title="Our Product Philosophy" size="sm" />
                          </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 nn-grow" data-reveal="group">
              {philosophy.map((p) => (
                <a key={p.title} href={p.href} className="group nn-tilt flex items-center gap-4 bg-nn-card rounded-[24px] p-3 pr-5 shadow-nn lg:!h-auto">
                  <img src={`${IMG_BASE}${p.img}`} alt={p.alt} className="w-[clamp(84px,13vh,120px)] h-[clamp(84px,13vh,120px)] lg:w-[38%] lg:h-full rounded-[20px] object-cover shrink-0 transition-transform duration-700 group-hover:[transform:rotate(-6deg)_scale(1.04)]" />
                  <div>
                    <h3 className="font-display text-[clamp(22px,1.8vw,28px)] text-nn-soil leading-none mb-2">{p.title}</h3>
                    <p className="text-[14.5px] text-nn-muted leading-relaxed">{p.list}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* More than a store */}
        <section className="nn-sec nn-frame nn-soil-bg nn-botanic nn-grain">
          <div className="nn-wrap grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <h2 data-split className="nn-display nn-h2-sm text-nn-gold">More Than a Store</h2>
              <p className="font-display text-[clamp(24px,2.4vw,38px)] text-nn-gold-lt mt-2">We are preserving a way of life.</p>
              <p className="nn-lead text-nn-cream/85 mt-6 mb-5 max-w-2xl">In a world where food is becoming increasingly processed and disconnected from its origins, Naadu Nalam wants to bring people closer to the foods and traditions that shaped Tamil households.</p>
              <ul className="grid gap-2.5 mb-5" data-reveal="group">
                {["Every traditional grain has a story.", "Every native rice variety carries generations of knowledge.", "Every farmer plays a part in keeping that heritage alive."].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[17px] text-nn-cream">
                    <span className="w-7 h-7 rounded-full bg-nn-gold text-nn-soil-dk flex items-center justify-center shrink-0">✦</span>{t}
                  </li>
                ))}
              </ul>
              <p className="nn-lead text-nn-gold-lt">Naadu Nalam is our small step towards keeping that connection alive.</p>
            </div>
            <div className="[perspective:1400px] flex justify-center">
              <img data-turn="-14,14" src={`${IMG_BASE}/2026/08/nn-hero-cutout-600x900.webp`} alt="A farmer holding a woven basket of newly harvested vegetables" className="h-[clamp(320px,64vh,620px)] nn-fill w-auto object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,.35)]" />
            </div>
          </div>
        </section>

        {/* Our promise */}
        <section className="nn-sec nn-frame nn-cream-bg nn-botanic">
          <div className="nn-wrap flex flex-col items-center justify-between gap-[clamp(20px,4vh,44px)] text-center">
            <SecHead title="Our Promise" center />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl [perspective:1400px]" data-reveal="group">
              {promise.map((p, i) => (
                <div key={p.ta} className="group mx-auto w-[min(100%,min(30vh,280px))] lg:w-[min(100%,calc(var(--frame-in)-300px),400px)] aspect-square nn-preserve">
                  <div className="relative w-full h-full nn-preserve transition-transform duration-[1000ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:[transform:rotateY(180deg)]">
                    <div className={`absolute inset-0 rounded-full flex flex-col items-center justify-center border-[8px] border-nn-gold shadow-nn-hover [backface-visibility:hidden] ${i === 1 ? "bg-nn-green text-nn-gold" : "bg-nn-soil text-nn-gold"}`}>
                      <span className="font-tamil font-extrabold text-[clamp(26px,2.6vw,40px)] leading-tight">{p.ta}</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-nn-gold text-nn-soil-dk flex items-center justify-center border-[8px] border-nn-gold-lt [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <span className="font-tamil font-extrabold text-[clamp(26px,2.6vw,40px)] leading-tight">{p.ta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="nn-lead text-nn-muted max-w-2xl">Because when we choose better food, we don’t just nourish ourselves—we support our farmers, our soil and our heritage.</p>
          </div>
        </section>

        {/* Goodness from our land */}
        <section className="nn-sec nn-frame nn-forest-bg nn-botanic nn-grain">
          <div className="nn-wrap text-center flex flex-col items-center">
            <h2 data-split className="font-tamil font-extrabold text-nn-gold text-[clamp(34px,min(4.6vw,8vh),72px)] leading-[1.15]">நம் மண்ணிலிருந்து, உங்கள் வீட்டிற்கு</h2>
            <p className="font-display text-[clamp(26px,3vw,48px)] text-nn-gold-lt mt-4">Goodness from our land. Goodness for your home.</p>
            <div className="flex justify-center gap-[clamp(8px,1.2vw,16px)] w-full mt-[3vh] nn-grow [perspective:1200px] nn-preserve">
              {["/images/el-earth.webp", "/images/el-water.webp", "/images/el-fire.webp", "/images/el-air.webp", "/images/el-space.webp"].map((src, i) => (
                <img key={src} src={src} alt="" className="w-[18%] max-w-[200px] h-[clamp(110px,18vh,160px)] lg:h-auto lg:min-h-[120px] rounded-[999px_999px_20px_20px] object-cover border-[3px] border-nn-gold shadow-nn-hover" style={{ transform: `rotateY(${(i - 2) * -16}deg) translateZ(${Math.abs(i - 2) * 24}px)` }} />
              ))}
            </div>
            <p className="nn-lead text-nn-cream/85 max-w-2xl mt-[3vh]">Explore traditional rice varieties, siruthaniyam, pulses, cold-pressed oils, natural sweeteners and everyday podis — brought together in one place for your kitchen.</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
