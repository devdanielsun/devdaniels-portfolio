import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernDinosaursArticle } from './modern-dinosaurs.article';

describe('ModernDinosaursArticle', () => {
  let component: ModernDinosaursArticle;
  let fixture: ComponentFixture<ModernDinosaursArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModernDinosaursArticle],
    }).compileComponents();

    fixture = TestBed.createComponent(ModernDinosaursArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
