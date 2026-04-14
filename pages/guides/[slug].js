import fs from 'fs';
import path from 'path';
import Layout from '../../components/Layout';
import HtmlContent from '../../components/HtmlContent';

const GUIDE_PAGE_SCRIPT = `
  (function () {
    const updateShareLinks = () => {
      const currentUrl = window.location.href;
      const title = document.querySelector('.article-header h1')?.textContent?.trim() || document.title;
      const telegram = document.querySelector('.share-btn.telegram');
      const facebook = document.querySelector('.share-btn.facebook');

      if (telegram) {
        telegram.href = 'https://t.me/share/url?url=' + encodeURIComponent(currentUrl) + '&text=' + encodeURIComponent(title);
      }
      if (facebook) {
        facebook.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentUrl);
      }
    };

    const enhanceArticleTables = () => {
      const mobileQuery = window.matchMedia('(max-width: 768px)');

      const syncOverflowState = (wrap) => {
        const scroll = wrap.querySelector('.article-table-scroll');
        const hint = wrap.querySelector('.table-scroll-hint');
        if (!scroll) return;

        const hasOverflow = scroll.scrollWidth > scroll.clientWidth + 8;
        const atStart = scroll.scrollLeft <= 8;
        const atEnd = scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 8;

        wrap.classList.toggle('has-overflow', hasOverflow);
        wrap.classList.toggle('is-overflowing', hasOverflow && !atEnd);
        wrap.classList.toggle('is-scrolled', hasOverflow && !atStart);

        if (hint) hint.hidden = !hasOverflow;
      };

      const unwrapTable = (table) => {
        const wrap = table.closest('.article-table-wrap');
        if (!wrap) return;
        wrap.parentNode.insertBefore(table, wrap);
        wrap.remove();
      };

      const wrapTable = (table) => {
        if (table.closest('.article-table-wrap')) return;
        const wrap = document.createElement('div');
        wrap.className = 'article-table-wrap';
        const scroll = document.createElement('div');
        scroll.className = 'article-table-scroll';
        const hint = document.createElement('div');
        hint.className = 'table-scroll-hint';
        hint.textContent = 'Проведи таблицю вбік →';
        const parent = table.parentNode;
        parent.insertBefore(wrap, table);
        wrap.appendChild(scroll);
        scroll.appendChild(table);
        wrap.appendChild(hint);
        const update = () => syncOverflowState(wrap);
        scroll.addEventListener('scroll', update, { passive: true });
        requestAnimationFrame(update);
      };

      const refreshTables = () => {
        const isMobile = mobileQuery.matches;
        const tables = document.querySelectorAll('.article-body table');
        tables.forEach((table) => {
          if (isMobile) wrapTable(table);
          else unwrapTable(table);
        });
        if (isMobile) document.querySelectorAll('.article-table-wrap').forEach(syncOverflowState);
      };

      const scheduleRefresh = () => requestAnimationFrame(refreshTables);
      refreshTables();
      window.addEventListener('resize', scheduleRefresh, { passive: true });
      if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', scheduleRefresh);
      else if (mobileQuery.addListener) mobileQuery.addListener(scheduleRefresh);
    };

    updateShareLinks();
    enhanceArticleTables();
  })();
`;

export default function GuidePost({ post }) {
  return (
    <Layout title={post.articleTitle} description={post.articleDescription} image={post.image} inlineScripts={[GUIDE_PAGE_SCRIPT]}>
      <HtmlContent html={post.bodyHtml} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'content', 'guides');
  const paths = fs.readdirSync(dir)
    .filter((file) => file.endsWith('.json') && file !== 'index.json')
    .map((file) => ({ params: { slug: file.replace(/\.json$/, '') } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content', 'guides', `${params.slug}.json`);
  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  post.bodyHtml = post.bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '');
  return { props: { post } };
}
