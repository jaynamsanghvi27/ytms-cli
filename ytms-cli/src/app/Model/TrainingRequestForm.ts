export class TrainingReqForm{
    id?:number;
    unit!:String;
    technology!: any;
    competency!: String;
    trainingType!: String;
    monthAndYear!: String;
    trainingName!: String;
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
}