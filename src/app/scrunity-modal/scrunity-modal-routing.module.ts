import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScrunityModalPage } from './scrunity-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ScrunityModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScrunityModalPageRoutingModule {}
