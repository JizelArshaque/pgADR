import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, catchError } from "rxjs/operators";
import { Card } from 'src/class/Card';
import { AppConfig } from 'src/class/AppCofig';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  appconfig=new AppConfig();
  constructor(public http:HttpClient) { 
  }

  InsertProducts(card:Card){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.post(this.appconfig.url+"/Products",card,options).pipe<any>(map(res=>res));
  }

  UpdateProductHead(cardid:any,Products:any,ProductSection:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/VisibilitySettings?cardid="+cardid+"&Products="+Products+"&ProductSection="+ProductSection, options).pipe<any>(map(res=>res));
  }

  GetAllProductsWithCardId( cardid:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/Products?cardid="+cardid, options).pipe<any>(map(res=>res));
  }
  
  DeleteProductsWithId(id:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/Products?Id="+id, options).pipe<any>(map(res=>res));
  }

  DeleteProductsImageWithId(id:number){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.http.get(this.appconfig.url+"/Products?ProductId="+id, options).pipe<any>(map(res=>res));
  }
}
