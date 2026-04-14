import fs from 'fs';
import path from 'path';
import Layout from '../../components/Layout';
import HtmlContent from '../../components/HtmlContent';

export default function NewsPost({ post }) {
  return (
    <Layout title={post.articleTitle} description={post.articleDescription} image={post.image}>
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
  return { props: { post } };
}
