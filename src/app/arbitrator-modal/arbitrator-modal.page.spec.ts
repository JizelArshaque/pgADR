import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ArbitratorModalPage } from './arbitrator-modal.page';

describe('ArbitratorModalPage', () => {
  let component: ArbitratorModalPage;
  let fixture: ComponentFixture<ArbitratorModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ArbitratorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
