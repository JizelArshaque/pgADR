import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { WaitingRoomPage } from './waiting-room.page';

describe('WaitingRoomPage', () => {
  let component: WaitingRoomPage;
  let fixture: ComponentFixture<WaitingRoomPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WaitingRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
