import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { catchError, retry, take, tap } from 'rxjs/operators';
import { TopNavDisplayModel } from '../components/top-navbar/top-navbar.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environement } from 'src/environments/environement';
import { Person } from '../models/person';
import { Activity } from '../models/activity';
@Injectable({
  providedIn: 'root'
})
export class FakeDataService {
  requestHeaders= {headers:new HttpHeaders({ 
    // 'Access-Control-Allow-Origin':'*',
  })};
  
  constructor(private http: HttpClient) {
    this.test();
  }
  test(){
    
    this.getProfileAll().pipe(
      tap((res)=>{console.log(res);}),
      take(1)
    )
    .subscribe();
      
    this.getProfileById(1).pipe(
      tap((res)=>{console.log(res);}),
      take(1)
    )
    .subscribe();
        
    this.getActivityAll().pipe(
      tap((res)=>{console.log(res);}),
      take(1)
    )
    .subscribe();
    
    this.getActivityById(1).pipe(
      tap((res)=>{console.log(res);}),
      take(1)
    )
    .subscribe();
  }
  getProfileAll(): Observable<Person[]>{
    return this.http.get<Person[]>(`${environement.apiURL}/profiles`,this.requestHeaders);
  }
  getProfileById(id:number){
    return this.http.get<Person>(`${environement.apiURL}/profiles/${id}`,this.requestHeaders);
  }
  getActivityAll(){
    return this.http.get<Activity[]>(`${environement.apiURL}/activities`,this.requestHeaders);
  }
  getActivityById(id:number){
    return this.http.get<Activity>(`${environement.apiURL}/activities/${id}`,this.requestHeaders);
  }
  deleteActivityById(id:number){
    return this.http.delete(`${environement.apiURL}/activities/${id}`,this.requestHeaders);
  }
  titleData() : Observable<any>{
    return of({id:0,title:"Software Developer - Fullstack Java",state:"active",someotherdata:"lorem"})
  }
}
