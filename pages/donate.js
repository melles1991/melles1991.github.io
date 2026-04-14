import Layout from '../components/Layout';
import { withBasePath } from '../lib/base-path';

const methods = [
  {
    title: 'Monobank',
    description: 'Миттєва підтримка карткою українського банку',
    href: 'https://send.monobank.ua/jar/36G5vBXMkK',
    image: '/assets/img/monobank-logo.png',
    featured: true,
    badges: ['Швидко', 'Безпечно'],
  },
  {
    title: 'Donatello',
    description: 'Швидкі донати з України та інших країн',
    href: 'https://donatello.to/lihvo_druida',
    image: '/assets/img/donatello-logo.png',
    badges: ['Анонімно', 'Миттєво', 'Голосові повідомлення'],
  },
];

export default function DonatePage() {
  return (
    <Layout title="Підтримати" description="Підтримка стрімів, сайту та нового контенту.">
      <section className="donate-section">
        <header className="donate-header">
          <h1>Підтримати проєкт</h1>
          <p>Ваші донати допомагають мені робити більше контенту, стрімів і корисних WoW-матеріалів.</p>
        </header>

        <h2 className="donate-subtitle">Оберіть спосіб підтримки</h2>

        <div className="methods-grid">
          {methods.map((method) => (
            <a key={method.title} className={`card method-card${method.featured ? ' featured' : ''}`} href={method.href} rel="noopener noreferrer" target="_blank">
              {method.featured ? <div className="featured-badge">★ Рекомендовано</div> : null}
              <div className="method-icon"><img alt={method.title} src={withBasePath(method.image)} /></div>
              <h3>{method.title}</h3>
              <p>{method.description}</p>
              <div className="method-features">
                {method.badges.map((badge) => <span key={badge}>✔ {badge}</span>)}
              </div>
            </a>
          ))}
        </div>

        <div className="credits-info">
          <h4>Дякую за підтримку</h4>
          <p>Кожен донат допомагає покращувати трансляції, розробку адонів і сам сайт. Розділ уже без вбудованого inline JavaScript — тільки нативний компонент.</p>
        </div>

        <div className="history-card">
          <h2>Історія підтримки</h2>
          <div className="empty-state">
            <p>Поки що немає донатів</p>
            <span>Історія донатів з’явиться тут</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
