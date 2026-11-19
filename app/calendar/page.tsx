import Layout from "@/components/Layout";
import { CtaBand, NoticeCard, PageBanner, SecHead } from "@/components/ui";

const months: [string, string?][] = [
  ["January", "Pongal season"], ["February", "Cool season"], ["March"], ["April", "Summer"],
  ["May"], ["June"], ["July", "South-west monsoon"], ["August"],
  ["September"], ["October", "North-east monsoon"], ["November"], ["December"],
];

export default function Calendar() {
  return (
    <Layout>
      <main>
        <PageBanner
          title="Calendar"
          kicker="What is on"
          intro="A month-by-month view of Naadu Nalam activity — markets, farm visits, tastings and notices about dispatch. Months with nothing against them are simply not scheduled yet."
        />
        <NoticeCard
          section="What is coming up"
          title="Our calendar will be updated with upcoming activities and events"
          body="Nothing is on the calendar yet. The year below is where dates will land as they are confirmed — one line per activity, under the month it falls in."
          img="/images/el-space.webp"
        />
        <section className="nn-sec nn-frame nn-forest-bg nn-botanic nn-grain">
          <div className="nn-wrap flex flex-col gap-[clamp(18px,3vh,32px)]">
            <SecHead title="The year ahead" intro="Markets and stalls, farm and producer visits, tastings, and notices about when dispatch pauses will each be listed against their month." light size="sm" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:grid-rows-2 gap-3 nn-grow [perspective:1400px]" data-reveal="group">
              {months.map(([m, season]) => (
                <div key={m} className={`nn-tilt rounded-[22px] p-4 min-h-[clamp(96px,14vh,130px)] lg:!h-auto flex flex-col ${season ? "bg-nn-gold text-nn-soil-dk" : "bg-nn-cream text-nn-ink"}`}>
                  <h3 className="font-display text-[clamp(22px,1.8vw,28px)] text-nn-soil leading-none">{m}</h3>
                  {season && <p className="text-[13.5px] font-semibold mt-1.5">{season}</p>}
                  <p className="text-[13px] opacity-60 mt-auto pt-2">No entries yet</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <CtaBand
          title="Something we should put in the diary?"
          body="If you are organising a market, a farm visit or a food event that fits Naadu Nalam, tell us and we will add it here."
          actions={[{ label: "Contact us", href: "/contact/" }, { label: "See events", href: "/events/" }]}
        />
      </main>
    </Layout>
  );
}
