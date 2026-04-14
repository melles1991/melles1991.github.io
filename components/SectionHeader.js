export default function SectionHeader({ tag, title, subtitle, centered = false }) {
  return (
    <div className={`section-header${centered ? ' is-centered' : ''}`}>
      {tag ? <span className="section-tag">{tag}</span> : null}
      {title ? <h1>{title}</h1> : null}
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  );
}
