import { compactList, formatDateLabel, formatNumber } from '../lib/format';

export default function ModCard({ mod }) {
  const versions = compactList(mod.game_versions || [], 4);
  const categories = compactList(mod.categories || [], 4);

  return (
    <article className="mod-card">
      <div className="mod-header">
        <div className="mod-logo-wrapper">
          <img alt={mod.name} loading="lazy" src={mod.logo} />
        </div>
        <div className="mod-title-box">
          <h3 className="mod-name">{mod.name}</h3>
          <div className="mod-versions">
            {versions.visible.map((version) => (
              <span className="version-badge" key={version}>{version}</span>
            ))}
            {versions.hidden.length ? (
              <span className="version-badge more-versions">
                +{versions.hidden.length}
                <span className="versions-tooltip">
                  <span className="tooltip-header">Ще версії</span>
                  <span className="tooltip-grid">
                    {versions.hidden.map((version) => <span className="tooltip-tag" key={version}>{version}</span>)}
                  </span>
                </span>
              </span>
            ) : null}
          </div>
          <div className="mod-categories">
            {categories.visible.map((category) => <span className="mod-tag" key={category}>{category}</span>)}
          </div>
        </div>
      </div>

      <div className="mod-body">
        <p className="mod-summary">{mod.summary}</p>
      </div>

      <div className="mod-footer">
        <div className="mod-stats">
          <div className="stat-item">⬇ {formatNumber(mod.downloads)} завантажень</div>
          <div className="stat-item">🕒 {formatDateLabel(mod.updated_at)}</div>
          {mod.version ? <div className="stat-item">🏷 {mod.version}</div> : null}
        </div>
        <a className="btn-mod-download" href={mod.link} rel="noopener noreferrer" target="_blank">Відкрити</a>
      </div>
    </article>
  );
}
