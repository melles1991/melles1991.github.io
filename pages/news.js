import Layout from '../components/Layout';
import HtmlContent from '../components/HtmlContent';
import pageData from '../content/pages/news.json';

export default function Page() {
  return (
    <Layout title="Новини та Події" description={pageData.description}>
      <HtmlContent html={pageData.bodyHtml} />
    </Layout>
  );
}
