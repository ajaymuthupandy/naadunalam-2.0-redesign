"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ClosingSection from "./ClosingSection";
import Motion from "./Motion";
import { CartButton, CartToast } from "./Cart";

export const topCats = [
  { name: "Traditional Rice (பாரம்பரிய அரிசி வகைகள்)", href: "/product-category/rice-grains/" },
  { name: "Aval / Flakes (அவல் வகைகள்)", href: "/product-category/aval-flakes/" },
  { name: "Millets (சிறுதானியங்கள்)", href: "/product-category/siruthaniyam/" },
  { name: "Natural Sweeteners (இயற்கை இனிப்புகள்)", href: "/product-category/natural-sweeteners/" },
  { name: "Ghee & Oil (நெய் & எண்ணெய் வகைகள்)", href: "/product-category/oil-vinegers/" },
  { name: "Health Mixes (ஆரோக்கிய மாவுகள்)", href: "/product-category/health-mixes/" },
  { name: "Personal Care (உடல் பராமரிப்பு)", href: "/product-category/personal-care/" },
];

type NavItem = { name: string; href: string; children?: NavItem[] };

const others: NavItem = {
  name: "Others",
  href: "#",
  children: [
    {
      name: "Collaborators",
      href: "/collaborators/",
      children: [
        { name: "TST Music & Dance Academy", href: "/collaborators/" },
        { name: "TST Event Mgt", href: "/collaborators/" },
        { name: "Ignite Our Tharas Kids Kondaatam", href: "/collaborators/" },
        { name: "Queen Bee’s Math Tutoring", href: "/collaborators/" },
        { name: "Bharathanaatiyam", href: "/collaborators/" },
      ],
    },
    { name: "Events", href: "/events/" },
    { name: "Calendar", href: "/calendar/" },
    { name: "Research Articles", href: "/research-articles/" },
    { name: "Blog", href: "/blog/" },
  ],
};
const navLeft: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop/" },
  { name: "About Us", href: "/about-us/" },
];
const navRight: NavItem[] = [
  { name: "Contact Us", href: "/contact/" },
  { name: "Wishlist", href: "/wishlist/" },
  others,
];
const allNav = [...navLeft, ...navRight];

const quickLinks: [string, string][] = [["About Us", "/about-us/"], ["Shop", "/shop/"], ["Cart", "/cart/"], ["Contact Us", "/contact/"], ["Wishlist", "/wishlist/"], ["Vendor Login", "/vendor-login/"]];
const supportLinks: [string, string][] = [["Shipping Policy", "/shipping-policy/"], ["Returns & Refund", "/refund-policy/"], ["Terms & Conditions", "/terms-conditions/"], ["Privacy Policy", "/privacy-policy/"], ["Store Listing", "/store-listing/"]];

const socialPaths: Record<string, string> = {
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  twitter: "M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.18 13.18 0 0 0 .497-3.753c-.002-.249 1.51-2.772 1.818-4.011z",
  instagram: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7.5 3h9a4.5 4.5 0 0 1 4.5 4.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3z",
  linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
};

function IconSocial({ name, size = "w-8 h-8" }: { name: string; size?: string }) {
  const filled = name !== "instagram";
  return (
    <a href="#" aria-label={name} className={`${size} rounded-full bg-nn-gold/15 text-nn-gold flex items-center justify-center hover:bg-nn-gold hover:text-nn-soil-dk transition-colors`}>
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth="2"><path d={socialPaths[name]} /></svg>
    </a>
  );
}

function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <a href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0" aria-label="Naadu Nalam home">
      <img src="/naadu-nalam-logo-header.svg" alt="Naadu Nalam" className="h-10 w-10 sm:h-11 sm:w-11 lg:h-[52px] lg:w-[52px] shrink-0" />
      <span className={`leading-none ${dark ? "text-nn-soil" : "text-nn-gold"}`}>
        <span className="block font-display text-[19px] sm:text-[22px] lg:text-[26px] !leading-[.85] whitespace-nowrap">Naadu Nalam</span>
        <span className={`block font-tamil text-[12px] sm:text-[12.5px] mt-1 whitespace-nowrap ${dark ? "text-nn-green" : "text-nn-gold-lt"}`}>நாடு நலம்</span>
      </span>
    </a>
  );
}

function NavPill({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <div className="relative group">
      <a
        href={item.href}
        className={`nn-pill !min-h-[42px] !px-4 !text-[16px] !tracking-[.02em] !shadow-none hover:!translate-y-0 transition-colors ${active ? "bg-nn-soil text-nn-cream" : "text-nn-soil-dk hover:bg-nn-soil/10"}`}
      >
        {item.name}
        {item.children && <svg className="w-4 h-4 -mr-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>}
      </a>
      {item.children && (
        <div className="absolute top-full right-0 pt-3 invisible opacity-0 [transform:perspective(800px)_rotateX(-14deg)] origin-top group-hover:visible group-hover:opacity-100 group-hover:[transform:perspective(800px)_rotateX(0deg)] group-focus-within:visible group-focus-within:opacity-100 group-focus-within:[transform:none] transition-all duration-300 z-50">
          <div className="bg-nn-cream rounded-[22px] shadow-nn-hover min-w-[250px] p-2">
            {item.children.map((child) => (
              <div key={child.name} className="relative group/sub">
                <a href={child.href} className="flex items-center justify-between px-4 py-2.5 rounded-2xl text-[16px] font-medium text-nn-ink hover:bg-nn-gold hover:text-nn-soil-dk">
                  {child.name}
                  {child.children && <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6" /></svg>}
                </a>
                {child.children && (
                  <div className="absolute top-0 right-full pr-2 invisible opacity-0 group-hover/sub:visible group-hover/sub:opacity-100 transition-opacity duration-200">
                    <div className="bg-nn-cream rounded-[22px] shadow-nn-hover min-w-[290px] p-2">
                      {child.children.map((g) => (
                        <a key={g.name} href={g.href} className="block px-4 py-2.5 rounded-2xl text-[15px] text-nn-ink hover:bg-nn-gold hover:text-nn-soil-dk">{g.name}</a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : href !== "#" && pathname.startsWith(href.replace(/\/$/, ""));
  const othersActive = others.children!.some((c) => isActive(c.href));

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const write = () => {
      if (headerRef.current) root.style.setProperty("--header-offset", `${headerRef.current.offsetHeight}px`);
      if (footerRef.current) root.style.setProperty("--footer-h", `${footerRef.current.offsetHeight}px`);
    };
    write();
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(write);
    });
    if (headerRef.current) ro.observe(headerRef.current);
    if (footerRef.current) ro.observe(footerRef.current);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <div className="min-h-screen">
      <Motion />
      <CartToast />

      {/* Top strip */}
      <div className="bg-nn-green text-nn-cream/85 text-[13px]">
        <div className="nn-wrap h-[38px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <svg className="w-4 h-4 text-nn-gold shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" /></svg>
            <span className="hidden sm:inline">Welcome to Naadu Nalam Store</span>
            <span className="hidden sm:inline opacity-50">·</span>
            <a href="tel:+919092114630" className="font-medium hover:text-nn-gold truncate">Call us: +91 9092114630</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>Flat ₹50 delivery · Across Tamil Nadu</span>
            <span className="w-px h-4 bg-nn-gold/25" />
            <span className="opacity-80">Follow us:</span>
            <div className="flex items-center gap-1.5">
              {["facebook", "twitter", "instagram", "linkedin"].map((s) => <IconSocial key={s} name={s} size="w-7 h-7" />)}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky header (reference: gold pills, logo centred) */}
      <header ref={headerRef} className="sticky top-0 z-50 bg-nn-paper border-b border-nn-soil/10 isolate">
        <div className="nn-wrap h-[72px] xl:h-[80px] flex items-center gap-3">
          <div className="min-w-0"><Logo tone="dark" /></div>

          <nav className="hidden xl:flex items-center gap-1 ml-10 2xl:ml-16" aria-label="Main">
            {allNav.map((it) => <NavPill key={it.name} item={it} active={it === others ? othersActive : isActive(it.href)} />)}
          </nav>

          <div className="ml-auto flex items-center justify-end gap-1.5">
            <button onClick={() => setSearchOpen((v) => !v)} aria-label="Search products" aria-expanded={searchOpen} className="nn-icon-btn">
              <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </button>
            <CartButton />
            <a href="/my-account/" aria-label="Account" className="hidden sm:inline-flex nn-icon-btn">
              <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </a>
            <button className="xl:hidden nn-icon-btn" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16" /></svg>
            </button>
          </div>
        </div>
        <div className={`absolute left-0 right-0 top-full bg-nn-paper border-b border-nn-soil/10 transition-all duration-300 origin-top ${searchOpen ? "visible opacity-100 [transform:none]" : "invisible opacity-0 [transform:perspective(900px)_rotateX(-12deg)] pointer-events-none"}`}>
          <div className="nn-wrap py-4">
            <form className="flex items-center bg-nn-card border border-nn-line rounded-full h-14 pl-5 pr-1.5" onSubmit={(e) => e.preventDefault()}>
              <select aria-label="Category" className="hidden sm:block bg-transparent text-nn-soil text-[15px] font-semibold outline-none border-r border-nn-line pr-3 mr-3 cursor-pointer max-w-[200px]">
                <option>All Categories</option>
                {topCats.map((c) => <option key={c.name}>{c.name.split("(")[0].trim()}</option>)}
              </select>
              <input type="text" placeholder="Search products..." aria-label="Search products" className="flex-1 min-w-0 bg-transparent text-nn-ink text-[16px] outline-none" />
              <button type="submit" aria-label="Search" className="nn-round !w-11 !h-11 !bg-nn-soil !text-nn-gold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <div className={`xl:hidden fixed inset-0 z-[60] bg-nn-soil nn-botanic isolate overflow-y-auto ${mobileOpen ? "block animate-[nnFade_.35s_ease-out]" : "hidden"}`}>
        <div className="nn-wrap h-[72px] flex items-center justify-between">
          <Logo />
          <button aria-label="Close menu" className="nn-round !w-11 !h-11" onClick={() => setMobileOpen(false)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="nn-wrap py-6 grid gap-1">
          {allNav.map((item, i) => (
            <div key={item.name} style={{ animationDelay: `${80 + i * 55}ms` }} className="animate-[nnFlip_.6s_cubic-bezier(.2,.7,.2,1)_both]">
              <a href={item.href} onClick={() => setMobileOpen(false)} className="block font-display text-[44px] text-nn-gold py-1">{item.name}</a>
              {item.children && (
                <div className="pl-1 pb-3 grid gap-1">
                  {item.children.map((c) => (
                    <div key={c.name}>
                      <a href={c.href} onClick={() => setMobileOpen(false)} className="block text-[18px] text-nn-cream py-1">{c.name}</a>
                      {c.children && (
                        <div className="pl-4 grid">
                          {c.children.map((g) => <a key={g.name} href={g.href} onClick={() => setMobileOpen(false)} className="text-[15px] text-nn-gold-lt/80 py-1">{g.name}</a>)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="nn-wrap pb-10">
          <p className="nn-eyebrow text-nn-gold mb-3">Popular Categories</p>
          {topCats.map((c) => <a key={c.name} href={c.href} onClick={() => setMobileOpen(false)} className="block py-2 text-[16px] text-nn-cream border-b border-nn-gold/15">{c.name}</a>)}
        </div>
      </div>

      {children}

      <footer className="bg-nn-soil-dk text-nn-cream">
        <ClosingSection />
        <div ref={footerRef} className="relative isolate overflow-clip nn-botanic">
          <div className="nn-wrap pt-6 pb-4">
            <div className="grid grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.5fr] gap-x-10 gap-y-5 pb-4">
              <div className="col-span-2 sm:col-span-1">
                <Logo />
                <p className="text-[15px] text-nn-cream/70 mt-3 mb-3">Good Food, Brighter Tomorrow</p>
                <div className="flex gap-2">
                  {["facebook", "twitter", "instagram", "linkedin"].map((s) => <IconSocial key={s} name={s} size="w-9 h-9" />)}
                </div>
              </div>
              <div>
                <h4 className="font-display text-[22px] text-nn-gold mb-2">Quick Links</h4>
                <ul className="space-y-1 text-[16px] text-nn-cream/85">
                  {quickLinks.map(([l, h]) => <li key={l}><a href={h} className="hover:text-nn-gold transition-colors">{l}</a></li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-display text-[22px] text-nn-gold mb-2">Customer Support</h4>
                <ul className="space-y-1 text-[16px] text-nn-cream/85">
                  {supportLinks.map(([l, h]) => <li key={l}><a href={h} className="hover:text-nn-gold transition-colors">{l}</a></li>)}
                </ul>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <h4 className="font-display text-[22px] text-nn-gold mb-2">Newsletter</h4>
                <p className="text-[15px] text-nn-cream/70 mb-3">Get updates, offers and stories from our farmers.</p>
                <form className="flex items-center gap-2 bg-nn-cream/[.08] border border-nn-gold/25 rounded-full p-1.5 pl-5" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" aria-label="Email address" placeholder="Your email" className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-nn-cream/45" />
                  <button type="submit" className="nn-pill nn-pill-gold !min-h-[42px] !px-5 !shadow-none">Subscribe</button>
                </form>
              </div>
            </div>
            <div className="pt-3 flex flex-col md:flex-row justify-between items-center gap-2 text-[13px] text-nn-cream/60">
              <p>© 2026 Naadu Nalam. All rights reserved.</p>
              <div className="flex gap-2 items-center">
                {["Good Food", "Healthy People", "Sustainable Tomorrow"].map((t, i) => (
                  <React.Fragment key={t}>
                    {i > 0 && <span className="text-nn-gold/50">✦</span>}
                    <span className="text-nn-gold">{t}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
