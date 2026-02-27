# Copilot Instructions

## Commands

```bash
npm start          # dev server at http://localhost:4200
npm run build      # production build → dist/
npm test           # run all tests (ChromeHeadless, no watch)
npm run lint       # ESLint via angular-eslint
npm run format     # Prettier on src/**/*.{ts,html,scss}
```

Run a single test file with Karma's `--include` flag:
```bash
npx ng test --watch=false --browsers=ChromeHeadless --include="src/app/articles/codeerts/codeerts.article.spec.ts"
```

The pre-commit hook runs `lint → format → test` in order.

## Architecture

This is an **Angular 20 standalone-component portfolio app** deployed to Azure Static Web Apps.

### Article system
Articles are **Angular components** (not markdown files), each living in `src/app/articles/<slug>/`. Every article exports:
- A `const ARTICLE_XXXX: Article` metadata object (title, slug, dates, categories, tags, `published` flag)
- An `@Component` class that renders the article HTML

**Registration:** Add both exports to `src/app/articles/articles.registery.ts` — both the metadata entry in `ARTICLE_REGISTRY` and the `loadComponent` promise.

**Routing flow:** `/:slug` → `ArticleResolver` (validates slug + `published`) → `ArticleLoaderComponent` (dynamically creates the component via `ViewContainerRef`) — the article component is rendered inside `ArticleComponent`'s router-outlet.

In dev mode (`isDevMode()`), unpublished articles are visible; in production they redirect to 404.

### Pages & components
- `src/app/pages/` — route-level page components (`PortfolioPage`, `ArticlesListPage`, `NotFound404Page`)
- `src/app/components/` — shared components (`ContainerComponent` for layout wrapper, `ArticleComponent`/`ArticleLoaderComponent` for article rendering)
- `src/app/services/` — `ArticlesService` (wraps registry, sorts by year), `SvgLoaderService`
- `src/app/resolvers/` — `ArticleResolver`

### Theming
Dark/light theme is toggled via `html.dark-theme` / `html.light-theme` classes and persisted in `localStorage`. Angular Material M3 theming uses `mat.$cyan-palette` (dark) and `mat.$azure-palette` (light), configured in `src/styles.scss`. Use `var(--mat-sys-*)` CSS variables for color references.

### Responsive breakpoints
Defined in `src/variables.scss` as SCSS variables and a `respond-to()` mixin:
- `$break-mobile: 769px`
- `$break-tablet: 1024px`

Import with `@use "variables" as vars;` and use `@include vars.respond-to(mobile)` / `@include vars.respond-to(tablet)`.

## Key Conventions

- All components use **standalone component** style (`standalone: true`, explicit `imports: []`).
- Use Angular's **`inject()`** function instead of constructor injection.
- Use **signals** (`computed`, `toSignal`) for reactive state; avoid manual subscriptions where signals suffice.
- File naming: `<name>.<type>.ts` — e.g., `codeerts.article.ts`, `article.resolver.ts`, `articles.service.ts`.
- The nav bar is auto-generated from `app.routes.ts` — routes with a `title` and not `**`/`404` appear automatically; add `data: { navTitle: '...' }` for the display label.
- `ArticlesService.getArticles()` returns articles sorted newest-first by `startDate` year.
