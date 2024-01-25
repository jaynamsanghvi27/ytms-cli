import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../application_constant/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  public putapi(body: any,endPoint:string) {
    return this.http.put(this.baseurl+endPoint, body);
  }
}
