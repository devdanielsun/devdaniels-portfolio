import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidCircleInfo } from '@ng-icons/font-awesome/solid';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-qr-code-creator.tool',
  imports: [QRCodeComponent, NgIconComponent, MatTooltipModule],
  providers: [provideIcons({ faSolidCircleInfo })],
  templateUrl: './qr-code-creator.tool.html',
  styleUrl: './qr-code-creator.tool.scss',
})
export class QrCodeCreatorTool {
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  qrCodeContent = signal('https://devdaniels.com');
  qrCodeForegroundColor = signal('#000000');
  qrCodeBackgroundColor = signal('#ffffff');
  errorCorrectionLevel = signal<'L' | 'M' | 'Q' | 'H'>('M');
  width = signal(256);
  margin = signal(4);
  downloadFormat = signal<'png' | 'svg'>('png');
  elementType = computed<'canvas' | 'svg'>(() =>
    this.downloadFormat() === 'svg' ? 'svg' : 'canvas',
  );

  public qrCodeDownloadLink: SafeUrl = '';

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
