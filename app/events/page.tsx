import Layout from "@/components/Layout";
import { CtaBand, NoticeCard, PageBanner, TrioSection } from "@/components/ui";

export default function Events() {
  return (
    <Layout>
      <main>
        <PageBanner
          title="Events"
          kicker="Community"
          intro="Markets, farm visits and gatherings that bring the people who grow our food and the people who cook it into the same room. When Naadu Nalam has something on, it will be listed here."
        />
        <NoticeCard
          section="Upcoming events"
          title="Upcoming events will be announced here"
          body="Nothing is scheduled at the moment. Once a date is confirmed, this page will carry the event, where it is, what time it starts and how to join."
          img="/images/el-fire.webp"
        />
        <TrioSection
          tone="forest"
          imgs={["/images/el-earth.webp", "/images/gen-3.webp", "/images/el-fire.webp"]}
          title="The kinds of events we plan to run"
          intro="None of these are scheduled yet. This is what an entry on this page will look like when one is."
          items={[
            { t: "Markets and stalls", d: "Days where you can meet the sellers behind the listings and buy from them face to face." },
            { t: "Farm and producer visits", d: "Trips to the fields, mills and oil presses our products actually come from." },
            { t: "Tastings and kitchen sessions", d: "Short, practical sessions around traditional rice, millets, cold-pressed oils and whole spices." },
          ]}
        />
        <CtaBand
          title="Hear about the next one"
          body="Write to us and we will let you know when a date is set. In the meantime, the blog is where we write about the food itself."
          actions={[{ label: "Contact us", href: "/contact/" }, { label: "Read the blog", href: "/blog/" }]}
        />
      </main>
    </Layout>
  );
}
