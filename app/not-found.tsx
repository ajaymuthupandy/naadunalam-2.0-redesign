import Layout from "@/components/Layout";
import { Arrow } from "@/components/ui";

export default function NotFound() {
  return (
    <Layout>
      <main>
        <section className="nn-sec nn-frame nn-soil-bg">
          <div className="nn-wrap text-center flex flex-col items-center">
            <p className="nn-display text-[clamp(120px,22vw,300px)] text-nn-gold/25 leading-none" aria-hidden="true">404</p>
            <h1 className="nn-display text-[clamp(40px,5vw,80px)] text-nn-gold -mt-[clamp(40px,6vw,90px)]">The page can’t be found.</h1>
            <p className="nn-lead text-nn-cream/80 mt-4 mb-8">It looks like nothing was found at this location.</p>
            <a href="/" className="nn-pill nn-pill-gold">Home <Arrow /></a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
