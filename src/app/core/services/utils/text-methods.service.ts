import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextMethodsService {

  constructor() { }
  getInitials(name:string):string|null{
    if(name){
      return name.split(" ").map((t=>t[0]?t[0]:"")).join("");
    }
    else return null;
  }
}
