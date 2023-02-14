import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { catchError, retry, take, tap } from 'rxjs/operators';
import { TopNavDisplayModel } from '../components/top-navbar/top-navbar.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environement } from 'src/environments/environement';
import { Person } from '../models/person';
import { RawActivity } from '../models/activity';
@Injectable({
  providedIn: 'root'
})
export class FakeDataService {
  
  constructor(private http: HttpClient) {
    // this.test();
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
    return this.http.get<Person[]>(`${environement.apiURL}/profiles`);
  }
  getProfileById(id:number):Observable<Person>{
    return this.http.get<Person>(`${environement.apiURL}/profiles/${id}`);
  }
  getActivityAll():Observable<RawActivity[]>{
    return this.http.get<RawActivity[]>(`${environement.apiURL}/activities`);
  }
  getActivityById(id:number):Observable<RawActivity>{
    return this.http.get<RawActivity>(`${environement.apiURL}/activities/${id}`);
  }
  deleteActivityById(id:number):Observable<any>{
    return this.http.delete(`${environement.apiURL}/activities/${id}`);
  }
  updateActivityById(id:number,data:any):Observable<any>{
    return this.http.put(`${environement.apiURL}/activities/${id}`,data);
  }
  finishActivities(data:{id:number,finished:boolean}[]):Observable<any>{
    return this.http.put(`${environement.apiURL}/activities/finish`,data);
  }
  titleData() : Observable<any>{
    return of({id:0,title:"Software Developer - Fullstack Java",state:"active",someotherdata:"lorem"})
  }
}
