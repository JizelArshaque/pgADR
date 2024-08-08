import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArbitratorModalPageRoutingModule } from './arbitrator-modal-routing.module';

import { ArbitratorModalPage } from './arbitrator-modal.page';
import { AlertInfoModule } from 'src/shared/alert-info/alert-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArbitratorModalPageRoutingModule,AlertInfoModule
  ],
  declarations: [ArbitratorModalPage]
})
export class ArbitratorModalPageModule {}
