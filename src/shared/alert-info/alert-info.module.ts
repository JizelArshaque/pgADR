import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertInfoComponent } from './alert-info.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AlertInfoComponent],
  imports: [
    CommonModule,
    FormsModule,      
    IonicModule
  ],
  exports:[AlertInfoComponent]
})
export class AlertInfoModule { }
