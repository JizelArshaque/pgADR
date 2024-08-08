import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProceduralOrderPage } from './procedural-order.page';

const routes: Routes = [
  {
    path: '',
    component: ProceduralOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProceduralOrderPageRoutingModule {}
