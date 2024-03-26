import { Injectable } from '@angular/core';
import { environment } from '../application_constant/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteCalendarService {
  url:string=environment.baseUrl+environment.contextUrl;

  constructor(private http: HttpClient) { }
  
  getToDelete():Observable<any[]>
  {
    return this.http.get<any[]>(this.url+"/delete/get")
  }
 
  public approve(id:number)
  {
   return this.http.post(this.url+"/delete/approve",id);
  }

  public deny(id:number)
  {
   return this.http.post(this.url+"/delete/deny",id);
  }

}
