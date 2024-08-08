import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserListPopoverComponent } from '../user-list-popover/user-list-popover.component';

@NgModule({
  declarations: [UserListPopoverComponent],
  imports: [IonicModule, CommonModule], // Make sure to import IonicModule and CommonModule
})
export class YourModule { }
