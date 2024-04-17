import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs'
import { Nomination } from '../Model/Nomination';
import { TrainingReqForm } from '../Model/TrainingRequestForm';
import { environment } from '../Core/application_constant/environment';
import { AssociateSummaryModel } from '../Model/AssociateSummary';
import { AssociateTrainingDataModel } from '../Model/AssociateTrainingDataModel';
import { AssociateManagement } from '../Model/AssociateManagement';


@Injectable({
  providedIn: 'root'
})
export class TrainingRequestService {
  
  private trainingDataSubject = new BehaviorSubject<String>(new String());
  trainingName$ = this.trainingDataSubject.asObservable();

  public nominationDataSubject = new BehaviorSubject<Number>(new Number());
  nominationId$ = this.nominationDataSubject.asObservable();

  url:string=environment.baseUrl+environment.contextUrl;


  constructor(private http: HttpClient) { }
  
  setTrainingName(userData: String): void {
    this.trainingDataSubject.next(userData);
  }
 
  clearTrainingName(): void {
    this.trainingDataSubject.next(new String());
  }

  setNominationId(id: number): void {
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

    getUpcomingTrainings(): Observable<any[]> {
      return this.http.get<TrainingReqForm[]>(this.url+"/register/getUpcomingTrainingList"); 
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
  getLocationMasterList(): Observable<any[]> {
    return this.http.get<any[]>(this.url+"/getLocationMasterList"); 
  }
  getGradeMasterList(): Observable<any[]> {
    return this.http.get<any[]>(this.url+"/getGradeMasterList"); 
  }
  getTrainingTypesMasterList(): Observable<any[]> {
    return this.http.get<any[]>(this.url+"/getTrainingTypesMasterList"); 
  }
  saveNominationDataOnFrontend(file:File){
    console.log("on service"+JSON.stringify(file.name) );
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Nomination[]>(this.url+"/register/readExcel",formData);
  }

  getNominationListByTrainingId(trainingId:any): Observable<any[]> {
    return this.http.get<any[]>(this.url+"/register/getNominationListByTrainingId/"+trainingId); 
  }

  getNominationById(nominationId:any): Observable<Nomination> {
    return this.http.get<Nomination>(this.url+"/register/getNominationById/"+nominationId); 
  }
  deleteNominationById(nominationId:any){
    return this.http.delete<Nomination>(this.url+"/register/deleteNominationById/"+nominationId);
  }
  updateNominationById(nomination:any){
    let nominationBody:any=nomination;
    console.log("on service"+ JSON.stringify(nominationBody));
    return this.http.put<any>(this.url+"/register/update-nomination",nominationBody);
  }
  saveNomination(nomination:any){
    console.log("on service"+ JSON.stringify(nomination));
    return this.http.post<any>(this.url+"/register/saveNomination",nomination);
  }
  getTrainerMasterList(): Observable<any[]> {
    return this.http.get<any[]>(this.url+"/register/getTrainerList"); 
  }
  getRequesterMasterList():Observable<any[]>{
    return this.http.get<any[]>(this.url+"/register/getRequesterList"); 
  }

getAllTranieeAttendanceViewDateData(tarningId:any): Observable<any[]> {
    return this.http.get<any[]>(this.url+"/register/attendance/attendViewData/"+tarningId); 
}

getAllAttendanceData(tarningId:any): Observable<any[]> {
      return this.http.get<any[]>(this.url+"/register/attendance/getAllAttendanceDateData/"+tarningId); 
}

getAttendanceDatesList(tarningId:any): Observable<any[]> {
 return this.http.get<any[]>(this.url+"/register/attendance/attendsDatesList/"+tarningId); 
}

getselectedDateTranieeData(selecedDate:any,tarningId:any): Observable<any[]> {
  return this.http.get<any[]>(this.url+"/register/attendance/selectedDateTranieeData/"+selecedDate+'/'+tarningId); 
}

getStartDateEndDate(tarningId:any): Observable<any[]> {
  return this.http.get<any[]>(this.url+"/register/attendance/getStarAndEndDateData/"+tarningId); 
}

getAllTranierAttendData(tarningId:any): Observable<any[]> {
  return this.http.get<any[]>(this.url+"/register/trainerAttendance/getAllTranierAttendance/"+tarningId); 
}
saveselectedDateTranieeData(selecedDate:any): Observable<any[]> {
        console.log("on service"+ JSON.stringify(selecedDate));
  return this.http.put<any[]>(this.url+"/register/attendance/add-Attendance",selecedDate); 
}
saveselectedDateTranierAttendanceData(data:any,tariningid:any): Observable<any[]> {
  console.log("on service"+ JSON.stringify(data));
return this.http.put<any[]>(this.url+"/register/trainerAttendance/updateAttendanceStatus/"+tariningid,data); 
}
createAattendanceRecord(data:any){
  console.log("on createAattendanceRecord"+ JSON.stringify(data));
  return this.http.post<any>(this.url+"/register/attendance/create/"+data,"");
}

  getAssociateData():Observable<AssociateSummaryModel[]>{
    return this.http.get<any[]>(this.url+"/register/getAllNominations");
  }
  getTrainerTrainingList():Observable<any[]>{
    return this.http.get<any[]>(this.url+"/register/getTrainerTrainingList"); 
  }
  getTrainingDataByEmpId(emailId:any):Observable<AssociateManagement[]>{
    console.log(this.url+"/register/getAllTrainingsByAssociate/"+emailId);
    return this.http.get<any[]>(this.url+"/register/getAllTrainingsByAssociate/"+emailId);
  }

  getAssociateManagementData():Observable<AssociateManagement[]>{
    return this.http.get<any[]>(this.url+"/associate/getAllAssociateTrainings");
  }

  saveEmployeeFeedbackByTrainer(employees: Nomination[]): Observable<any[]> {
    return this.http.put<any>(this.url+"/register/updateFeedBack",employees);
  }
  savefinalScore(employees: Nomination[]): Observable<any[]> {
    return this.http.put<any>(this.url+"/register/updateFinalScore",employees);
  }

}
