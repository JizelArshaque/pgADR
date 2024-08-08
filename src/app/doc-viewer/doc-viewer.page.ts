import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AppConfig } from 'src/class/AppCofig';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.page.html',
  styleUrls: ['./doc-viewer.page.scss'],
})
export class DocViewerPage implements OnInit {
  selecteddocument: string = ''
  ArbitrationDetails: any;
  ArbitrationParties: any[] = [];
  Type: any = 0;
  appconfig = new AppConfig();
  createddoc: string = '';
  constructor(public navParams: NavParams, private modalController: ModalController) {
    if (this.navParams.get("selecteddoc")) {
      this.selecteddocument = this.navParams.get("selecteddoc");
    }
    else if (this.navParams.get("Arbitration")) {
      this.ArbitrationDetails = this.navParams.get("Arbitration");
      this.ArbitrationParties = this.navParams.get("ArbitrationParties");
     
    } 
    if (this.navParams.get("Type")) { this.Type = this.navParams.get("Type");}
    if (this.navParams.get("Docs")) { this.createddoc = this.navParams.get("Docs"); }

  } 
  Print(){
    const printContent:any = document.getElementById("print_div_doc");
    var MainWindow:any = window.open('', '', 'height=500,width=800');
    MainWindow.document.write('<html><head><title></title>');
    MainWindow.document.write('<link rel="stylesheet" type="text/css" href="assets/css/print.css">')
    MainWindow.document.write("<link rel=\"stylesheet\" href=\"assets/css/print.css\" type=\"text/css\" media=\"print\" />");
    MainWindow.document.write('<style type="text/css">.border{border:.25px solid  black;}</style>');
    MainWindow.document.write('</head><body onload="window.print();window.close()">');
    MainWindow.document.write(printContent.innerHTML);
    MainWindow.document.write('</body></html>');
    MainWindow.document.close();
    setTimeout(function () {
      MainWindow.print();
    }, 1000)
  }
  ngOnInit() {
  }
  back() {
    this.modalController.dismiss();
  }
  CheckDate(dt: any) { 
    // console.log(new Date(this.ArbitrationDetails.SysTime).getTime()+":"+new Date(dt).getTime());
    if (new Date(this.ArbitrationDetails.SysTime).getTime() < new Date(dt).getTime()) { return true; } else { return false; }
  } 
  FilterArbitrationParties(side: any, partytype: any) {
    return this.ArbitrationParties.filter((x: any) => x.Type == partytype).filter(x => x.Side == side);
  }
  FilterArbitrationPartiesWithIsConteoller(side: any, partytype: any, controller: any) {
    return this.ArbitrationParties.filter((x: any) => x.Type == partytype && x.IsController == controller).filter(x => x.Side == side);
  }
  FilterArbitrationPartiesWithType(partytype: any) {
    return this.ArbitrationParties.filter((x: any) => x.Type == partytype);
  }
  FilterArbitrationPartiesWithSide(side: any) {
    return this.ArbitrationParties.filter((x: any) => x.Type != 3 && x.Side == side);
  }
  Openlink() {
    window.open(this.appconfig.AdrDashboard + this.ArbitrationDetails.SecureCode, "_default");
  }
}
