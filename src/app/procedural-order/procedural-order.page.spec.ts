import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProceduralOrderPage } from './procedural-order.page';

describe('ProceduralOrderPage', () => {
  let component: ProceduralOrderPage;
  let fixture: ComponentFixture<ProceduralOrderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProceduralOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
