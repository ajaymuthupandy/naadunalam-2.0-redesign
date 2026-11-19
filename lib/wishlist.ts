"use client";

import { useSyncExternalStore } from "react";
import type { Product } from "./data";

/** Wishlist lives in localStorage, like the cart, so it survives reloads and stays in sync across tabs and components. */
export type WishItem = Pick<Product, "href" | "name" | "price" | "size" | "img">;

const KEY = "nn-wishlist";
const EVENT = "nn-wishlist-change";
const EMPTY: WishItem[] = [];
const SERVER: WishItem[] = []; // snapshot before the browser wishlist is read (SSR + hydration)

let cache: WishItem[] | null = null;

function read(): WishItem[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as WishItem[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(items: WishItem[]) {
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

export function useWishlist() {
  const items = useSyncExternalStore(subscribe, read, () => SERVER);
  return { items, ready: items !== SERVER, count: items.length, has: (href: string) => items.some((i) => i.href === href) };
}

export function removeFromWishlist(href: string) {
  write(read().filter((i) => i.href !== href));
}

/** Adds the product if it is not saved yet, removes it if it is. Returns true when it ends up saved. */
export function toggleWishlist(p: WishItem): boolean {
  const items = read();
  if (items.some((i) => i.href === p.href)) {
    removeFromWishlist(p.href);
    return false;
  }
  write([...items, { href: p.href, name: p.name, price: p.price, size: p.size, img: p.img }]);
  window.dispatchEvent(new CustomEvent("nn-cart-added", { detail: { name: p.name.split("(")[0].trim(), qty: 1, kind: "wish" } }));
  return true;
}
