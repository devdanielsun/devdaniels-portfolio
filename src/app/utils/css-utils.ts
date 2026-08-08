/**
 * Reads a CSS custom property value directly from :root.
 * Use for non-color values (e.g. unitless numbers like breakpoints) or
 * for explicit color variables that don't use light-dark().
 *
 * Must be called only in a browser context (guarded by isPlatformBrowser).
 */
export function readCssVar(varName: string): string {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}
