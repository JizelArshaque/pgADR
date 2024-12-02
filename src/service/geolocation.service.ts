import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/class/AppCofig';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  appconfig = new AppConfig()

  constructor(private http: HttpClient) { }

  reverseGeocode(latitude: number, longitude: number): Observable<any> {
    const url = `${this.appconfig.geocodeUrl}?lat=${latitude}&lon=${longitude}&format=json`;
    const headers = new HttpHeaders({
      'User-Agent': 'PGVIDEOCALL',  // Replace with your app's name
    });
    return this.http.get<any>(url, { headers });
  }
}
