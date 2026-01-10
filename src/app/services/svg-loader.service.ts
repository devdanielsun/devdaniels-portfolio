import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SvgLoaderService {
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  loadSvg(path: string) {
    return this.http
      .get(path, { responseType: 'text' })
      .pipe(map((svg) => this.sanitizer.bypassSecurityTrustHtml(svg)));
  }
}
