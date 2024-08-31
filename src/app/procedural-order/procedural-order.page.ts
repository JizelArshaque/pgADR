import { HostListener, Component, OnInit } from '@angular/core';

import { IonicModule, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';

import { ArbitrationServiceService } from '../arbitration-service.service';
import { AppConfig } from 'src/class/AppCofig';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ArbitrationCaseManagement, DocumentUploadCDN } from 'src/class/DocumentUploadCDN';
import { Editor } from 'ngx-editor';
import {EditorConfig, ST_BUTTONS} from 'ngx-simple-text-editor';
import { AlertService } from 'src/shared/alert-info/alert.service';
@Component({
  selector: 'app-procedural-order',
  templateUrl: './procedural-order.page.html',
  styleUrls: ['./procedural-order.page.scss'],
})
export class ProceduralOrderPage implements OnInit {
  ArbitrationDetails: any;
  CaseManagementDetails: ArbitrationCaseManagement = new ArbitrationCaseManagement();
  ArbitrationParties: any[] = [];
  Type: any;
  config: EditorConfig = {
    placeholder: 'Type something...',
    buttons: ST_BUTTONS,
  };
  appconfig = new AppConfig();
  editor= new Editor();
  IsEdit: boolean = false;
  HtmlData: any;
  datepipe = new DatePipe('en-IND');
  decimalpipe = new DecimalPipe('en-IND');
  today = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  // result = new Date(this.today); commented by shibil 
  result = this.today !== null ? new Date(this.today) : new Date();

  Filling_Schedule: string = '';
  Fee_Schedule: string = '';
  Tab: number = 0;
  DocName: string = '';
  DocumentType: number = 2;
  ApplicationType: string = '';
  user: any;
  CentersList: any[] = [];
  IsConnectwithParty: boolean = false;
  doc = new DocumentUploadCDN();
  ClaimAlreadyFiled: boolean = false;
  ArbitratorBankDetails: any[] = [];
  CenterBankDetails: any[] = [];
  PoNumber = '';
  PoNo: number = 0;
  FeeList: any[] = [];
  ReferenceDocument: any;
  CaseManagementProcedure: any[] = [];
  ArbitrationDocs: any[] = [];
  isButtonDisabled = false;
  constructor(private loadingCtrl: LoadingController,private router: Router,private alertservice:AlertService, private modalController: ModalController, private arbitrationservice: ArbitrationServiceService, public navParams: NavParams) {
    if (this.navParams.get("ArbitrationDetails")) {
      this.ArbitrationDetails = this.navParams.get("ArbitrationDetails");
      this.ArbitrationParties = this.navParams.get("ArbitrationParties");
      if (this.navParams.get("ArbitrationDocs")) {
        this.ArbitrationDocs = this.navParams.get("ArbitrationDocs");
      }
      this.ArbitrationDetails.ArbitratorFeeAmount = 0;
      this.ArbitrationDetails.AdminFeeAmount = 0;
      this.ArbitrationDetails.FeePaidBy = '1';
      if (localStorage.getItem("ADR_Dashboard_User")) {
        this.user = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`);
      }
      this.Type = this.navParams.get("Type");
      if (this.Type == 10) {
        this.GetBankDetails();
        this.GetFeeForDisputeRegister();
        this.CaseManagementDetails.ClaimStatementFilingDate = this.datepipe.transform(this.AddDate(15), 'yyyy-MM-dd');
        this.CaseManagementDetails.DefenceStatementFilingDate = this.datepipe.transform(this.AddDate(30), 'yyyy-MM-dd');
        this.CaseManagementDetails.ReplyStatementFilingDate = this.datepipe.transform(this.AddDate(40), 'yyyy-MM-dd');
        this.CaseManagementDetails.RejoinderFilingDate = this.datepipe.transform(this.AddDate(50), 'yyyy-MM-dd');
        this.CaseManagementDetails.FeeScheduleDay1 = this.datepipe.transform(this.AddDate(15), 'yyyy-MM-dd');
        this.CaseManagementDetails.FeeScheduleDay2 = this.datepipe.transform(this.AddDate(30), 'yyyy-MM-dd');
        this.CaseManagementDetails.FeeScheduleDay3 = this.datepipe.transform(this.AddDate(40), 'yyyy-MM-dd');
        this.CaseManagementDetails.FeeScheduleDay4 = this.datepipe.transform(this.AddDate(50), 'yyyy-MM-dd');
        this.CaseManagementDetails.FeeScheduleDay5 = this.datepipe.transform(this.AddDate(70), 'yyyy-MM-dd');
      }
      if (this.Type == 2 || this.Type == 8 || this.Type == 9 || this.Type == 10) {
        this.GetNextPONumber();
      }
      if(this.Type==6){
        if(this.ArbitrationDetails.ArbitrationStage==26){
          this.Tab=4;
          this.HtmlData=this.ArbitrationDocs.filter(x=>x.Segment==6)[0].Description;
          this.doc.AwardStatus=1;
          this.doc.Id=this.ArbitrationDocs.filter(x=>x.Segment==6)[0].Id;
        }
        else if(this.ArbitrationDocs.filter(x=>x.Segment==6 && x.Status==2).length>0){
          this.Tab=4;
          this.HtmlData=this.ArbitrationDocs.filter(x=>x.Segment==6)[0].Description;
          this.doc.Id=this.ArbitrationDocs.filter(x=>x.Segment==6)[0].Id;
        }
      }
      if (this.navParams.get("IsConnectwithParty")) {
        this.IsConnectwithParty = this.navParams.get("IsConnectwithParty");
      }
      if (this.navParams.get("DocType")) {
        this.DocName = this.navParams.get("DocType");
      }
      if (this.navParams.get("CaseManagementProcedure")) {
        this.CaseManagementProcedure = this.navParams.get("CaseManagementProcedure");
      }
      if (this.navParams.get("ApplicationType")) {
        this.ApplicationType = this.navParams.get("ApplicationType");
        if (this.ApplicationType == 'Notice' || this.ApplicationType == 'Issues') {
          this.DocumentType = 1;
        }
        else if (this.ApplicationType == '5' || this.ApplicationType == '6') {
          this.DocumentType = Number(this.ApplicationType);
        }
        else {
          this.DocumentType = 2;
        }
      }

      if (this.ArbitrationDetails.Region == 1) {
        this.GetAllCentresWithAdrType(2);
      }
      else {
        this.GetAllCentresWithAdrType(4);
      }
      if (this.navParams.get("ReferenceDocument")) {
        this.ReferenceDocument = this.navParams.get("ReferenceDocument");
      }
    }

   

  }
  
  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    // Get the secure code from local storage
    const secureCode = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).SecureCode

    // Check if the secure code exists in local storage
    if (secureCode) {
      alert(secureCode)
      // Navigate to the dashboard with the secure code
      this.router.navigate(['/dashboard', secureCode]);
    } else {
      // Navigate to a default route if the secure code is not found
      this.router.navigate(['/dashboard']); // Navigate to a default dashboard route
    }
  }
  GetNextPONumber() {
    this.arbitrationservice.GetnextPoNumber(this.ArbitrationDetails.Id, this.user.Type, this.ArbitrationDetails.FileNumber).subscribe(data => {
      if (!!data && data.length > 0) {
        this.PoNumber = data[0].DocumentNumber;
        this.PoNo = data[0].DocNo;
      }
      else {
        this.PoNumber = '';
        this.PoNo == 0;
      }
    });
  }


  SetDocName() {
    switch (this.Type) {
      case 1:
        return 'COMMENCEMENT PROCEDURE ';
      case 2:
        if (this.DocumentType == 5) {
          return 'PROCEDURAL ORDER No. PO/AT/' + this.PoNo.toString() + ' in ' + this.ReferenceDocument.DocumentNumber + ' DATED ' + this.datepipe.transform(this.today, 'dd-MMM-yyyy');
        }
        else if (this.DocumentType == 6) {
          return 'ORDER No. PO/AT/' + this.PoNo.toString() + ' On ' + this.ReferenceDocument.DocumentNumber;
        }
        else {
          return 'APPLICATION AND ORDER';
        }
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
        return this.DocName.toUpperCase();
      case 9:
        return this.DocName.toUpperCase();
      case 10:
        return 'PROCEDURAL ORDER ON CASE MANAGEMENT';
      case 11:
        return 'ARBITRATION REQUEST';
      case 12:
        return this.DocName.toUpperCase();
      case 13:
        return this.DocName.toUpperCase();
      default:
        return '';
    }
  }
  Edit() {
    let dt = document.getElementById('auto_doc')?.innerHTML;
    this.HtmlData = dt;
    this.IsEdit = !this.IsEdit;
  }
  GetPleadingCompletionDate() {
    if (!!this.CaseManagementProcedure && this.CaseManagementProcedure.length > 0) {
      if (!!this.CaseManagementProcedure[0].RejoinderFiledOn && this.CaseManagementProcedure[0].RejoinderFiledOn.length > 0) {
        return this.CaseManagementProcedure[0].RejoinderFiledOn;
      }
      else if (!!this.CaseManagementProcedure[0].ReplyStatementFiledOn && this.CaseManagementProcedure[0].ReplyStatementFiledOn.length > 0) {
        return this.CaseManagementProcedure[0].ReplyStatementFiledOn;
      }
      else if (!!this.CaseManagementProcedure[0].DefenceStatementFiledOn && this.CaseManagementProcedure[0].DefenceStatementFiledOn.length > 0) {
        return this.CaseManagementProcedure[0].DefenceStatementFiledOn;
      }
      else if (!!this.CaseManagementProcedure[0].ClaimStatementFiledOn && this.CaseManagementProcedure[0].ClaimStatementFiledOn.length > 0) {
        return this.CaseManagementProcedure[0].ClaimStatementFiledOn;
      }
      else {
        return '';
      }
    }
    else {
      return '';
    }
  }
  AddDate(days: any) {
    let result = new Date();
    // if (!!this.ArbitrationDetails.TribunalAppointedOn) {
    // result = new Date(this.ArbitrationDetails.TribunalAppointedOn);
    //}
    result.setDate(result.getDate() + days);
    return result;
  }
  AddMonth(month: any) {
    let result = new Date();
    //  if (!!this.ArbitrationDetails.TribunalAppointedOn) {
    //  result = new Date(this.ArbitrationDetails.TribunalAppointedOn);
    // }
    result.setMonth(result.getMonth() + month);
    return result;
  }
  ngOnInit(): void {
    // Set timeout to call Edit and change Tab after 20 seconds (20000 milliseconds)
    setTimeout(() => {
      this.Edit();     // Call the Edit method
      this.Tab = 4;    // Set Tab to 4
    },2500);
  }
  back() {
    this.modalController.dismiss(true);
  }
  FilterArbitrationPartiesWithUserId() {
    return this.ArbitrationParties.filter(x => x.Id == this.user.Id);
  }

  FilterArbitrationParties(side: any, partytype: any) {
    return this.ArbitrationParties.filter(x => x.Type == partytype).filter(x => x.Side == side);
  }
  FilterArbitrationPartiesWithIsConteoller(side: any, partytype: any, controller: any) {
    return this.ArbitrationParties.filter(x => x.Type == partytype && x.IsController == controller).filter(x => x.Side == side);
  }
  FilterArbitrationPartiesWithType(partytype: any) {
    return this.ArbitrationParties.filter(x => x.Type == partytype);
  }
  FilterArbitrationPartiesWithSide(side: any) {
    return this.ArbitrationParties.filter(x => x.Type != 3 && x.Side == side);
  }
  async Schedule() {

    // const modal = await this.modalController.create({
    //   component: UploadModalPage,

    //   componentProps: {
    //     Arbitration: this.ArbitrationDetails,
    //     Type:7
    //   },

    // });
    // modal.onDidDismiss().then((modelData) => {
    //   if (modelData !== null) { 
    //     this.ArbitrationDetails=modelData.data;
    let claimstatementdate: string = 'on or before ';
    if (this.ClaimAlreadyFiled == true) {
      claimstatementdate = 'filled on ';
    }
    this.Filling_Schedule = `<br>
          <li>1. Claim statement along with all documents
            by the claimant:	<b> `+ claimstatementdate + this.datepipe.transform(this.CaseManagementDetails.ClaimStatementFilingDate, 'dd-MMM-yyyy') + `</b></li><br>
          <li>2. Defense statement and counter claim, if any
            by the respondent:	<b>On or before `+ this.datepipe.transform(this.CaseManagementDetails.DefenceStatementFilingDate, 'dd-MMM-yyyy') + `</b></li><br>
          <li>3. Reply statement by the claimant, if any:<b>	On or before `+ this.datepipe.transform(this.CaseManagementDetails.ReplyStatementFilingDate, 'dd-MMM-yyyy') + `</b></li><br>
          <li>4. Rejoinder by the respondent, if any:<b>	On or before `+ this.datepipe.transform(this.CaseManagementDetails.RejoinderFilingDate, 'dd-MMM-yyyy') + `</b></li><br>`;
    if (this.CaseManagementDetails.FeePaymentType == 1) {
      if (this.CaseManagementDetails.FeePaidBy == 1) {
        this.Fee_Schedule =

          `<br>
          <li > The claimant shall deposit <b>`+ this.decimalpipe.transform(this.CaseManagementDetails.ArbitratorFee / 2, '1.2-2') + `</b> towards arbitrator fee and <b>` + this.decimalpipe.transform(this.CaseManagementDetails.AdministrativeFee / 2, '1.2-2') + `</b> towards administrative fee,<b>on or before: ` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay1, 'dd-MMM-yyyy') + `</b> </li>
          <br> <li > The respondent shall deposit <b>`+ this.decimalpipe.transform(this.CaseManagementDetails.ArbitratorFee / 2, '1.2-2') + `</b> towards arbitrator fee and <b>` + this.decimalpipe.transform(this.CaseManagementDetails.AdministrativeFee / 2, '1.2-2') + `</b> towards administrative fee,<b> on or before: ` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay2, 'dd-MMM-yyyy') + `</b></li>`;
      }
      else if (this.CaseManagementDetails.FeePaidBy == 2) {
        this.Fee_Schedule =

          `<br>
        <li >The claimant shall deposit <b>`+ this.decimalpipe.transform(this.CaseManagementDetails.ArbitratorFee, '1.2-2') + `</b> towards arbitrator fee and <b>` + this.decimalpipe.transform(this.CaseManagementDetails.AdministrativeFee, '1.2-2') + `</b> towards administrative fee,<b> on or before: ` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay1, 'dd-MMM-yyyy') + `</b> </li>`;


      }
    }
    else {
      if (this.CaseManagementDetails.FeePaidBy == 1) {
        this.Fee_Schedule =

          `<br>
        <li > The claimant shall deposit <b>`+ this.decimalpipe.transform(this.CaseManagementDetails.ArbitratorFee / 4, '1.2-2') + `</b> (25%) towards arbitrator fee and <b>` + this.decimalpipe.transform(this.CaseManagementDetails.AdministrativeFee / 4, '1.2-2') + `</b> (25%) towards administrative fee, <b>on or before: ` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay1, 'dd-MMM-yyyy') + `</b> </li>
        <br> <li > The respondent shall deposit <b>`+ this.decimalpipe.transform(this.CaseManagementDetails.ArbitratorFee / 4, '1.2-2') + `</b> (25%) towards arbitrator fee and <b>` + this.decimalpipe.transform(this.CaseManagementDetails.AdministrativeFee / 4, '1.2-2') + `</b> (25%) towards administrative fee, <b> on or before: ` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay2, 'dd-MMM-yyyy') + `</b></li>
        <br> <li > The claimant and respondent(s) shall deposit equally <b>`+ this.decimalpipe.transform((this.CaseManagementDetails.ArbitratorFee * (30 / 100)), '1.2-2') + `</b> (30%) towards arbitrator fee and <b>` + this.decimalpipe.transform((this.CaseManagementDetails.AdministrativeFee * (30 / 100)), '1.2-2') + `</b> (30%) towards administrative fee, <b> on or before: ` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay3, 'dd-MMM-yyyy') + `</b></li>
        <br> <li > The claimant and respondent(s) shall deposit equally <b>`+ this.decimalpipe.transform((this.CaseManagementDetails.ArbitratorFee / 5), '1.2-2') + `</b> (20%) towards arbitrator fee and <b>` + this.decimalpipe.transform(this.CaseManagementDetails.AdministrativeFee / 5, '1.2-2') + `</b> (20%) towards administrative fee, <b> on or before: ` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay4, 'dd-MMM-yyyy') + `</b></li>
        <br> <li > On completion of pleadings, and on finalization of the amount in dispute, balance fee if any shall be deposited equally by the claimant and respondent on or before: <b>` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay5, 'dd-MMM-yyyy') + `</b></li>`;


      }
      else if (this.CaseManagementDetails.FeePaidBy == 2) {
        this.Fee_Schedule =
          `<br>
    <li > The claimant shall deposit <b>`+ this.decimalpipe.transform(this.CaseManagementDetails.ArbitratorFee / 4, '1.2-2') + `</b> (25%) towards arbitrator fee and <b>` + this.decimalpipe.transform(this.CaseManagementDetails.AdministrativeFee / 4, '1.2-2') + `</b> (25%) towards administrative fee, <b>on or before: ` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay1, 'dd-MMM-yyyy') + `</b> </li>
    <br> <li > The claimant shall deposit <b>`+ this.decimalpipe.transform(this.CaseManagementDetails.ArbitratorFee / 4, '1.2-2') + `</b> (25%) towards arbitrator fee and <b>` + this.decimalpipe.transform(this.CaseManagementDetails.AdministrativeFee / 4, '1.2-2') + `</b> (25%) towards administrative fee, <b> on or before: ` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay2, 'dd-MMM-yyyy') + `</b></li>
    <br> <li > The claimant shall deposit <b>`+ this.decimalpipe.transform((this.CaseManagementDetails.ArbitratorFee * (30 / 100)), '1.2-2') + `</b> (30%) towards arbitrator fee and <b>` + this.decimalpipe.transform((this.CaseManagementDetails.AdministrativeFee * (30 / 100)), '1.2-2') + `</b> (30%) towards administrative fee, <b> on or before: ` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay3, 'dd-MMM-yyyy') + `</b></li>
    <br> <li > The claimant shall deposit <b>`+ this.decimalpipe.transform((this.CaseManagementDetails.ArbitratorFee / 5), '1.2-2') + `</b> (20%) towards arbitrator fee and <b>` + this.decimalpipe.transform(this.CaseManagementDetails.AdministrativeFee / 5, '1.2-2') + `</b> (20%) towards administrative fee, <b> on or before: ` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay4, 'dd-MMM-yyyy') + `</b></li>
    <br> <li > On completion of pleadings, and on finalization of the amount in dispute, balance fee if any shall be deposited by the claimant on or before: <b>` + this.datepipe.transform(this.CaseManagementDetails.FeeScheduleDay5, 'dd-MMM-yyyy') + `</b></li>`;
      }
    }

    // else if (this.ArbitrationDetails.FeePaidBy != 2) {
    //   this.Fee_Schedule =

    //     `<br>

    //     <li >Since the claimant has failed to make the deposit as per the earlier Case Management Schedule, the respondent shall deposit <b>`+ this.decimalpipe.transform(this.ArbitrationDetails.ArbitratorFeeAmount, '1.2-2') + `</b> towards arbitrator fee and <b>` + this.decimalpipe.transform(this.ArbitrationDetails.AdminFeeAmount, '1.2-2') + `</b> towards administrative fee,<b> on or before: ` + this.datepipe.transform(this.ArbitrationDetails.RespondentFeeDate, 'dd-MMM-yyyy') + `</b> </li>`;
    // }

    //   }
    // });
    // await modal.present();
  }
  changeTab(tabNumber: number) {
    if (tabNumber < this.Tab) {
      this.Tab = tabNumber;
    }
  }
  Save() {
    debugger
    if (this.Tab == 0) {
      debugger
      if (this.Type == 10) {
        debugger
        this.Tab = 1;
      }
      else if (this.Type == 8 || this.Type == 9 || (this.Type == 2 && this.DocumentType != 6)) {
        debugger
        this.Tab = 2;
      }
      else {
        debugger
        this.Edit();
        this.Tab = 4;
      }
    }
    else if (this.Tab == 1) {
      debugger
      this.Schedule();
      this.Tab = 2;
    }
    else if (this.Tab == 2) {
      debugger
      if (this.Type == 10) {
        if ((!!this.CaseManagementDetails.NextPostingDateAndTime && this.CaseManagementDetails.NextPostingDateAndTime.length > 0) &&
          (!!this.CaseManagementDetails.NameandAddressofVenue && this.CaseManagementDetails.NameandAddressofVenue.length > 0)) {
          if (confirm("You may please make sure that all columns are filled and the details given are correct !")) {

            this.Tab = 3;
            setTimeout(() => {
              this.Edit();         
              this.Tab = 4;   
            }, 1000)
          };
        }
        else {
          alert("Please select Next Posting Date and Time and Name and Address of Venue !!");
        }

      }
      else {
        if (confirm("You may please make sure that all columns are filled and the details given are correct !")) {

          this.Tab = 3;
          setTimeout(() => {
            this.Edit();       
            this.Tab = 4;   
          }, 1000)
        };
      }

    }
    else if (this.Tab == 3) {
      debugger
      this.Edit();
      setTimeout(() => {
        this.Tab = 4;
      }, 100)

    }
    else if (this.Tab == 4) {
      debugger
      this.CreateDocument();
    }
  }
  SaveSchedule(type: any) {
    if (type == 1) {
      if (this.CaseManagementDetails.SittingOption == 'Online') { this.CaseManagementDetails.NameandAddressofVenue = 'Online'; }
      if (!!this.CaseManagementDetails.NextPostingDateAndTime || !!this.CaseManagementDetails.NameandAddressofVenue ) {
        this.doc.ScheduleDate = this.datepipe.transform(this.CaseManagementDetails.NextPostingDateAndTime, 'dd-MMM-yyyy hh:mm a');
        this.doc.ScheduleVenue = this.CaseManagementDetails.NameandAddressofVenue;
        if (this.Type === 2) {
          const claimDate = this.CaseManagementDetails?.ClaimStatementFilingDate;
          if (claimDate && claimDate.length > 0) {
            this.doc.Remarks = this.datepipe.transform(claimDate, 'dd-MMM-yyyy') ?? '';
          }
        }
        
        else if (this.Type == 8 && this.ApplicationType == 'Notice' && this.DocName == 'Notice for Draft Issues') {
          if (this.CaseManagementDetails?.ClaimStatementFilingDate?.length > 0) {
            this.doc.Remarks = this.datepipe.transform(this.CaseManagementDetails.ClaimStatementFilingDate, 'dd-MMM-yyyy') ?? '';
            
            if (this.CaseManagementDetails?.DefenceStatementFilingDate?.length > 0) {
              this.doc.Remarks += ',' + (this.datepipe.transform(this.CaseManagementDetails.DefenceStatementFilingDate, 'dd-MMM-yyyy') ?? '');
            }
          }
          
        }
        this.Save();
      }
      else if(this.DocName=='Closing of Final Hearing'){
        this.Save();
      }
      else {
        alert("Please enter Next Posting date and Venue or select not applicable");
      }
    }
    else {
      this.doc.ScheduleDate = '01-Jan-1901';
      this.Save();
    }
  }

  SaveAward(type:any){
   
    this.doc.ArbitrationId = this.ArbitrationDetails.Id;
    this.doc.Side = this.user.Side;
    this.doc.UserId = this.user.Id;
    this.doc.CreatorType = this.user.Type;
    this.doc.DocName = this.SetDocName();
    this.doc.Description = this.HtmlData;
    this.doc.Segment = this.Type;
    this.doc.DocType = this.DocumentType;
    this.doc.Name = this.user.Name;
    this.doc.Email = this.user.Email;
    this.doc.Mobile = this.user.Mobile;
    this.doc.Status=type;
    if(type==1){
      this.doc.AwardStatus =  1; 
      this.doc.Status=0 
    }
    if (!!this.ReferenceDocument) { this.doc.ReferenceDocumentId = this.ReferenceDocument.Id; } else { this.doc.ReferenceDocumentId = 0; }
    if (!this.doc.ScheduleDate || (!!this.doc.ScheduleDate && this.doc.ScheduleDate.length < 2)) {
      this.doc.ScheduleDate = '01-Jan-1901';
    }
    if(type==2){
      this.arbitrationservice.InsertArbitrationAward(this.doc).subscribe((data) => {
        if (!!data && data.Id > 0 && data.Error == 0) {
          if(type==2){
            alert("Arbitral Award Saved Successfully.");
          }
          else  if(type==0){
            alert("Arbitral Award Submitted for Scrutiny.");
          }
          else  if(type==1){
            alert("Arbitral Award Published Successfully.");
          }
          this.back();
        }
      });
    }
    else{
      let msg='';
      if(type==0 && this.doc.AwardStatus==0){
        msg=" Submit Award for Scrutiny. ";
      }
      else if(type==1){
        msg=" Publish Award";
      }
     
      let that=this;
      if(confirm("Are you sure to "+msg+" ?")) {

      this.arbitrationservice.InsertArbitrationAward(this.doc).subscribe((data) => {
        if (!!data && data.Id > 0 && data.Error == 0) {  
           if(type==0){
            alert("Arbitral Award Submitted for Scrutiny.");
          }
          else  if(type==1){
            alert("Arbitral Award Published Successfully.");
          }
          that.back();
        }
      });
    }
  }
  }
  async CreateDocument() {
    this.isButtonDisabled = true;
    let loading = await this.loadingCtrl.create({
        message: 'Please wait...'
    });
    await loading.present();

    // Set document properties
    this.doc.CaseManagement = this.CaseManagementDetails;
    this.doc.ArbitrationId = this.ArbitrationDetails.Id;
    this.doc.Side = this.user.Side;
    this.doc.UserId = this.user.Id;
    this.doc.CreatorType = this.user.Type;
    this.doc.DocName = this.SetDocName();
    this.doc.Description = this.HtmlData;
    this.doc.Segment = this.Type;
    this.doc.DocType = this.DocumentType;
    this.doc.Name = this.user.Name;
    this.doc.Email = this.user.Email;
    this.doc.Mobile = this.user.Mobile;

    // Handle reference document
    this.doc.ReferenceDocumentId = !!this.ReferenceDocument ? this.ReferenceDocument.Id : 0;

    // Handle ScheduleDate
    if (!this.doc.ScheduleDate || (this.doc.ScheduleDate.length < 2)) {
        this.doc.ScheduleDate = '01-Jan-1901';
    }
console.log(this.doc) ;debugger


    // API call to upload the document
    this.arbitrationservice.UploadArbitrationDocument(this.doc).subscribe(
        (data) => {
            loading.dismiss();
            this.isButtonDisabled = false; // Dismiss the loader after the API response

            if (!!data && data.Id > 0 && data.Error == 0) {
                alert("Document Created Successfully");
                this.back();
            } else {
                alert("Error creating document");
            }
        },
        (error) => {
          this.isButtonDisabled = false;
            loading.dismiss(); // Dismiss the loader even if there's an error
            alert("An error occurred while creating the document!");
        }
    );
}


  CheckEditorDisable() {
    if (this.Tab == 4) {
      return false;
    }
    else {
      return true;
    }
  }
  GetAllCentresWithAdrType(adrtype: any) {
    this.arbitrationservice.spGetAllCentersWithAdrType(adrtype).subscribe((data: any) => {
      if (!!data && data.length > 0) {
        this.CentersList = <Array<any>>data;
      }
    });
  }
  GetBankDetails() {
    this.arbitrationservice.GetBankDetails(this.ArbitrationDetails.Id).subscribe((data: any) => {
      if (!!data && data.length > 0) {
        if (data.filter((x: any) => x.Type == 2).length > 0) {
          this.ArbitratorBankDetails = data.filter((x: any) => x.Type == 2);
        }
        else {
          this.ArbitratorBankDetails = [];
        }
        if (data.filter((x: any) => x.Type == 1).length > 0) {
          this.CenterBankDetails = data.filter((x: any) => x.Type == 1);
        }
        else {
          this.CenterBankDetails = [];
        }
      }
    });
  }
  BookRoom() {
    window.open('https://peacegate.in/room-booking-home', '_default');
  }

  FilterFee(feetype: any) {
    if (!!this.FeeList && this.FeeList.length > 0) {

      let Amount = 0;
      if (feetype == 'Tribunal-fee') {
        this.ArbitrationDetails.ArbitratorFeeAmount = Math.round(this.FeeList.filter((x: any) => x.FeeType == feetype)[0].FeeAmount * this.ArbitrationDetails.NumberofArbitrator);
        return this.ArbitrationDetails.ArbitratorFeeAmount;
      }
      else if (feetype == 'Admin-fee') {
        Amount = this.FeeList.filter((x: any) => x.FeeType == feetype)[0].FeeAmount;
        this.ArbitrationDetails.AdminFeeAmount = Math.round(Amount + (Amount * (this.ArbitrationDetails.GST / 100)) + (Amount * (this.ArbitrationDetails.Cess / 100)));
        return this.ArbitrationDetails.AdminFeeAmount;
      }
      else {
        Amount = this.FeeList.filter((x: any) => x.FeeType == feetype)[0].FeeAmount;
        return Math.round(Amount + (Amount * (this.ArbitrationDetails.GST / 100)) + (Amount * (this.ArbitrationDetails.Cess / 100)));
      }

    }
  }
  filterCentersList(id: any) {
    let centre = this.CentersList.find(x => x.Id == id)
    return centre.Name + ", " + centre.Address;
  }
  CheckDate(event: any, type: any) {
    if (event.target.checked == true) {
      this.ClaimAlreadyFiled = true;
      this.CaseManagementDetails.DefenceStatementFilingDate = this.datepipe.transform(this.AddDate(15), 'yyyy-MM-dd');
      this.CaseManagementDetails.ReplyStatementFilingDate = this.datepipe.transform(this.AddDate(25), 'yyyy-MM-dd');
      this.CaseManagementDetails.RejoinderFilingDate = this.datepipe.transform(this.AddDate(35), 'yyyy-MM-dd');
    }
    else {
      this.ClaimAlreadyFiled = false;
      this.CaseManagementDetails.ClaimStatementFilingDate = this.datepipe.transform(this.AddDate(15), 'yyyy-MM-dd');
      this.CaseManagementDetails.DefenceStatementFilingDate = this.datepipe.transform(this.AddDate(30), 'yyyy-MM-dd');
      this.CaseManagementDetails.ReplyStatementFilingDate = this.datepipe.transform(this.AddDate(40), 'yyyy-MM-dd');
      this.CaseManagementDetails.RejoinderFilingDate = this.datepipe.transform(this.AddDate(50), 'yyyy-MM-dd');
    }
  }
  CategoryofArbitrationList: any[] = [{ Id: 1, Name: 'Regular' }, { Id: 2, Name: 'Fast Track' }, { Id: 3, Name: 'Expedited' }]

  GetFeeForDisputeRegister() {
    if (localStorage.getItem('ADR_Dashboard_User')) {
      this.arbitrationservice.GetFeeForDisputeRegister(this.ArbitrationDetails.DisputeValue, '', 1, this.CategoryofArbitrationList.find(x => x.Id == this.ArbitrationDetails.ArbitrationAgreementType).Name, JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Email, 2).subscribe((data: any) => {
        if (!!data && data.length > 0) {
          this.FeeList = <Array<any>>data;
          this.ArbitrationDetails.FeeList = this.FeeList;
          this.GetAllGeneralSetting();
        }
      });
    }
  }

  GetAllGeneralSetting() {

    this.arbitrationservice.GetAllGeneralSettings().subscribe((data: any) => {
      if (!!data && data.length > 0) {
        this.ArbitrationDetails.GST = data[0].GST;
        this.ArbitrationDetails.Cess = data[0].Cess;
      }
    });
  }
  filterarbitrationDocumentWithApplicationOrder(segment: any, doctype: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.ReferenceDocumentId == this.ReferenceDocument.Id && x.IsMailer == 0 && x.DocType == doctype);
  }
  filterarbitrationDocumentWithApplicationCounter(segment: any) {
    return this.ArbitrationDocs.filter(x => x.Segment == segment && x.ReferenceDocumentId == this.ReferenceDocument.Id && x.IsMailer == 0 && x.DocType == 3);
  }
}
