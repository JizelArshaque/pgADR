import { Injectable,EventEmitter } from '@angular/core';
// import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class SharedEventEmmitterService {
    sharedevent:EventEmitter <any> = new EventEmitter();

  constructor() { }
}
