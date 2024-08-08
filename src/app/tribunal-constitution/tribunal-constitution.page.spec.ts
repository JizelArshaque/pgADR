import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TribunalConstitutionPage } from './tribunal-constitution.page';

describe('TribunalConstitutionPage', () => {
  let component: TribunalConstitutionPage;
  let fixture: ComponentFixture<TribunalConstitutionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TribunalConstitutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
