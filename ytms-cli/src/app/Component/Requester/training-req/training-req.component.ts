import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-training-req',
  templateUrl: './training-req.component.html',
  styleUrls: ['./training-req.component.css']
})
export class TrainingReqComponent {
  selectedTechnology="";
  sideNavStatus: boolean = false;
  //reg!: User[];
  trainingReqForm!: FormGroup;
  emailpattern = "^(.+)@(.+)$";
  trainingArray:any []=["","","",""];
  completeTrainingName:any ="";
  units = ["BG4-BU5", "BG5-BU11"];
  technologies: any[] = [{id:"1",name:"React"}, {id:"2",name:"Java"}, {id:"3",name:"Python"}];
  competencies: string[] = ["JAVA", "REACT", "PYTHON"];
  trainingTypes: string[] = ["On-Demand", "On-Bench", "Fresher"];
  
  
 
  constructor(private formBuilder: FormBuilder,private router: Router, private ser:TrainingRequestService){
    
  }
 
  ngOnInit(): void {
    this.trainingReqForm = this.formBuilder.group(
      {
        unit: ['', [Validators.required]],
        technology: ['', [Validators.required]],
        competency: ['', [Validators.required]],
        trainingType: ['', [Validators.required]],
        monthAndYear: ['', [Validators.required]],
        trainingName: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        trainingDescription: ['', [Validators.required]]
        
      })
    this.trainingReqForm.controls['unit'].setValue(0,{onlySelf: true});
    this.trainingReqForm.controls['technology'].setValue(0,{onlySelf: true});
    this.trainingReqForm.controls['competency'].setValue(0,{onlySelf: true});
    this.trainingReqForm.controls['trainingType'].setValue(0,{onlySelf: true});
  }

  onUnitChange(unit:any){
    this.trainingArray[0]=unit;
    this.creatTrainingName();
  }
  onCompetencyChange(competency:any){
    this.trainingArray[1]=competency.target.value;
    this.creatTrainingName();
  }
  
  onTrainingChange(training:any){
    this.trainingArray[2]=training.target.value;
    this.creatTrainingName();
  }
  onTechnologychange(technology:any){
    this.trainingArray[3]=this.selectedTechnology;
    this.creatTrainingName();
  }

  creatTrainingName(){
    this.completeTrainingName="";
    this.trainingArray.forEach(function (value) {
      // message=value
    }); 
    if(this.trainingArray[0]!=""){
      this.completeTrainingName=this.trainingArray[0]+"-";
    }
    if(this.trainingArray[1]!=""){
      this.completeTrainingName+=this.trainingArray[1]+"-";
    }
    if(this.trainingArray[2]!=""){
      this.completeTrainingName+=this.trainingArray[2]+"-";
    }
    if(this.trainingArray[3]!=""){
      this.completeTrainingName+="("+this.trainingArray[3]+")";
    }
    if(this.completeTrainingName!=""){
      this.ser.setTrainingName(this.completeTrainingName);
      this.completeTrainingName = this.completeTrainingName;
    }
  }
 
  submit(): void {
    if (this.trainingReqForm.valid) {
      console.log("befor service "+JSON.stringify(this.trainingReqForm.value));
      let obj:any=this.trainingReqForm.value;
      this.ser.saveTraining(obj).subscribe();
      
    } else {
      this.trainingReqForm.markAllAsTouched();
    }
  }

  redirectComponent(){
    this.router.navigate(['/nomination-req']);
  }
}
