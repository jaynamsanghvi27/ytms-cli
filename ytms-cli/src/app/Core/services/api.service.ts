import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../application_constant/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  public putapi(body: any,endPoint:string) {
    return this.http.put(this.baseurl+endPoint, body);
  }

  public changePassword( ){

  }
  public resetPassword(body:any ){
    console.log("in reset api "+body.email+" pass :  "+body.password)
return this.http.post(this.baseurl+environment.contextUrl+'/users/resetPassword',body);
  }

}
