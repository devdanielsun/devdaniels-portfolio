import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qr-code-creator.tool',
  imports: [QRCodeComponent],
  templateUrl: './qr-code-creator.tool.html',
  styleUrl: './qr-code-creator.tool.scss',
})
export class QrCodeCreatorTool {
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  qrCodeContent = signal('https://devdaniels.com');
  qrCodeForegroundColor = signal('#000000');
  qrCodeBackgroundColor = signal('#ffffff');

  public qrCodeDownloadLink: SafeUrl = '';

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
