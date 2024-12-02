import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigitalSignModalPageRoutingModule } from './digital-sign-modal-routing.module';

import { DigitalSignModalPage } from './digital-sign-modal.page';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigitalSignModalPageRoutingModule,
    SignaturePadModule
  ],
  declarations: [DigitalSignModalPage]
})
export class DigitalSignModalPageModule {}
