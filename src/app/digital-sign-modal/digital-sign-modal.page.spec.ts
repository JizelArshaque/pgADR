import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalSignModalPage } from './digital-sign-modal.page';

describe('DigitalSignModalPage', () => {
  let component: DigitalSignModalPage;
  let fixture: ComponentFixture<DigitalSignModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DigitalSignModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
