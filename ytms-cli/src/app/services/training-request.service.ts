import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs'
import { TrainingReqForm } from '../Model/TrainingRequestForm';

@Injectable({
  providedIn: 'root'
})
export class TrainingRequestService {
  private trainingDataSubject = new BehaviorSubject<String>(new String());
  trainingName$ = this.trainingDataSubject.asObservable();

  url:string="http://localhost:8080/ytms";

  constructor(private http: HttpClient) { }
  
  setTrainingName(userData: String): void {
    this.trainingDataSubject.next(userData);
  }
 
  clearTrainingName(): void {
    this.trainingDataSubject.next(new String());
  }

  saveTraining(trf:TrainingReqForm){
    console.log("on service"+ JSON.stringify(trf));
    return this.http.post<any>(this.url+"/register/saveTrainingRequestForm",trf);
  }
  editTraining(trf:TrainingReqForm){
    console.log("on service"+ JSON.stringify(trf));
    return this.http.put<any>(this.url+"/register/editTrainingRequestForm",trf);
  }
  updateTraining(trf:TrainingReqForm){
    console.log("on service"+ JSON.stringify(trf));
    return this.http.put<any>(this.url+"/register/updateTrainingRequestForm",trf);
  }
  declinetrf(trf:TrainingReqForm){
    console.log("on service"+ JSON.stringify(trf));
    return this.http.put<any>(this.url+"/register/decline-trf",trf);
  }
  getTraining(): Observable<any[]> {
    return this.http.get<TrainingReqForm[]>(this.url+"/register/getTrainingRequestForm"); 
    }

  getTrainingById(trainingId:any){
    return this.http.get<TrainingReqForm>(this.url+"/register/getTrainingRequestFormById/"+trainingId); 
  }

  getCompetencyMasterList(): Observable<any[]> {
    return this.http.get<any[]>(this.url+"/getCompetencyMasterList"); 
  }
  getTechnologyMasterList(): Observable<any[]> {
    return this.http.get<any[]>(this.url+"/getTechnologyMasterList"); 
  }
  getUnitMasterList(): Observable<any[]> {
    return this.http.get<any[]>(this.url+"/getUnitMasterList"); 
  }
  getTrainingTypesMasterList(): Observable<any[]> {
    return this.http.get<any[]>(this.url+"/getTrainingTypesMasterList"); 
  }
}
