import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScrunityModalPageRoutingModule } from './scrunity-modal-routing.module';

import { ScrunityModalPage } from './scrunity-modal.page';
import { AlertInfoModule } from 'src/shared/alert-info/alert-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrunityModalPageRoutingModule,AlertInfoModule
  ],
  declarations: [ScrunityModalPage]
})
export class ScrunityModalPageModule {}
