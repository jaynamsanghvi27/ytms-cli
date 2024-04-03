import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../application_constant/environment";


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  baseurl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public ExportExcelFile(data: any) {
    const URL = this.baseurl + '/ytms/register/export-to-excel';
    this.http.post(URL, data, { responseType: "blob" }).subscribe((res: any) => {
      this.downloadFile(res);
    });

  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.setAttribute('target', 'blank');
    a.href = url;
    a.download = "Associates.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }



}
