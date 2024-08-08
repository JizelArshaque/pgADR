import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectArbitratorModalPage } from './select-arbitrator-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SelectArbitratorModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectArbitratorModalPageRoutingModule {}
