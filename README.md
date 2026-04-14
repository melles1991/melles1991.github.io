# Sebas site — Next.js static export

Це міграція сайту на Next.js зі static export для GitHub Pages.

## Що вже працює

- статичний білд через `output: 'export'`
- автоматичний деплой через GitHub Actions
- автообчислення `basePath` для `username.github.io/repo`
- підтримка custom domain через GitHub Pages
- примусовий `.nojekyll`, щоб Pages не ламав `_next` та інші службові каталоги
- автоматична синхронізація legacy `_data/*.yml` у `content/data/*.json` перед білдом

## Локальний запуск

```bash
npm install
npm run content:sync
npm run dev
```

## Локальний production build

```bash
npm install
npm run build:pages
```

Готовий статичний сайт буде в папці `out/`.

## Як увімкнути GitHub Pages

1. Закоміть увесь проєкт у репозиторій.
2. У GitHub відкрий **Settings → Pages**.
3. У **Build and deployment** вибери **Source: GitHub Actions**.
4. Запуш у `main` або `master`.

GitHub офіційно підтримує Pages через workflow з `configure-pages`, `upload-pages-artifact` і `deploy-pages`. Цей проєкт уже налаштований саме так.

## Варіант 1 — repo Pages

Приклад URL:

```text
https://USERNAME.github.io/REPO
```

Нічого додатково задавати не треба. Workflow сам визначить:

- `basePath = /REPO`
- `siteUrl = https://USERNAME.github.io/REPO`

## Варіант 2 — custom domain

Приклад:

```text
https://lihvodruida.pp.ua
```

У репозиторії треба створити **Repository variable**:

- `PAGES_CNAME = lihvodruida.pp.ua`

Після цього workflow автоматично:

- збере сайт без `basePath`
- створить `out/CNAME`
- виставить правильний `NEXT_PUBLIC_SITE_URL`

## Необов'язкові змінні репозиторію

### `PAGES_CNAME`
Для власного домену.

### `PAGES_BASE_PATH`
Потрібно тільки якщо ти свідомо хочеш нестандартний підшлях. У звичайному випадку **не чіпай**.

## Команди

```bash
npm run content:sync   # оновити JSON з legacy YAML
npm run build          # зібрати Next export
npm run build:pages    # sync + build одним кроком
```

## Що ще варто добити далі

- повністю винести `guild` з HTML snapshot у нативні React-компоненти
- прибрати залишки HTML body snapshot у деталях guides/news
- додати sitemap/robots генерацію з поточного content layer
