import { Component, OnInit } from '@angular/core';
import { UploadModalPage } from '../upload-modal/upload-modal.page';
import { ModalController } from '@ionic/angular';
interface SelectedPDFs {
  [section: string]: File[];
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  isMenuVisible: boolean = false;
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;
  audioOutId = '';
  selectedPDFs: SelectedPDFs = {};
  enableAudio:boolean = true;
  token = '';
  collapsedone:string='collapse';

  collapsedtwo:string='collapse';
  collapsedthree:string='collapse';
  collapsedfour:string='collapse';
  collapsedpdfstring='collapse';
  
  constructor(private modalController: ModalController,) { }

  ngOnInit() {
  }

  removePDF(section: string, pdf: File) {
    if (this.selectedPDFs[section]) {
      this.selectedPDFs[section] = this.selectedPDFs[section].filter((file) => file !== pdf);
    }
  }
  async openUploadModal() {
    const modal = await this.modalController.create({
      component: UploadModalPage,
      // You can pass data to the modal using the componentProps option if needed
      // componentProps: {
      //   someData: yourData,
      // },
    });
    await modal.present();
  }
  toggleCollapseOnes() {
    if(this.collapsedone=='collapse'){
      this.collapsedone=''
      
    }else{
      this.collapsedone='collapse'
    }
    // this.collapse = !this.collapse;
  }
  sidebar(){
    this.isMenuVisible = !this.isMenuVisible;
  } 
  toggleCollapsetwo() {
    if(this.collapsedtwo=='collapse'){
      this.collapsedtwo=''
      
    }else{
      this.collapsedtwo='collapse'
    }
    // this.collapse = !this.collapse;
  }
  toggleCollapsethree() {
    if(this.collapsedthree=='collapse'){
      this.collapsedthree=''
      
    }else{
      this.collapsedthree='collapse'
    }
    // this.collapse = !this.collapse;
  }
  toggleCollapsefour() {
    if(this.collapsedfour=='collapse'){
      this.collapsedfour=''
      
    }else{
      this.collapsedfour='collapse'
    }
    // this.collapse = !this.collapse;
  }
  addPDF(section: string) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.addEventListener('change', (event: any) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        // Check if the section exists in selectedPDFs object
        if (!this.selectedPDFs[section]) {
          this.selectedPDFs[section] = [];
        }
        this.selectedPDFs[section].push(selectedFile);
      }
    });
    input.click();
  }
}
