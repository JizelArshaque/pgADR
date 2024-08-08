import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TribunalProfilePage } from './tribunal-profile.page';

describe('TribunalProfilePage', () => {
  let component: TribunalProfilePage;
  let fixture: ComponentFixture<TribunalProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TribunalProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
