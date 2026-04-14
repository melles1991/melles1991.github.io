import Layout from '../components/Layout';
import { withBasePath } from '../lib/base-path';

export default function NotFoundPage() {
  return (
    <Layout title="404" description="Сторінку не знайдено.">
      <div className="area-content">
        <div className="empty-state-wow error-state">
          <div className="empty-icon-glow">
            <svg className="scroll-icon" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,12V14H16V12H8M8,16V18H13V16H8Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2>Сторінку не знайдено</h2>
          <p>Маршрут уже працює через Next.js static export, але цього шляху тут просто не існує.</p>
          <div className="empty-action">
            <a className="btn-primary-hero" href={withBasePath('/')}>Повернутися на головну</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
