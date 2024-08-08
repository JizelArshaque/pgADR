import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrunityModalPage } from './scrunity-modal.page';

describe('ScrunityModalPage', () => {
  let component: ScrunityModalPage;
  let fixture: ComponentFixture<ScrunityModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScrunityModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
