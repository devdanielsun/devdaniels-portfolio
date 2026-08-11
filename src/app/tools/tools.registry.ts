import { Type } from '@angular/core';
import { ToolMeta } from '../models/tool.model';
import { faSolidQrcode } from '@ng-icons/font-awesome/solid';
import { faSolidCodeCompare } from '@ng-icons/font-awesome/solid';

export interface ToolRegistryEntry extends ToolMeta {
  iconRef: string;
  loadComponent: () => Promise<Type<unknown>>;
}

export const TOOLS: ToolRegistryEntry[] = [
  {
    slug: 'qr-code-creator',
    title: 'QR Code Creator',
    shortDescription: 'Generate QR codes from text or URLs',
    categories: ['Generators'],
    icon: 'faSolidQrcode',
    iconRef: faSolidQrcode,
    loadComponent: () =>
      import('./qr-code-creator.tool/qr-code-creator.tool').then(
        (m) => m.QrCodeCreatorTool,
      ),
  },
  {
    slug: 'text-differences',
    title: 'Text Differences',
    shortDescription: 'Compare text to find differences',
    categories: ['Utilities'],
    icon: 'faSolidCodeCompare',
    iconRef: faSolidCodeCompare,
    loadComponent: () =>
      import('./text-differences.tool/text-differences.tool').then(
        (m) => m.TextDifferencesTool,
      ),
  },
];

export const TOOL_ICONS: Record<string, string> = Object.fromEntries(
  TOOLS.map((t) => [t.icon, t.iconRef]),
);
