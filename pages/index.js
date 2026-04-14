import Layout from '../components/Layout';
import HtmlContent from '../components/HtmlContent';
import pageData from '../content/pages/index.json';

export default function HomePage() {
  return (
    <Layout description={pageData.description}>
      <HtmlContent html={pageData.bodyHtml} />
    </Layout>
  );
}
