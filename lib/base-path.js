export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path = '') {
  if (!path) return path;
  if (/^(https?:|mailto:|tel:|#|data:)/.test(path)) return path;
  if (!path.startsWith('/')) return path;
  return `${basePath}${path}`;
}

export function patchHtml(html = '') {
  if (!basePath) return html;
  return html
    .replace(/((?:href|src)=["'])\/(?!\/)/g, `$1${basePath}/`)
    .replace(/(content=["'])\/(assets|favicon\.ico|robots\.txt|sitemap\.xml)/g, `$1${basePath}/$2`)
    .replace(/url\((["']?)\/(?!\/)/g, `url($1${basePath}/`);
}
