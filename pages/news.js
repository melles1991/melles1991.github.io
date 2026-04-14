import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';
import news from '../content/news/index.json';

export default function NewsPage() {
  return (
    <Layout title="Новини" description="Оновлення, новини та події по сайту і World of Warcraft.">
      <div className="area-content">
        <SectionHeader tag="Оновлення та події" title="Новини" subtitle="Розділ уже винесений у нативний Next.js-шаблон." />
        {news.length ? null : (
          <EmptyState
            title="Свиток поки порожній"
            description="Секція новин уже готова технічно. Коли з’являться записи, вони одразу ляжуть у цей шаблон без HTML-снапшотів."
            actionHref="/guides/"
            actionLabel="Поки перейти до гайдів"
          />
        )}
      </div>
    </Layout>
  );
}
