import { Component, OnInit } from '@angular/core';
import { ArbitrationServiceService } from '../arbitration-service.service';
import { DocumentUploadCDN } from 'src/class/DocumentUploadCDN';
import { DocViewerPage } from '../doc-viewer/doc-viewer.page';
import { AppConfig } from 'src/class/AppCofig';
import { AddLaweyers } from 'src/class/AddLawyers';
import { Videocalluser } from 'src/service/Videocalluser.service';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/shared/alert-info/alert.service';
import { IonicModule, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';




@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.page.html',
  styleUrls: ['./upload-modal.page.scss'],
})
export class UploadModalPage implements OnInit {
  authURLScode: any;
  interval1: any;
  exhibits: any[] = [];

  documentName: string = '';
  selectedProcedure: any
  message: string = ''
  datepipe = new DatePipe('en-IND');
  selectedFile: File | null = null;
  showAdditionalUploadOptions: boolean = false;
  uploadbutton: boolean = false;
  doccdn = new DocumentUploadCDN();
  User: any;
  VideoCallId: any;
  isPeacegatePaddingLeft = false;
  showmailbox = false;
  Side: any;
  Name: any;
  claimantemail: any;
  usertype: any;
  userside: any;
  comment: any;
  AuthorisationUrl: any;
  doctype: string = '';
  doctypeother: string = '';

  appconfig = new AppConfig();
  document_class: string = 'document-wrapper';
  lawyers = new AddLaweyers
  isMenuVisible: boolean = true;
  ArbitrationDetails: any;
  ArbitrationParties: any[] = [];
  FormType: any;
  userurl: any;
  selectedID: any[] = [];
  Id: any
  AuthURL: any;
  selecteddocument: any;
  applicationtype: any;
  casemanagementtype: any;
  DocName: string = '';
  IsConnectwithParty: boolean = false;
  ArbitrationDocuments: any[] = [];
  DocType: any;
  ReferenceDocument: any;
  CaseManagementProcedure: any[] = [];
  isButtonDisabled = false;


  constructor(public alertservice: AlertService, public videocallUserservice: Videocalluser, private modalController: ModalController, private arbitrationservice: ArbitrationServiceService, public navParams: NavParams, private loadingCtrl: LoadingController) {
    console.log(this.navParams, "=========NAV=========");

    if (this.navParams.get("Arbitration")) {
      this.ArbitrationDetails = this.navParams.get("Arbitration");
      this.ArbitrationParties = this.navParams.get("ArbitrationParties");

      this.ArbitrationDetails.DateOfAgreement = this.datepipe.transform(this.ArbitrationDetails.DateOfAgreement, 'yyyy-MM-dd');
      this.ArbitrationDetails.DateOfClaimantNotice = this.datepipe.transform(this.ArbitrationDetails.DateOfClaimantNotice, 'yyyy-MM-dd');
      this.ArbitrationDetails.DateOfRespondentNotice = this.datepipe.transform(this.ArbitrationDetails.DateOfRespondentNotice, 'yyyy-MM-dd');
      this.FormType = this.navParams.get("Type");
      // alert(this.FormType+'form type') 
      this.DocName = this.SetDocName(this.FormType);

    }
    if (this.navParams.get("ArbitrationDocuments")) {
      this.ArbitrationDocuments = this.navParams.get("ArbitrationDocuments");
    }
    if (this.navParams.get("DocType")) {
      this.DocType = this.navParams.get("DocType");
    }
    if (this.navParams.get("DaftIssues")) {
      if (localStorage.getItem("ADR_Dashboard_User")) {
        if (JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Type == 3) {
          this.applicationtype = 'Issues';
        }
        else {
          this.applicationtype = 'Memo';
          this.doctype = 'Draft Issues';
        }
      }
    }
    if (this.navParams.get("Applicationtype")) {
      this.applicationtype = this.navParams.get("Applicationtype");
    }

    if (this.navParams.get("DocFileName")) {
      this.doctype = this.navParams.get("DocFileName");
    }
    if (this.navParams.get("ReferenceDocument")) {
      this.ReferenceDocument = this.navParams.get("ReferenceDocument");
    }
    if (this.navParams.get("CaseManagementProcedure")) {
      this.CaseManagementProcedure = this.navParams.get("CaseManagementProcedure");
    }
  }
  ngOnInit(): void {
    this.GetMyData();
    // this.interval1 = setInterval(() => {
    //   this.GetMyArbitrationPartyDetails();
    // }, 5000);
    if (localStorage.getItem("ADR_Dashboard_User")) {
      this.User = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`);
      this.usertype = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Type
      // alert(this.usertype)
      this.userside = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Side
      this.userurl = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).AuthorisationUrl
      this.AuthorisationUrl = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).AuthorisationUrl

    }
    // alert(this.usertype); 
  }

  GetMyData() {
    const arbitrationDetails = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`)
    const adrDashboardUser = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`)

    if (arbitrationDetails && adrDashboardUser) {
      this.videocallUserservice.GetMyArbitrationPartyDetails(arbitrationDetails.Id, adrDashboardUser.Id).subscribe((data: any) => {
        if (data.length > 0) {
          this.AuthURL = data[0].AuthorisationUrl;
          // alert(this.AuthURL)
        } else {
          // Handle the case when data.length <= 0
        }
      });
    } else {
      // Handle the case when either arbitrationDetails or adrDashboardUser is null
      console.log('Required data from local storage is null');
    }
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


  filterarbitrationDocument(segment: any, partytype: any, docname: any) {
    return this.ArbitrationDocuments.filter(x => x.Segment == segment && x.CreatorType == partytype && x.DocumentName == docname);
  }

  SubmitDocuments() {
    this.modalController.dismiss(0);
  }
  FilterArbitrationParties(side: any, partytype: any) {

    return this.ArbitrationParties.filter(x => x.Type == partytype).filter(x => x.Side == side);
  }
  FilterLawyers(side: any, partytype: any) {

    return this.ArbitrationParties.filter(x => x.Type == partytype).filter(x => x.Side == side).filter(x => x.Id != JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id);
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
        alert("Error while delete file");
      }
    });

  }
  SavePleadingsandExhibits() {
    if (!!this.exhibits && this.exhibits.length > 0 && this.exhibits.filter(x => x.DocType == 0).length > 0) {
      // if (this.exhibits.filter(x => x.Type == 1).length == 0) {
      // //  if (confirm("are you sure to Upload " + this.doctype + " without exhibits ?")) {
      //     let doc = { ArbitrationDocumentId: this.exhibits.filter(x => x.Type == 0)[0].Id, DocumentUploadCDNList: [] }
      //     this.arbitrationservice.UploadArbitrationDocumentDetails(doc).subscribe(data => {
      //       if (!!data) {
      //         alert(this.doctype + " submitted successfully");
      //       }
      //     });
      //  // }
      // }
      // else {
      let doc = { ArbitrationDocumentId: this.exhibits.filter(x => x.DocType != 0)[0].Id, DocumentUploadCDNList: this.exhibits.filter(x => x.DocType == 0) }
      this.arbitrationservice.UploadArbitrationDocumentDetails(doc).subscribe(data => {
        if (!!data) {
          alert(this.doctype + " submitted successfully");
          this.back(null);
        }
      });
      // }
    }

  }
  saveSelectedData() {
    this.lawyers.SecretCode = this.authURLScode
    this.lawyers.Id = this.selectedID
    let desiredData: any;
    const currentData = {
      "SecretCode": this.authURLScode,
      "Id": this.selectedID
    };
    let url = this.userurl;
    debugger
    if (this.userurl == null) {
      debugger
      url = this.FilterArbitrationParties(this.userside, this.usertype).find(x => x.Id == this.selectedID).AuthorisationUrl;
      desiredData = {
        "IdList": [{ "Id": JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id }],
        "SecretCode": url
      };
    }
    else {
      debugger
      desiredData = {
        "IdList": currentData.Id.map(id => ({ "Id": id })),
        "SecretCode": url
      };
    }
    this.arbitrationservice.InsertAuthorisationofMultipleLawyers(desiredData).subscribe((data: any) => {
      debugger
      if (data) {
        alert("Document Uploaded");
        window.location.reload();
      }
      else {
        alert("Error while delete file");
      }
    });
  }

  Removeexhibit(exhibit: any) {
    // Assuming 'exhibits' is an array in your component containing the list of files/documents
    if (confirm("Are you sure to delete this file ?")) {
      const index = this.exhibits.indexOf(exhibit);
      if (index !== -1) {

        this.exhibits.splice(index, 1); // Remove the exhibit from the array
        // Perform any additional deletion actions or update logic here as needed
      }
    }
  }

  Remove(ex: any) {

    if (confirm("Are you sure to delete this file ?")) {

      if (this.exhibits.find(x => x.Id == ex.Id)) {
        this.arbitrationservice.DeleteDocumentCDN(ex.Id).subscribe((data: any) => {
          if (!!data) {
            this.exhibits = this.exhibits.filter(x => x.Id == ex.Id);

            const index = this.exhibits.indexOf(ex);
            if (index !== -1) {
              this.uploadbutton = false
              this.exhibits.splice(index, 1); // Remove the exhibit from the array
              // Perform any additional deletion actions or update logic here as needed
            }

          }
          else {
            alert("Error while delete file");
          }
        });
      }





    }


    // if (this.exhibits.find(x => x.Id == ex.Id)) {
    //   this.arbitrationservice.DeleteDocumentCDN(ex.Id).subscribe((data: any) => {
    //     if (!!data) {
    //       this.exhibits = this.exhibits.filter(x => x.Id == ex.Id);

    //     }
    //     else {
    //       alert("Error while delete file");
    //     }
    //   });
    // }
  }
  fileChangeLawyerAuthorisationUrl(event: any, type: any, description: any) {
    // alert('auth')
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
              this.doccdn.Type = this.usertype;
              this.doccdn.Description = description;
              this.doccdn.DocName = description;
              this.UploadDocumentCDNInsertAuthorisationURL(this.doccdn);
            }
          );
        }
        else {
          alert("Only jpg/jpeg/pdf/png files accepted!");
        }
      }
    }
  }
  fileChangeNoticeandPO(event: any, type: any, description: any) {
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
              this.doccdn.Type = this.usertype;
              this.doccdn.ScheduleDate = "01-Jan-1901";
              this.doccdn.Segment = this.FormType;
              this.doccdn.Side = this.userside;
              this.doccdn.ArbitrationId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
              this.doccdn.Description = (this.doctype == 'Misc. Notice' || this.doctype == 'General Directions') ? this.doctypeother : this.doctype;
              this.doccdn.DocName = this.doccdn.Description;
              this.doccdn.UserId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
              this.UploadDocumentCDN(this.doccdn);
            }
          );
        }
        else {
          alert("Only jpg/jpeg/pdf/png files accepted!");
        }
      }
    }
  }
  fileChangePleading(event: any) {
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
              this.doccdn.Type = this.usertype == 0 ? 1 : this.usertype;
              this.doccdn.ScheduleDate = "01-Jan-1901";
              this.doccdn.Segment = this.FormType;
              this.doccdn.DocType = this.GetDocTypeForDocumentFiling();
              this.doccdn.Side = this.userside;
              this.doccdn.ArbitrationId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
              this.doccdn.Description = (this.doctype == 'Other' || this.doctype == 'Miscellaneous') ? this.doctypeother : this.doctype;
              this.doccdn.DocName = (this.doctype == 'Other' || this.doctype == 'Miscellaneous') ? this.doctypeother : this.doctype;
              this.doccdn.UserId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
              this.uploadbutton = true


              this.UploadDocumentCDN(this.doccdn);
            });
        }
        else {
          alert("Only jpg/jpeg/pdf/png files accepted!");
        }
      }
    }
  }
  fileChangeApplication(event: any) {
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
              this.doccdn.Type = this.usertype == 0 ? 1 : this.usertype;
              this.doccdn.ScheduleDate = "01-Jan-1901";
              this.doccdn.Segment = this.FormType;
              this.doccdn.DocType = this.applicationtype == 'Memo' ? 4 : this.DocType;
              this.doccdn.Side = this.userside;
              this.doccdn.ReferenceDocumentId = this.ReferenceDocument.Id;
              this.doccdn.ArbitrationId = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
              this.doccdn.Description = this.ReferenceDocument.Description;
              this.doccdn.DocName = 'Counter in ' + this.ReferenceDocument.DocumentName;
              this.doccdn.UserId = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
              this.UploadDocumentCDN(this.doccdn);
            });
        }
        else {
          alert("Only jpg/jpeg/pdf/png files accepted!");
        }
      }
    }
  }
  GetDocTypeForDocumentFiling() {
    if (this.FormType == 2) {
      if (this.applicationtype === 'Memo') {
        return 4;
      }
      else {
        return 3;
      }

    }
    else if (this.FormType == 5) {
      return 1;
    }
    else {
      return 0;
    }
  }
  fileChangeExhibits(event: any, type: any, description: any) {

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
              this.doccdn.ScheduleDate = "01-Jan-1901";
              this.doccdn = new DocumentUploadCDN();
              this.doccdn.FileName = fileList[i].name;
              this.doccdn.Base64Data = data.toString();
              this.doccdn.Type = 0;
              this.doccdn.Description = description;
              this.doccdn.DocName = description;
              this.UploadDocumentCDNforExhibits(this.doccdn);
            }
          );
        }
        else {
          alert("Only jpg/jpeg/pdf/png files accepted!");
        }
      }
    }
  }
  fileChangeArbitrationRequest(event: any, type: any, description: any) {
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
              this.doccdn.Type = this.usertype;
              this.doccdn.Description = description;
              this.doccdn.DocName = description;
              this.doccdn.Type = type
              this.UploadDocumentCDNforReplyNotice(this.doccdn);
            }
          );
        }
        else {
          alert("Only jpg/jpeg/pdf/png files accepted!");
        }
      }
    }
  }
  FilterExhibits(type: any) {
    return this.exhibits.filter(x => x.Type != type);
  }
  RemoveRequest(val: any) {
    if (confirm('Are you sure to delete this file ?')) {
      if (val == 1) {
        this.ArbitrationDetails.DetailsOfAgreementUrl = '';
      }
      else if (val == 2) {
        this.ArbitrationDetails.NoticebyClaimantUrl = '';
      }
      else if (val == 3) {
        this.ArbitrationDetails.ReplyNoticeByRespondentUrl = '';
      }
    }

  }
  async GenerateFIleNumber(type: any) {
    if (type == 1) {
      this.message = 'undefined'
    }
    this.isButtonDisabled = true;
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();

    this.arbitrationservice.GenerateArbitrationFileNumber(this.ArbitrationDetails.Id, type, this.message).subscribe({
      next: (data: any) => {
        loading.dismiss();
        this.isButtonDisabled = false;

        if (!!data && data.Id > 0) {
          switch (type) {
            case 1:
              alert("File Number Generated and sent!");
              break;
            case 2:
              alert("Defective filing intimation sent!");
              break;
            case 3:
              alert("Arbitration has been Dismissed and intimation sent!");
              break;
            default:
              alert("Unknown operation.");
          }
          this.back(null);
        }
      },
      error: (err) => {
        loading.dismiss();
        this.isButtonDisabled = false;
        console.error('Error generating file number:', err);
        alert("There was an error processing your request. Please try again.");
      }
    });
  }

  async CommenttoClaimant() {

    this.isButtonDisabled = true;
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.arbitrationservice.CommentClaimant(this.message, this.ArbitrationParties.filter(x => x.Type == 0 && x.Side == 0)[0].Email, this.ArbitrationParties.filter(x => x.Type == 0 && x.Side == 0)[0].Mobile, this.ArbitrationParties.filter(x => x.Type == 0 && x.Side == 0)[0].Name, this.ArbitrationDetails.Id).subscribe((data: any) => {
      loading.dismiss();
      this.isButtonDisabled = false;

      if (!!data && data[0].Id > 0) {

        alert("Comment Sent! ");
        this.back(null);
      }
    });
  }
  UploadDocumentCDNforReplyNotice(doc: any) {
    // console.log(doc);

    this.arbitrationservice.UploadDocumentCDN(doc).subscribe((data: any) => {
      if (data) {
        if (data.Id > 0 && data.Error == 0) {
          alert('Document Uploaded!')
          // this.alertservice.Alert("Document Uploaded", 3, () => { }, () => { },);
          this.authURLScode = data.SecreteCode;
          doc.SecreteCode = data.SecreteCode;
          if (doc.Type == 1) {
            this.ArbitrationDetails.DetailsOfAgreementUrl = data.SecreteCode;
          }
          else if (doc.Type == 2) {
            this.ArbitrationDetails.NoticebyClaimantUrl = data.SecreteCode;
          }
          else if (doc.Type == 3) {
            this.ArbitrationDetails.ReplyNoticeByRespondentUrl = data.SecreteCode;
          }

        } else {
          // this.alertservice.Alert("Error While Upload ", 3, () => { }, () => { },);
          alert('Error While Upload !')
        }
      }
      else {
        alert('Error While Upload !')
        // this.alertservice.Alert("Error While Upload ", 3, () => { }, () => { },);
      }
    });
  }

  SaveArbitrationRequest() {
    this.ArbitrationDetails.CenterAddress = this.message;
    this.arbitrationservice.UpdateArebitration(this.ArbitrationDetails).subscribe(data => {
      if (!!data && data.Id > 0 && data.Error == 0) {
        alert("Details Updated");
        this.back(null);
      }
      else {
        alert("Error while saving ...")
      }
    });
  }
  UploadDocumentCDNforExhibits(doc: any) {
    this.arbitrationservice.UploadDocumentCDN(doc).subscribe((data: any) => {
      if (data) {
        if (data.Id > 0 && data.Error == 0) {

          this.authURLScode = data.SecreteCode;
          doc.SecreteCode = data.SecreteCode;
          doc.DocUrl = data.SecreteCode;
          doc.Base64Data = '';
          this.exhibits.push(doc);
          this.alertservice.Alert("Document Uploaded", 3, () => { }, () => { },);
        } else {
          this.alertservice.Alert("Error While Upload ", 3, () => { }, () => { },);
        }
      }
      else {
        this.alertservice.Alert("Error While Upload ", 3, () => { }, () => { },);
      }
    })
  }
  async UploadArbitrationDocument() {
    if (!!this.exhibits && this.exhibits.length > 0) {
      const noExhibits = this.exhibits.filter(x => x.Type == 0).length == 0;

      if (noExhibits) {
        const confirmed = confirm(`Are you sure you want to upload ${this.doctype} without exhibits?`);
        if (!confirmed) return;
      }
      this.isButtonDisabled = true;
      const doc = this.exhibits.filter(x => x.DocType != 0)[0];
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      await loading.present();

      this.arbitrationservice.UploadArbitrationDocument(doc).subscribe({
        next: (data: any) => {
          loading.dismiss();
          this.isButtonDisabled = false;

          if (data && data.Id > 0 && data.Error == 0) {
            if (!noExhibits) {
              this.exhibits.find(x => x.Type != 0).Id = data.Id;
              this.SavePleadingsandExhibits();
            }
            alert(`${this.doctype} submitted successfully`);
            this.back(null);
          } else {
            this.alertservice.Alert("Error While Upload", 3, () => { }, () => { });
          }
        },
        error: (err) => {
          loading.dismiss();
          this.isButtonDisabled = false;

          console.error('Error uploading document:', err);
          this.alertservice.Alert("Error While Upload", 3, () => { }, () => { });
        }
      });
    }
  }

  async UploadArbitrationDocumentForMemo() {
    if (!!this.exhibits && this.exhibits.length > 0) {
      const noExhibits = this.exhibits.filter(x => x.Type == 0).length == 0;

      // if (noExhibits) {
      //   const confirmed = confirm(`Are you sure you want to upload ${this.doctype} without exhibits?`);
      //   if (!confirmed) return;
      // }
      this.isButtonDisabled = true;
      const doc = this.exhibits.filter(x => x.DocType != 0)[0];
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      await loading.present();

      this.arbitrationservice.UploadArbitrationDocument(doc).subscribe({
        next: (data: any) => {
          loading.dismiss();
          this.isButtonDisabled = false;

          if (data && data.Id > 0 && data.Error == 0) {
            if (!noExhibits) {
              this.exhibits.find(x => x.Type != 0).Id = data.Id;
              this.SavePleadingsandExhibits();
            }
            alert(`${this.doctype} submitted successfully`);
            this.back(null);
          } else {
            this.alertservice.Alert("Error While Upload", 3, () => { }, () => { });
          }
        },
        error: (err) => {
          loading.dismiss();
          this.isButtonDisabled = false;

          console.error('Error uploading document:', err);
          this.alertservice.Alert("Error While Upload", 3, () => { }, () => { });
        }
      });
    }
  }

  UploadDocumentCDN(doc: any) {
    this.arbitrationservice.UploadDocumentCDN(doc).subscribe((data: any) => {
      if (data) {
        if (data.Id > 0 && data.Error == 0) {
          this.authURLScode = data.SecreteCode;
          doc.SecreteCode = data.SecreteCode;
          doc.DocUrl = data.SecreteCode;
          doc.Base64Data = '';
          this.exhibits.push(doc);
          //  this.UploadArbitrationDocument(doc);
        } else {
          this.alertservice.Alert("Error While Upload ", 3, () => { }, () => { },);
        }
      }
      else {
        this.alertservice.Alert("Error While Upload ", 3, () => { }, () => { },);
      }
    })
  }
  UploadDocumentCDNInsertAuthorisationURL(doc: any) {
    this.arbitrationservice.UploadDocumentCDN(doc).subscribe((data: any) => {

      if (data) {
        if (data.Id > 0 && data.Error == 0) {
          // this.alertservice.Alert("Document Uploaded",3,()=>{},()=>{},);
          this.authURLScode = data.SecreteCode;
          // alert(   this.authURLScode)
          doc.SecreteCode = data.SecreteCode;
          doc.Base64Data = '';
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
  InsertExhibits(ex: any) {

    this.arbitrationservice.InsertExhibits(ex).subscribe((data: any) => {
      if (data) {
        if (data[0].Id > 0 && data[0].Error === 0) {
          alert("Document Uploaded");
          // window.location.reload()
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
      if (data) {
        if (data[0].Id > 0 && data[0].Error === 0) {
          alert("Document Uploaded");
        }
      }
      else {
        this.alertservice.Alert("Error While Upload ", 3, () => { }, () => { },);
      }
    });
  }
  InsertReplyNoticeByRespondentUrl() {
    const SecretCode = this.authURLScode
    const Id = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id
    this.arbitrationservice.ReplyNoticeByRespondentUrlInsert(Id, SecretCode).subscribe((data: any) => {
      if (data) {
        if (data[0].Id > 0 && data[0].Error === 0) {
          alert("Document Uploaded");
          window.location.reload()
        }
      }
      else {
        this.alertservice.Alert("Error While Upload ", 3, () => { }, () => { },);
      }
    });
  }
  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  back(val: any) {
    this.modalController.dismiss(val);
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
    this.doctypeother = '';

  }
  SaveCaseManagementProcedure() {

  }
  SetDocName(Type: any) {
    switch (this.FormType) {
      case 1:
        return 'COMMENCEMENT PROCEDURE ';
      case 2:
        return ' APPLICATION AND ORDER';
      case 3:
        return ' DISCLOSURE STATEMENT';
      case 4:
        return ' AUTHORIZATION OR VAKALATH';
      case 5:
        return ' PLEADINGS BY PARTY';
      case 6:
        return ' ARBITRAL AWARD';
      case 7:
        return ' EVIDENCE';
      case 8:
        return ' NOTICE & PO (TRIBUNAL)';
      case 9:
        return ' NOTICE & PO (ADMIN)';
      case 10:
        return 'PROCEDURAL ORDER ON CASE MANAGEMENT';
      case 11:
        return 'ARBITRATION REQUEST';
      case 12:
        return 'CONSTITUTION OF TRIBUNAL';

      default:
        return '';
    }
  }
  async CreatewithPG(val: any) {
    // alert(this.doctype);
    // alert(this.doctypeother);
    let doc = '';
    if (((this.applicationtype == 'Issues') || (this.applicationtype == 'Procedural Order(PO)'))) {
      doc = this.applicationtype;
      if (!!this.doctype && (this.doctype == 'Closing of Final Hearing' || this.doctype == 'Settlement and Termination')) {
        doc = this.doctype;
      }

    }
    else {
      doc = this.doctype;
    }

    if (!!this.doctypeother && this.doctypeother.length > 1) {
      doc = this.doctypeother;
    }


    let dt = {
      FormType: this.FormType,
      IsConnectwithParty: val,
      DocType: doc,
      ApplicationType: this.applicationtype
    }
    console.log(dt, 'plplplp')
    this.modalController.dismiss(dt);
  }
  async CreatewithPGapplication(val: any) {
    let doc = this.doctype;
    if (!!this.doctypeother && this.doctypeother.length > 1) {
      doc = this.doctypeother;
    }
    if (!!this.ReferenceDocument && this.ReferenceDocument.Id > 0) {
      doc = this.ReferenceDocument.DocumentName
    }
    let dt = {
      FormType: this.FormType,
      IsConnectwithParty: val,
      DocType: doc,
      ApplicationType: "Application",
      ReferenceDocument: this.ReferenceDocument
    }
    this.modalController.dismiss(dt);
  }
  filterarbitrationDocumentWithUniqueApplication(segment: any) {
    let arr = this.ArbitrationDocuments.filter(x => x.Segment == segment && x.ReferenceDocumentId == 0 && x.IsMailer == 0);
    return [...new Map(arr.map(item => [item['Id'], item])).values()];
  }
  filterarbitrationDocumentWithDocName(segment: any, docname: any) {
    return this.ArbitrationDocuments.filter(x => x.Segment == segment && x.DocumentName == docname && x.IsMailer == 0);
  }
  ApplicationSelectChange(event: any) {
    this.ReferenceDocument = this.ArbitrationDocuments.find(x => x.Id == event.target.value);
    this.DocType = 5;
    this.FormType = 2;
  }
}