import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AppConfig } from 'src/class/AppCofig';
import { Location } from '@angular/common';
import { ArbitrationServiceService } from '../arbitration-service.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/shared/alert-info/alert.service';

@Component({
  selector: 'app-tribunal-constitution',
  templateUrl: './tribunal-constitution.page.html',
  styleUrls: ['./tribunal-constitution.page.scss'],
})
export class TribunalConstitutionPage implements OnInit {
  TId: number = 0;

  Rating: number = 0;
  CardDetails: any[] = [];
  Review: any[] = [];
  showProfileButton: boolean = false;

  Reason: any;
  Type: any;
  SecretCode: any;
  selectedButton: any;
  ArbitrationDetails: any;
  showRejectInput: boolean = false; // Add this property
  ArbitrationParties: any[] = [];
  appconfig = new AppConfig();
  activeButton: number = 0;
  ArbitratorList: any[] = [];
  constructor(
    private router: Router,
    private location: Location,
    public navParams: NavParams,
    private modalController: ModalController,
    private arbitrationservice: ArbitrationServiceService,
    public alertservice: AlertService
  ) {
    if (this.navParams.get('Arbitration')) {
      this.ArbitrationDetails = this.navParams.get('Arbitration');
    }
  }

  ngOnInit() {
    this.GetAllarbitrators();
    this.Type = JSON.parse(
      `${localStorage.getItem('ADR_Dashboard_User')}`
    ).Type;
  }
  back() {
    this.location.back();
  }
  isButtonActive(index: number): boolean {
    return this.activeButton === index;
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
  GetAllarbitrators() {
    // alert('hi')
    const arbitrationDetails = JSON.parse(
      `${localStorage.getItem('ArbitrationDetails')}`
    );
    const userDashboard = JSON.parse(
      `${localStorage.getItem('ADR_Dashboard_User')}`
    );

    this.arbitrationservice
      .spGetAllTribunalForConstitution(arbitrationDetails.Id, userDashboard.Id)
      .subscribe((data: any) => {
        if (!!data && data.length > 0) {
          this.ArbitratorList = <Array<any>>data;
        } else {
          this.ArbitratorList = [];
          //  alert('Thank You For Your Response');
          //  this.location.back();
          // You can add code here to display a message, e.g., show an alert or set a flag
        }
      });
  }

  Reject(item: any) {
    item.showRejectInput = !item.showRejectInput;
  }
  viewprofile(SecretCode: any, Name: any) {
    // alert(SecretCode)
    const secureCode = SecretCode;
    const name = Name.toString().replace(/[^A-Z0-9]/gi, '');

    const url = `${this.appconfig.DigitalCardLink}/${secureCode}/${name}`;
    // alert(url)

    // Open the URL in a new window
    window.open(url, '_blank');
  }

  // Inside your component
  // Inside your component
  ratingsMap: { [key: string]: string } = {};



  Ratings(Preference: any, TribunalId: any, event: any) {
    const currentButtonId = 'b' + Preference.toString() + TribunalId.toString();
    const currentButton = document.getElementById(currentButtonId);

    if (currentButton) {
      // Deselect previously selected button for the current person
      const lastSelectedButtonIdForPerson = this.ratingsMap[TribunalId];
      if (lastSelectedButtonIdForPerson && lastSelectedButtonIdForPerson !== currentButtonId) {
        const prevSelectedButton = document.getElementById(lastSelectedButtonIdForPerson);
        if (prevSelectedButton) {
          prevSelectedButton.style.backgroundColor = ''; // Set the background color to default or empty
        }
      }

      // Set the new button as selected for the current person
      currentButton.style.backgroundColor = '#113e67';
      this.ratingsMap[TribunalId] = currentButtonId;
    }

    let Responses: {
      ArbitrationId: any;
      ArbitrationPartyId: any;
      TribunalId: any;
      Preference: any;
      Reason: any;
    };

    // Rest of your code for handling rating and storing data
    if (Preference == -1) {
      Responses = {
        ArbitrationId: JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id,
        ArbitrationPartyId: JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id,
        TribunalId: TribunalId,
        Preference: Preference,
        Reason: event.target.value,
      };
    } else {
      Responses = {
        ArbitrationId: JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id,
        ArbitrationPartyId: JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id,
        TribunalId: TribunalId,
        Preference: Preference,
        Reason: '',
      };
    }

    let index = this.Review.findIndex((x: any) => x.TribunalId == TribunalId);

    if (index !== -1) {
      this.Review.splice(index, 1);
      this.Review.push(Responses);
    } else {
      this.Review.push(Responses);
    }
  }



  InsertTribunalConstitutionPreference() {
    if (this.Review && this.Review.length < 3) {
      // Alert if Review length is less than 3
      alert('Please Provide ratings for all');
      return;
    }

    if (this.Review) {

      // Set variables
      // this.Rating = Rate;
      // this.TId = item.UserId;

      // Check if Rating is negative
      if (this.Rating < 0) {
        // Check if Reason is provided
        if (!this.Reason) {
          // Alert and exit if Reason is not provided
          alert('Reason is mandatory.');
          return;
        }
      }

      const isConfirmed = confirm('Are you sure you want to proceed?');
      // Call the service only if the user confirmed
      if (isConfirmed) {
        let obj = { TribunalContList: this.Review };
        this.arbitrationservice
          .SpInsertTribunalConstitutionPreference(obj)
          .subscribe((data: any) => {
            if (!!data && data.length > 0) {
              // Check if Id is greater than 0 and Error is 0
              if (data[0].Id > 0 && data[0].Error === 0) {
                // Show success message if conditions are met
                alert('Response Submitted Successfully');
                // this.UpdateConstitutionalTribunal();
                this.location.back();
              }
              // console.log(data, 'dhhhg');
              // this.ArbitratorList = <Array<any>>data;
            } else {
              // this.ArbitratorList = [];
            }
          });
      } else {
        // Handle the case where the user canceled the action
        console.log('Operation canceled');
        // Add any action or code you want to execute upon cancellation
        // For example, return or perform an action
        return;
      }
    } else {
      // Handle the case where there's no review
      // Add code if necessary
    }
  }


  UpdateConstitutionalTribunal() {
    this.arbitrationservice
      .SpUpdateTribunalConstitutionPreference(
        JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id,
        JSON.parse(`${localStorage.getItem('ArbitrationDetails')}`).Id
      )
      .subscribe((data: any) => {



        if (!!data && data.length > 0) {
          // Check if Id is greater than 0 and Error is 0
          if (data.Id > 0 && data.Error === 0) {
            // Show success message if conditions are met
            alert('Response Updated Successfully');

            this.location.back();
          }

          // console.log(data, 'dhhhg');
          // this.ArbitratorList = <Array<any>>data;
        } else {
          // this.ArbitratorList = [];
        }
      });
  }

  MediatorProfile(usr: any) { }
}
