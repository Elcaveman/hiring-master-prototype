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
  equals(o1:string,o2:string){
    return o1 === o2;
  }
}
