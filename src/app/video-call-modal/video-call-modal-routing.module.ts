import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoCallModalPage } from './video-call-modal.page';

const routes: Routes = [
  {
    path: '',
    component: VideoCallModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoCallModalPageRoutingModule {}
