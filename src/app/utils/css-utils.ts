/**
 * Reads a CSS custom property value directly from :root.
 * Use for non-color values (e.g. unitless numbers like breakpoints) or
 * for explicit color variables that don't use light-dark().
 */
export function readCssVar(varName: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}
