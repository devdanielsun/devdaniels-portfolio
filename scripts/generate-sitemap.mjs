import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BASE_URL = "https://devdaniels.com";

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  return { data: yaml.load(match[1]), content: match[2].trim() };
}

function toIsoDate(value) {
  return /^\d{4}$/.test(value) ? `${value}-01-01` : value;
}

function loadArticles() {
  const registryPath = join(ROOT, "src/app/articles/articles.registry.ts");
  const registryContent = readFileSync(registryPath, "utf-8");
  const slugMatch = registryContent.match(/\[([^\]]+)\]/s);
  if (!slugMatch) return [];

  const slugs = slugMatch[1]
    .split(",")
    .map((s) => s.trim().replace(/['"]/g, ""))
    .filter(Boolean);

  const articles = [];
  for (const slug of slugs) {
    try {
      const raw = readFileSync(
        join(ROOT, `src/assets/articles/${slug}.md`),
        "utf-8",
      );
      const { data } = parseFrontmatter(raw);
      articles.push({ slug, ...data });
    } catch {
      // skip unreadable files
    }
  }
  return articles;
}

function loadTools() {
  const registryPath = join(ROOT, "src/app/tools/tools.registry.ts");
  const content = readFileSync(registryPath, "utf-8");
  const slugs = [...content.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
  return slugs;
}

function buildUrl(loc, lastmod, changefreq, priority) {
  return [
    "  <url>",
    `    <loc>${BASE_URL}${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function generate() {
  const today = new Date().toISOString().split("T")[0];
  const articles = loadArticles();
  const toolSlugs = loadTools();

  const urls = [];

  // Homepage
  urls.push(buildUrl("/", today, "monthly", "1.0"));

  // Articles list
  urls.push(buildUrl("/articles", today, "weekly", "0.8"));

  // Individual articles
  const categories = new Map();
  for (const a of articles) {
    if (!a.published) continue;
    const lastmod = toIsoDate(a.endDate || a.startDate || today);
    urls.push(buildUrl(`/articles/${a.slug}`, lastmod, "yearly", "0.6"));
    for (const cat of a.categories || []) {
      const existing = categories.get(cat);
      if (!existing || lastmod > existing) categories.set(cat, lastmod);
    }
  }

  // Category pages
  for (const [cat, lastmod] of categories) {
    const encoded = encodeURIComponent(cat);
    urls.push(
      buildUrl(`/articles/category/${encoded}`, lastmod, "monthly", "0.5"),
    );
  }

  // Tools list
  urls.push(buildUrl("/tools", today, "weekly", "0.8"));

  // Individual tools
  for (const slug of toolSlugs) {
    urls.push(buildUrl(`/tools/${slug}`, today, "monthly", "0.6"));
  }

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");

  const outPath = join(ROOT, "src/sitemap.xml");
  writeFileSync(outPath, sitemap, "utf-8");
  console.log(`Sitemap generated: ${urls.length} URLs → ${outPath}`);
}

generate();
