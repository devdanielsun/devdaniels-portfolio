import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevDanielsWebsiteArticle } from './devdaniels-website.article';

describe('DevDanielsWebsiteArticle', () => {
  let component: DevDanielsWebsiteArticle;
  let fixture: ComponentFixture<DevDanielsWebsiteArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevDanielsWebsiteArticle],
    }).compileComponents();

    fixture = TestBed.createComponent(DevDanielsWebsiteArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
