import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-list-popover',
  templateUrl: './user-list-popover.component.html',
  styleUrls: ['./user-list-popover.component.scss'],
})
export class UserListPopoverComponent {
  @Input() arbitrationParties: any[] | undefined; // Input property to receive the data
  selectedUsers: any[] = [];
  user:any
  constructor(private popoverController: PopoverController) {}

  closePopover() {
    this.popoverController.dismiss(this.selectedUsers);
  }
}
