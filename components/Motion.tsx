"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Site-wide motion, after the reference (Lenis + SplitType + GSAP ScrollTrigger), in 3D:
 *  [data-split]          heading words flip up around X into place (once, on entry)
 *  [data-scrub]          paragraph words brighten one by one, scrubbed to scroll
 *  [data-reveal]         element (or its children with ="group") fades up gently, staying inside its section
 *  [data-rotate="deg"]   element turns in-plane while its section passes (scrubbed)
 *  [data-ring]           3D carousel: children [data-ring-item] sit on a cylinder that turns with scroll
 *  [data-coin]           element flips around Y (front/back faces) while its section passes
 *  [data-clip]           image unveils bottom-to-top once
 * Everything stays inside its own section: transform/opacity/clip only, no pinning.
 */

function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return Array.from(el.querySelectorAll<HTMLElement>(".swi"));
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    const parts = (node.textContent || "").split(/(\s+)/);
    const frag = document.createDocumentFragment();
    parts.forEach((p) => {
      if (!p) return;
      if (/^\s+$/.test(p)) {
        frag.appendChild(document.createTextNode(" "));
        return;
      }
      const outer = document.createElement("span");
      outer.className = "sw";
      const inner = document.createElement("span");
      inner.className = "swi";
      inner.textContent = p;
      outer.appendChild(inner);
      frag.appendChild(outer);
    });
    node.parentNode?.replaceChild(frag, node);
  });
  el.dataset.splitDone = "1";
  return Array.from(el.querySelectorAll<HTMLElement>(".swi"));
}

export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const headerOffset = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-offset")) || 0;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash || url.hash === "#") return;
      const target = document.querySelector<HTMLElement>(decodeURIComponent(url.hash));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -headerOffset() });
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    // The ring carousel is laid out even when motion is reduced
    const rings = Array.from(document.querySelectorAll<HTMLElement>("[data-ring]"));
    const layoutRings = () =>
      rings.forEach((ring) => {
        const items = Array.from(ring.querySelectorAll<HTMLElement>("[data-ring-item]"));
        const n = items.length;
        const w = items[0]?.offsetWidth || 260;
        const radius = Math.round((w / 2 / Math.tan(Math.PI / n)) * 1.18);
        ring.style.setProperty("--ring-r", `${radius}px`);
        const stage = ring.closest<HTMLElement>("[data-ring-stage]");
        if (stage) stage.style.transform = `translateZ(-${radius}px)`;
        items.forEach((it, i) => {
          it.style.transform = `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)`;
        });
      });
    layoutRings();
    window.addEventListener("resize", layoutRings);

    const ctx = gsap.context(() => {
      if (reduce) return;

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const words = splitWords(el);
        const hero = el.dataset.split === "hero";
        gsap.from(words, {
          rotateX: -95,
          yPercent: 35,
          opacity: 0,
          duration: hero ? 1 : 0.7,
          ease: "expo.out",
          stagger: hero ? 0.06 : 0.035,
          delay: hero ? 0.1 : 0,
          scrollTrigger: hero ? undefined : { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((el) => {
        const words = splitWords(el);
        gsap.fromTo(words, { opacity: 0.2 }, {
          opacity: 1, ease: "none", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%", end: "top 35%", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const group = el.dataset.reveal === "group";
        const targets = group ? Array.from(el.children) : [el];
        gsap.from(targets, {
          y: 28, opacity: 0,
          duration: 0.7, ease: "power2.out", stagger: group ? { amount: Math.min(0.3, targets.length * 0.06) } : 0,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          clearProps: "transform",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-rotate]").forEach((el) => {
        const deg = parseFloat(el.dataset.rotate || "20");
        const sec = el.closest("section") || el;
        const atTop = sec.getBoundingClientRect().top + window.scrollY < window.innerHeight;
        gsap.fromTo(el, { rotate: 0 }, {
          rotate: deg, ease: "none",
          scrollTrigger: { trigger: sec, start: atTop ? "top top" : "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });

      rings.forEach((ring) => {
        const n = ring.querySelectorAll("[data-ring-item]").length;
        const sec = ring.closest("section") || ring;
        gsap.fromTo(ring, { rotateY: 18 }, {
          rotateY: -(360 - 360 / n) + 18, ease: "none",
          scrollTrigger: { trigger: sec, start: "top 85%", end: "bottom 15%", scrub: 0.8 },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-turn]").forEach((el) => {
        const [a, b] = (el.dataset.turn || "-14,14").split(",").map(Number);
        const sec = el.closest("section") || el;
        gsap.fromTo(el, { rotateY: a }, {
          rotateY: b, ease: "none",
          scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-coin]").forEach((el) => {
        const sec = el.closest("section") || el;
        gsap.fromTo(el, { rotateY: -38, rotateX: 10 }, {
          rotateY: 38, rotateX: -10, ease: "none",
          scrollTrigger: { trigger: sec, start: "top 80%", end: "bottom 20%", scrub: 0.8 },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    });

    const refresh = () => {
      layoutRings();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", layoutRings);
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
