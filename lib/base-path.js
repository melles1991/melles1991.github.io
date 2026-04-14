export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');

export function withBasePath(path = '') {
  if (!path) return path;
  if (/^(https?:|mailto:|tel:|#|data:)/.test(path)) return path;
  if (!path.startsWith('/')) return path;
  return `${basePath}${path}`;
}

export function toAbsoluteUrl(path = '') {
  if (!path) return siteUrl || path;
  if (/^https?:\/\//.test(path)) return path;
  const normalizedPath = path.startsWith('/') ? withBasePath(path) : path;
  if (!siteUrl) return normalizedPath;
  if (/^(mailto:|tel:|#|data:)/.test(normalizedPath)) return normalizedPath;
  return `${siteUrl}${normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`}`;
}

export function patchHtml(html = '') {
  let output = html;

  if (siteUrl) {
    output = output.replace(/https?:\/\/localhost:\d+/g, siteUrl);
  }

  if (!basePath) return output;

  return output
    .replace(/((?:href|src)=["'])\/(?!\/)/g, `$1${basePath}/`)
    .replace(/(content=["'])\/(assets|favicon\.ico|robots\.txt|sitemap\.xml)/g, `$1${basePath}/$2`)
    .replace(/url\((["']?)\/(?!\/)/g, `url($1${basePath}/`);
}
