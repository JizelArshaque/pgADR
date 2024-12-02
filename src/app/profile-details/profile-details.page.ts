import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DocViewerPage } from '../doc-viewer/doc-viewer.page';
import { AppConfig } from 'src/class/AppCofig';
import { Router } from '@angular/router';
import { ArbitrationPartyAddPage } from '../arbitration-party-add/arbitration-party-add.page';
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.page.html',
  styleUrls: ['./profile-details.page.scss'],
})
export class ProfileDetailsPage implements OnInit {
  party: any;
  ArbitrationDetails: any;
  ArbitrationParties: any[] = [];
  appconfig = new AppConfig();
  User: any;
  ArbDoc: any;
  ArbitrationDetailslocalStoragr: any;
  ArbitrationDetailslocalStorage: any;
  ArbitrationStage: any;
  constructor(private router: Router, public navParams: NavParams, private modalController: ModalController, private modalCtrl: ModalController) {
    if (this.navParams.get("ArbitrationParty")) {
      this.party = this.navParams.get("ArbitrationParty");
      console.log(this.navParams, '===============nav================');

      console.log(this.party, "party=======================")
      this.ArbitrationDetailslocalStorage = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`);
      this.ArbitrationStage = this.ArbitrationDetailslocalStorage.ArbitrationStage
      // console.log( this.ArbitrationStage,"stagee")

      if (localStorage.getItem("ADR_Dashboard_User")) {
        this.User = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`);
      }
    }
    if (this.navParams.get("ArbitrationParties")) {
      this.ArbitrationParties = this.navParams.get("ArbitrationParties");
    }
    if (!!this.navParams.get("ArbDoc")) {
      this.ArbDoc = this.navParams.get("ArbDoc");
    }
  }

  ngOnInit() {
  }
  back() {
    this.modalController.dismiss();
  }
  async ArbitrationPartyAdd(partytype: any) {

    // debugger

    console.log('pols', partytype);

    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ArbitrationPartyAddPage, cssClass: 'my-modal',
      componentProps: {
        // ArbitrationDetails: this.ArbitrationDetails,
        ArbitrationParties: this.ArbitrationParties,
        // Side:side,
        ArbitrationEdit: partytype
      },

    });
    modal.onDidDismiss().then((modelData) => {

    });
    await modal.present();
  }
  editProfile() {
    this.router.navigate(['/arbitration-party-add']);
  }
  GetPartyType() {
    if (this.party.Type == 0 && this.party.Side == 0) {
      return "Claimant"
    }
    else if (this.party.Type == 0 && this.party.Side == 0) {
      return "Additional Claimant"
    }
    else if (this.party.Type == 0 && this.party.Side == 1) {
      return "Respondent"
    }
    else if (this.party.Type == 0 && this.party.Side == 1) {
      return "Additional Respondent"
    }
    else if (this.party.Type == 2 && this.party.Side == 0) {
      return "Claimant Lawyer"
    }
    else if (this.party.Type == 2 && this.party.Side == 1) {
      return "Respondent Lawyer"
    }
    else if (this.party.Type == 3 && this.party.Side == 0 && this.party.IsController == 1) {
      return "Sole or Presiding Arbitrator"
    }
    else if (this.party.Type == 3 && this.party.Side == 0 && this.party.IsController == 0) {
      return "Claimant Nominated Arbitrator"
    }
    else if (this.party.Type == 3 && this.party.Side == 1) {
      return "Respondent Nominated Arbitrator"
    }
    else {
      return '';
    }
  }
  async OpenDoc() {
    let ext = '.' + this.party.AuthorisationUrl.split('.').pop();
    if (ext.startsWith(".jpg") || ext.startsWith(".JPG")
      || ext.startsWith(".JPEG") || ext.startsWith(".jpeg")
      || ext.startsWith(".png") || ext.startsWith(".PNG")
      || ext.startsWith(".pdf") || ext.startsWith(".PDF")
    ) {
      const modal = await this.modalController.create({
        component: DocViewerPage, cssClass: 'my-modal',
        // You can pass data to the modal using the componentProps option if needed
        componentProps: {
          selecteddoc: this.appconfig.AssetUrl + "/assets/images/DocumentUploadCDN/" + this.party.AuthorisationUrl,
        },

      });
      this.closeModal();

      modal.onDidDismiss().then((modelData) => {

      });
      await modal.present();
    }
    else {
      if (!!this.ArbDoc) {
        this.OpenCreatedDoc(2);
      }
    }
  }

  async OpenCreatedDoc(type: any) {
    const modal = await this.modalController.create({
      component: DocViewerPage, cssClass: 'my-modal',
      // You can pass data to the modal using the componentProps option if needed
      componentProps: {
        ArbitrationDetails: this.ArbitrationDetails,
        ArbitrationParties: this.ArbitrationParties,
        Type: type,
        Docs: this.ArbDoc
      },

    }); this.closeModal();
    modal.onDidDismiss().then((modelData) => {

    });
    await modal.present();
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  directaccessphone() {
    window.open('tel:' + this.party.Mobile, '_blank');
  }
  directaccessemail() {
    window.open('mailto:' + this.party.Email, '_blank');
  }
  directaccesslocation() {
    window.open('https://maps.google.com/?q=' + this.party.Address, '_blank');
  }
}
