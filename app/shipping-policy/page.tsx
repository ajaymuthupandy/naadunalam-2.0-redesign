import Layout from "@/components/Layout";
import { Arrow, PageBanner } from "@/components/ui";

const toc = [
  ["processing", "Order processing"],
  ["delivery", "Shipping & delivery"],
  ["charges", "Shipping charges"],
  ["delays", "Delivery delays"],
  ["address", "Incorrect or incomplete address"],
  ["damaged", "Damaged, spoiled or incorrect orders"],
  ["support", "Contact us"],
];

function Block({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="nn-tilt bg-nn-card rounded-[26px] p-[clamp(20px,2.2vw,30px)] shadow-nn" data-reveal>
      <h2 className="font-display text-[clamp(26px,2.4vw,38px)] text-nn-soil leading-none mb-4">{n}. {title}</h2>
      <div className="grid gap-3 text-[16px] leading-relaxed text-nn-ink/85">{children}</div>
    </section>
  );
}

const Dot = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-3"><span className="text-nn-soil">✦</span><span>{children}</span></li>
);

export default function ShippingPolicy() {
  return (
    <Layout>
      <main>
        <PageBanner
          title="Shipping Policy"
          intro="At Naadu Nalam, we aim to make your shopping experience simple and transparent. This Shipping Policy explains how orders are processed, dispatched and delivered."
        >
          <p className="text-[14px] text-nn-gold-lt/80 mt-4">Last updated: 25/08/2026</p>
        </PageBanner>

        <section className="nn-sec nn-long nn-cream-bg nn-botanic !overflow-visible">
          <div className="nn-wrap grid lg:grid-cols-[280px_1fr] gap-8 items-start">
            <nav aria-label="On this page" className="lg:sticky lg:top-[calc(var(--header-offset)+24px)] bg-nn-soil text-nn-cream rounded-[24px] p-5">
              <p className="nn-eyebrow text-nn-gold mb-3">On this page</p>
              <ol className="grid gap-1.5 text-[15px]">
                {toc.map(([id, label]) => <li key={id}><a href={`#${id}`} className="hover:text-nn-gold">{label}</a></li>)}
              </ol>
            </nav>

            <div className="grid gap-5 [perspective:1600px]">
              <Block id="processing" n={1} title="Order processing">
                <p>Processing begins once your order has been placed and confirmed on the website. You will see your order details and the total payable, including delivery, before you confirm.</p>
                <p>Orders are packed within <strong>24–48 hours on business days (Monday–Saturday)</strong>. Orders placed on Sunday are packed on the next business day.</p>
                <p>Fruits, vegetables and frozen items are bought against the day’s orders. These items are stocked in limited daily quantities and may sell out. Delivery slots for perishable orders may be confirmed by SMS or email.</p>
              </Block>
              <Block id="delivery" n={2} title="Shipping and delivery">
                <p>Naadu Nalam delivers across Chennai and select locations in Tamil Nadu, and ships non-perishable items more widely.</p>
                <ul className="grid gap-1.5">
                  <Dot>Chennai and surrounding pin codes — 1–3 business days</Dot>
                  <Dot>Other Tamil Nadu metros — 3–5 business days</Dot>
                  <Dot>Rest of India — 5–8 business days, non-perishable items only</Dot>
                </ul>
                <p>Fruits, vegetables and frozen items are delivered only within Chennai and selected Tamil Nadu locations. If your pin code is outside our perishable-delivery area, perishable items will not be available at checkout.</p>
                <p>Fruits, vegetables and frozen items are packed in insulated packaging and handled on priority.</p>
                <p><strong>Receiving your order.</strong> Please make sure someone is available to receive the order at the delivery address, particularly for perishable and frozen items. If a delivery cannot be completed because no one is available, we will attempt to contact you to reschedule. Perishable items that cannot be delivered after a failed attempt may not be re-dispatched.</p>
                <p>Delivery timelines may vary depending on the delivery location and other circumstances. The estimated delivery information shown during checkout will apply where available.</p>
              </Block>
              <Block id="charges" n={3} title="Shipping charges">
                <p>We charge a flat delivery fee of <strong>₹50 per order</strong>, on every order and to every serviceable location. There are no additional handling or packaging charges.</p>
                <p>The delivery fee is shown separately in your cart and again on the checkout page before you confirm the order.</p>
              </Block>
              <Block id="delays" n={4} title="Delivery delays">
                <p>The timelines above are estimates, not guarantees. Delivery may be affected by circumstances outside our reasonable control, including:</p>
                <ul className="grid gap-1.5">
                  {["Weather conditions", "Local restrictions", "Courier or transport disruption", "Operational issues", "An incorrect or incomplete delivery address"].map((t) => <Dot key={t}>{t}</Dot>)}
                </ul>
                <p>If your order is delayed beyond the stated window, contact us using the details below and we will trace it for you.</p>
              </Block>
              <Block id="address" n={5} title="Incorrect or incomplete address">
                <p>Please check your delivery address, pin code and phone number carefully before confirming an order. An incorrect or incomplete address may delay delivery or prevent it from being completed.</p>
                <p>If you notice an error after placing an order, contact us as soon as possible and we will try to update the details before the order is dispatched.</p>
                <p>Where a delivery cannot be completed because of an incorrect or incomplete address, we will attempt to contact you to arrange redelivery. As noted above, perishable items that cannot be delivered after a failed attempt may not be re-dispatched.</p>
              </Block>
              <Block id="damaged" n={6} title="Damaged, spoiled or incorrect orders">
                <p>If an order arrives damaged, spoiled or incorrect, please report it <strong>within 24 hours of delivery</strong>.</p>
                <p>Please contact us as soon as possible with your order details and relevant photographs where applicable. This helps us resolve the issue quickly and, where needed, raise it with the seller or delivery partner.</p>
                <p>Our <a href="/refund-policy/" className="text-nn-soil underline underline-offset-2">Refund Policy</a> sets out what is covered and how refunds are processed.</p>
              </Block>
              <section id="support" className="nn-tilt bg-nn-soil text-nn-cream rounded-[26px] p-[clamp(20px,2.2vw,30px)] relative isolate overflow-hidden nn-botanic" data-reveal>
                <h2 className="font-display text-[clamp(26px,2.4vw,38px)] text-nn-gold leading-none mb-2">Questions about a delivery?</h2>
                <p className="text-nn-cream/80 mb-4">We typically reply within one business day.</p>
                <ul className="grid sm:grid-cols-2 gap-2 text-[15.5px] mb-6">
                  <li><strong className="text-nn-gold">Email</strong> <a href="mailto:hello@naadunalam.in" className="hover:text-nn-gold">hello@naadunalam.in</a></li>
                  <li><strong className="text-nn-gold">Phone</strong> <a href="tel:+919092114630" className="hover:text-nn-gold">+91 90921 14630</a></li>
                  <li><strong className="text-nn-gold">Address</strong> Chennai, Tamil Nadu 600001, India</li>
                  <li><strong className="text-nn-gold">Hours</strong> Monday to Saturday, 9:00 AM – 6:00 PM. Sunday closed.</li>
                </ul>
                <a href="/contact/" className="nn-pill nn-pill-gold">Contact Us <Arrow /></a>
              </section>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
