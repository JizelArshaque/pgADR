import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { DocumentUploadCDN } from 'src/class/DocumentUploadCDN';
import { CountryServiceService } from 'src/service/country-service.service';
import { ValidationService } from 'src/service/validation.service';
import { ArbitrationServiceService } from '../arbitration-service.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArbitrationParties } from 'src/class/AdditionalParty';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/shared/alert-info/alert.service';
import { AlertInfoModule } from 'src/shared/alert-info/alert-info.module';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, IonicSelectableComponent, AlertInfoModule],
  selector: 'app-arbitration-party-add',
  templateUrl: './arbitration-party-add.page.html',
  styleUrls: ['./arbitration-party-add.page.scss'],
})
export class ArbitrationPartyAddPage implements OnInit {
  isOtherSelected: boolean = false;
  IsRepresented: any[] = [];
  Designation: any
  OtherType: any
  prty: any;
  TypeOptions: any[] = [
    { id: 1, name: 'Administrative Secretery' },
    { id: 2, name: 'Stenographer' },
    { id: 3, name: 'Case Manager' },
    { id: 4, name: 'Intern' },
    { id: 5, name: 'Expert Witness' },
    { id: 6, name: 'Commissioner' },
    { id: 7, name: 'Other' }
  ];
  PartyType: number = 0;
  Type: number = 0;
  MediatorList: any[] = [];
  Name: string = '';
  Email: string = '';
  Mobile: string = '';
  Address: string = '';
  Side: any;
  MediatorId: number = 0;
  MediationId: number = 0;
  CoMediatorId: number = 0
  CoMediators: any[] = [];
  title: string = '';
  AppearFor: string = '';
  UserId: number = 0;
  additionalparty = new ArbitrationParties();
  additionalpartyedit = new ArbitrationParties();
  selectedparty: any;
  MediationParties: any[] = [];
  Id: number = 0;
  AlreadyAddedMediatorId: number = 0;

  MediationPartyType: number = 0;
  IsEdit: number = 0;
  Pageid: string = '';
  AuthorisationUrl: string = '';
  Country: any[] = [];
  State: any[] = [];
  EditParty: any[] = [];
  District: any[] = [];
  cntry: any;
  IsController: number = 0;
  isButtonDisabled = false;
  isLoading = false;
  stat: any;
  city: any;
  SecreteCode: any;
  ArbitrationId: any;
  SideOptions: any[] = [
    { id: 1, name: 'Arbitration' },
    { id: 2, name: 'Mediation' }
  ];
  doccdn = new DocumentUploadCDN();
  ArbitrationDetails: any;
  ArbitrationParties: any[] = [];
  showDoYouNeedToAddControlCheckbox: boolean = false;
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  constructor(public alertservice: AlertService, private router: Router, private route: ActivatedRoute, private modalCtrl: ModalController, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,
    private validservice: ValidationService, private countryservice: CountryServiceService, private ArbitrationService: ArbitrationServiceService) {

    // console.log(this.navParams, 'nav');

    if (this.navParams.get("ArbitrationParties")) {



      this.ArbitrationParties = this.navParams.get("ArbitrationParties");

      // debugger
    }
    if (this.navParams.get("ArbitrationEdit")) {
      this.GetAllCountry()




      this.additionalpartyedit = this.navParams.get("ArbitrationEdit");
      console.log(this.additionalpartyedit, "============edit============")
      this.Name = this.additionalpartyedit.Name
      this.Email = this.additionalpartyedit.Email
      this.Mobile = this.additionalpartyedit.Mobile
      this.Side = this.additionalpartyedit.Side
      this.PartyType = this.additionalpartyedit.Type
      this.cntry = this.additionalpartyedit.Country
      this.stat = this.additionalpartyedit.State
      this.selectedState = this.State.find(x => x.state === this.additionalpartyedit.State);
      this.city = this.additionalpartyedit.City

      this.Address = this.additionalpartyedit.Address
      this.Designation = this.additionalpartyedit.Designation
      this.AppearFor = this.additionalpartyedit.AppearFor
      // this.Side = this.additionalparty.Side

      this.prty = this.ArbitrationParties.find(x => x.Name === this.AppearFor);



      this.AuthorisationUrl = this.additionalpartyedit.AuthorisationUrl
      this.additionalparty.Id = this.additionalpartyedit.Id;
      this.additionalparty.SecureCode = this.additionalpartyedit.SecureCode;
    }
    if (this.navParams.get("Arbitration")) {
      this.ArbitrationDetails = this.navParams.get("ArbitrationDetails");
    }
    if (this.navParams.get("Side")) {
      this.Side = this.navParams.get("Side");
      // debugger

    }



    if (this.PartyType == 0) { this.title = "Add Co-Mediator"; this.Type = this.PartyType; } else if (this.PartyType == 1) { this.title = "Manage Addl.Party/Lawyer"; this.Type = this.PartyType; }
    else if (this.PartyType == 2) { this.title = "Add Additional Party"; this.Type = 1; } else if (this.PartyType == 3) { this.title = "Number of Arbitrator"; this.Type = this.PartyType; }
  }

  ngOnInit() {

    this.Designation = this.additionalparty.Designation
    this.IsController = this.additionalparty.IsController
    const arbitrationDetailsString = localStorage.getItem('ArbitrationDetails');

    if (arbitrationDetailsString !== null) {
      const arbitrationDetails = JSON.parse(arbitrationDetailsString);
      this.ArbitrationId = arbitrationDetails.Id;
    } else {
      // Handle the case where 'ArbitrationDetails' is not found in localStorage
      // You can set a default value or show an error message, depending on your application's requirements.
    }


  }

  ionViewWillEnter() {
    this.GetAllCountry();



  }

  onTypeChange(selectedType: any) {
    this.additionalparty.Side = 0;
    this.isOtherSelected = selectedType && selectedType.id === 7;
    this.additionalparty.Designation = selectedType.name;

    // Check if "Expert Witness" is selected, and hide/show the checkbox accordingly
    this.showDoYouNeedToAddControlCheckbox = selectedType && selectedType.id < 5;
  }




  back() {
    this.modalCtrl.dismiss();
  }

  async SearchEmail() {
    let that = this;
    let loading = await that.loadingCtrl.create({
      message: 'Please wait...'
    });
    loading.present();
    that.ArbitrationService.GetAllUserWithEmail(that.Email).subscribe((data: any) => {
      if (data.length > 0) {
        loading.dismiss();
        if (data[0].Id > 0) {
          that.Address = data[0].Address;
          that.Name = data[0].Name;
          that.Mobile = data[0].Mobile;
          that.UserId = data[0].Id;

        }
      }
      else {
        loading.dismiss();
      }
    });
  }



  async AdditionalPartyAdd() {

    this.additionalparty.Side = this.Side;

    // Validation checks
    //console.log(this.cntry,"contry");

    // debugger
    if ((this.PartyType === 0 && this.Side === 0) || (this.PartyType === 0 && this.Side === 1)) {
      if (!this.Email) {
        alert("Please enter Email");

        return;
      }
      if (!this.Name) {
        alert("Please enter Name");

        return;
      }
      if (!this.Address) {
        alert("Please enter Address");

        return;
      }
      if (!this.selectedCountry) {
        alert("Please enter Country");

        return;
      }
      if (!this.selectedState) {
        alert("Please enter State");

        return;
      }
      if (!this.selectedCity) {
        alert("Please enter city");

        return;
      }
    } else if (this.PartyType === 5) {
      if (!this.Email) {
        alert("Please enter Email");

        return;
      }
      if (!this.Name) {
        alert("Please enter Name");

        return;
      }
      if (!this.Designation) {
        alert("Please enter Designation");

        return;
      }
      if (!this.Address) {
        alert("Please enter Address");

        return;
      }
      if (!this.selectedCountry) {
        alert("Please enter Country");

        return;
      }
      if (!this.selectedState) {
        alert("Please enter State");

        return;
      }
      if (!this.selectedCity) {
        alert("Please enter city");

        return;
      }
      if (!this.PartyType) {
        alert("Please enter Type");

        return;
      }
    }
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();


    // Assign values to additionalparty object
    this.additionalparty.Name = this.Name;
    this.additionalparty.Mobile = this.Mobile;
    this.additionalparty.Email = this.Email;
    this.additionalparty.Address = this.Address;
    this.additionalparty.UserId = this.UserId;
    this.additionalparty.Side = this.Side;
    this.additionalparty.IsController = this.IsController;
    this.additionalparty.Type = this.PartyType;
    this.additionalparty.ArbitrationId = this.ArbitrationId;
    this.additionalparty.AddedBy = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;

    // API call to insert the party
    this.ArbitrationService.InsertArbitrationParty(this.additionalparty).subscribe(
      (data: any) => {
        loading.dismiss(); // Dismiss the loader after the API response

        if (!!data && data.length > 0) {
          if (data[0].Error == 0) {
            alert("Inserted Successfully");
            this.back();
          } else if (data[0].Error == 111) {
            alert("Error: Party with email already registered!!");
          } else {
            alert("Error while saving!! " + data[0].Error.toString());
          }
        } else {
          alert("Error while saving!!");
        }
      },
      (error) => {
        loading.dismiss(); // Dismiss the loader even if there's an error
        alert("An error occurred while saving the data!");
      }
    );
  }




  async AdditionalLawyerAdd() {


    // debugger

    if (this.PartyType === 2 && this.Side === 1) {
      // debugger
      if (!this.Email) {
        alert("Please enter Email");
        return;
      }
      if (!this.Name) {
        alert("Please enter Name");
        return;
      }
      if (!this.Address) {
        alert("Please enter Address");
        return;
      }
      if (!this.selectedCountry) {
        alert("Please enter Country");
        return;
      }
      if (!this.selectedState) {
        alert("Please enter State");
        return;
      }
      if (!this.selectedCity) {
        alert("Please enter city");
        return;
      }
      // if (!this.additionalparty.AppearFor) {
      //   debugger
      //   alert("editibg");
      //   return;
      // }
    } else if (this.PartyType === 2 && this.Side === 0) {
      // debugger
      if (!this.Email) {
        alert("Please enter Email");
        return;
      }
      if (!this.Name) {
        alert("Please enter Name");
        return;
      }
      if (!this.Address) {
        // debugger
        alert("Please enter Address");
        return;
      }
      if (!this.selectedCountry) {
        alert("Please enter Country");
        return;
      }
      if (!this.selectedState) {
        alert("Please enter State");
        return;
      }
      if (!this.selectedCity) {
        alert("Please enter city");
        return;
      }
      // if (!this.Side) {
      //   alert("Please enter Side");
      //   return;
      // }
      // debugger
      if (!this.additionalparty.AppearFor) {
        alert("Please enter Appearing");
        return;
      }
      // if (!this.AuthorisationUrl) {
      //   alert("Please enter Lawyer Authorisation Url");
      //   return;
      // }
    } else if (this.PartyType === 5) {
      if (!this.Email) {
        alert("Please enter Email");
        return;
      }
      if (!this.Name) {
        alert("Please enter Name");
        return;
      }
      if (!this.Designation) {
        alert("Please enter Name");
        return;
      }
      if (!this.Address) {
        alert("Please enter Address");
        return;
      }
      if (!this.selectedCountry) {
        alert("Please enter Country");
        return;
      }
      if (!this.selectedState) {
        alert("Please enter State");
        return;
      }
      if (!this.selectedCity) {
        alert("Please enter city");
        return;
      }
      if (!this.PartyType) {
        alert("Please enter Type");
        return;
      }
    }

    // debugger

    let loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();

    // If all mandatory fields are entered, proceed with the insertion
    this.additionalparty.Name = this.Name;
    this.additionalparty.Mobile = this.Mobile;
    this.additionalparty.Email = this.Email;
    this.additionalparty.Address = this.Address;
    this.additionalparty.UserId = this.UserId;
    this.additionalparty.Side = this.additionalparty.Side;
    this.additionalparty.AuthorisationUrl = this.SecreteCode;
    this.additionalparty.Type = this.PartyType;

    this.additionalparty.ArbitrationId = this.ArbitrationId
    this.additionalparty.AddedBy = JSON.parse(`${localStorage.getItem('ADR_Dashboard_User')}`).Id;
    // alert(this.additionalparty.AddedBy)
    this.ArbitrationService.InsertArbitrationParty(this.additionalparty).subscribe((data: any) => {
      loading.dismiss(); // Dismiss the loader after the API response

      if (!!data && data.length > 0) {
        if (data[0].Error == 0) {
          // Response is null, show a success message as an alert
          alert("Inserted Successfully");
          window.location.reload();
          this.back();
        } else if (data[0].Error == 111) {
          // Show specific alert message for error code 111
          alert("The party mentioned in this email already exists");
        } else {
          // Insertion failed, show a generic error message
          alert("Error while saving details.");
          window.location.reload();
        }
      } else {
        // Handle case when data is null or empty
        alert("No data received.");
        window.location.reload();
      }

    });

  }




  // Define a class property to hold the IsControlled value


  // Handle the checkbox change event
  onIsControlledChange(event: any) {
    if (event.detail.checked) {
      // If the checkbox is checked, set IsControlled to 1
      this.IsController = 1;
    } else {
      // If the checkbox is unchecked, set IsControlled to 0 or any other value you prefer
      this.IsController = 0;
    }
  }

  FilterParties() {
    // console.log('pols?', this.ArbitrationParties.filter(x => x.Type == 0));

    return this.ArbitrationParties.filter(x => x.Type == 0);
  }
  //added by nazrin 3/5/23
  GetAllCountry() {
    this.countryservice.GetAllCountryFromJSON().subscribe((data: any) => {
      this.Country = <Array<any>>data;
      this.selectedCountry = this.Country?.find(country => country.name === this.cntry);
      // debugger
      this.GetAllStates(this.selectedCountry);
      // debugger

      if (this.stat) {
        console.log(this.cntry, this.stat);

      }
    });
  }
  //added by nazrin 3/5/23
  GetAllStates(selectedCountry: any) {
    // debugger

    if (selectedCountry) {

      // Assign selected country name to additionalparty.Country
      this.additionalparty.Country = selectedCountry.name;

      // Fetch states based on the selected country
      this.countryservice.GetAllStatesFromJSON().subscribe((data: any) => {
        // Filter states by the selected country ID
        this.State = data?.filter((x: any) => x.country_id == selectedCountry.id);


        this.GetAllCities(this.selectedState);

        // debugger
      });
    }
  }

  //added by nazrin 3/5/23
  GetAllCities(selectedState: any) {

    if (selectedState) {
      // Assign selected state name to additionalparty.State
      this.additionalparty.State = selectedState.name;

      // Fetch cities based on the selected state
      this.countryservice.GetAllCitiesFromJSON().subscribe((data: any) => {
        // Filter cities by the selected state ID
        this.District = data.filter((x: any) => x.state_id == selectedState.id);
        this.selectedCity = this.District?.find(citys => citys.name === this.city);
        // debugger
      });
    }
    console.log(this.selectedState, '============================');

  }

  AppearForChange(event: { component: IonicSelectableComponent, value: any }) {
    // console.log(this.prty);

    this.additionalparty.AppearFor = event.value.Name;
    this.additionalparty.Side = this.ArbitrationParties.find(x => x.Id == event.value.Id).Side;
    // alert(this.additionalparty.Side);
  }


  //added by nazrin 3/5/23
  GetCity(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.additionalparty.City = event.value.name;
  }
  //added by nazrin 3/5/23
  // GetAllState(country: any) {
  //   this.additionalparty.Country = this.cntry;
  //   this.countryservice.GetAllStatesFromJSON().subscribe((data: any) => {
  //     this.State = data.filter((x: any) => x.country_id == country.id);
  //     if (this.additionalparty.State) {
  //       this.stat = this.State.filter(x => x.name == this.additionalparty.State)[0];
  //       this.GetAllCityData(this.stat);
  //     }
  //   });
  // }
  //added by nazrin 3/5/23
  // GetAllCityData(state: any) {
  //   this.countryservice.GetAllCitiesFromJSON().subscribe((data: any) => {
  //     this.District = data.filter((x: any) => x.state_id == state.id);
  //     if (this.additionalparty.City) {
  //       this.city = this.District.filter(x => x.name == this.additionalparty.City)[0];
  //     }

  //   });
  // }

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
              this.doccdn.FileName = fileList[i].name;
              this.doccdn.Base64Data = data.toString();
              this.doccdn.Type = type;
              this.doccdn.Description = description;
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
  UploadDocumentCDN(doc: any) {
    this.ArbitrationService.UploadDocumentCDN(doc).subscribe((data: any) => {
      if (data) {
        if (data.Id > 0 && data.Error == 0) {
          this.SecreteCode = data.SecreteCode;
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
  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }



}



