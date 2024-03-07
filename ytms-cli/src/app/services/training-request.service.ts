import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs'
import { Nomination } from '../Model/Nomination';
import { TrainingReqForm } from '../Model/TrainingRequestForm';

@Injectable({
  providedIn: 'root'
})
export class TrainingRequestService {
  private trainingDataSubject = new BehaviorSubject<String>(new String());
  trainingName$ = this.trainingDataSubject.asObservable();

  private nominationDataSubject = new BehaviorSubject<String>(new String());
  nominationId$ = this.nominationDataSubject.asObservable();

  url:string="http://localhost:8080/ytms";

  constructor(private http: HttpClient) { }
  
  setTrainingName(userData: String): void {
    this.trainingDataSubject.next(userData);
  }
 
  clearTrainingName(): void {
    this.trainingDataSubject.next(new String());
  }

  setNominationId(id: String): void {
    this.nominationDataSubject.next(id);
  }

  // saveTraining(trf:TrainingReqForm){
  //   console.log("on service"+ JSON.stringify(trf));
  //   return this.http.post<any>(this.url+"/register/saveTrainingRequestForm",trf);
  // }

  saveTraining(trf:TrainingReqForm,nominationsData:Nomination[]){
    console.log("on service"+ JSON.stringify(trf));
    // const url = '/your-springboot-endpoint?list=' + list.join(','); // Combine with list
    return this.http.post<any>(this.url+"/register/saveTrainingRequestForm",{'trainingRequestFormDto':trf,'nominationList':nominationsData});
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

  saveUnit(unit:any){
    console.log("on service"+ JSON.stringify(unit));
    return this.http.post<any>(this.url+"/add-unit",unit);
  }
  saveCompetency(competency:any){
    console.log("on service"+ JSON.stringify(competency));
    return this.http.post<any>(this.url+"/add-competency",competency);
  }
  saveTrainingType(training:any){
    console.log("on service"+ JSON.stringify(training));
    return this.http.post<any>(this.url+"/add-training-type",training);
  }
  saveTechnology(technology:any){
    console.log("on service"+ JSON.stringify(technology));
    return this.http.post<any>(this.url+"/add-technology",technology);
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
  saveNominationDataOnFrontend(file:File){
    console.log("on service"+JSON.stringify(file.name) );
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Nomination[]>(this.url+"/register/upload",formData);
  }

  getNominationListByTrainingId(trainingId:any): Observable<any[]> {
    return this.http.get<any[]>(this.url+"/register/getNominationListByTrainingId/"+trainingId); 
  }
}
