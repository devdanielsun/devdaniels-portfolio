import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeertsComponent } from './codeerts.component';

describe('CodeertsComponent', () => {
  let component: CodeertsComponent;
  let fixture: ComponentFixture<CodeertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeertsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
