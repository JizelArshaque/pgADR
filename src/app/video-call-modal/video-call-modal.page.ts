import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-video-call-modal',
  templateUrl: './video-call-modal.page.html',
  styleUrls: ['./video-call-modal.page.scss'],
})
export class VideoCallModalPage implements OnInit {

  constructor(private modalController: ModalController) {}

  ngOnInit() {
  }

  isExternalSelected = false;
  externalLink: string = '';

  

  // Dismiss the modal
  dismiss() {
    this.modalController.dismiss();
  }

  // When 'App Integrated Video Call' is clicked
  selectVideoCall() {
    // Close modal and trigger function (on the parent component)
    this.modalController.dismiss({
      action: 'videoCall',
    });
  }

  // When 'External Sources' is clicked
  selectExternalLink() {
    this.isExternalSelected = true;
  }

  // Handle submission of external link
  submitExternalLink() {
    // Here, you can pass the external link or handle it accordingly
    this.modalController.dismiss({
      action: 'externalLink',
      link: this.externalLink,
    });
  }

}
