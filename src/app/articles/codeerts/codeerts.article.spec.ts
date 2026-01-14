import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeertsArticle } from './codeerts.article';

describe('TerraformCicdPipeline', () => {
  let component: CodeertsArticle;
  let fixture: ComponentFixture<CodeertsArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeertsArticle],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeertsArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
