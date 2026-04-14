import fs from 'fs';
import path from 'path';
import Layout from '../../components/Layout';
import HtmlContent from '../../components/HtmlContent';

const ARTICLE_SHARE_SCRIPT = `
  (function () {
    const currentUrl = window.location.href;
    const title = document.querySelector('.article-header h1')?.textContent?.trim() || document.title;
    const telegram = document.querySelector('.share-btn.telegram');
    const facebook = document.querySelector('.share-btn.facebook');
    if (telegram) telegram.href = 'https://t.me/share/url?url=' + encodeURIComponent(currentUrl) + '&text=' + encodeURIComponent(title);
    if (facebook) facebook.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentUrl);
  })();
`;

export default function NewsPost({ post }) {
  return (
    <Layout title={post.articleTitle} description={post.articleDescription} image={post.image} inlineScripts={[ARTICLE_SHARE_SCRIPT]}>
      <HtmlContent html={post.bodyHtml} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'content', 'news');
  const paths = fs.readdirSync(dir)
    .filter((file) => file.endsWith('.json') && file !== 'index.json')
    .map((file) => ({ params: { slug: file.replace(/\.json$/, '') } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content', 'news', `${params.slug}.json`);
  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  post.bodyHtml = post.bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '');
  return { props: { post } };
}
