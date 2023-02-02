import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TopNavDisplayModel } from '../components/top-navbar/top-navbar.models';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {
  
  constructor() { }

  titleData() : Observable<any>{
    return of({id:0,title:"Software Developer - Fullstack Java",state:"active",someotherdata:"lorem"})
  }
}
