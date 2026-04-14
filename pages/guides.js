import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import { FeaturedGuideCard, GuideCard } from '../components/GuideCard';
import guides from '../content/guides/index.json';

export default function GuidesPage() {
  const [featured, ...rest] = guides;

  return (
    <Layout title="Гайди" description="Корисні гайди, тактики й інструкції для World of Warcraft.">
      <div className="area-content">
        <SectionHeader tag="База знань" title="Гайди та інструкції" subtitle="Оптимізація, адони, рейди та корисний WoW-контент." />
        {featured ? <FeaturedGuideCard guide={featured} /> : null}
        <div className="news-grid">
          {rest.map((guide) => <GuideCard guide={guide} key={guide.slug} />)}
        </div>
      </div>
    </Layout>
  );
}
