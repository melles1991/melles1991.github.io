# Sebas site — Next.js static export migration

Це міграційна база для переходу з Jekyll на **Next.js + static export** під **GitHub Pages**.

## Що вже зроблено

- перенесено основні сторінки у Next.js
- збережено наявні CSS, зображення та JS-асети
- додано `output: 'export'` для статичного білду
- додано workflow для GitHub Pages через GitHub Actions
- підтримано `NEXT_PUBLIC_BASE_PATH` для repo Pages
- залишено `legacy-src/` з оригінальними `_data`, `_guides` та Python-скриптами як референс

## Локальний запуск

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
```

Готовий статичний сайт буде в папці `out/`.

## GitHub Pages

### Custom domain

Якщо сайт працює з власного домену, залиш:

```yaml
NEXT_PUBLIC_BASE_PATH: ""
```

### Repo Pages

Якщо сайт буде відкриватися як `https://USER.github.io/REPO`, вкажи:

```yaml
NEXT_PUBLIC_BASE_PATH: "/REPO"
```

Приклад:

```yaml
NEXT_PUBLIC_BASE_PATH: "/sebas-site"
```

## Що бажано доробити далі

1. перенести `_data` у нативний data layer Next.js
2. замінити snapshot HTML сторінок на чисті React-компоненти
3. прибрати залишкову залежність від legacy-структури контенту
