import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoCallModalPageRoutingModule } from './video-call-modal-routing.module';

import { VideoCallModalPage } from './video-call-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoCallModalPageRoutingModule
  ],
  declarations: [VideoCallModalPage]
})
export class VideoCallModalPageModule {}
