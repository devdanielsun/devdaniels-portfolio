import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SvgLoaderService {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  loadSvg(path: string) {
    return this.http
      .get(path, { responseType: 'text' })
      .pipe(map((svg) => this.sanitizer.bypassSecurityTrustHtml(svg)));
  }
}
