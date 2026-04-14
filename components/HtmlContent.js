import { patchHtml } from '../lib/base-path';

export default function HtmlContent({ html, className }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: patchHtml(html) }} />;
}
