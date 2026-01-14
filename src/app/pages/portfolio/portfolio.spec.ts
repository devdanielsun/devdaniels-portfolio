import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Portfolio } from './portfolio';

describe('Portfolio', () => {
  let component: Portfolio;
  let fixture: ComponentFixture<Portfolio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portfolio],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({}) },
            paramMap: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Portfolio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
