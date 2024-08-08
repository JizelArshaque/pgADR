import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DocViewerPageRoutingModule } from './doc-viewer-routing.module';
import { DocViewerPage } from './doc-viewer.page';
import { SharedPipesModule } from 'src/service/Safe.pipe.module';
import { HtmlSharedPipesModule } from 'src/service/HtmlSafe.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocViewerPageRoutingModule ,SharedPipesModule,HtmlSharedPipesModule
  ],
  declarations: [DocViewerPage]
})
export class DocViewerPageModule {}
