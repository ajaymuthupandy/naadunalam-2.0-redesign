"use client";

import React from "react";
import Layout from "@/components/Layout";
import { Arrow, SplitName } from "@/components/ui";
import { removeFromCart, setQty, useCart, DELIVERY_FEE } from "@/lib/cart";
import { inr } from "@/lib/data";

export default function CartPage() {
  const { items, ready, count, subtotal, delivery, total } = useCart();

  return (
    <Layout>
      <main>
        <section className="nn-sec nn-first nn-frame nn-frame-min nn-cream-bg">
          <h1 className="sr-only">Your cart</h1>
          <div className="nn-wrap w-full">
            {!ready ? (
              <div className="min-h-[320px]" aria-busy="true" />
            ) : items.length === 0 ? (
              <div className="max-w-xl mx-auto text-center bg-nn-card rounded-[30px] shadow-nn p-[clamp(28px,4vw,48px)]">
                <span className="w-16 h-16 mx-auto mb-5 rounded-full bg-nn-paper text-nn-soil flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9h18l-2 11H5zM8 9l4-6 4 6" /></svg>
                </span>
                <h2 className="nn-display text-[clamp(30px,3vw,44px)] text-nn-soil">Your cart is empty</h2>
                <p className="text-[16px] text-nn-muted mt-3 mb-7">Native rice, cold-pressed oils, millets and more are waiting in the shop.</p>
                <a href="/shop/" className="nn-pill nn-pill-soil">Start Shopping <Arrow /></a>
              </div>
            ) : (
              <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-6 items-stretch">
                <div className="bg-nn-card rounded-[28px] shadow-nn overflow-hidden flex flex-col min-h-0">
                  <div className="hidden md:grid grid-cols-[minmax(0,1fr)_120px_140px_110px] gap-4 px-6 py-4 bg-nn-paper nn-eyebrow !text-[12px] text-nn-soil">
                    <span>Product</span><span>Price</span><span>Quantity</span><span className="text-right">Subtotal</span>
                  </div>
                  <ul className="divide-y divide-nn-line lg:max-h-[calc(var(--frame-in)-116px)] lg:overflow-y-auto">
                    {items.map((it) => (
                      <li key={it.href} className="grid grid-cols-[72px_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_120px_140px_110px] gap-x-4 gap-y-3 items-center px-4 md:px-6 py-4">
                        <div className="flex items-center gap-4 min-w-0 col-span-2 md:col-span-1">
                          <a href={it.href} className="w-[72px] h-[72px] shrink-0 rounded-2xl overflow-hidden bg-nn-paper">
                            <img src={it.img} alt="" className="w-full h-full object-cover" />
                          </a>
                          <div className="min-w-0">
                            <a href={it.href} className="block text-[15.5px] font-semibold text-nn-ink leading-snug hover:text-nn-soil"><SplitName name={it.name} taClass="font-normal text-nn-muted" /></a>
                            <p className="text-[13px] text-nn-muted mt-1">{it.size} <span className="md:hidden">· {inr(it.price)}</span></p>
                            <button type="button" onClick={() => removeFromCart(it.href)} className="text-[13px] font-semibold text-nn-soil underline underline-offset-2 hover:text-nn-soil-dk mt-1">Remove</button>
                          </div>
                        </div>
                        <p className="hidden md:block text-[15px] text-nn-ink">{inr(it.price)}</p>
                        <div className="flex items-center justify-between md:justify-start gap-3 col-span-2 md:col-span-1">
                          <div className="flex items-center bg-nn-paper rounded-full h-10 px-1 text-nn-soil" role="group" aria-label={`Quantity of ${it.name.split("(")[0].trim()}`}>
                            <button type="button" className="w-8 h-8 rounded-full hover:bg-nn-cream text-[18px]" aria-label="Decrease quantity" onClick={() => setQty(it.href, it.qty - 1)}>−</button>
                            <span className="w-8 text-center font-bold text-[15px]">{it.qty}</span>
                            <button type="button" className="w-8 h-8 rounded-full hover:bg-nn-cream text-[18px]" aria-label="Increase quantity" onClick={() => setQty(it.href, it.qty + 1)}>+</button>
                          </div>
                          <p className="md:hidden text-[16px] font-bold text-nn-soil">{inr(it.price * it.qty)}</p>
                        </div>
                        <p className="hidden md:block text-right text-[16px] font-bold text-nn-soil">{inr(it.price * it.qty)}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="px-6 py-4 border-t border-nn-line mt-auto">
                    <a href="/shop/" className="text-[14px] font-bold uppercase tracking-wide text-nn-soil hover:underline underline-offset-4">← Continue shopping</a>
                  </div>
                </div>

                <aside className="bg-nn-soil text-nn-cream rounded-[28px] p-6 flex flex-col">
                  <h2 className="font-display text-[30px] text-nn-gold leading-none mb-5">Cart Totals</h2>
                  <dl className="grid gap-3 text-[15.5px] lg:mb-6">
                    <div className="flex justify-between"><dt className="text-nn-cream/80">Subtotal ({count} item{count === 1 ? "" : "s"})</dt><dd>{inr(subtotal)}</dd></div>
                    <div className="flex justify-between"><dt className="text-nn-cream/80">Delivery <span className="text-[13px]">(flat, Tamil Nadu)</span></dt><dd>{inr(delivery)}</dd></div>
                    <div className="flex justify-between pt-3 mt-1 border-t border-nn-cream/20 text-[19px] font-bold"><dt>Total</dt><dd className="text-nn-gold">{inr(total)}</dd></div>
                  </dl>
                  <a href="/checkout/" className="nn-pill nn-pill-gold w-full mt-6 lg:mt-auto">Proceed to Checkout <Arrow /></a>
                  <p className="text-[13px] text-nn-cream/70 mt-4 text-center">Cash on delivery · Flat {inr(DELIVERY_FEE)} delivery across Tamil Nadu</p>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
