import Head from 'next/head';
import Script from 'next/script';
import Sidebar from './Sidebar';
import siteMeta from '../content/site-meta.json';
import { toAbsoluteUrl, withBasePath } from '../lib/base-path';

export default function Layout({ title, description, image, children, extraScripts = [], inlineScripts = [] }) {
  const pageTitle = title ? `${title} — ${siteMeta.siteTitle}` : siteMeta.siteTitle;
  const pageDescription = description || siteMeta.siteDescription;
  const pageImage = toAbsoluteUrl(image || siteMeta.defaultImage);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={pageDescription} />
        <meta name="theme-color" content={siteMeta.themeColor} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="apple-touch-icon" sizes="57x57" href={withBasePath('/assets/favicon/apple-icon-57x57.png')} />
        <link rel="apple-touch-icon" sizes="60x60" href={withBasePath('/assets/favicon/apple-icon-60x60.png')} />
        <link rel="apple-touch-icon" sizes="72x72" href={withBasePath('/assets/favicon/apple-icon-72x72.png')} />
        <link rel="apple-touch-icon" sizes="76x76" href={withBasePath('/assets/favicon/apple-icon-76x76.png')} />
        <link rel="apple-touch-icon" sizes="114x114" href={withBasePath('/assets/favicon/apple-icon-114x114.png')} />
        <link rel="apple-touch-icon" sizes="120x120" href={withBasePath('/assets/favicon/apple-icon-120x120.png')} />
        <link rel="apple-touch-icon" sizes="144x144" href={withBasePath('/assets/favicon/apple-icon-144x144.png')} />
        <link rel="apple-touch-icon" sizes="152x152" href={withBasePath('/assets/favicon/apple-icon-152x152.png')} />
        <link rel="apple-touch-icon" sizes="180x180" href={withBasePath('/assets/favicon/apple-icon-180x180.png')} />
        <link rel="icon" type="image/png" sizes="192x192" href={withBasePath('/assets/favicon/android-icon-192x192.png')} />
        <link rel="icon" type="image/png" sizes="32x32" href={withBasePath('/assets/favicon/favicon-32x32.png')} />
        <link rel="icon" type="image/png" sizes="96x96" href={withBasePath('/assets/favicon/favicon-96x96.png')} />
        <link rel="icon" type="image/png" sizes="16x16" href={withBasePath('/assets/favicon/favicon-16x16.png')} />
        <link rel="manifest" href={withBasePath('/assets/favicon/manifest.json')} />
        <meta name="msapplication-config" content={withBasePath('/assets/favicon/browserconfig.xml')} />
        <meta name="msapplication-TileColor" content="#2a2118" />
        <meta name="msapplication-TileImage" content={withBasePath('/assets/favicon/ms-icon-144x144.png')} />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="" />
        <link rel="preconnect" href="https://wow.zamimg.com" crossOrigin="" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>

      <Script id="wowhead-config" strategy="beforeInteractive">{`window.whTooltips = { colorLinks: true, iconizeLinks: false, renameLinks: false, iconSize: 'small' };`}</Script>
      <Script src="https://wow.zamimg.com/js/tooltips.js" strategy="afterInteractive" />
      <Script src={withBasePath('/assets/js/wowhead-tooltips.js')} strategy="afterInteractive" />
      <Script src={withBasePath('/assets/js/mobile-menu.js')} strategy="afterInteractive" />
      <Script id="global-copy-link" strategy="afterInteractive">{`
        window.copyLink = function copyLink() {
          const copyValue = window.location.href;
          const textSpan = document.getElementById('copyText');
          const button = document.querySelector('.copy-btn');
          const originalText = textSpan ? textSpan.innerText : 'Копіювати';
          const onSuccess = () => {
            if (!textSpan) return;
            textSpan.innerText = 'Скопійовано!';
            if (button) button.classList.add('copied');
            setTimeout(() => {
              textSpan.innerText = originalText;
              if (button) button.classList.remove('copied');
            }, 2000);
          };

          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(copyValue).then(onSuccess);
            return;
          }

          const tempInput = document.createElement('input');
          tempInput.value = copyValue;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          onSuccess();
        };
      `}</Script>
      {extraScripts.map((src) => <Script key={src} src={withBasePath(src)} strategy="afterInteractive" />)}
      {inlineScripts.map((script, index) => (
        <Script id={`inline-script-${index}`} key={`inline-script-${index}`} strategy="afterInteractive">{script}</Script>
      ))}

      <div className="layout">
        <aside className="sidebar"><Sidebar /></aside>
        <main>{children}</main>
      </div>
    </>
  );
}
