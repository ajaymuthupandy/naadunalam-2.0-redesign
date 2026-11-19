import React from "react";
import { notFound } from "next/navigation";
import Layout from "@/components/Layout";
import { ProductBuy } from "@/components/Cart";
import { Arrow, IMG_BASE, PageBanner, ProductCard, SplitName, full } from "@/components/ui";
import { allProducts, blogPosts, categories, shopFilters } from "@/lib/data";
import docs from "@/lib/docs.json";

type Block = { type: string; text?: string; items?: string[] };
type Doc = { title: string; intro: string[]; updated: string; toc: { id: string; label: string }[]; sections: { heading: string; id?: string; blocks: Block[] }[]; tags: string };
const DOCS = docs as unknown as Record<string, Doc>;

const productDetails: Record<string, { sku: string; stock: string; desc: string; taDesc: string; highlights: string[]; use: string }> = {
  "kalanamak-aval": {
    sku: "NN-AVL-243",
    stock: "100 in stock",
    desc: "Aval pounded from Kalanamak, the aromatic black-husked heirloom paddy of the Terai. The flakes keep a gentle fragrance — lovely in sweet aval, kheer and poha. 500 g pack.",
    taDesc: "தெராய் பகுதியின் கருப்பு உமி கொண்ட மணமுள்ள காலா நமக் நெல்லில் இருந்து இடிக்கப்பட்ட அவல்.",
    highlights: ["நறுமணமுள்ள காலா நமக் நெல்லில் இருந்து தயாரிக்கப்பட்டது", "மென்மையான, மணம் கொண்ட அவல்", "இனிப்பு உணவுகளுக்குச் சிறப்பாகப் பொருந்தும்"],
    use: "பயன்படுத்தும் முறை: நீரில் அலசி இரண்டு நிமிடம் ஊறவைக்கவும். இனிப்பு அவல், அவல் பாயசம், அவல் உப்புமா செய்ய ஏற்றது.",
  },
};

function titleFromSlug(slug: string) {
  return slug.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}

/* ---------- Policy / article renderer ---------- */
function DocPage({ doc, post }: { doc: Doc; post?: (typeof blogPosts)[number] }) {
  return (
    <main>
      <PageBanner title={doc.title} crumb={post ? "Blog" : doc.title} intro={doc.intro[0]}>
        {doc.updated && <p className="text-[14px] text-nn-gold-lt/80 mt-4">Last updated: {doc.updated}</p>}
        {post && <p className="text-[14px] text-nn-gold-lt/80 mt-4"><span className="font-semibold text-nn-gold">Superadmin</span> · {post.date}</p>}
      </PageBanner>
      <section className="nn-sec nn-long nn-cream-bg nn-botanic !overflow-visible">
        <div className={`nn-wrap grid ${doc.toc.length || post ? "lg:grid-cols-[300px_1fr]" : ""} gap-8 items-start`}>
          {doc.toc.length > 0 && (
            <nav aria-label="On this page" className="lg:sticky lg:top-[calc(var(--header-offset)+24px)] bg-nn-soil text-nn-cream rounded-[24px] p-5">
              <p className="nn-eyebrow text-nn-gold mb-3">On this page</p>
              <ol className="grid gap-1.5 text-[15px]">{doc.toc.map((t) => <li key={t.id}><a href={`#${t.id}`} className="hover:text-nn-gold">{t.label}</a></li>)}</ol>
            </nav>
          )}
          {post && (
            <div className="lg:sticky lg:top-[calc(var(--header-offset)+24px)] [perspective:1200px]">
              <img data-turn="-10,10" src={`${IMG_BASE}${post.img}`} alt={post.alt} className="w-full aspect-[4/5] object-cover rounded-[999px_999px_28px_28px] border-[5px] border-nn-gold shadow-nn-hover" />
            </div>
          )}
          <div className="grid gap-5 [perspective:1600px] max-w-4xl">
            {doc.sections.map((s, i) => {
              const last = i === doc.sections.length - 1 && !!doc.toc.length;
              return (
                <section key={s.heading} id={s.id} className={`nn-tilt rounded-[26px] p-[clamp(20px,2.2vw,30px)] ${last ? "bg-nn-soil text-nn-cream relative isolate overflow-hidden nn-botanic" : "bg-nn-card shadow-nn"}`} data-reveal>
                  <h2 className={`font-display text-[clamp(26px,2.4vw,38px)] leading-none mb-4 ${last ? "text-nn-gold" : "text-nn-soil"}`}>{s.heading}</h2>
                  <div className={`grid gap-3 text-[16px] leading-relaxed ${last ? "text-nn-cream/85" : "text-nn-ink/85"}`}>
                    {s.blocks.map((b, j) =>
                      b.type === "ul" ? (
                        <ul key={j} className="grid gap-1.5">{b.items!.map((it) => <li key={it} className="flex gap-3"><span className={last ? "text-nn-gold" : "text-nn-soil"}>✦</span><span>{it}</span></li>)}</ul>
                      ) : b.type === "h3" ? (
                        <h3 key={j} className="font-display text-[22px] text-nn-soil">{b.text}</h3>
                      ) : (
                        <p key={j}>{b.text}</p>
                      )
                    )}
                  </div>
                  {last && <a href="/contact/" className="nn-pill nn-pill-gold mt-6">Contact Us <Arrow /></a>}
                </section>
              );
            })}
            {post && (
              <>
                {doc.intro.slice(1).map((t) => <p key={t} className="nn-lead">{t}</p>)}
                {doc.tags && <p className="text-[14px] text-nn-muted">Tagged {doc.tags}</p>}
                <a href="/blog/" className="nn-pill nn-pill-soil justify-self-start">Read all blog posts <Arrow /></a>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Not found (as on the original) ---------- */
function Missing() {
  return (
    <main>
      <section className="nn-sec nn-frame nn-soil-bg nn-botanic nn-grain">
        <div className="nn-wrap text-center flex flex-col items-center">
          <p className="nn-display text-[clamp(120px,22vw,300px)] text-nn-gold/25 leading-none" aria-hidden="true">404</p>
          <h1 data-split className="nn-display text-[clamp(40px,5vw,80px)] text-nn-gold -mt-[clamp(40px,6vw,90px)]">The page can’t be found.</h1>
          <p className="nn-lead text-nn-cream/80 mt-4 mb-8">It looks like nothing was found at this location.</p>
          <a href="/" className="nn-pill nn-pill-gold">Home <Arrow /></a>
        </div>
      </section>
    </main>
  );
}

/* ---------- Store listing ---------- */
function StoreListing() {
  const stores = [
    { name: "Naadu Nalam", phone: "8123456456" },
    { name: "Thaayanbu", phone: "9176482135" },
  ];
  return (
    <main>
      <PageBanner title="Store Listing" intro="Total stores showing: 2" />
      <section className="nn-sec nn-frame nn-cream-bg nn-botanic">
        <div className="nn-wrap">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button className="nn-pill nn-pill-soil !min-h-[44px]">Filter</button>
            <label className="flex items-center gap-2 text-[15px] text-nn-ink">Sort by:
              <select className="nn-input !min-h-[44px] !w-auto"><option>Most Recent</option><option>Most Popular</option><option>Random</option><option>Top Rated</option><option>Most Reviewed</option></select>
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-6 [perspective:1500px]" data-reveal="group">
            {stores.map((s, i) => (
              <div key={s.name} className="nn-tilt rounded-[30px] overflow-hidden shadow-nn-hover bg-nn-card">
                <div className="relative h-[clamp(160px,28vh,260px)]">
                  <img src={i === 0 ? "/images/el-earth.webp" : "/images/thaayanbu.webp"} alt="" className="w-full h-full object-cover" style={{ objectPosition: "50% 40%" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-nn-soil-dk/80 to-transparent" />
                  <span className="absolute left-6 -bottom-9 w-[72px] h-[72px] rounded-full bg-nn-gold border-4 border-nn-card flex items-center justify-center overflow-hidden">
                    <img src="/naadu-nalam-logo-header.svg" alt="" className="w-12 h-12" />
                  </span>
                </div>
                <div className="p-6 pt-12 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="font-display text-[clamp(28px,2.6vw,40px)] text-nn-soil leading-none">{s.name}</h2>
                    <a href={`tel:${s.phone}`} className="text-[16px] text-nn-muted hover:text-nn-soil">{s.phone}</a>
                  </div>
                  <a href="/shop/" className="nn-round !bg-nn-soil !text-nn-gold" aria-label={`Visit ${s.name}`}><Arrow /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Account ---------- */
function Field({ label, type = "text", note }: { label: string; type?: string; note?: string }) {
  return (
    <label className="grid gap-1.5 text-[15px] font-semibold text-nn-ink">
      {label}
      <input className="nn-input" type={type} />
      {note && <span className="text-[13px] font-normal text-nn-muted">{note}</span>}
    </label>
  );
}

function MyAccount() {
  return (
    <main>
      <PageBanner title="My Account" />
      <section className="nn-sec nn-long nn-cream-bg nn-botanic">
        <div className="nn-wrap grid lg:grid-cols-2 gap-6 items-start [perspective:1600px]" data-reveal="group">
          <form className="nn-tilt bg-nn-soil text-nn-cream rounded-[30px] p-[clamp(20px,2.2vw,30px)] grid gap-4 relative isolate overflow-hidden nn-botanic">
            <h2 className="nn-display nn-h2-sm text-nn-gold">Login</h2>
            <label className="grid gap-1.5 text-[15px] font-semibold">Username or email address *<input className="nn-input" autoComplete="username" /></label>
            <label className="grid gap-1.5 text-[15px] font-semibold">Password *<input className="nn-input" type="password" autoComplete="current-password" /></label>
            <label className="flex items-center gap-2 text-[15px]"><input type="checkbox" className="w-4 h-4 accent-[#F5B335]" />Remember me</label>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="nn-pill nn-pill-gold">Log in</button>
              <a href="/my-account/" className="text-[15px] underline underline-offset-2 hover:text-nn-gold">Lost your password?</a>
            </div>
          </form>
          <form className="nn-tilt bg-nn-card rounded-[30px] p-[clamp(20px,2.2vw,30px)] grid gap-4 shadow-nn">
            <h2 className="nn-display nn-h2-sm text-nn-soil">Register</h2>
            <Field label="Email address *" type="email" note="A link to set a new password will be sent to your email address." />
            <div className="grid sm:grid-cols-2 gap-4"><Field label="First Name *" /><Field label="Last Name *" /></div>
            <div className="grid sm:grid-cols-2 gap-4"><Field label="Shop Name *" /><Field label="Shop URL *" note="https://naadunalam.fastfilings.in/store/" /></div>
            <Field label="Phone Number *" type="tel" />
            <div className="flex flex-wrap gap-5 text-[15px]">
              <label className="flex items-center gap-2"><input type="radio" name="role" defaultChecked className="accent-[#7E3814]" />I am a customer</label>
              <label className="flex items-center gap-2"><input type="radio" name="role" className="accent-[#7E3814]" />I am a vendor</label>
            </div>
            <p className="text-[14px] text-nn-muted">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="/privacy-policy/" className="text-nn-soil underline underline-offset-2">privacy policy</a>.</p>
            <button type="submit" className="nn-pill nn-pill-soil justify-self-start">Register</button>
          </form>
        </div>
      </section>
    </main>
  );
}

function VendorLogin() {
  return (
    <main>
      <PageBanner title="Sell on Naadu Nalam" crumb="Vendor Login" intro="Naadu Nalam is a multi-vendor marketplace. If you already have a vendor account, sign in here to reach your dashboard. If you don’t, you can apply to open a shop.">
        <ul className="grid gap-2 mt-6" data-reveal="group">
          {["Your own storefront at naadunalam.fastfilings.in/store/your-shop", "Add products, manage stock and track orders from the vendor dashboard", "Orders on the marketplace are Cash on Delivery at present"].map((t) => (
            <li key={t} className="flex items-center gap-3 text-[16px] text-nn-cream"><span className="w-7 h-7 rounded-full bg-nn-gold text-nn-soil-dk flex items-center justify-center shrink-0">✦</span>{t}</li>
          ))}
        </ul>
      </PageBanner>
      <section className="nn-sec nn-long nn-cream-bg nn-botanic">
        <div className="nn-wrap grid lg:grid-cols-[1fr_1.3fr] gap-6 items-start [perspective:1600px]" data-reveal="group">
          <form className="nn-tilt bg-nn-soil text-nn-cream rounded-[30px] p-[clamp(20px,2.2vw,30px)] grid gap-4 relative isolate overflow-hidden nn-botanic">
            <h2 className="nn-display nn-h2-sm text-nn-gold">Vendor login</h2>
            <label className="grid gap-1.5 text-[15px] font-semibold">Username or email address<input className="nn-input" autoComplete="username" /></label>
            <label className="grid gap-1.5 text-[15px] font-semibold">Password<input className="nn-input" type="password" autoComplete="current-password" /></label>
            <label className="flex items-center gap-2 text-[15px]"><input type="checkbox" className="w-4 h-4 accent-[#F5B335]" />Remember Me</label>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="nn-pill nn-pill-gold">Log in to dashboard</button>
              <a href="/my-account/" className="text-[15px] underline underline-offset-2 hover:text-nn-gold">Lost your password?</a>
            </div>
          </form>
          <form className="nn-tilt bg-nn-card rounded-[30px] p-[clamp(20px,2.2vw,30px)] grid gap-4 shadow-nn">
            <h2 className="nn-display nn-h2-sm text-nn-soil">New here? Apply to sell</h2>
            <p className="text-[15px] text-nn-muted">Fill in your details below to create a vendor account and claim your shop URL. A link to set your password is emailed to you.</p>
            <div className="grid sm:grid-cols-2 gap-4"><Field label="First Name *" /><Field label="Last Name *" /></div>
            <Field label="Email address *" type="email" note="A link to set a new password will be sent to your email address." />
            <Field label="Phone Number *" type="tel" />
            <div className="grid sm:grid-cols-2 gap-4"><Field label="Shop Name *" /><Field label="Shop URL *" note="https://naadunalam.fastfilings.in/store/" /></div>
            <Field label="Anti-spam" />
            <button type="submit" className="nn-pill nn-pill-soil justify-self-start">Apply to sell <Arrow /></button>
          </form>
        </div>
      </section>
    </main>
  );
}

/* ---------- Category ---------- */
function CategoryPage({ slug }: { slug: string }) {
  const cat = categories[slug] || { title: titleFromSlug(slug), match: /^$/ };
  const list = allProducts.filter((p) => cat.match.test(p.name));
  const shown = list.length ? list : allProducts.slice(0, 8);
  const count = shopFilters.categories.find((c) => c.name === cat.title)?.count;
  return (
    <main>
      <PageBanner title={cat.title.split("(")[0].trim()} crumb={cat.title} intro={cat.title.includes("(") ? <span className="font-tamil text-[clamp(20px,1.8vw,26px)] font-bold text-nn-gold-lt">{cat.title.match(/\(([^)]+)\)/)?.[1]}</span> : undefined} />
      <section className="nn-sec nn-long nn-cream-bg nn-botanic">
        <div className="nn-wrap">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <p className="text-[15px] text-nn-muted">{count ? `Showing 1–${Math.min(12, count)} of ${count} results` : `Showing ${shown.length} results`}</p>
            <div className="flex items-center gap-3">
              <select aria-label="Sort" className="nn-input !min-h-[44px] !w-auto !text-[14px]">{shopFilters.sorting.map((s) => <option key={s}>{s}</option>)}</select>
              <a href="/shop/" className="nn-pill nn-pill-soil !min-h-[44px]">Shop All Products <Arrow /></a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4" data-reveal="group">
            {shown.map((p) => <ProductCard key={p.href} name={p.name} price={p.price} size={p.size} img={full(p.img)} href={p.href} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Product ---------- */
function ProductPage({ slug }: { slug: string }) {
  const product = allProducts.find((p) => p.href === `/product/${slug}/`) || { ...allProducts[0], name: titleFromSlug(slug), href: `/product/${slug}/` };
  const d = productDetails[slug];
  const related = allProducts.filter((p) => p.href !== product.href).slice(0, 4);
  return (
    <main>
      <section className="nn-sec nn-frame nn-soil-bg nn-botanic nn-grain">
        <div className="nn-wrap grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
          <div className="[perspective:1500px] flex justify-center">
            <div data-turn="-14,14" className="relative w-[min(100%,58vh,520px)] lg:w-auto lg:h-[var(--frame-in)] aspect-square lg:aspect-[4/5] nn-preserve">
              <img src={full(product.img)} alt={product.name} className="absolute inset-0 w-full h-full object-cover rounded-[999px_999px_32px_32px] border-[6px] border-nn-gold shadow-nn-hover" />
              <span className="absolute -inset-5 rounded-[999px_999px_42px_42px] border-2 border-dashed border-nn-gold/60 [transform:translateZ(-80px)]" aria-hidden="true" />
            </div>
          </div>
          <div>
            <nav aria-label="Breadcrumb" className="text-[13.5px] text-nn-gold-lt/80 mb-4"><a href="/" className="hover:text-nn-gold">Home</a> / <a href="/shop/" className="hover:text-nn-gold">Shop</a></nav>
            <h1 data-split className="nn-display text-[clamp(38px,4.6vw,72px)] text-nn-gold"><SplitName name={product.name} taClass="!font-tamil normal-case text-nn-gold-lt !text-[.45em] mt-2" /></h1>
            <p className="font-display text-[clamp(30px,2.6vw,42px)] text-nn-cream mt-4">{product.price} <span className="text-[18px] text-nn-gold-lt">{product.size}</span></p>
            <p className="text-[14px] text-nn-gold-lt/80 mt-1">Rated 0 out of 5 (0 customer reviews){d ? ` · ${d.stock} · SKU: ${d.sku}` : ""}</p>
            {d && <p className="nn-lead text-nn-cream/85 mt-4 max-w-xl">{d.desc}</p>}
            <div className="flex flex-wrap gap-2 mt-5">
              {["100% Natural (No Chemicals)", "Direct From Growers", "Quality Checked", "Cash on Delivery"].map((t) => <span key={t} className="px-3 py-1.5 rounded-full bg-nn-gold/15 text-nn-gold-lt text-[13px] font-semibold">{t}</span>)}
            </div>
            <ProductBuy item={{ ...product, img: full(product.img) }} />
            <p className="text-[14.5px] text-nn-cream/80 mt-5">Sold by <span className="text-nn-gold font-semibold">Naadu Nalam</span> · <a href="/store-listing/" className="underline underline-offset-2 hover:text-nn-gold">Visit Store</a></p>
          </div>
        </div>
      </section>

      <section className="nn-sec nn-long nn-cream-bg nn-botanic">
        <div className="nn-wrap grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start [perspective:1500px]" data-reveal="group">
          <div className="nn-tilt bg-nn-card rounded-[28px] p-[clamp(20px,2.2vw,30px)] shadow-nn">
            <h2 className="font-display text-[clamp(28px,2.4vw,38px)] text-nn-soil mb-3">Description</h2>
            {d ? (
              <div className="grid gap-3 text-[16px] leading-relaxed">
                <p className="font-tamil">{d.taDesc}</p>
                <h3 className="font-tamil font-bold text-nn-soil">சிறப்பம்சங்கள்</h3>
                <ul className="grid gap-1.5 font-tamil">{d.highlights.map((h) => <li key={h} className="flex gap-3"><span className="text-nn-soil">✦</span>{h}</li>)}</ul>
                <p className="font-tamil">{d.use}</p>
              </div>
            ) : (
              <p className="text-[16px] text-nn-muted">{product.name} — {product.size}.</p>
            )}
            <h2 className="font-display text-[clamp(24px,2vw,32px)] text-nn-soil mt-6 mb-2">Additional information</h2>
            <p className="text-[15.5px] text-nn-muted">Pack: {product.size}</p>
          </div>
          <div className="grid gap-4">
            <div className="nn-tilt bg-nn-soil text-nn-cream rounded-[28px] p-6 relative isolate overflow-hidden nn-botanic">
              <h3 className="font-display text-[26px] text-nn-gold mb-3">Delivery & Support</h3>
              <ul className="grid gap-2 text-[15px]">
                {["Flat ₹50 delivery across Chennai & Tamil Nadu", "Cash on delivery — pay when your order arrives", "Packed and dispatched from Tamil Nadu", "Questions? Call +91 90921 14630"].map((t) => <li key={t} className="flex gap-3"><span className="text-nn-gold">✦</span>{t}</li>)}
              </ul>
            </div>
            <div className="nn-tilt bg-nn-gold text-nn-soil-dk rounded-[28px] p-6">
              <ul className="grid grid-cols-2 gap-2 text-[15px] font-semibold">
                {["✓ Quality checked", "✓ Trusted vendors", "✓ Cash on delivery", "✓ No card details needed"].map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="nn-sec nn-frame nn-forest-bg nn-botanic nn-grain">
        <div className="nn-wrap flex flex-col gap-[clamp(18px,3vh,32px)]">
          <h2 data-split className="nn-display nn-h2-sm text-nn-gold">Why Choose Naadu Nalam?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-1 gap-4 nn-grow [perspective:1400px]" data-reveal="group">
            {[
              ["Farm Produce", "Products sourced from trusted growers."],
              ["No Harmful Chemicals", "Naturally sourced and carefully selected."],
              ["Supports Local Farmers", "We connect customers directly with growers."],
              ["Better Choice for Your Family", "Authentic and naturally sourced products."],
            ].map(([t, dd], i) => (
              <div key={t} className={`group nn-tilt rounded-[24px] p-3 flex flex-col ${i % 2 ? "bg-nn-gold text-nn-soil-dk" : "bg-nn-cream text-nn-ink"}`}>
                <div className="relative rounded-[999px_999px_16px_16px] overflow-hidden h-[140px] lg:h-auto lg:flex-1 lg:min-h-[100px]"><img src={["/images/el-earth.webp", "/images/el-water.webp", "/images/gen-3.webp", "/images/gen-1.webp"][i]} alt="" className="nn-tilt-img absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "50% 35%" }} /></div>
                <h3 className="font-display text-[clamp(22px,1.8vw,28px)] text-nn-soil leading-none mt-4 mb-2 px-3">{t}</h3>
                <p className="text-[15px] opacity-85 px-3 pb-3">{dd}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4 pt-2">
            <div>
              <h2 data-split className="nn-display text-[clamp(28px,3vw,46px)] text-nn-gold">Goodness in Every Meal</h2>
              <p className="nn-lead text-nn-cream/80 mt-2 max-w-2xl">Everyday South Indian staples, sourced from Tamil Nadu growers and delivered to your door — so you can cook the way your family always has.</p>
            </div>
            <a href="/shop/" className="nn-pill nn-pill-gold">Explore the Store <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="nn-sec nn-paper-bg nn-botanic">
        <div className="nn-wrap">
          <h2 data-split className="nn-display nn-h2-sm text-nn-soil mb-6">More Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-reveal="group">
            {related.map((p) => <ProductCard key={p.href} name={p.name} price={p.price} size={p.size} img={full(p.img)} href={p.href} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join("/");
  let content: React.ReactNode;

  if (slug.length === 2 && slug[0] === "product-category") content = <CategoryPage slug={slug[1]} />;
  else if (slug.length === 2 && slug[0] === "product") content = <ProductPage slug={slug[1]} />;
  else if (key === "my-account") content = <MyAccount />;
  else if (key === "vendor-login") content = <VendorLogin />;
  else if (key === "store-listing") content = <StoreListing />;
  else if (key === "contact-us") content = <Missing />;
  else if (key === "returns-refund") content = <DocPage doc={DOCS["refund-policy"]} />;
  else if (DOCS[key]) content = <DocPage doc={DOCS[key]} post={blogPosts.find((p) => p.slug === key)} />;
  else if (key === "terms-conditions") content = <Missing />;
  else notFound();

  return <Layout>{content}</Layout>;
}
