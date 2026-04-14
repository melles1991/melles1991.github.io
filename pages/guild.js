import Layout from '../components/Layout';
import HtmlContent from '../components/HtmlContent';
import pageData from '../content/pages/guild.json';

export default function Page() {
  return (
    <Layout title="Статистика гільдії" description={pageData.description} extraScripts={["/assets/js/guild-stats.js", "/assets/js/guild-roster-search.js"]}>
      <HtmlContent html={pageData.bodyHtml} />
    </Layout>
  );
}
