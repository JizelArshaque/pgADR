import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArbitratorModalPage } from './arbitrator-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ArbitratorModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArbitratorModalPageRoutingModule {}
