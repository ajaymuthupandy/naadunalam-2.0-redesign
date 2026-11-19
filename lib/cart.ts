"use client";

import { useSyncExternalStore } from "react";
import { priceNum, type Product } from "./data";

/** Cart lives in localStorage so it survives reloads and stays in sync across tabs and components. */
export type CartItem = { href: string; name: string; price: number; size: string; img: string; qty: number };
export type Order = { id: string; date: string; items: CartItem[]; subtotal: number; delivery: number; total: number; customer: Record<string, string> };

export const DELIVERY_FEE = 50;
const KEY = "nn-cart";
const ORDER_KEY = "nn-last-order";
const EVENT = "nn-cart-change";
const EMPTY: CartItem[] = [];
const SERVER: CartItem[] = []; // snapshot before the browser cart is read (SSR + hydration)

let cache: CartItem[] | null = null;

function read(): CartItem[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as CartItem[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(items: CartItem[]) {
  cache = items;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, read, () => SERVER);
  const ready = items !== SERVER;
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
  const delivery = items.length ? DELIVERY_FEE : 0;
  return { items, ready, count, subtotal, delivery, total: subtotal + delivery };
}

export function addToCart(p: Pick<Product, "href" | "name" | "price" | "size" | "img">, qty = 1) {
  const items = read();
  const found = items.find((i) => i.href === p.href);
  const next = found
    ? items.map((i) => (i.href === p.href ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
    : [...items, { href: p.href, name: p.name, price: priceNum(p.price), size: p.size, img: p.img, qty }];
  write(next);
  window.dispatchEvent(new CustomEvent("nn-cart-added", { detail: { name: p.name.split("(")[0].trim(), qty } }));
}

export function setQty(href: string, qty: number) {
  write(qty <= 0 ? read().filter((i) => i.href !== href) : read().map((i) => (i.href === href ? { ...i, qty: Math.min(99, qty) } : i)));
}

export const removeFromCart = (href: string) => setQty(href, 0);

export function placeOrder(customer: Record<string, string>): Order {
  const items = read();
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
  const order: Order = {
    id: `NN${Date.now().toString().slice(-7)}`,
    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    items,
    subtotal,
    delivery: DELIVERY_FEE,
    total: subtotal + DELIVERY_FEE,
    customer,
  };
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch {}
  write(EMPTY);
  return order;
}
