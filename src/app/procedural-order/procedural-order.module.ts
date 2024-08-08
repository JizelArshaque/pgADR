import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProceduralOrderPageRoutingModule } from './procedural-order-routing.module';
import { NgxEditorModule } from 'ngx-editor';
import { ProceduralOrderPage } from './procedural-order.page';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxSimpleTextEditorModule } from 'ngx-simple-text-editor';
import { AlertInfoModule } from 'src/shared/alert-info/alert-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule,
    ProceduralOrderPageRoutingModule,EditorModule,NgxEditorModule,NgxSimpleTextEditorModule,AlertInfoModule
  ],
  declarations: [ProceduralOrderPage]
})
export class ProceduralOrderPageModule {}
