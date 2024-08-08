import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  constructor(public httpclient:HttpClient) { }

  GetAllCountry() 
  {
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.httpclient.get("http://battuta.medunes.net/api/country/all/?key=55a70884b5504b46e56a66dbf27d8cbe", options).pipe(map(res=>res)); 
  }
  GetAllCountryFromJSON():Observable<any> 
  {
    return this.httpclient.get("./assets/Json/countries.json");
  }
  GetAllStatesFromJSON():Observable<any> {
    return this.httpclient.get("./assets/Json/states.json");
  }
  GetAllCitiesFromJSON():Observable<any> {
    return this.httpclient.get("./assets/Json/cities.json");
  }
  GetAllStatesWithCountryId(countrycode:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.httpclient.get("http://battuta.medunes.net/api/region/"+countrycode+"/all/?key=55a70884b5504b46e56a66dbf27d8cbe", options).pipe(map(res=>res)); 
  }
  GetAllDistrictWithCountryIdandState(countrycode:any,State:any){
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options ={ headers: headers };
    return this.httpclient.get("https://battuta.medunes.net/api/city/"+countrycode+"/search/?region="+State+"&key=55a70884b5504b46e56a66dbf27d8cbe", options).pipe(map(res=>res)); 
  }
}
