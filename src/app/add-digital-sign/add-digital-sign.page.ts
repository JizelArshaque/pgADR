import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { GeocodingService } from 'src/service/geolocation.service';
import { DigitalSignModalPage } from '../digital-sign-modal/digital-sign-modal.page';
import { ModalController } from 'node_modules/@ionic/angular';
import { DigitalSign } from 'src/class/DigSign';
import { AlertService } from 'src/shared/alert-info/alert.service';



@Component({
  selector: 'app-add-digital-sign',
  templateUrl: './add-digital-sign.page.html',
  styleUrls: ['./add-digital-sign.page.scss'],
})
export class AddDigitalSignPage implements OnInit {
  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  latitude: number = 0;
  longitude: number = 0;
  photo: string = '';
  isCameraActive = false;
  mediaStream: MediaStream | null = null;
  isSignProcessStarted = false;  // Flag to track if process has started

  digitalSign = new DigitalSign()

  constructor(private navController: NavController,
    private alertController: AlertController,
    private geo: GeocodingService,
    private ModalController: ModalController,
    public alertservice: AlertService

  ) { }

  ngOnInit() { }

  close() {
    this.navController.back();
    this.stopCamera()
  }

  // Ask for confirmation and start the process
  async addDigitalSign() {
    this.isSignProcessStarted = true;  // Set flag to true when the process starts
    // const alert = await this.alertController.create({
    //   header: 'Add Digital Sign',
    //   message: 'To add a digital sign, we need to take your picture and get your current location. Do you want to continue?',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('User canceled the process');
    //         this.isSignProcessStarted = false;  // Reset flag if canceled
    //       },
    //     },
    //     {
    //       text: 'OK',
    //       handler: () => this.getLocationAndStartCamera(),
    //     },
    //   ],
    // });
    // await alert.present();
    this.alertservice.Alert("To add a digital sign, we need to take your picture and get your current location. Do you want to continue? ", 4,
      () => {
        this.getLocationAndStartCamera()
      }, () => {
        this.isSignProcessStarted = false;
      }
    );
  }

  address: string = ''
  // Get current location and start the camera
  getLocationAndStartCamera() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('Latitude:', this.latitude, 'Longitude:', this.longitude);
          this.geo.reverseGeocode(this.latitude, this.longitude).subscribe((data: any) => {
            console.log(data.display_name);
            this.address = data.display_name
            this.digitalSign.Location = this.address

          })
          this.startCamera();
        },
        (error) => console.error('Error getting location', error)
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  // Start the camera using MediaDevices API
  async startCamera() {
    try {
      this.isCameraActive = true;
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = this.mediaStream;
    } catch (error) {
      console.error('Error accessing camera:', error);
      this.isCameraActive = false;
    }
  }

  // Capture photo from the video feed
  capturePhoto() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.photo = canvas.toDataURL('image/jpeg');
      this.digitalSign.PersonImage = this.photo
      console.log('Captured photo:', this.photo);
      this.isCameraActive = false;
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach((track) => track.stop());
        this.mediaStream = null;
      }
      // this.NavigateToSign();
    }
  }

  // Stop the camera and reset the process
  stopCamera() {
    this.isCameraActive = false;
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    this.isSignProcessStarted = false;  // Reset flag to make the button visible again
  }

  // Show success alert after submission
  // async submitDigitalSign() {

  //   const alert = await this.alertController.create({
  //     header: 'Success!',
  //     message: 'Your digital sign has been successfully added.',
  //     buttons: ['OK'],
  //   });
  //   await alert.present();
  // }

  // Retake photo (reset the camera and photo)
  retakePhoto() {
    this.photo = '';
    this.startCamera();
  }
  adding: boolean = false
  added: boolean = false
  // goTosigning() { }
  async NavigateToSign() {
    if (this.digitalSign.Location === '' || this.digitalSign.PersonImage === '') {
      alert('Unable to fetch your location or image. Please ensure your device permissions are enabled and try again.');
      // return;
      this.retakePhoto()
    }


    this.adding = true
    if (
      // this.JobCardList[index].Answer == null
      true
    ) {
      const modal = await this.ModalController.create({
        component: DigitalSignModalPage,
        // You can pass data to the modal using componentProps
        componentProps: {
          // data: this.JobcardId,
          // your data goes here
        },
        cssClass: 'modal-80per-aus',
      });

      modal.onDidDismiss().then((data: any) => {
        this.adding = false
        // Check if data is received
        if (data && data.data) {
          const signatureData = data.data;
          // this.SignatureBAse641 = signatureData;
          // this.DocumentUpload.MapId = this.JobCardMappingId;
          // this.DocumentUpload.MapType = 8;
          // this.DocumentUpload.Base64 = signatureData;
          // this.DocumentUpload.JobCardId = this.JobcardId;

          console.log('Received Signature Data:', signatureData);
          this.digitalSign.DigitalSign = signatureData
          this.added = true
          console.log(this.digitalSign);


          // this.JobCardList[index].Answer
        }
      });
      modal.present();
    } else {
      // Swal.fire('Signature Cannot be edited', '', 'warning');
    }
  }
}
