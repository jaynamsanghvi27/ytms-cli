import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Core/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UploadExcelService {

  url:string="http://localhost:8080/ytms";

  constructor(private httpClient: HttpClient,  private authservice: AuthService, private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authservice.getToken()
    })
  }



  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', "http://localhost:8080/ytms/register/upload", formData, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authservice.getToken(),
      }),
      reportProgress: true,
      responseType: 'json'

    });
    return this.httpClient.request(req);
}

getFileName(): Observable<any[]> {
  return this.http.get<String[]>(this.url+"/register/getFileName"); 
  }
}