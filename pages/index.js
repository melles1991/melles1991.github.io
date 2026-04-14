import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import CharacterCard from '../components/CharacterCard';
import { GuideCard } from '../components/GuideCard';
import EmptyState from '../components/EmptyState';
import socials from '../content/data/socials.json';
import characters from '../content/data/characters.json';
import guides from '../content/guides/index.json';
import { withBasePath } from '../lib/base-path';

const SOCIAL_META = [
  ['youtube', 'yt', 'fab fa-youtube', 'YouTube'],
  ['tiktok', 'tt', 'fab fa-tiktok', 'TikTok'],
  ['twitch', 'tw', 'fab fa-twitch', 'Twitch'],
  ['discord', 'dc', 'fab fa-discord', 'Discord'],
];

export default function HomePage() {
  const latestGuides = guides.slice(0, 3);

  return (
    <Layout description="Профіль гравця, адони, гайди та World of Warcraft контент.">
      <section className="ui-blocks" id="profile">
        <section className="card socials-card" id="socials">
          <div className="socials-content">
            <h3 className="welcome-text">Вітаю у моєму цифровому лігві!</h3>
            <p className="socials-copy">Тут зібрані мої гайди, адони, гільдійський контент і корисні матеріали по WoW.</p>
            <div className="socials-links">
              {SOCIAL_META.map(([key, tone, icon, label]) => socials[key] ? (
                <a key={key} className={`btn-social ${tone}`} href={socials[key]} rel="noopener noreferrer" target="_blank">
                  <i className={icon}></i> {label}
                </a>
              ) : null)}
            </div>
          </div>
        </section>

        <section className="card donate featured" id="donate">
          <h3>Підтримати проєкт</h3>
          <p>Донати допомагають розвитку каналу, стрімів і самого сайту.</p>
          <a href={withBasePath('/donate/')}>Перейти до донатів</a>
        </section>
      </section>

      <section className="card characters-container">
        <div className="section-header section-header-compact">
          <span className="section-tag">Raider.IO</span>
          <h1>Мої персонажі</h1>
        </div>
        <div id="characters">
          {characters.map((character) => <CharacterCard character={character} key={character.name} />)}
        </div>
      </section>

      <section className="area section" id="guides-preview">
        <div className="area-content news-area">
          <SectionHeader tag="База знань" title="Останні гайди" subtitle="Стисло, структуровано і без сміття." />
          {latestGuides.length ? (
            <>
              <div className="news-grid news-grid-home">
                {latestGuides.map((guide) => <GuideCard guide={guide} key={guide.slug} />)}
              </div>
              <div className="news-actions">
                <a className="btn-primary-hero" href={withBasePath('/guides/')}>Всі гайди <span className="arrow">→</span></a>
              </div>
            </>
          ) : (
            <EmptyState title="Гайди ще в дорозі" description="Секція вже піднята на нативні компоненти. Контент підтягнеться після наступного оновлення даних." actionHref="/guides/" actionLabel="Відкрити розділ" />
          )}
        </div>
      </section>
    </Layout>
  );
}
