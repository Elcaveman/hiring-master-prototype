import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityModalService {
  visible=true;
  constructor() { }
  showModal(){
    console.log("show ActivityModal")
  }
}
