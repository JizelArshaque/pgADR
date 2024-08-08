import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdrProfilePage } from './adr-profile.page';

describe('AdrProfilePage', () => {
  let component: AdrProfilePage;
  let fixture: ComponentFixture<AdrProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdrProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
