"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Arrow } from "@/components/ui";
import { placeOrder, useCart, type Order } from "@/lib/cart";
import { inr } from "@/lib/data";

type Field = { name: string; label: string; type?: string; auto?: string; span: string; required?: boolean; pattern?: string; hint?: string };

const FIELDS: Field[] = [
  { name: "firstName", label: "First name", auto: "given-name", span: "sm:col-span-3", required: true },
  { name: "lastName", label: "Last name", auto: "family-name", span: "sm:col-span-3", required: true },
  { name: "phone", label: "Phone", type: "tel", auto: "tel", span: "sm:col-span-3", required: true, pattern: "^[+]?[0-9 ]{10,14}$", hint: "10-digit mobile number" },
  { name: "email", label: "Email address", type: "email", auto: "email", span: "sm:col-span-3", required: true },
  { name: "address", label: "Street address", auto: "street-address", span: "sm:col-span-6", required: true },
  { name: "city", label: "Town / City", auto: "address-level2", span: "sm:col-span-2", required: true },
  { name: "pincode", label: "PIN code", auto: "postal-code", span: "sm:col-span-2", required: true, pattern: "^[0-9]{6}$", hint: "6 digits" },
];

export default function CheckoutPage() {
  const { items, ready, count, subtotal, delivery, total } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    FIELDS.forEach((f) => {
      const v = (data[f.name] || "").trim();
      if (f.required && !v) errs[f.name] = `Enter your ${f.label.toLowerCase()}`;
      else if (v && f.pattern && !new RegExp(f.pattern).test(v)) errs[f.name] = `Enter a valid ${f.label.toLowerCase()} (${f.hint})`;
      else if (v && f.type === "email" && !/^\S+@\S+\.\S+$/.test(v)) errs[f.name] = "Enter a valid email address";
    });
    if (!data.terms) errs.terms = "Please accept the terms to place your order";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setOrder(placeOrder({ ...data, state: "Tamil Nadu", payment: "Cash on delivery" }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <main>
        <section className="nn-sec nn-first nn-frame nn-frame-min nn-cream-bg">
          <h1 className="sr-only">{order ? "Order received" : "Checkout"}</h1>
          <div className="nn-wrap w-full">
            {order ? (
              <OrderDone order={order} />
            ) : !ready ? (
              <div className="min-h-[320px]" aria-busy="true" />
            ) : items.length === 0 ? (
              <div className="max-w-xl mx-auto text-center bg-nn-card rounded-[30px] shadow-nn p-[clamp(28px,4vw,48px)]">
                <h2 className="nn-display text-[clamp(30px,3vw,44px)] text-nn-soil">Nothing to check out yet</h2>
                <p className="text-[16px] text-nn-muted mt-3 mb-7">Your cart is empty. Add a few products and come back here to place your order.</p>
                <a href="/shop/" className="nn-pill nn-pill-soil">Go to the Shop <Arrow /></a>
              </div>
            ) : (
              <form noValidate onSubmit={submit} className="grid lg:grid-cols-[minmax(0,1fr)_400px] gap-6 items-stretch">
                <div className="bg-nn-card rounded-[28px] shadow-nn p-[clamp(18px,1.8vw,26px)] flex flex-col">
                  <h2 className="font-display text-[clamp(24px,2vw,30px)] text-nn-soil leading-none mb-1">Delivery details</h2>
                  <p className="text-[14px] text-nn-muted mb-4">We deliver across Tamil Nadu. Fields marked * are required.</p>
                  <div className="grid sm:grid-cols-6 gap-x-4 gap-y-3 flex-1 content-start sm:grid-rows-[auto_auto_auto_auto_1fr]">
                    {FIELDS.map((f) => (
                      <label key={f.name} className={`grid gap-1 text-[14px] font-semibold text-nn-ink ${f.span}`}>
                        <span>{f.label}{f.required && <span className="text-nn-soil"> *</span>}</span>
                        <input
                          name={f.name}
                          type={f.type || "text"}
                          autoComplete={f.auto}
                          inputMode={f.name === "pincode" ? "numeric" : undefined}
                          aria-invalid={!!errors[f.name]}
                          className={`nn-input min-h-[44px] ${errors[f.name] ? "!border-[#B3261E]" : ""}`}
                        />
                        {errors[f.name] && <span className="text-[13px] font-medium text-[#B3261E]">{errors[f.name]}</span>}
                      </label>
                    ))}
                    <label className="grid gap-1 text-[14px] font-semibold text-nn-ink sm:col-span-2">
                      State
                      <input className="nn-input min-h-[44px] !bg-nn-paper" value="Tamil Nadu" readOnly aria-readonly="true" />
                    </label>
                    <label className="grid grid-rows-[auto_1fr] gap-1 text-[14px] font-semibold text-nn-ink sm:col-span-6">
                      <span>Order notes <span className="font-normal text-nn-muted">(optional)</span></span>
                      <textarea name="notes" rows={2} className="nn-input h-full !min-h-[64px] !py-2.5 !resize-none" placeholder="Landmark, delivery time, anything we should know" />
                    </label>
                  </div>
                </div>

                <aside className="bg-nn-soil text-nn-cream rounded-[28px] p-[clamp(18px,1.6vw,24px)]">
                  <h2 className="font-display text-[clamp(24px,2vw,28px)] text-nn-gold leading-none mb-4">Your Order</h2>
                  <ul className="grid gap-2 mb-3 max-h-[clamp(120px,21vh,228px)] overflow-y-auto pt-2 pr-2 -mt-2">
                    {items.map((it) => (
                      <li key={it.href} className="flex items-center gap-3">
                        <span className="relative shrink-0">
                          <img src={it.img} alt="" className="w-11 h-11 rounded-xl object-cover" />
                          <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-nn-gold text-nn-soil-dk text-[11px] font-bold flex items-center justify-center">{it.qty}</span>
                        </span>
                        <span className="flex-1 min-w-0 text-[14px] leading-snug">{it.name.split("(")[0].trim()}<span className="block text-[12.5px] text-nn-cream/65">{it.size}</span></span>
                        <span className="text-[14.5px] font-semibold">{inr(it.price * it.qty)}</span>
                      </li>
                    ))}
                  </ul>
                  <dl className="grid gap-2 text-[14.5px] pt-3 border-t border-nn-cream/20">
                    <div className="flex justify-between"><dt className="text-nn-cream/80">Subtotal ({count} item{count === 1 ? "" : "s"})</dt><dd>{inr(subtotal)}</dd></div>
                    <div className="flex justify-between"><dt className="text-nn-cream/80">Delivery</dt><dd>{inr(delivery)}</dd></div>
                    <div className="flex justify-between pt-2.5 mt-0.5 border-t border-nn-cream/20 text-[18px] font-bold"><dt>Total</dt><dd className="text-nn-gold">{inr(total)}</dd></div>
                  </dl>

                  <p className="mt-4 rounded-2xl bg-nn-cream/[.08] border border-nn-gold/40 px-4 py-2.5 flex items-center gap-2 text-[14.5px]">
                    <span className="w-4 h-4 rounded-full border-[5px] border-nn-gold bg-nn-soil shrink-0" aria-hidden="true" />
                    <span><strong className="font-semibold">Cash on delivery</strong> <span className="text-[13px] text-nn-cream/70">· pay when it arrives</span></span>
                  </p>

                  <label className="flex items-start gap-2.5 text-[13.5px] text-nn-cream/85 mt-3">
                    <input type="checkbox" name="terms" className="w-4 h-4 mt-0.5 accent-[#F5B335] shrink-0" />
                    <span>I have read and agree to the <a href="/terms-conditions/" className="underline underline-offset-2 hover:text-nn-gold">terms</a> and <a href="/privacy-policy/" className="underline underline-offset-2 hover:text-nn-gold">privacy policy</a>.</span>
                  </label>
                  {errors.terms && <p className="text-[13px] font-medium text-nn-gold-lt mt-2">{errors.terms}</p>}

                  <button type="submit" className="nn-pill nn-pill-gold w-full mt-4">Place Order · {inr(total)}</button>
                  <a href="/cart/" className="block text-center text-[13.5px] text-nn-cream/75 hover:text-nn-gold mt-2.5">← Back to cart</a>
                </aside>
              </form>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}

function OrderDone({ order }: { order: Order }) {
  const c = order.customer;
  return (
    <div className="max-w-3xl mx-auto grid gap-6">
      <div className="bg-nn-leaf text-nn-cream rounded-[28px] p-[clamp(22px,3vw,36px)] flex flex-col sm:flex-row sm:items-center gap-5">
        <span className="w-14 h-14 rounded-full bg-nn-gold text-nn-soil-dk flex items-center justify-center shrink-0">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.6" viewBox="0 0 24 24"><path d="m5 12 5 5L20 7" /></svg>
        </span>
        <div>
          <h2 className="nn-display text-[clamp(28px,3vw,42px)] text-nn-gold">Thank you, {c.firstName}!</h2>
          <p className="text-[15.5px] text-nn-cream/85 mt-2">Your order has been received. We will call you on {c.phone} to confirm delivery.</p>
        </div>
      </div>

      <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[["Order number", order.id], ["Date", order.date], ["Total", inr(order.total)], ["Payment", "Cash on delivery"]].map(([k, v]) => (
          <div key={k} className="bg-nn-card rounded-2xl shadow-nn p-4">
            <dt className="nn-eyebrow !text-[11px] text-nn-muted">{k}</dt>
            <dd className="text-[16px] font-bold text-nn-soil mt-1">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="bg-nn-card rounded-[28px] shadow-nn p-[clamp(20px,2.4vw,30px)]">
        <h3 className="font-display text-[26px] text-nn-soil leading-none mb-4">Order details</h3>
        <ul className="divide-y divide-nn-line">
          {order.items.map((it) => (
            <li key={it.href} className="flex items-center gap-3 py-3">
              <img src={it.img} alt="" className="w-12 h-12 rounded-xl object-cover" />
              <span className="flex-1 min-w-0 text-[15px]">{it.name.split("(")[0].trim()} <span className="text-nn-muted">× {it.qty}</span></span>
              <span className="font-semibold text-nn-soil">{inr(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="grid gap-2 text-[15px] pt-4 mt-1 border-t border-nn-line">
          <div className="flex justify-between"><dt className="text-nn-muted">Subtotal</dt><dd>{inr(order.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-nn-muted">Delivery</dt><dd>{inr(order.delivery)}</dd></div>
          <div className="flex justify-between text-[18px] font-bold text-nn-soil"><dt>Total</dt><dd>{inr(order.total)}</dd></div>
        </dl>
        <p className="text-[14.5px] text-nn-muted mt-5">Delivering to: {c.firstName} {c.lastName}, {c.address}, {c.city} {c.pincode}, Tamil Nadu</p>
      </div>

      <a href="/shop/" className="nn-pill nn-pill-soil justify-self-center">Continue Shopping <Arrow /></a>
    </div>
  );
}
