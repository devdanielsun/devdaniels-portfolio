import * as yaml from 'js-yaml';

export interface ParsedMarkdown<T> {
  data: T;
  content: string;
}

/**
 * Parses a markdown string that starts with a YAML frontmatter block (--- ... ---).
 * Returns the parsed frontmatter as `data` and the remaining markdown body as `content`.
 */
export function parseFrontmatter<T>(raw: string): ParsedMarkdown<T> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {} as T, content: raw };
  }
  const data = yaml.load(match[1]) as T;
  const content = match[2].trim();
  return { data, content };
}
