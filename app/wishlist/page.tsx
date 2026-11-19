"use client";

import React from "react";
import Layout from "@/components/Layout";
import { Arrow, ProductCard, SplitName, full } from "@/components/ui";
import { AddToCartButton } from "@/components/Cart";
import { addToCart } from "@/lib/cart";
import { removeFromWishlist, useWishlist } from "@/lib/wishlist";
import { wishlistSuggestions } from "@/lib/data";

const perks = [
  { t: "Sourced Close to Home", d: "Fewer hands between farm and kitchen" },
  { t: "Flat ₹50 Delivery", d: "Chennai & Tamil Nadu, per order" },
  { t: "Every Seller Has a Storefront", d: "Every vendor has their own store page" },
  { t: "Clear, Upfront Pricing", d: "Cash on Delivery — pay when your order arrives" },
];

export default function Wishlist() {
  const { items, ready, count } = useWishlist();
  return (
    <Layout>
      <main>
        <section className="nn-sec nn-frame nn-frame-min nn-first nn-cream-bg nn-botanic">
          <h1 className="sr-only">My Wishlist</h1>
          <div className="nn-wrap w-full grid lg:grid-cols-[1fr_1.3fr] gap-6 items-stretch lg:min-h-[var(--frame-in)] [perspective:1500px]" data-reveal="group">
            <div className="bg-nn-soil text-nn-cream rounded-[30px] p-[clamp(20px,2.2vw,30px)] relative isolate overflow-hidden nn-botanic flex flex-col justify-center">
              <span aria-hidden="true" className="absolute top-5 right-5 w-14 h-14 rounded-full bg-nn-gold text-nn-soil-dk flex items-center justify-center">
                <svg className="w-7 h-7" fill={count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </span>
              <h2 className="nn-display nn-h2-sm text-nn-gold pr-16">{count ? "Your wishlist" : "Your wishlist is empty"}</h2>
              <p className="nn-lead text-nn-cream/80 mt-4 mb-7 max-w-md">
                {count
                  ? `${count} saved product${count === 1 ? "" : "s"}. Add them to your cart when you are ready, or keep browsing for more.`
                  : "Tap the heart on any product to save it here — it will be waiting whenever you come back."}
              </p>
              <a href="/shop/" className="nn-pill nn-pill-gold self-start">{count ? "Keep shopping" : "Start shopping"} <Arrow /></a>
            </div>
            <div className="bg-nn-card rounded-[30px] shadow-nn overflow-hidden flex flex-col min-h-0">
              <div className="hidden sm:grid grid-cols-[minmax(0,2fr)_1fr_1fr_120px] gap-3 px-6 py-4 bg-nn-paper nn-eyebrow text-nn-soil !text-[12px]">
                <span>Products</span><span>Price</span><span>Availability</span><span className="text-right">Add To Cart</span>
              </div>
              {count ? (
                <ul className="flex-1 divide-y divide-nn-line lg:max-h-[calc(var(--frame-in)-132px)] lg:overflow-y-auto">
                  {items.map((it) => (
                    <li key={it.href} className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,2fr)_1fr_1fr_120px] gap-3 items-center px-4 sm:px-6 py-3.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <a href={it.href} className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-nn-paper">
                          <img src={it.img} alt="" className="w-full h-full object-cover" />
                        </a>
                        <div className="min-w-0">
                          <a href={it.href} className="block text-[14.5px] font-semibold text-nn-ink leading-snug hover:text-nn-soil"><SplitName name={it.name} taClass="font-normal text-nn-muted truncate" /></a>
                          <p className="text-[12.5px] text-nn-muted mt-0.5">{it.size}<span className="sm:hidden"> · {it.price}</span></p>
                          <button type="button" onClick={() => removeFromWishlist(it.href)} className="text-[12.5px] font-semibold text-nn-soil underline underline-offset-2 hover:text-nn-soil-dk">Remove</button>
                        </div>
                      </div>
                      <p className="hidden sm:block text-[15px] font-bold text-nn-soil">{it.price}</p>
                      <p className="hidden sm:flex items-center gap-1.5 text-[13.5px] text-nn-leaf font-semibold"><span className="w-2 h-2 rounded-full bg-nn-leaf" aria-hidden="true" />In stock</p>
                      <div className="flex justify-end"><AddToCartButton item={it} /></div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="flex-1 flex items-center justify-center text-center text-nn-muted text-[16px] px-6 py-12">{ready ? "No products saved yet." : ""}</p>
              )}
              <div className="px-6 py-4 border-t border-nn-line flex items-center justify-between gap-3 mt-auto">
                <a href="/shop/" className="text-[14px] font-bold uppercase tracking-wide text-nn-soil hover:underline underline-offset-4">← Shop</a>
                <button type="button" disabled={!count} onClick={() => items.forEach((it) => addToCart(it))} className="nn-pill nn-pill-soil disabled:opacity-40 disabled:pointer-events-none">Add all to cart</button>
              </div>
            </div>
          </div>
        </section>

        <section className="nn-sec nn-frame nn-paper-bg nn-botanic">
          <div className="nn-wrap flex flex-col justify-between gap-[clamp(18px,3vh,32px)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 data-split className="nn-display nn-h2-sm text-nn-soil">You may also like</h2>
                <p className="nn-lead text-nn-muted mt-3">Explore more healthy choices</p>
              </div>
              <a href="/shop/" className="nn-pill nn-pill-soil">View all <Arrow /></a>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-reveal="group">
              {wishlistSuggestions.map((p) => (
                <div key={p.href} className="max-w-[min(100%,36vh)] w-full mx-auto lg:mx-0">
                  <ProductCard name={p.name} price={p.price} size={p.size} img={full(p.img)} href={p.href} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" data-reveal="group">
              {perks.map((p) => (
                <div key={p.t} className="flex items-center gap-3 bg-nn-card rounded-[20px] px-4 py-3">
                  <span className="w-10 h-10 rounded-full bg-nn-soil text-nn-gold flex items-center justify-center shrink-0">✦</span>
                  <span>
                    <span className="block font-display text-[18px] text-nn-soil leading-none mb-1">{p.t}</span>
                    <span className="block text-[13.5px] text-nn-muted">{p.d}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
