import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NotFound404 } from './not-found-404.page';

describe('NotFound404', () => {
  let component: NotFound404;
  let fixture: ComponentFixture<NotFound404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound404],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({}) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound404);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
