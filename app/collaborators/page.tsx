import Layout from "@/components/Layout";
import { CtaBand, NoticeCard, PageBanner, TrioSection } from "@/components/ui";

export default function Collaborators() {
  return (
    <Layout>
      <main>
        <PageBanner
          title="Collaborators"
          kicker="Our community"
          intro="Naadu Nalam is a marketplace, not a warehouse. Everything on the site comes from a seller who grows, presses, mills or gathers it themselves. This page is where those collaborators — and the community organisations working alongside them — will be introduced."
        />
        <NoticeCard
          section="Our collaborators"
          title="Collaborator information coming soon"
          body="We are gathering profiles, logos and links for the sellers and partners we work with. As each one is confirmed it will appear here, with a short description and a link to their store."
          img="/images/gen-2.webp"
        >
          <a href="/store-listing/" className="nn-pill nn-pill-gold">Browse our sellers</a>
        </NoticeCard>
        <TrioSection
          title="How collaboration works here"
          intro="Three things are true of every seller on the marketplace today."
          items={[
            { t: "Every seller has their own store", d: "Sellers list and manage their own products, stock and orders, and each one has a store page of their own on this site." },
            { t: "Listed in English and Tamil", d: "Product names and descriptions carry both, so the produce is named the way the people who grow it name it." },
            { t: "One basket, many sellers", d: "You can order from several sellers in a single basket. Orders on the marketplace are Cash on Delivery at present." },
          ]}
        />
        <CtaBand
          title="Want to work with us?"
          body="If you grow, make or gather something that belongs on Naadu Nalam — or you represent a group that does — we would like to hear from you."
          actions={[{ label: "Apply to sell", href: "/my-account/" }, { label: "Contact us", href: "/contact/" }]}
        />
      </main>
    </Layout>
  );
}
