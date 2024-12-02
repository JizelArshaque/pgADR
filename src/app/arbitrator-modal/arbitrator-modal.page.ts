import { Component, OnInit } from '@angular/core';
// import { ModalController, NavParams } from '@ionic/angular';

import { DocumentUploadCDN } from 'src/class/DocumentUploadCDN';
import { DocViewerPage } from '../doc-viewer/doc-viewer.page';
import { AppConfig } from 'src/class/AppCofig';
import { AddLaweyers } from 'src/class/AddLawyers';
import { Mediation } from 'src/class/Mediation';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ArbitrationServiceService } from '../arbitration-service.service';
import { AlertService } from 'src/shared/alert-info/alert.service';
import { IonicModule, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';



@Component({
  selector: 'app-arbitrator-modal',
  templateUrl: './arbitrator-modal.page.html',
  styleUrls: ['./arbitrator-modal.page.scss'],

})
export class ArbitratorModalPage implements OnInit {
  profiles: any[] = [];
  NoOfTribunalsSelected: string[] = [];
  authURLScode: any;
  interval1: any;
  exhibits: any[] = [];
  documentName: string = '';
  selectedFile: File | null = null;
  showAdditionalUploadOptions: boolean = false;
  doccdn = new DocumentUploadCDN();
  User: any;
  centerid: any;
  MediationAdvocatesFilter: any[] = [];
  MediationAdvocates: any[] = [];
  MediatorsFilter: any[] = [];
  ArbitratorsFilter: any[] = [];
  adrtype: any;
  Address: any;
  quantumofclaim: any;
  disputecategory: any;
  region: any;
  VideoCallId: any;
  isPeacegatePaddingLeft = false;
  TId: any
  mediation = new Mediation();
  Side: any;
  Name: any;
  Email: any;
  Mobile: any;
  State: any;
  City: any;
  usertype: any;
  userside: any;
  adrpro: number = 5;
  AuthorisationUrl: any;
  doctype: string = '';
  docname: string = '';
  appconfig = new AppConfig();
  document_class: string = 'document-wrapper';
  lawyers = new AddLaweyers
  Mediators: any[] = [];
  isMenuVisible: boolean = true;
  ArbitrationDetails: any;
  ArbitrationParties: any[] = [];
  Type: any;
  userurl: any;
  Arbitrators: any[] = [];
  selectedID: any[] = [];
  Id: any
  selecteddocument: any;
  applicationtype: any;
  casemanagementtype: any;
  selectedArbitrator: any
  DocName: string = '';
  Country: any;
  ArbitratorType: any;
  ArbitratorSide: any;
  AppointedArbitrator: any
  reason: string = '';
  IsMessage: number = 0;
  isButtonDisabled = false;

  searchText: string = ''
  filteredArbitrators: any[] = [];  // List of filtered arbitrators


  constructor(public alertservice: AlertService, private router: Router, private location: Location, private modalController: ModalController, private arbitrationservice: ArbitrationServiceService, public navParams: NavParams, private loadingCtrl: LoadingController) {
    this.GetAllADRProfessional();
    this.GetAllConstitutionalTribunal();
    if (this.navParams.get("Arbitration")) {
      this.ArbitrationDetails = this.navParams.get("Arbitration");
      this.ArbitrationParties = this.navParams.get("ArbitrationParties");
      // console.log(this.ArbitrationParties,"================")
      if (this.ArbitrationParties.filter(x => x.Type == 3 && x.IsController == 1).length > 0) {
        this.AppointedArbitrator = this.ArbitrationParties.filter(x => x.Type == 3 && x.IsController == 1)[0];
        //  console.log(this.AppointedArbitrator,"==####++++")
        debugger

      }
      this.Type = this.navParams.get("Type");

      this.SetDocName()
    }

  }
  ngOnInit(): void {
    this.GetMyArbitrationPartyDetails();

    // this.interval1 = setInterval(() => {
    //   this.GetMyArbitrationPartyDetails();




    // }, 5000);
    if (localStorage.getItem("ADR_Dashboard_User")) {
      this.User = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`);
      this.usertype = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Type
      this.userside = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Side
      // this.userurl=JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).AuthorisationUrl
      // this.AuthorisationUrl=JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).AuthorisationUrl

    }
    // alert(this.usertype);
  }



  GetAllConstitutionalTribunal() {
    this.centerid = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).CenterId;

    this.adrtype = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).CenterId;
    this.quantumofclaim = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).DisputeValue;
    this.disputecategory = 0
    this.region = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).ArbitrationAgreementType;
    // alert(this.region)

    this.arbitrationservice.GetAllMediatorWithCenterIdForMediation().subscribe((data: any) => {
      if (!!data && data.length > 0) {
        this.Arbitrators = data;
      } else {
        this.Arbitrators = [];
      }
    });
  }
  isOptionDisabled(arbitrator: any): boolean {
    return this.NoOfTribunalsSelected.length >= 3 && !this.NoOfTribunalsSelected.includes(arbitrator.Id);
  }
  onSelectionChange() {
    // Limit the selected options to a maximum of 3
    // alert(this.NoOfTribunalsSelected)
    if (this.NoOfTribunalsSelected.length > 3) {
      this.NoOfTribunalsSelected = this.NoOfTribunalsSelected.slice(0, 3);

    }
  }
  async removeSelected() {
    // Show the loader
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();

    if (!!this.AppointedArbitrator) {
      this.arbitrationservice.GenerateArbitrationFileNumber(this.ArbitrationDetails.Id, this.IsMessage, this.reason).subscribe({
        next: (data) => {
          loading.dismiss();
          if (!!data) {
            if (this.IsMessage == 4) {
              alert("Defects in Disclosure Notified.");
            } else if (this.IsMessage == 5) {
              alert("Arbitrator Removed.");
            }
            this.selectedArbitrator = null;
            this.AppointedArbitrator = null;
            this.back();
          }
          // Dismiss the loader after processing
        },
        error: (err) => {
          loading.dismiss(); // Ensure loader is dismissed on error
          console.error('Error:', err);
          alert("An error occurred. Please try again.");
        }
      });
    } else if (!!this.selectedArbitrator) {
      this.selectedArbitrator = null;
      loading.dismiss(); // Dismiss the loader if no API call is made
    } else {
      loading.dismiss(); // Dismiss the loader if no condition is met
    }
  }


  viewProfile(selectedId: any) {
    const secureCode = selectedId;
    const selectedArbitrator = this.Arbitrators.find(arbitrator => arbitrator.Id === selectedId);

    const name = selectedArbitrator.Name.toString().replace(/[^A-Z0-9]/ig, "");

    const url = `${this.appconfig.DigitalCardLink}/${secureCode}/${name}`;
    // alert(url)

    // Open the URL in a new window
    window.open(url, '_blank');
  }

  getArbitratorName(arbitratorId: string): string {
    const selectedArbitrator = this.Arbitrators.find(arbitrator => arbitrator.Id === arbitratorId);
    return selectedArbitrator ? selectedArbitrator.Name : '';
  }
  confirmApproveforExpedited(Id: any) {
    const confirmation = window.confirm('Are you sure you want to appoint the arbitrator?');
    if (confirmation) {
      this.AppointArbitratorforExpedited(Id);
    }
  }

  confirmApprove(Id: any) {


    const confirmation = window.confirm('Are you sure you want to appoint the arbitrator?');

    if (confirmation) {
      this.Approve(Id);
    }
  }
  AppointArbitratorforExpedited(Arbitrator: any) {
    this.TId = Arbitrator.Id;
    this.Name = Arbitrator.Name;
    this.Mobile = Arbitrator.Mobile;
    this.Email = Arbitrator.Email;
    this.Country = Arbitrator.Country;
    this.City = Arbitrator.City;
    this.State = Arbitrator.State;
    this.ArbitratorType = 3
    this.ArbitratorSide = 0
    this.Address = Arbitrator.Address;
    // t arbId, int tribunalId

    this.arbitrationservice.spAppointTribunalforExpedited(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id, this.TId, this.Name, this.Email, this.Mobile, this.Address, this.ArbitratorType, this.ArbitratorSide, this.Country, this.State, this.City).subscribe((data: any) => {


      if (!!data) {
        if (data.Id > 1 && data.Error === 0) {
          this.alertservice.Alert("Arbitrator Appointed!", 3, () => { }, () => { },);
          this.back();
        }
      } else {
        this.alertservice.Alert("Error while Appoint Arbitrator!", 3, () => { }, () => { },);

      }
    });
  }
  Approve(Id: any) {
    this.TId = Id;
    // t arbId, int tribunalId
    this.arbitrationservice
      .spAppointTribunal(
        JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id,
        this.TId
      )
      .subscribe((data: any) => {
        if (!!data && data.length > 0) {
          if (data[0].Id > 1 && data[0].Error === 0) {
            this.alertservice.Alert("Arbitrator Appointed!", 3, () => { }, () => { },);
            this.location.back();
          }
        } else {
        }
      });
  }
  async SubmitDispute() {
    // Limit the selected options to a maximum of 3 in case it's not already done
    if (this.NoOfTribunalsSelected.length > 3) {
      this.NoOfTribunalsSelected = this.NoOfTribunalsSelected.slice(0, 3);
    }

    // Filter the Arbitrators based on the selected IDs
    const selectedArbitrators = this.Arbitrators.filter(arbitrator => this.NoOfTribunalsSelected.includes(arbitrator.Id));

    // Add Status=2 and Type=4 to all objects in ArbitrationParties
    this.mediation.ArbitrationParties = selectedArbitrators.map(arbitrator => ({
      ...arbitrator,
      Status: 2,
      Type: 3,
      Side: 0,
      UserId: arbitrator.Id // Rename 'Id' to 'UserId'
    }));

    // Log or use the selected arbitrators as needed
    // console.log(this.mediation.ArbitrationParties);

    // Your existing code for submitting dispute
    let that = this;

    that.mediation.PaymentStatus = 0;

    that.mediation.Id = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
    // console.log(that.mediation);

    that.arbitrationservice.InsertMediation(that.mediation).subscribe((data: any) => {
      if (data) {
        if (data.Id > 0 && data.Error === 0) {
          // Arbitrator Submitted successfully
          this.alertservice.Alert("Arbitrator Inserted!", 3, () => { }, () => { },);

          window.location.reload()

          that.mediation.Id = data.Id;
          // Continue with any additional logic or UI updates
        } else {
          // Handle the case where either data.Id is not greater than 0 or data.Error is not equal to 0
          // You might want to provide more specific handling based on your requirements
        }
      } else {
        // Handle the case where data is falsy
      }
    });
  }



  OpenDocument(filename: any, path: any) {
    // alert(filename);
    // this.isMenuVisible = false;
    // this.document_class = 'document-wrapper visible-document';
    this.selecteddocument = this.appconfig.AssetUrl + "/assets/images/" + path + '/' + filename;

    // Open the selected document in a new tab or window
    window.open(this.selecteddocument, '_blank');

    // If needed, you can also control the size and features of the new window/tab using the third parameter of window.open().
    // For example:
    // window.open(this.selecteddocument, '_blank', 'width=800,height=600,scrollbars=yes');
  }


  deny(profile: any) {
    // Handle deny logic here
    // console.log('Denied:', profile);
  }

  InsertArbitratorforExpedited() {
    this.arbitrationservice.InsertArbitratorforExpedited(this.mediation).subscribe((data: any) => {
      if (data) {
        if (data.Id > 0 && data.Error === 0) {
          // Arbitrator Submitted successfully
          this.alertservice.Alert("Arbitrator Inserted!", 3, () => { }, () => { },);

          window.location.reload()

          this.mediation.Id = data.Id;
          // Continue with any additional logic or UI updates
        } else {
          // Handle the case where either data.Id is not greater than 0 or data.Error is not equal to 0
          // You might want to provide more specific handling based on your requirements
        }
      } else {
        // Handle the case where data is falsy
      }
    });
  }
  saveSelectedData() {



    this.lawyers.SecretCode = this.authURLScode
    this.lawyers.Id = this.selectedID

    // Current data
    const currentData = {
      "SecretCode": this.authURLScode,
      "Id": this.selectedID
    };

    // Create the desired data structure
    const desiredData = {
      "IdList": currentData.Id.map(id => ({ "Id": id })),
      "SecretCode": this.userurl
    };

    // Print the desired data
    // console.log(desiredData);

    this.arbitrationservice.InsertAuthorisationofMultipleLawyers(desiredData).subscribe((data: any) => {
      // console.log(data);
      if (data) {



      }
      else {

        this.alertservice.Alert("Error while delete file", 3, () => { }, () => { },);
      }
    });

  }


  SubmitDocuments() {
    this.modalController.dismiss(0);
  }
  FilterArbitrationParties(side: any, partytype: any) {


    // console.log(this.ArbitrationParties);

    return this.ArbitrationParties.filter(x => x.Type == partytype).filter(x => x.Side == side);

  }

  GetMyArbitrationPartyDetails() {
    this.VideoCallId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
    this.arbitrationservice.GetMyArbitrationPartyDetails(this.VideoCallId, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id).subscribe((data: any) => {
      // console.log(data,"myarray")
      if (data) {
        this.userurl = data[0].AuthorisationUrl
        // this.exhibits = this.exhibits.filter(x => x.Id == ex.Id);
      }
      else {
        this.alertservice.Alert("Error while delete file", 3, () => { }, () => { },);
      }
    });

  }

  Remove(ex: any) {
    if (this.exhibits.find(x => x.Id == ex.Id)) {
      this.arbitrationservice.DeleteDocumentCDN(ex.Id).subscribe((data: any) => {
        if (!!data) {
          this.exhibits = this.exhibits.filter(x => x.Id == ex.Id);
        }
        else {
          this.alertservice.Alert("Error while delete file", 3, () => { }, () => { },);
        }
      });
    }
  }

  fileChange(event: any, type: any, description: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        let file: File = event.target.files[i];
        let ext = '.' + file.name.split('.').pop();
        if (ext.startsWith(".jpg") || ext.startsWith(".JPG")
          || ext.startsWith(".JPEG") || ext.startsWith(".jpeg")
          || ext.startsWith(".png") || ext.startsWith(".PNG")
          || ext.startsWith(".pdf") || ext.startsWith(".PDF")
        ) {
          this.getBase64(fileList[i]).then(
            (data: any) => {

              this.doccdn = new DocumentUploadCDN();
              this.doccdn.FileName = fileList[i].name;
              this.doccdn.Base64Data = data.toString();
              this.doccdn.Type = type;
              this.doccdn.Description = description;
              this.UploadDocumentCDN(this.doccdn);
            }
          );
        }
        else {
          this.alertservice.Alert("Only jpg/jpeg/pdf/png files accepted!", 3, () => { }, () => { },);
        }
      }
    }
  }
  FilterExhibits(type: any) {
    return this.exhibits.filter(x => x.Type == type);
  }
  async GetAllADRProfessional() {

    let loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.arbitrationservice.GetAllADRProfessional().subscribe((data: any) => {

      loading.dismiss()
      if (data.length > 0) {
        this.MediationAdvocates = data.filter((x: any) => x.MediationAdvocateStatus == 1);
        this.MediationAdvocatesFilter = this.MediationAdvocates;
        this.Mediators = data.filter((x: any) => x.MediatorStatus == 1);
        this.MediatorsFilter = this.Mediators;
        this.Arbitrators = data.filter((x: any) => x.ArbitratorStatus == 1);
        this.ArbitratorsFilter = this.Arbitrators;
        this.filteredArbitrators = this.ArbitratorsFilter
        this.adrpro = 5;
      } else {
        this.MediationAdvocates = [];
        this.Mediators = [];
        this.Arbitrators = [];
        this.filteredArbitrators = [];
        this.ArbitratorsFilter = [];
        this.MediatorsFilter = [];
        this.MediationAdvocatesFilter = [];
      }
    });
  }

  filterArbitrators() {
    if (this.searchText.trim()) {
      this.filteredArbitrators = this.ArbitratorsFilter.filter(item =>
        item.Name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredArbitrators = [...this.ArbitratorsFilter];  // Show all if search is empty
    }
  }

  OpenADRProfile(item: any, type: any) {
    this.modalController.dismiss(0);
    let navigationextra: NavigationExtras = {
      state: {
        UserDetails: item, Type: type
      }
    }
    this.router.navigate(['adr-profile'], navigationextra)
  }
  UploadDocumentCDN(doc: any) {
    this.arbitrationservice.UploadDocumentCDN(doc).subscribe((data: any) => {
      // console.log(data,'document');

      if (data) {
        if (data.Id > 0 && data.Error == 0) {


          this.alertservice.Alert("Document Uploaded", 3, () => { }, () => { },);


          this.authURLScode = data.SecreteCode;
          doc.SecreteCode = data.SecreteCode;
          this.exhibits.push(doc);

          this.InsertAuthorisationURL()
        } else {

          this.alertservice.Alert("Error While Upload ", 3, () => { }, () => { },);
        }
      }
      else {
        this.alertservice.Alert("Error While Upload ", 3, () => { }, () => { },);
      }
    })
  }
  InsertAuthorisationURL() {
    const SecretCode = this.authURLScode
    const Id = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id
    this.arbitrationservice.AuthorisationURLInsert(Id, SecretCode).subscribe((data: any) => {
      // console.log(data,'document');

      if (data) {


        if (data[0].Id > 0 && data[0].Error === 0) {
          alert("Document Updated");
        }

      }
      else {
        this.alertservice.Alert("Error While Upload ", 3, () => { }, () => { },);
      }
    })
  }
  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  back() {
    const secureCode = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).SecureCode;
    this.router.navigate(['/dashboard', secureCode]);
    this.modalController.dismiss();
  }
  async OpenDoc(ex: any) {
    const modal = await this.modalController.create({
      component: DocViewerPage, cssClass: 'my-modal',
      // You can pass data to the modal using the componentProps option if needed
      componentProps: {
        selecteddoc: this.appconfig.AssetUrl + "/assets/images/DocumentUploadCDN/" + ex.SecreteCode,
      },

    });
    modal.onDidDismiss().then((modelData) => {

    });
    await modal.present();
  }


  TypeChange(event: any) {
    this.doctype = '';
    this.docname = '';

  }
  SaveCaseManagementProcedure() {

  }
  SetDocName() {
    switch (this.Type) {
      case 1:
        return ' Pleadings by Parties';
      case 2:
        return ' APPLICATION AND ORDER';
      case 3:
        return ' DISCLOSURE STATEMENT';
      case 4:
        return ' AUTHORIZATION OR VAKALATH';
      case 5:
        return ' REPLY NOTICE BY RESPONDENT';
      case 6:
        return ' ARBITRAL AWARD';
      case 7:
        return ' EVIDENCE';
      case 8:
        return ' NOTICE & PO';
      case 9:
        return ' NOTICE & PO';
      case 10:
        return 'PROCEDURAL ORDER ON CASE MANAGEMENT';

      default:
        return '';
    }
  }
  // Appoint Arbitrator
  async ConstituteArbitrator() {
    this.isButtonDisabled = true
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();

    //console.log( this.ArbitrationDetails.Id, 
    //  JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id,"joi")
    //debugger;

    this.arbitrationservice.ConstituteTribunalExpedited(
      this.ArbitrationDetails.Id,
      JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id
    ).subscribe({
      next: (data) => {
        loading.dismiss(); // Dismiss the loader after the API response
        this.isButtonDisabled = false
        if (!!data && data.Id > 0) {
          alert("Arbitrator Appointed.");
          this.back();
        }
      },
      error: (err) => {
        loading.dismiss(); // Dismiss the loader even if there's an error
        this.isButtonDisabled = false
        console.error('Error constituting arbitrator:', err);
        alert("There was an error appointing the arbitrator. Please try again.");
      }
    });
  }

  ShowMessage(type: any) {
    this.IsMessage = type;




  }
}