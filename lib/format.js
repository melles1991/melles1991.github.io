export function formatNumber(value) {
  if (value === null || value === undefined) return '0';
  return new Intl.NumberFormat('uk-UA').format(Math.round(Number(value)));
}

export function formatScore(value) {
  if (!value) return null;
  return new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 1 }).format(Number(value));
}

export function formatDateLabel(input) {
  if (!input) return '';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function getCharacterClassSlug(className = '') {
  return className.toLowerCase().replace(/[^a-z]+/g, '-').replace(/(^-|-$)/g, '');
}

export function compactList(items = [], max = 3) {
  const safe = items.filter(Boolean);
  return {
    visible: safe.slice(0, max),
    hidden: safe.slice(max),
  };
}
