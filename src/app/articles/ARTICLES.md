# How to add an Article

Articles are Markdown files with YAML frontmatter. Each article lives in `src/assets/articles/<slug>.md`.

---

## 1. Create the Markdown file

Create `src/assets/articles/<your-slug>.md`. The file must start with a YAML frontmatter block that maps to the `Article` model (`src/app/models/article.model.ts`):

```markdown
---
published: false
slug: your-slug
author: Daniël Geerts
title: Your Article Title
startDate: "2025"
endDate: "2025"          # optional
shortDescription: "A short summary shown on the articles list page."
categories:
  - Project
  - Web Development
featuredImage:            # optional
  altText: Alt text for the image
  srcPath: assets/images/project/your-slug/your-image.png
githubRepo:               # optional
  label: Github - Your Project
  link: https://github.com/devdanielsun/your-repo
tags:                     # optional
  - Angular
  - Typescript
---

Your article content in **Markdown** goes here.

## Section heading

Regular paragraphs, lists, links, code blocks — all standard Markdown is supported.
```

### Frontmatter field reference

| Field              | Type      | Required | Description                                      |
|--------------------|-----------|----------|--------------------------------------------------|
| `published`        | boolean   | ✅       | `false` = draft (only visible in dev mode)       |
| `slug`             | string    | ✅       | Must match the filename and the registry entry   |
| `author`           | string    | ✅       | Author display name                              |
| `title`            | string    | ✅       | Article title                                    |
| `startDate`        | string    | ✅       | Year or date string, e.g. `"2025"`               |
| `endDate`          | string    | ❌       | Year or date string; omit for ongoing            |
| `shortDescription` | string    | ✅       | Summary shown on the articles list page          |
| `categories`       | string[]  | ✅       | Used for category filtering                      |
| `featuredImage`    | object    | ❌       | `altText` + `srcPath` (relative to `src/`)       |
| `githubRepo`       | object    | ❌       | `label` + `link`                                 |
| `tags`             | string[]  | ❌       | Technology/keyword tags                          |

---

## 2. Register the article

Open `src/app/articles/articles.registry.ts` and add your slug to `ARTICLE_SLUGS`:

```typescript
export const ARTICLE_SLUGS: string[] = [
  'codeerts',
  // ... existing slugs ...
  'your-slug',  // ← add here
];
```

---

## 3. Test locally

Start the dev server (`npm start`) and navigate to `/articles/your-slug`.  
Unpublished articles (`published: false`) are visible in dev mode but hidden in production.

Set `published: true` when the article is ready to ship.

