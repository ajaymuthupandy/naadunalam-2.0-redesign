"use client";

import React, { useEffect, useState } from "react";
import { addToCart, useCart } from "@/lib/cart";
import { toggleWishlist, useWishlist } from "@/lib/wishlist";
import { inr, type Product } from "@/lib/data";

type Item = Pick<Product, "href" | "name" | "price" | "size" | "img">;

const Arrow = ({ className = "w-4 h-4" }: { className?: string }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>;
const PlusIcon = () => <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>;
const CheckIcon = ({ className = "w-[18px] h-[18px]" }: { className?: string }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.6" viewBox="0 0 24 24"><path d="m5 12 5 5L20 7" /></svg>;

function useFlash(): [boolean, () => void] {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!on) return;
    const t = setTimeout(() => setOn(false), 1400);
    return () => clearTimeout(t);
  }, [on]);
  return [on, () => setOn(true)];
}

/** Round "+" button on product cards */
export function AddToCartButton({ item }: { item: Item }) {
  const [added, flash] = useFlash();
  return (
    <button
      type="button"
      onClick={() => {
        addToCart(item);
        flash();
      }}
      aria-label={`Add ${item.name.split("(")[0].trim()} to cart`}
      className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-colors ${added ? "bg-nn-leaf text-nn-cream" : "bg-nn-soil text-nn-gold hover:bg-nn-gold hover:text-nn-soil-dk"}`}
    >
      {added ? <CheckIcon /> : <PlusIcon />}
    </button>
  );
}

const HEART = "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z";

/** Heart toggle: saves / removes the product from the wishlist */
export function WishlistButton({ item, className = "", size = "sm" }: { item: Item; className?: string; size?: "sm" | "lg" }) {
  const { has, ready } = useWishlist();
  const saved = ready && has(item.href);
  const name = item.name.split("(")[0].trim();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(item);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      title={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={`${size === "lg" ? "w-12 h-12" : "w-9 h-9"} rounded-full flex items-center justify-center transition-[transform,background-color,color] duration-300 active:scale-90 ${saved ? "bg-nn-soil text-nn-gold" : "bg-nn-cream/90 text-nn-soil hover:bg-nn-gold hover:text-nn-soil-dk"} ${className}`}
    >
      <svg className={size === "lg" ? "w-5 h-5" : "w-4 h-4"} fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d={HEART} /></svg>
    </button>
  );
}

/** Quantity stepper + Add to cart on the product page */
export function ProductBuy({ item }: { item: Item }) {
  const [qty, setQty] = useState(1);
  const [added, flash] = useFlash();
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      <div className="flex items-center bg-nn-cream rounded-full h-12 px-2 text-nn-soil" role="group" aria-label="Quantity">
        <button type="button" className="w-9 h-9 rounded-full hover:bg-nn-paper text-[20px]" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
        <span className="w-8 text-center font-bold" aria-live="polite">{qty}</span>
        <button type="button" className="w-9 h-9 rounded-full hover:bg-nn-paper text-[20px]" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(99, q + 1))}>+</button>
      </div>
      <button
        type="button"
        className="nn-pill nn-pill-gold"
        onClick={() => {
          addToCart(item, qty);
          flash();
        }}
      >
        {added ? <>Added <CheckIcon className="w-4 h-4" /></> : <>Add to cart <Arrow /></>}
      </button>
      <a href="/cart/" className="nn-pill nn-pill-line text-nn-gold">View cart</a>
      <WishlistButton item={item} size="lg" />
    </div>
  );
}

/** Header cart pill: live total + count */
export function CartButton() {
  const { count, subtotal } = useCart();
  return (
    <a href="/cart/" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`} className="nn-pill nn-pill-soil !min-h-[42px] !px-3 sm:!px-4 !shadow-none !gap-2">
      <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M3 9h18l-2 11H5zM8 9l4-6 4 6" /></svg>
      <span className="hidden sm:inline">{inr(subtotal)}</span>
      <span className="min-w-5 h-5 px-1 rounded-full bg-nn-gold text-nn-soil-dk text-[11px] flex items-center justify-center">{count}</span>
    </a>
  );
}

/** Small confirmation that slides up after something is added */
export function CartToast() {
  const [msg, setMsg] = useState<{ name: string; qty: number; kind?: "wish"; key: number } | null>(null);
  useEffect(() => {
    const on = (e: Event) => setMsg({ ...(e as CustomEvent<{ name: string; qty: number; kind?: "wish" }>).detail, key: Date.now() });
    window.addEventListener("nn-cart-added", on);
    return () => window.removeEventListener("nn-cart-added", on);
  }, []);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 3200);
    return () => clearTimeout(t);
  }, [msg]);
  if (!msg) return null;
  return (
    <div key={msg.key} role="status" className="fixed z-[70] bottom-5 left-1/2 -translate-x-1/2 w-[min(calc(100%-32px),440px)] bg-nn-leaf-dk text-nn-cream rounded-2xl shadow-nn-hover px-4 py-3 flex items-center gap-3 animate-[nnRise_.4s_cubic-bezier(.2,.7,.2,1)_both]">
      <span className="w-8 h-8 rounded-full bg-nn-gold text-nn-soil-dk flex items-center justify-center shrink-0"><CheckIcon className="w-4 h-4" /></span>
      <p className="flex-1 min-w-0 text-[14.5px] leading-snug"><span className="font-semibold">{msg.qty > 1 ? `${msg.qty} × ` : ""}{msg.name}</span> {msg.kind === "wish" ? "saved to your wishlist" : "added to your cart"}</p>
      <a href={msg.kind === "wish" ? "/wishlist/" : "/cart/"} className="shrink-0 text-[13px] font-bold uppercase tracking-wide text-nn-gold hover:underline underline-offset-4">{msg.kind === "wish" ? "View wishlist" : "View cart"}</a>
    </div>
  );
}
