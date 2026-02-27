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

After making code changes, always run lint and format before committing:
```bash
npm run lint       # must pass with no errors
npm run format     # auto-fixes formatting in place
```

The pre-commit hook enforces `lint → format → test` in order.

## Architecture

This is an **Angular 20 standalone-component portfolio app** deployed to Azure Static Web Apps.

### Article system
Articles are **Markdown files with YAML frontmatter** in `src/assets/articles/<slug>.md`. The frontmatter maps 1:1 to the `Article` interface in `article.model.ts` (published, slug, title, author, startDate, endDate, categories, tags, featuredImage, githubRepo).

**To add an article:** create the `.md` file, then add the slug to `ARTICLE_SLUGS` in `src/app/articles/articles.registry.ts`. See `src/app/articles/ARTICLES.md` for the full guide.

**Routing/loading flow:**
1. `/:slug` route → `articleResolver` (functional `ResolveFn`) loads the `.md` file via HTTP, parses frontmatter, validates `published` flag
2. Resolver returns `ResolvedArticle = { article: Article; markdownContent: string }` stored under route data key `article`
3. `ArticleComponent` reads `data.article.article` (metadata) to render the header/breadcrumb
4. `ArticleLoaderComponent` reads `data.article.markdownContent`, converts it to HTML with `marked`, and renders via `[innerHTML]` + `DomSanitizer`

In dev mode (`isDevMode()`), unpublished articles are visible; in production they redirect to 404.

**Articles list:** `ArticlesService` uses `forkJoin` to load all slugs from the registry in parallel, parses frontmatter for metadata, and caches with `shareReplay(1)`. Frontmatter is parsed via `src/app/utils/frontmatter.parser.ts` (uses `js-yaml`).

**Key files:** `src/app/articles/articles.registry.ts`, `src/app/utils/frontmatter.parser.ts`, `src/app/resolvers/article.resolver.ts`, `src/app/components/article-component/article-loader.component.ts`

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
