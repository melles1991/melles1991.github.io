import Layout from '../components/Layout';
import HtmlContent from '../components/HtmlContent';
import pageData from '../content/pages/404.json';

export default function Custom404() {
  return (
    <Layout title="404" description={pageData.description} extraScripts={["/assets/js/404-facts.js"]}>
      <HtmlContent html={pageData.bodyHtml} />
    </Layout>
  );
}
