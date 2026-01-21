import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbmCicdCasestudyArticle } from './ibm-cicd-casestudy.article';

describe('IbmCicdCasestudyArticle', () => {
  let component: IbmCicdCasestudyArticle;
  let fixture: ComponentFixture<IbmCicdCasestudyArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IbmCicdCasestudyArticle],
    }).compileComponents();

    fixture = TestBed.createComponent(IbmCicdCasestudyArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
