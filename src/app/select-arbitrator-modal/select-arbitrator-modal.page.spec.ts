import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectArbitratorModalPage } from './select-arbitrator-modal.page';

describe('SelectArbitratorModalPage', () => {
  let component: SelectArbitratorModalPage;
  let fixture: ComponentFixture<SelectArbitratorModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectArbitratorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
