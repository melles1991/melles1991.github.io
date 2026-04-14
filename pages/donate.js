import Layout from '../components/Layout';
import HtmlContent from '../components/HtmlContent';
import pageData from '../content/pages/donate.json';

export default function Page() {
  return (
    <Layout title="Підтримати сервер" description={pageData.description}>
      <HtmlContent html={pageData.bodyHtml} />
    </Layout>
  );
}
