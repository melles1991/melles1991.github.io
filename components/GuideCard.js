import { withBasePath } from '../lib/base-path';

export function FeaturedGuideCard({ guide }) {
  return (
    <a className="featured-article" href={withBasePath(`/guides/${guide.slug}/`)}>
      <div className="featured-image">
        <img alt={guide.title} loading="lazy" src={withBasePath(guide.image)} />
      </div>
      <div className="featured-content">
        <div className="featured-meta">
          <span className="category-badge">{guide.category}</span>
          <span className="date">{guide.dateLabel}</span>
        </div>
        <h2>{guide.title}</h2>
        <p>{guide.description}</p>
        <span className="read-more">Читати гайд <span aria-hidden="true">→</span></span>
      </div>
    </a>
  );
}

export function GuideCard({ guide }) {
  return (
    <a className="visual-news-card" href={withBasePath(`/guides/${guide.slug}/`)}>
      <div className="card-media">
        <div className="media-img" style={{ backgroundImage: `url('${withBasePath(guide.image)}')` }}></div>
        <div className="card-badge">{guide.category}</div>
      </div>
      <div className="card-info">
        <div className="news-date">{guide.dateLabel}</div>
        <h3 className="card-title">{guide.title}</h3>
        <p className="card-desc">{guide.description}</p>
      </div>
    </a>
  );
}
