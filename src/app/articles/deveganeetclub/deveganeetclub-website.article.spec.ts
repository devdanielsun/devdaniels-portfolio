import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeVeganEetClubArticle } from './deveganeetclub-website.article';

describe('DeVeganEetClubArticle', () => {
  let component: DeVeganEetClubArticle;
  let fixture: ComponentFixture<DeVeganEetClubArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeVeganEetClubArticle],
    }).compileComponents();

    fixture = TestBed.createComponent(DeVeganEetClubArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
