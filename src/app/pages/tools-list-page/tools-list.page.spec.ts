import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ToolsListPage } from './tools-list.page';
import { SeoService } from '../../services/seo.service';

describe('ToolsListPage', () => {
  let component: ToolsListPage;
  let fixture: ComponentFixture<ToolsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsListPage],
      providers: [
        { provide: SeoService, useValue: { update: jasmine.createSpy() } },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
