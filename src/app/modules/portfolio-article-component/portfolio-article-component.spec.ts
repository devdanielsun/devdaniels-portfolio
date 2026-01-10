import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioArticleComponent } from './portfolio-article-component';

describe('PortfolioArticleComponent', () => {
  let component: PortfolioArticleComponent;
  let fixture: ComponentFixture<PortfolioArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
