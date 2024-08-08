import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadModalPageRoutingModule } from './upload-modal-routing.module';

import { UploadModalPage } from './upload-modal.page';
import { AlertInfoModule } from 'src/shared/alert-info/alert-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadModalPageRoutingModule,AlertInfoModule
  ],
  declarations: [UploadModalPage]
})
export class UploadModalPageModule {}
