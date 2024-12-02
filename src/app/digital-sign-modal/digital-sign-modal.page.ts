

  // import { CommonService } from './../../service/common.service';
  // import { DocumentUpload } from './../../Class/DocumentUpload';
  import { ModalController, NavParams } from '@ionic/angular';
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { SignaturePad } from 'angular2-signaturepad';
  // import Swal from 'sweetalert2';
  // import { SignaturePad } from 'angular2-signaturepad/signature-pad';
  
  @Component({
    selector: 'app-digital-sign-modal',
    templateUrl: './digital-sign-modal.page.html',
    styleUrls: ['./digital-sign-modal.page.scss'],
  })
  export class DigitalSignModalPage implements OnInit {
    
  
    @ViewChild(SignaturePad) signaturePad!: SignaturePad;
  
    signaturePadOptions: Object = {
      // SignaturePad options
      minWidth: 1,
      maxWidth: 3,
      canvasWidth: 500,
      canvasHeight: 500,
      color: '#000000',
      backgroundColor: '#FFFFFF',
    };
  
    constructor(
      private modalCtrl: ModalController,
      private NavParams: NavParams,
    
    ) {}
  
    ngOnInit() {}
  
    GetDataFromParentComponent() {
      const dataFromParent = this.NavParams.get('data');
      console.log(dataFromParent);
      // this.GetJobCardByJObcardId(dataFromParent)
      //  console.log();
    
    }
  
    ngAfterViewInit() {
      this.signaturePad.set('minWidth', 1); // set default width
      this.signaturePad.clear(); // clear the pad on initialization
    }
  
    drawStart() {
      console.log('Draw start');
    }
  
    drawComplete() {
      console.log('Draw complete');
    }
  
    clearSignature() {
      this.signaturePad.clear();
    }
  
    saveSignature() {
      const signatureData = this.signaturePad.toDataURL();
      console.log('Signature Data:', signatureData);
      // Extract the base64 part from the data URL (format: "data:image/png;base64,iVBORw0KG...")
      const base64Signature = signatureData.split(',')[1];
  
      console.log('Base64 Signature:', base64Signature);
  
      // You can now use the signatureData as needed (e.g., save to server or local storage)
      // this.DocumentUpload.Base64=base64Signature;
      // console.log();
  
      // this.CommonService.DocumentUpload(this.DocumentUpload).subscribe((data:any)=>{
      //   if(data)
      //   {
      //     if(data.length>0)
      //     {
      //       Swal.fire('Success',data.Message, 'success')
      //       // this.back()
  
      //     }
      //     else
      //     {
      //       Swal.fire('Error!', data.Message ,'error');
      //     }
  
      //   }
      // })
  
      this.modalCtrl.dismiss(base64Signature);
    }
  
    ngOnDestroy() {
      // this.DocumentUpload = new DocumentUpload();
    }
  
    back() {
      
      this.modalCtrl.dismiss();
    }
  }
  