import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeCreatorTool } from './qr-code-creator.tool';

describe('QrCodeCreatorTool', () => {
  let component: QrCodeCreatorTool;
  let fixture: ComponentFixture<QrCodeCreatorTool>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrCodeCreatorTool],
    }).compileComponents();

    fixture = TestBed.createComponent(QrCodeCreatorTool);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
