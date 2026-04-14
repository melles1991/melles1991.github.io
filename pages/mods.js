import Layout from '../components/Layout';
import HtmlContent from '../components/HtmlContent';
import pageData from '../content/pages/mods.json';

export default function Page() {
  return (
    <Layout title="Мої Адони" description={pageData.description}>
      <HtmlContent html={pageData.bodyHtml} />
    </Layout>
  );
}
