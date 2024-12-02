import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCallModalPage } from './video-call-modal.page';

describe('VideoCallModalPage', () => {
  let component: VideoCallModalPage;
  let fixture: ComponentFixture<VideoCallModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VideoCallModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
