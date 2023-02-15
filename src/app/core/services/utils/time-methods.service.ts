import { Injectable } from '@angular/core';
import { PositiveNumber } from '../../types/sign';

@Injectable({
  providedIn: 'root'
})
export class TimeMethodsService {

  constructor() { }
  timeRange(start:PositiveNumber,end:PositiveNumber,minutes_step:PositiveNumber):{time:number[],display:string}[]{
    const range:{time:number[],display:string}[]= []
    if (start<end){
      
      for (let hour=start;hour<end;hour++){
        for (let minutes=0;minutes<60;minutes+=minutes_step){
          range.push({
            time:[hour,minutes],
            display:`${hour>=10?hour:'0'+hour}:${minutes>=10?minutes:'0'+minutes}`
          })
        }
      }
      range.push({
        time:[end,0],
        display:`${end>=10?end:'0'+end}:00`
      })
    }
    return range
  }
  approximate(
    origin_date:Date,
    START_TIME: PositiveNumber,END_TIME: PositiveNumber
    ) :{time:number[],display:string}{

      const [hours,minutes] = [origin_date.getHours(),origin_date.getMinutes()]
      if (hours<START_TIME) return {time:[START_TIME,0],display:`${START_TIME>=10?START_TIME:'0'+START_TIME}:00`}
      else if (hours>END_TIME) return {time:[END_TIME,0],display:`${END_TIME>=10?END_TIME:'0'+END_TIME}:00`}
      else{
        const rounded_minutes = minutes - minutes%15;
        return {
          time:[hours,rounded_minutes],
          display:`${hours>=10?hours:'0'+hours}:${rounded_minutes>=10?rounded_minutes:'0'+rounded_minutes}`
        }
      } 
  }
  compareSelectedTime(o1: any, o2: any):boolean {
    if(o1!=null && o2!=null)
      return (o1.time[0] == o2.time[0] && o1.time[1] == o2.time[1]);
    return false;
  }
  
}
