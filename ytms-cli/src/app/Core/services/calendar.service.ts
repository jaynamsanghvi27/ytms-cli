import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../application_constant/environment';

// export interface Calendar
// {
//   title: string;
//   start?: Date;
//   end?: Date; 
//   scheduleUser?:any;
// }

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  url:string=environment.baseUrl+environment.contextUrl;

  constructor(private http: HttpClient) { }
  
  getALLEvents():Observable<any[]>
  {
    return this.http.get<any[]>(this.url+"/calendar/get/all")
  }
  getEventsByTrainer(trainerEmail:any):Observable<any[]>
  {
  return this.http.get<any[]>(this.url+"/calendar/"+trainerEmail)
  }
  public addEvent(events:any)
  {
   return this.http.post(this.url+"/calendar/save",events);
  }
  public updateEvent(event:any)
  {
    return this.http.post(this.url+"/calendar/update",event);   
  }
  public deleteEvent(event:any)
  {
    return this.http.post(this.url+"/calendar/delete",event);   
  }
  getEventsById(Id:any):Observable<any>
  {
  return this.http.get<any>(this.url+"/calendar/get/"+Id)
  }
  
  
}
