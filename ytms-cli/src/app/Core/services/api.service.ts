import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl: string = "http://localhost:8080/";
  constructor(private http: HttpClient) { }

  public putapi(body: any,endPoint:string) {
    return this.http.put(this.baseurl+endPoint, body);
  }
}
