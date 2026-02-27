import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { PortfolioPage } from './portfolio.page';

describe('PortfolioPage', () => {
  let component: PortfolioPage;
  let fixture: ComponentFixture<PortfolioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioPage],
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

    fixture = TestBed.createComponent(PortfolioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
