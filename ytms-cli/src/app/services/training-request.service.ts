import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs'
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
}
