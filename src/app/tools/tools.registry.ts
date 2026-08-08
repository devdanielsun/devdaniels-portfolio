import { Type } from '@angular/core';
import { ToolMeta } from '../models/tool.model';

export interface ToolRegistryEntry extends ToolMeta {
  loadComponent: () => Promise<Type<unknown>>;
}

export const TOOLS: ToolRegistryEntry[] = [
  {
    slug: 'qr-code-creator',
    title: 'QR Code Creator',
    shortDescription: 'Generate QR codes from text or URLs',
    categories: ['Generators'],
    icon: 'faSolidQrcode',
    loadComponent: () =>
      import('./qr-code-creator.tool/qr-code-creator.tool').then(
        (m) => m.QrCodeCreatorTool,
      ),
  },
];
