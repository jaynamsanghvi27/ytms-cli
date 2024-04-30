import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Core/application_constant/environment';
import { TrainerAttendance } from '../Model/trainer-attendance';

@Injectable({
  providedIn: 'root'
})
export class TrainerAttendanceService {
  
  url: string = environment.baseUrl + environment.contextUrl;
  constructor(private http: HttpClient) { }

  getAllTranierAttendData(): Observable<TrainerAttendance[]> {
    return this.http.get<TrainerAttendance[]>(this.url + "/register/trainerAttendance/getPendingLeaves" );
  }

  approvePendingLeave(trainerAttendance: TrainerAttendance) {
    return this.http.post<TrainerAttendance>(this.url + "/register/trainerAttendance/approvePendingLeave",trainerAttendance );
  }
}
