import Layout from "@/components/Layout";
import { Arrow, CtaBand, IMG_BASE, NoticeCard, PageBanner, SecHead } from "@/components/ui";
import { blogPosts } from "@/lib/data";

export default function Research() {
  return (
    <Layout>
      <main>
        <PageBanner
          title="Research Articles"
          kicker="Knowledge"
          intro="Longer, sourced writing about traditional Tamil Nadu grains, oils, spices and the farming they come from — and what is actually known about them."
        />
        <NoticeCard
          section="Published research"
          title="Research articles will be published here"
          body="We have not published any research yet. When the first pieces are ready, each one will appear here with its title, date, a short summary and a link to read it in full."
          img="/images/gen-7.jpg"
        />
        <section className="nn-sec nn-frame nn-paper-bg nn-botanic">
          <div className="nn-wrap flex flex-col gap-[clamp(18px,3vh,32px)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SecHead title="From the blog in the meantime" intro="These are practical guides rather than research, but they cover the same foods — how to tell one honey from another, why cold-pressed oil tastes different, which rice suits which meal." size="sm" />
              <a href="/blog/" className="nn-pill nn-pill-soil">Read all blog posts <Arrow /></a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 nn-grow [perspective:1400px]" data-reveal="group">
              {blogPosts.slice(0, 3).map((p) => (
                <a key={p.slug} href={`/${p.slug}/`} className="group nn-tilt bg-nn-card rounded-[26px] overflow-hidden shadow-nn flex flex-col">
                  <div className="h-[clamp(140px,22vh,230px)] lg:h-auto lg:flex-1 lg:min-h-[120px] overflow-hidden"><img src={`${IMG_BASE}${p.img}`} alt={p.alt} className="nn-tilt-img w-full h-full object-cover" /></div>
                  <div className="p-5 flex flex-col">
                    <p className="nn-eyebrow text-nn-soil/70 !text-[11.5px] mb-2">{p.date}</p>
                    <h3 className="font-display text-[clamp(20px,1.6vw,25px)] text-nn-soil leading-[.95] mb-2">{p.title}</h3>
                    <p className="text-[14.5px] text-nn-muted mb-4">{p.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wide text-nn-soil">Read the article <Arrow /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <CtaBand
          title="Working on something we should read?"
          body="If you research Tamil Nadu food systems, traditional crops or nutrition and would like your work published here, we would like to hear from you."
          actions={[{ label: "Contact us", href: "/contact/" }, { label: "About Naadu Nalam", href: "/about-us/" }]}
        />
      </main>
    </Layout>
  );
}
