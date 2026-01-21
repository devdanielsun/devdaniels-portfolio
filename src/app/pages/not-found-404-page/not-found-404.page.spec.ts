import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NotFound404Page } from './not-found-404.page';

describe('NotFound404Page', () => {
  let component: NotFound404Page;
  let fixture: ComponentFixture<NotFound404Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound404Page],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({}) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound404Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
