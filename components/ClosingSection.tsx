const IMG_BASE = "https://naadunalam.fastfilings.in/wp-content/uploads";

export default function ClosingSection() {
  return (
    <section className="nn-closing nn-soil-bg nn-botanic nn-grain relative isolate" aria-labelledby="closing-title">
      <div className="flex items-center py-8 lg:py-6 pl-[var(--gutter)] xl:pl-[max(var(--gutter),calc((100vw-1440px)/2+var(--gutter)))] pr-[var(--gutter)]">
        <div className="max-w-[680px]">
          <h2 id="closing-title" data-split className="nn-display text-[clamp(32px,min(4.2vw,7.5vh),68px)] text-nn-gold mb-4 [text-wrap:balance]">
            Discover products that feel closer to home.
          </h2>
          <p className="text-nn-cream/80 nn-lead mb-6 max-w-lg">
            Natural, traditional and locally sourced — gathered from independent sellers into one marketplace.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/shop/" className="nn-pill nn-pill-gold">
              Start Shopping
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
            </a>
            <a href="/#categories" className="nn-pill nn-pill-line text-nn-gold">Explore Categories</a>
          </div>
        </div>
      </div>
      <div className="relative min-h-[240px] overflow-clip">
        <img
          src={`${IMG_BASE}/2026/08/naadu-nalam-store-banner.webp`}
          alt="Naadu Nalam marketplace"
          className="absolute inset-0 h-full w-full object-cover"
          data-clip
        />
      </div>
    </section>
  );
}
