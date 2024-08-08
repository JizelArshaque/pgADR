
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {  NavController, ModalController } from '@ionic/angular';

import { AdrProfessionalService } from 'src/service/adr-professional.service';
import { UserDetails } from '../../class/UserDetails';
import { AppConfig } from 'src/class/AppCofig';
import { Mediation } from 'src/class/Mediation';
import { Location } from '@angular/common';
import { ArbitrationServiceService } from '../arbitration-service.service';
import { AlertService } from 'src/shared/alert-info/alert.service';


@Component({
  selector: 'app-adr-profile',
  templateUrl: './adr-profile.page.html',
  styleUrls: ['./adr-profile.page.scss'],
})
export class AdrProfilePage implements OnInit {
  userDetails=new UserDetails();
  ImageData:string='';
  userData:any []=[];
  Country: any;
  Type:number=0;
  Id:number=0;
  SecretCode:any
  Address: any;
  ArbitratorType: any;
  ArbitratorSide: any;
  flag:number=0;
  Name:any
  appconfig=new AppConfig();
  TId: any
  mediation = new Mediation();
  Side: any;

  Email: any;
  Mobile: any;
  State: any;
  City: any;
  constructor(public alertservice: AlertService,private arbitrationservice: ArbitrationServiceService, private location: Location,private adrprovider: AdrProfessionalService,public navCtrl: NavController,public modalCtrl:ModalController, public activatedrouter: ActivatedRoute, public router: Router) { 
    this.activatedrouter.queryParams.subscribe(params => {
      const navigationExtras = this.router.getCurrentNavigation()?.extras;
    
      if (navigationExtras && navigationExtras.state) {
        this.userDetails = navigationExtras.state['UserDetails'] ?? new UserDetails();
        this.Type = navigationExtras.state['Type'] ?? 0;
    
        if (this.userDetails) {
          this.ImageData = this.appconfig.AssetUrl + "/assets/images/User/" + this.userDetails.Id.toString() + ".jpg?timeStamp=" + Date.now().toString();
        }
    
        this.flag = 0;
      } else {
        this.SecretCode = this.activatedrouter.snapshot.paramMap.get('SecretCode') ?? '';
        this.Name = this.activatedrouter.snapshot.paramMap.get('Name') ?? '';
    
        this.flag = 1;
        this.GetAllADRProfessional(this.SecretCode);
      }
    });
    
  }
  GetAllADRProfessional(secret:any) {
    
    this.adrprovider.GetAllADRProfessionals(secret).subscribe((data:any)=>{
     

     
      this.userData = <Array<any>>data;
    
      this.userDetails = this.userData[0]
      this.ImageData=this.appconfig.AssetUrl+"/assets/images/User/"+this.userDetails.Id.toString()+".jpg?timeStamp="+Date.now().toString()
     })
  }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['home'])
  }

  ionViewDidLoad() {
  }
  back(){
 
      this.router.navigate(['arbitrator-modal'])
    }
   
  //  this.viewCtrl.dismiss();  }

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
                      this.alertservice.Alert("Arbitrator Appointed!",3,()=>{},()=>{},);
            this.location.back();
          }
        } else {
        }
      });
  }
  AppointArbitratorforExpedited(Arbitrator: any) {
    console.log(Arbitrator);
    
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

alert(1)
      if (!!data) {
        alert(data[0].Id)
        if (data[0].Id > 1 && data[0].Error === 0) {
          
                    this.alertservice.Alert("Arbitrator Appointed!",3,()=>{},()=>{},);
              const secureCode = JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).SecureCode
              console.log(secureCode);
              
              this.router.navigate(['/dashboard'+'/'+secureCode]);
        }
      } else {
        alert("Error while Appoint Arbitrator");
      }
    });
  }
  OpenCertificate(type:any){
    let navigationextra: NavigationExtras = {
      state: {
        UserDetails:this.userDetails,Type:type,Page:'adr-profile'
      }
    }
      this.router.navigate(['/neutral-certificate'],navigationextra);
  }
}
