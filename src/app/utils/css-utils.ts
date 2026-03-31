/**
 * Reads a CSS custom property value directly from :root.
 * Use for non-color values (e.g. unitless numbers like breakpoints).
 */
export function readCssVar(varName: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

/**
 * Resolves a CSS custom property to its computed RGB color string,
 * forcing the browser to evaluate `light-dark()` and other CSS functions
 * that aren't readable directly via `getComputedStyle` on `:root`.
 */
export function resolveCssColor(varName: string): string {
  const el = document.createElement('div');
  el.style.display = 'none';
  el.style.backgroundColor = `var(${varName})`;

  document.body.appendChild(el);
  const resolved = getComputedStyle(el).backgroundColor;
  document.body.removeChild(el);

  return resolved.trim();
}
