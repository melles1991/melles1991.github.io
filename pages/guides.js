import Layout from '../components/Layout';
import HtmlContent from '../components/HtmlContent';
import pageData from '../content/pages/guides.json';

export default function Page() {
  return (
    <Layout title="Гайди та Інструкції" description={pageData.description}>
      <HtmlContent html={pageData.bodyHtml} />
    </Layout>
  );
}
