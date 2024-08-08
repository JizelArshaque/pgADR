import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ArbitrationPartyAddPage } from './arbitration-party-add.page';

describe('ArbitrationPartyAddPage', () => {
  let component: ArbitrationPartyAddPage;
  let fixture: ComponentFixture<ArbitrationPartyAddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ArbitrationPartyAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
