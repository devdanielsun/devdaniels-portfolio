import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollorArticle } from './pollor.article';

describe('PollorArticle', () => {
  let component: PollorArticle;
  let fixture: ComponentFixture<PollorArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollorArticle],
    }).compileComponents();

    fixture = TestBed.createComponent(PollorArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
