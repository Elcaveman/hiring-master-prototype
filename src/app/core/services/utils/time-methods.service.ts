import { Injectable } from '@angular/core';
import { PositiveNumber } from '../../types/sign';

@Injectable({
  providedIn: 'root'
})
export class TimeMethodsService {

  constructor() { }
  timeRange(start:PositiveNumber,end:PositiveNumber,minutes_step:PositiveNumber):string[]{
    const range:string[]= [];
    if (start<end){
      for (let hours=start;hours<end;hours++){
        for (let minutes=0;minutes<60;minutes+=minutes_step){
          range.push(this.timeToString([hours,minutes]));
        }
      }
      range.push(this.timeToString([end,0]));
    }
    return range;
  }
  compareSelectedTime(o1: any, o2: any):boolean {
    if(o1!=null && o2!=null)
      return (o1.time[0] == o2.time[0] && o1.time[1] == o2.time[1]);
    return false;
  }
  compareSelectedTimeString(o1:string,o2:string){
    if (o1[0] == "0"){
      return o2.replace(":","").search(o1.slice(1).replace(":",""))>=0
    }
    return o2.replace(":","").search(o1.replace(":",""))>=0
  }
  stringToTime(time:string): [number,number]{
    // validate
    return time.split(":").map(s=>parseInt(s)) as [number,number];
  }
  getTime(date:Date): [number,number]{
    return [date.getHours(),date.getMinutes()]
  }
  timeToString(hours:[number,number]): string{
    return `${(hours[0]>9)?hours[0]:'0'+hours[0]}:${(hours[1]>9)?hours[1]:'0'+hours[1]}`
  }
  dateToTimeString(date:Date):string{
    return this.timeToString(this.getTime(date));
  }
}
