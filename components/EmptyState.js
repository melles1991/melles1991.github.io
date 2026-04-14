import { withBasePath } from '../lib/base-path';

export default function EmptyState({ title, description, actionHref, actionLabel }) {
  return (
    <div className="empty-state-wow">
      <div className="empty-icon-glow">
        <svg className="scroll-icon" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,12V14H16V12H8M8,16V18H13V16H8Z" fill="currentColor"></path>
        </svg>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {actionHref && actionLabel ? (
        <div className="empty-action">
          <a className="btn-primary-hero" href={withBasePath(actionHref)}>{actionLabel}</a>
        </div>
      ) : null}
    </div>
  );
}
