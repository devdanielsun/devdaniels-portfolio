import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Codeerts } from './codeerts.article';

describe('TerraformCicdPipeline', () => {
  let component: Codeerts;
  let fixture: ComponentFixture<Codeerts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Codeerts],
    }).compileComponents();

    fixture = TestBed.createComponent(Codeerts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
