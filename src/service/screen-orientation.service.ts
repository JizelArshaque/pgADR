import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ScreenOrientationService {
  private hasAlertBeenShown = false;

  constructor(private alertController: AlertController) {
    window.addEventListener('resize', this.checkOrientation.bind(this));
    this.checkOrientation(); // Check orientation on service initialization
  }

  private async checkOrientation() {
    if (window.innerHeight > window.innerWidth && !this.hasAlertBeenShown) {
      // Show alert only once
      this.hasAlertBeenShown = true;
      const alert = await this.alertController.create({
        header: 'Rotate Your Device',
        message: 'Please rotate your screen to landscape mode for a better viewing experience.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
