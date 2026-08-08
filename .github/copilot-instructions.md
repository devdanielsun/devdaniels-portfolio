# Copilot Instructions

## Commands

```bash
npm start          # dev server at http://localhost:4200
npm run build      # production build → dist/
npm test           # run all tests (ChromeHeadless, no watch)
npm run lint       # ESLint via angular-eslint
npm run format     # Prettier on src/**/*.{ts,html,scss}
```

Run a single test file:

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include="src/app/path/to/file.spec.ts"
```

After making code changes, always run lint and format before committing:

```bash
npm run lint && npm run format
```

The pre-commit hook enforces `lint → format → test` in order.

## Conventions — Always / Never

**Always:**

- Use **standalone components** (`standalone: true`, explicit `imports: []`) — never `@NgModule`
- Use **`inject()`** for dependency injection — never constructor injection
- Use **signals** (`signal`, `computed`, `toSignal`) for reactive state — avoid manual subscriptions where signals suffice
- Use **`isPlatformBrowser(inject(PLATFORM_ID))`** before any browser-only API (DOM, DOMPurify, particles, localStorage)
- Call **`SeoService.update()`** in `ngOnInit` for every new page component
- Use **`catchError`** locally in services/resolvers — there is no global error handler
- Name files `<name>.<type>.ts` — e.g. `article.resolver.ts`, `articles.service.ts`, `portfolio.page.ts`
- **Update `.github/copilot-instructions.md`** when you make any of these changes:
  - `Article` interface fields change → update the interface block in [Article system](#article-system)
  - A new service, page, or component is added or removed → update [Pages & services](#pages--services)
  - `SeoService.update()` signature changes → update the call example in [SEO](#seo)
  - A new design pattern or constraint is introduced → add it to [Always/Never](#conventions--always--never)
  - A new icon set or `@ng-icons` package is added → update the [Icons](#icons) table

**Never:**

- Never use inline SVGs — use `<ng-icon>` from `@ng-icons/*` (see [Icons](#icons))
- Never use Angular Material button directives (`mat-button`, `mat-stroked-button`, etc.) for custom styled buttons — use `.old-skool-button` (see [Buttons](#neo-brutalism-buttons))
- Never create non-standalone components or use `@NgModule`
- Never subscribe manually if a signal or `toSignal()` can replace it

## Testing

Uses **Karma + Jasmine**. Tests live next to their source file as `*.spec.ts`.

```typescript
import { TestBed } from "@angular/core/testing";
import { MyComponent } from "./my.component";

describe("MyComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent], // standalone — import, don't declare
    }).compileComponents();
  });

  it("should create", () => {
    const fixture = TestBed.createComponent(MyComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
```

- Import standalone components/pipes directly into `TestBed` — do not use `declarations`
- Mock services with `{ provide: MyService, useValue: { method: jasmine.createSpy() } }`

## Architecture

This is an **Angular standalone-component portfolio app** deployed to Azure Static Web Apps with SSR/prerendering.

### Pages & services

**Pages** (`src/app/pages/`):

- `PortfolioPage` — `/`, landing page with tabs and particle animation; embeds `ArticlesListPage` inline
- `ArticlesListPage` — `/articles` and `/articles/category/:category`; embeddable via `@Input() onlyShowArticles` / `@Input() maxItemsToShow`
- `NotFound404Page` — `**` catch-all; sets `robots: noindex` via Angular's `Meta` service directly (not `SeoService`)

**Components** (`src/app/components/`):

- `ContainerComponent` — layout wrapper; `@Input() hideContainerView`
- `ArticleComponent` — article shell (breadcrumbs, metadata sidebar, GitHub button); uses `toSignal` + `computed` to read nested child route data
- `ArticleLoaderComponent` — markdown → sanitized HTML; calls `SeoService.update()`

**Services** (`src/app/services/`):

- `SeoService` — meta tags, canonical URL, OpenGraph, Twitter Cards, JSON-LD schemas
- `ArticlesService` — loads, caches (`shareReplay(1)`), and filters articles

**Nav bar** is auto-generated from `app.routes.ts` — routes with a `title` that are not `**`/404 appear automatically. Add `data: { navTitle: '...' }` for the display label.

### Article system

Articles are **Markdown + YAML frontmatter** files in `src/assets/articles/<slug>.md`.

**To add an article:** create the `.md` file, add the slug to `ARTICLE_SLUGS` in `src/app/articles/articles.registry.ts`. See `src/app/articles/ARTICLES.md` for the full guide.

The `Article` interface (`src/app/models/article.model.ts`):

```typescript
interface Article {
  published: boolean;
  slug: string;
  author: Author; // enum: Author.DanielGeerts
  title: string;
  startDate: string;
  endDate?: string; // defaults to "present" in UI
  shortDescription: string;
  categories: string[];
  featuredImage?: { altText: string; srcPath: string };
  githubRepo?: { link: string; label: string };
  tags?: string[];
}
```

**Loading flow (for context):**

1. `articleResolver` fetches the `.md`, parses frontmatter with `parseFrontmatter<Article>()` (`src/app/utils/frontmatter.parser.ts`), redirects to 404 if unpublished in prod
2. Returns `ResolvedArticle = { article: Article; markdownContent: string }` under route data key `article`
3. `ArticleComponent` renders metadata sidebar; `ArticleLoaderComponent` renders markdown body

### SEO

Call `SeoService.update()` in every page's `ngOnInit`:

```typescript
this.seo.update({
  title: "Page Title",
  description: "Short description",
  url: "/path", // appended to https://devdaniels.com
  image: "assets/...", // optional; falls back to default profile picture
  type: "article" | "website", // controls JSON-LD schema; default: 'website'
  article: {
    // only for type === 'article'
    author: a.author,
    publishedTime: a.startDate,
    tags: a.tags,
  },
  breadcrumbs: [
    // generates BreadcrumbList JSON-LD
    { name: "Home", url: "/" },
    { name: "Articles", url: "/articles" },
    { name: a.title, url: `/articles/${a.slug}` },
  ],
});
```

Exception: `NotFound404Page` uses Angular's `Meta` service directly to set `robots: noindex`.

### SSR & prerendering

`src/app/app.routes.server.ts` prerendering resolves dynamic routes at build time (`/articles/:slug`, `/articles/category/:category`). Always guard browser-only code:

```typescript
private platformId = inject(PLATFORM_ID);

if (isPlatformBrowser(this.platformId)) {
  // browser-only code here
}
```

## Design System

### Theming

Dark/light theme toggled via `html.dark-theme` / `html.light-theme`, persisted in `localStorage`. Uses Angular Material M3: `mat.$cyan-palette` (dark), `mat.$azure-palette` (light). Always use `var(--mat-sys-*)` CSS variables — never hardcode colors.

### Neo-brutalism buttons

Use `.old-skool-button` for all custom buttons and button-like links. Never use Angular Material button directives.

```html
<a href="..." class="old-skool-button old-skool-button--primary">Label</a> <button class="old-skool-button old-skool-button--secondary">Label</button>
```

Modifiers: `--primary` (`--mat-sys-primary` bg) · `--secondary` (`--mat-sys-secondary` bg)

Style: bold black border, `-4px 4px 0px black` box-shadow, translate + shadow-removal on hover.

### Icons

Use `<ng-icon>` from `@ng-icons/*` — never inline SVGs.

| Package                  | Prefix example   | Use case             |
| ------------------------ | ---------------- | -------------------- |
| `@ng-icons/simple-icons` | `simpleGithub`   | Brand/logo icons     |
| `@ng-icons/devicon`      | `diAngularPlain` | Dev-tool brand icons |
| `@ng-icons/font-awesome` | `faSolidCode`    | UI / general icons   |

```typescript
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';

@Component({
  imports: [NgIconComponent],
  providers: [provideIcons({ simpleGithub })],
})
```

```html
<ng-icon name="simpleGithub" size="1.2em" />
```

### Responsive breakpoints

`src/variables.scss` — import with `@use "variables" as vars;`

```scss
@include vars.respond-to(mobile) // max-width: 769px
  @include vars.respond-to(tablet); // max-width: 1024px
```
