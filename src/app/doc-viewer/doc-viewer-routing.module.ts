import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocViewerPage } from './doc-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: DocViewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocViewerPageRoutingModule {}
