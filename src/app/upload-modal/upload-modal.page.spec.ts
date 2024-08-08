import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { UploadModalPage } from './upload-modal.page';

describe('UploadModalPage', () => {
  let component: UploadModalPage;
  let fixture: ComponentFixture<UploadModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UploadModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
