import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppConfig } from 'src/class/AppCofig';
import { DocumentUploadCDN } from 'src/class/DocumentUploadCDN';
import { Mediation } from 'src/class/Mediation';
import { ArbitrationServiceService } from '../arbitration-service.service';
import { Videocalluser } from 'src/service/Videocalluser.service';

@Component({
  selector: 'app-select-arbitrator-modal',
  templateUrl: './select-arbitrator-modal.page.html',
  styleUrls: ['./select-arbitrator-modal.page.scss'],
})
export class SelectArbitratorModalPage implements OnInit {
  profiles: any[] = [];
  NoOfTribunalsSelected: string[] = [];
  authURLScode: any;
  ArbitratorList: any[] = [];
  interval1: any;
  exhibits: any[] = [];
  documentName: string = '';
  selectedFile: File | null = null;
  showAdditionalUploadOptions: boolean = false;
  doccdn = new DocumentUploadCDN();
  User: any;
  centerid: any;
  adrtype: any;
  quantumofclaim: any;
  disputecategory: any;
  region: any;
  VideoCallId: any;
  isPeacegatePaddingLeft = false;
  mediation = new Mediation();
  Side: any;
  Name: any;
  usertype: any;
  userside: any;
  AuthorisationUrl: any;
  doctype: string = '';
  docname: string = '';
  appconfig = new AppConfig();
    document_class: string = 'document-wrapper';
  // lawyers= new AddLaweyers
  isMenuVisible: boolean = true;
  ArbitrationDetails: any;
  ArbitrationParties: any[]=[];
  Type: any;
  userurl: any;
  Arbitrators: any[]=[];
  selectedID: any[]=[];
  Id:any
  selecteddocument: any;
  applicationtype: any;
  casemanagementtype: any;
  DocName:string='';
  
  constructor(public videocallUserservice:Videocalluser,private modalController: ModalController, private arbitrationservice: ArbitrationServiceService) { }

  ngOnInit() {
    this.GetAllarbitrators(); // Call checkauthurl after 5 seconds.

  }
  async SubmitDispute() {
    // Limit the selected options to a maximum of 3 in case it's not already done
    if (this.NoOfTribunalsSelected.length > 3) {
      this.NoOfTribunalsSelected = this.NoOfTribunalsSelected.slice(0, 3);
    }
  
    // Filter the Arbitrators based on the selected IDs
    const selectedArbitrators = this.Arbitrators.filter(arbitrator => this.NoOfTribunalsSelected.includes(arbitrator.Id));
  
    // Add Status=2 and Type=4 to all objects in ArbitrationParties
    this.mediation.ArbitrationParties = selectedArbitrators.map(arbitrator => ({ ...arbitrator, Status: 2, Type: 4 }));
  
    // Log or use the selected arbitrators as needed
  
    // Your existing code for submitting dispute
    let that = this;

    that.mediation.PaymentStatus = 0;
    that.mediation.Id = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id;
    // that.mediation.AdminPaymentSkipRemarks = 'test';
  
    that.arbitrationservice.InsertMediation(that.mediation).subscribe((data: any) => {
      if (data) {
        if (data.Id > 0 && data.Error === 0) {
          // Arbitrator Submitted successfully
          alert('Arbitrator Inserted');
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
  back() {
    this.modalController.dismiss();
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



  GetAllarbitrators() {
    // let CenterId = 0;
    // let AdrType = 2;
    // if (this.ArbitrationDetails.Mode == 1) { CenterId = this.appconfig.OnlineCenterId }
    // if (this.ArbitrationDetails.Region == 2) { AdrType = 4 }
    this.arbitrationservice.spGetAllTribunalForConstitution(JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id,JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id).subscribe((data: any) => {
      if (!!data && data.length > 0) {
        alert('hi')
        
        this.ArbitratorList = <Array<any>>data;
      }
      else {
        this.ArbitratorList = [];
      }
    });
  }
  MediatorProfile(usr:any){}
}
