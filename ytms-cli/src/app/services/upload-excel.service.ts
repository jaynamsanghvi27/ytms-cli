import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Core/services/auth.service';
import { environment } from '../Core/application_constant/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadExcelService {
  url:string="http://10.4.8.35:8080/ytms";
  constructor(private httpClient: HttpClient,  private authservice: AuthService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authservice.getToken()
    })
  }



  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', environment.baseUrl+environment.contextUrl+"/register/upload", formData, {

      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authservice.getToken(),
      }),
      reportProgress: true,
      responseType: 'json'

    });
    return this.httpClient.request(req);
}
}