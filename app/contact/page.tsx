"use client";

import React from "react";
import Layout from "@/components/Layout";
import { Arrow } from "@/components/ui";

const channels = [
  { label: "Chennai, Tamil Nadu 600001, India", href: "https://maps.google.com/?q=Chennai,+Tamil+Nadu+600001,+India", icon: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
  { label: "+91 90921 14630", href: "tel:+919092114630", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" },
  { label: "hello@naadunalam.in", href: "mailto:hello@naadunalam.in", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
  { label: "Chat with us on Telegram", href: "https://t.me/+919092114630", icon: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" },
];

export default function Contact() {
  return (
    <Layout>
      <main>
        <section className="nn-sec nn-frame nn-first nn-long nn-cream-bg nn-botanic">
          <h1 className="sr-only">Contact Us</h1>
          <div className="nn-wrap w-full grid lg:grid-cols-2 gap-6 items-stretch [perspective:1600px]" data-reveal="group">
            <div className="bg-nn-soil text-nn-cream rounded-[30px] p-[clamp(20px,min(2.2vw,3.4vh),30px)] relative isolate overflow-hidden nn-botanic flex flex-col min-h-0">
              <h2 data-split className="nn-display !text-[clamp(30px,min(3.6vw,6.4vh),58px)] text-nn-gold">Get in touch</h2>
              <p className="nn-lead text-nn-cream/80 mt-[clamp(8px,1.4vh,14px)] mb-[clamp(12px,2.2vh,22px)]">Visit our store base in Chennai, or write to us anytime. We typically reply within one business day.</p>
              <ul className="grid gap-[clamp(6px,1.1vh,12px)] mb-[clamp(12px,2.2vh,22px)]">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} className="group flex items-center gap-4 text-[16.5px] hover:text-nn-gold transition-colors">
                      <span className="w-[clamp(38px,5vh,46px)] h-[clamp(38px,5vh,46px)] rounded-full bg-nn-gold text-nn-soil-dk flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:[transform:rotate(-12deg)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={c.icon} /></svg>
                      </span>
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="rounded-[22px] bg-nn-soil-dk/60 px-5 py-[clamp(12px,2vh,20px)] mt-auto">
                <h3 className="font-display text-[22px] text-nn-gold mb-1.5">Business hours</h3>
                <p className="text-[15.5px] text-nn-cream/85">Monday to Saturday: 9:00 AM – 6:00 PM</p>
                <p className="text-[15.5px] text-nn-cream/85">Sunday: Closed</p>
              </div>
            </div>

            <div className="bg-nn-card rounded-[30px] p-[clamp(20px,min(2.2vw,3.4vh),30px)] shadow-nn flex flex-col min-h-0">
              <h2 data-split className="nn-display !text-[clamp(30px,min(3.6vw,6.4vh),58px)] text-nn-soil">Send a message</h2>
              <p className="nn-lead text-nn-muted mt-[clamp(8px,1.4vh,14px)] mb-[clamp(12px,2.2vh,22px)]">Tell us how we can help and we will respond by email.</p>
              <form className="flex flex-col gap-[clamp(8px,1.5vh,14px)] flex-1 min-h-0" onSubmit={(e) => e.preventDefault()}>
                <label className="grid gap-1 text-[15px] font-semibold text-nn-ink">Your name<input className="nn-input !min-h-[clamp(42px,5.2vh,50px)]" type="text" autoComplete="name" /></label>
                <label className="grid gap-1 text-[15px] font-semibold text-nn-ink">Email address<input className="nn-input !min-h-[clamp(42px,5.2vh,50px)]" type="email" autoComplete="email" /></label>
                <label className="flex flex-col gap-1 flex-1 min-h-0 text-[15px] font-semibold text-nn-ink">How can we help?<textarea className="nn-input flex-1 !min-h-[72px] !resize-none" rows={3} /></label>
                <label className="flex items-start gap-3 text-[14px] text-nn-muted">
                  <input type="checkbox" className="w-4 h-4 mt-1 accent-[#7E3814]" />
                  <span>I agree that Naadu Nalam may use these details to respond to my enquiry, as set out in the <a href="/privacy-policy/" className="text-nn-soil underline underline-offset-2">Privacy Policy</a>.</span>
                </label>
                <button type="submit" className="nn-pill nn-pill-soil self-start">Send a message <Arrow /></button>
              </form>
            </div>
          </div>
        </section>

        <section className="nn-sec nn-frame nn-paper-bg nn-botanic">
          <div className="nn-wrap grid lg:grid-cols-[0.8fr_1.5fr] gap-8 lg:gap-14 items-center">
            <div>
              <h2 data-split className="nn-display nn-h2-sm text-nn-soil">Our location</h2>
              <p className="nn-lead text-nn-muted mt-4 mb-6">Naadu Nalam is based in Chennai, Tamil Nadu.</p>
              <a href="https://maps.google.com/?q=Chennai,+Tamil+Nadu+600001,+India" className="nn-pill nn-pill-soil">Chennai, Tamil Nadu 600001, India <Arrow /></a>
            </div>
            <div className="[perspective:1600px]">
              <div data-turn="-10,6" className="rounded-[30px] overflow-hidden border-[6px] border-nn-gold shadow-nn-hover h-[clamp(300px,58vh,560px)] nn-fill bg-nn-paper">
                <iframe title="Naadu Nalam location — Chennai" src="https://maps.google.com/maps?q=Chennai%2C%20Tamil%20Nadu%20600001&z=12&output=embed" className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
