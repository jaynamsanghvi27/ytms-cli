import { Time } from "@angular/common";

export class TrainingReqForm{
    id?:number;
    unit!:String;
    upgradedSkills!: any;
    competency!: String;
    trainingType!: String;
    monthAndYear!: String;
    trainingName!: String;
    trainer!: String;
    startDate!: Date;
    endDate!: Date;
    trainingDescription!: String;
    status?:string;
    actualStartDate!: Date;
	actualEndDate!: Date;
    createdAt !: Date;
    userName!:String;
    noOfParticipant!:number;
    noOfActualParticipant!:number;
    declinedMessage!:string;
    fileName!: string;
    trainingStatus!:string;
    noOfDays!:number;
    startTime!:Time;
    endTime!:Time;
    actualStartTime!:Time;
    actualEndTime!:Time;
}