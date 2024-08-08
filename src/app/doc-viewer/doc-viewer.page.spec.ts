import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocViewerPage } from './doc-viewer.page';

describe('DocViewerPage', () => {
  let component: DocViewerPage;
  let fixture: ComponentFixture<DocViewerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DocViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
