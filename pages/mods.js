import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import ModCard from '../components/ModCard';
import mods from '../content/data/mods.json';

export default function ModsPage() {
  const sortedMods = [...mods].sort((a, b) => (b.downloads || 0) - (a.downloads || 0));

  return (
    <Layout title="Мої адони" description="Мої адони для World of Warcraft, зібрані у нативний каталог Next.js.">
      <div className="guild-page-container">
        <header className="guild-header">
          <div className="header-content">
            <div className="guild-badge"><span className="faction-icon">🛠️</span></div>
            <div className="guild-info">
              <h1 className="guild-name">Мої розробки</h1>
              <div className="guild-meta">
                <span className="meta-tag">World of Warcraft</span>
                <span className="meta-separator">/</span>
                <span className="meta-tag">Addons</span>
              </div>
            </div>
          </div>
          <div className="guild-actions">
            <a className="btn-discord" href="https://www.curseforge.com/wow/addons" rel="noopener noreferrer" target="_blank">CurseForge <span>↗</span></a>
          </div>
        </header>

        <section className="guild-section">
          <SectionHeader tag="Каталог" title="Адони" subtitle="Сторінка вже читає реальні дані з legacy YAML, а не вставлений HTML." />
          <div className="mods-grid">
            {sortedMods.map((mod) => <ModCard key={mod.id || mod.name} mod={mod} />)}
          </div>
        </section>
      </div>
    </Layout>
  );
}
