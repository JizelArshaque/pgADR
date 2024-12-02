import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ScreenOrientationService {
  private alert: HTMLIonAlertElement | null = null;

  constructor(private alertController: AlertController) {
    // Listen to orientation change events
    window.addEventListener('orientationchange', this.checkOrientation.bind(this));
    window.addEventListener('resize', this.checkOrientation.bind(this));  // Check on resize as well
    this.checkOrientation(); // Check orientation on service initialization
  }

  private async checkOrientation() {
    // Check if the device is in portrait mode (width < height)
    const isPortrait = window.innerHeight > window.innerWidth;

    if (isPortrait && !this.alert) {
      // Show alert if in portrait mode and no alert is already shown
      this.alert = await this.alertController.create({
        header: 'Rotate Your Device',
        message: 'Please rotate your screen to landscape mode for a better viewing experience.',
        buttons: ['OK']
      });
      await this.alert.present();
    } else if (!isPortrait && this.alert) {
      // If in landscape, dismiss the alert if it's shown
      await this.alert.dismiss();
      this.alert = null;
    }
  }
}
