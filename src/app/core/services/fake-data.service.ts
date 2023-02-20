import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { catchError, retry, take, tap } from 'rxjs/operators';
import { TopNavDisplayModel } from '../components/top-navbar/top-navbar.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environement } from 'src/environments/environement';
import { Person } from '../models/person';
import { Activity, RawActivity } from '../models/activity';
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
  /* Basic CRUD */
  getProfileAll(): Observable<Person[]>{
    return this.http.get<Person[]>(`${environement.apiURL}/profiles`).pipe(take(1));
  }
  getProfileById(id:number):Observable<Person>{
    return this.http.get<Person>(`${environement.apiURL}/profiles/${id}`).pipe(take(1));
  }
  getActivityAll():Observable<RawActivity[]>{
    return this.http.get<RawActivity[]>(`${environement.apiURL}/activities`).pipe(take(1));
  }
  getActivityById(id:number):Observable<RawActivity>{
    return this.http.get<RawActivity>(`${environement.apiURL}/activities/${id}`).pipe(take(1));
  }
  deleteActivityById(id:number):Observable<any>{
    return this.http.delete(`${environement.apiURL}/activities/${id}`).pipe(take(1));
  }
  updateActivityById(id:number,data:any):Observable<any>{
    return this.http.put(`${environement.apiURL}/activities/${id}`,data).pipe(take(1));
  }
  /* Job specific calls */
  finishActivities(data:{id:number,finished:boolean}[]):Observable<any>{
    return this.http.put(`${environement.apiURL}/activities/finish`,data).pipe(take(1));
  }
  getOtherParticipantsByActivityId(data:{id: number}):Observable<any>{
    return this.http.get(`${environement.apiURL}/profiles/participants?activityId=${data.id}&other=true`).pipe(take(1));
  }
  getOtherCandidatesByActivityId(data: { id: number; }): Observable<any> {
    return this.http.get<any>(`${environement.apiURL}/profiles/candidate?activityId=${data.id}&other=true`).pipe(take(1));
  }
  addParticipantsToActivity(activity:Activity,participants:Person[]):Observable<any>{
    return this.http.put(`${environement.apiURL}/activities/${activity.id}`,{
      participants:[...activity.participants.map(p=>({id:p.id})),...participants.map(p=>({id:p.id}))]// carefull with duplicates
    }).pipe(take(1));
  }
  addCandidateToActivity(activity: Activity, candidate: Person):Observable<any> | null{
    if (candidate)
      return this.http.put(`${environement.apiURL}/activities/${activity.id}`,{
        candidate:{id:candidate.id}
      })
      .pipe(take(1));
    return null;
  }
  
  titleData() : Observable<any>{
    return of({id:0,title:"Software Developer - Fullstack Java",state:"active",someotherdata:"lorem"})
  }
}
