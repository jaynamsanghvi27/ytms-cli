import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { environment } from '../application_constant/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  baseurl: string = environment.baseUrl + environment.contextUrl + '/api/events';
 
  constructor(private modal: NgbModal, private http: HttpClient) {}
 
  public createEvent(event: any): Observable<any> {
    console.log(' Event creation in calendar service : ',event);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
return this.http.post<any>(this.baseurl, event, httpOptions);
  }
 
  public getAllEvents(): Observable<any> {
    return this.http.get<any>(this.baseurl);
  }
 
  public updateEvent(eventId: any, updatedEvent: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const updateUrl = `${this.baseurl}/${eventId}`;
    return this.http.put<any>(updateUrl, updatedEvent, httpOptions);
  }
 
  public deleteEvent(eventId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const deleteUrl = `${this.baseurl}/${eventId}`;
    return this.http.delete<any>(deleteUrl, httpOptions);
  }
public searchByTrainer(trainer:string):Observable<any>{
return this.http.get<any>(this.baseurl+environment.contextUrl+'/searchbyTrainer?trainer=${trainer}')
}

}