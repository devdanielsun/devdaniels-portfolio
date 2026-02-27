import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { ArticlesListPage } from './articles-list.page';

describe('ArticlesListPage', () => {
  let component: ArticlesListPage;
  let fixture: ComponentFixture<ArticlesListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesListPage],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({}) },
            paramMap: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
