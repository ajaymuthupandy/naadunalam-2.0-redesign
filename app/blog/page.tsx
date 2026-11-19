import Layout from "@/components/Layout";
import { Arrow, IMG_BASE, PageBanner } from "@/components/ui";
import { blogCategories, blogPosts, blogTags } from "@/lib/data";

export default function Blog() {
  return (
    <Layout>
      <main>
        <PageBanner title="Blog" />
        <section className="nn-sec nn-long nn-cream-bg nn-botanic !overflow-visible">
          <div className="nn-wrap grid lg:grid-cols-[1fr_300px] gap-8 items-start">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 [perspective:1400px]" data-reveal="group">
                {blogPosts.map((p) => (
                  <a key={p.slug} href={`/${p.slug}/`} className="group nn-tilt bg-nn-card rounded-[26px] overflow-hidden shadow-nn flex flex-col">
                    <div className="h-[clamp(150px,22vh,220px)] overflow-hidden"><img src={`${IMG_BASE}${p.img}`} alt={p.alt} className="nn-tilt-img w-full h-full object-cover" /></div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-[12.5px] text-nn-muted mb-2"><span className="font-semibold text-nn-soil">Superadmin</span> · {p.date}</p>
                      <h2 className="font-display text-[clamp(20px,1.5vw,24px)] text-nn-soil leading-[.95] mb-2">{p.title}</h2>
                      <p className="text-[14.5px] text-nn-muted mb-4">{p.excerpt}</p>
                      <span className="mt-auto inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wide text-nn-soil">Continue Reading <Arrow /></span>
                    </div>
                  </a>
                ))}
              </div>
              <nav aria-label="Pages" className="flex items-center gap-2 mt-8">
                <span aria-current="page" className="nn-pill nn-pill-soil !min-h-[44px]">Page 1</span>
                <a href="/blog/" className="nn-pill nn-pill-line text-nn-soil !min-h-[44px]">Page 2</a>
              </nav>
            </div>

            <aside className="grid gap-4">
              <div className="bg-nn-card rounded-[24px] p-5 shadow-nn">
                <h3 className="font-display text-[22px] text-nn-soil mb-3">Search</h3>
                <label className="sr-only" htmlFor="blog-search">Search for:</label>
                <input id="blog-search" className="nn-input !min-h-[46px]" placeholder="Search for:" />
              </div>
              <div className="bg-nn-card rounded-[24px] p-5 shadow-nn">
                <h3 className="font-display text-[22px] text-nn-soil mb-2">Categories</h3>
                <ul className="grid gap-1 text-[15px]">
                  {blogCategories.map((c) => <li key={c.name} className="flex justify-between"><a href="/blog/" className="hover:text-nn-soil">{c.name}</a><span className="text-nn-muted">({c.count})</span></li>)}
                </ul>
              </div>
              <div className="bg-nn-soil text-nn-cream rounded-[24px] p-5">
                <h3 className="font-display text-[22px] text-nn-gold mb-2">Recent Posts</h3>
                <ul className="grid gap-2.5">
                  {blogPosts.slice(0, 4).map((p) => (
                    <li key={p.slug}><a href={`/${p.slug}/`} className="block text-[14.5px] leading-snug hover:text-nn-gold">{p.title}</a><span className="text-[12.5px] text-nn-gold-lt/70">{p.date}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-nn-card rounded-[24px] p-5 shadow-nn">
                <h3 className="font-display text-[22px] text-nn-soil mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">{blogTags.map((t) => <a key={t} href="/blog/" className="px-3 py-1.5 rounded-full bg-nn-paper text-[13px] text-nn-soil hover:bg-nn-gold">{t}</a>)}</div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </Layout>
  );
}
