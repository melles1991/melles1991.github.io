import { withBasePath } from '../lib/base-path';

export default function Sidebar() {
  return (
    <header className="top-nav">
      <div className="nav-container">
        <a href={withBasePath('/')} className="nav-brand" aria-label="На головну">
          <span className="nav-brand-mark"></span>
          <span className="nav-brand-text">Лігво</span>
        </a>

        <nav className="nav-left">
          <a href={withBasePath('/')}>Головна</a>
          <a href={withBasePath('/news/')}>Новини</a>
          <a href={withBasePath('/guild/')}>Гільдія</a>

          <div className="nav-dropdown">
            <button className="dropdown-toggle" type="button" aria-expanded="false">
              Ресурси <span className="arrow">▾</span>
            </button>
            <div className="dropdown-menu">
              <a href={withBasePath('/mods/')}><span className="icon">🛠️</span> Мої Адони</a>
              <a href={withBasePath('/guides/')}><span className="icon">📚</span> Гайди</a>
              <a href={withBasePath('/404.html')}><span className="icon">🗺️</span> 404</a>
            </div>
          </div>
        </nav>

        <button className="hamburger" aria-label="Меню" aria-expanded="false">
          <div className="menu-button"></div>
        </button>
      </div>

      <div className="mobile-menu">
        <div className="mobile-menu-inner">
          <a href={withBasePath('/')} className="mobile-link">Головна</a>
          <a href={withBasePath('/news/')} className="mobile-link">Новини</a>
          <a href={withBasePath('/guild/')} className="mobile-link">Гільдія</a>
          <div className="mobile-divider">Ресурси</div>
          <a href={withBasePath('/mods/')} className="mobile-link"><span className="icon">🛠️</span> Адони</a>
          <a href={withBasePath('/guides/')} className="mobile-link"><span className="icon">📚</span> Гайди</a>
          <a href={withBasePath('/404.html')} className="mobile-link"><span className="icon">🗺️</span> 404</a>
        </div>
      </div>
    </header>
  );
}
