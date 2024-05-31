export class Nomination {
    id?: number;
    emp_id!: string;
    emp_name!: string;
    emp_mail_id!: string;
    grade!: string;
    skill!: string;
    current_allocation!: string;
    project!: string;
    current_location!: string;
    trainingId?: number;
    requestor!: string;
    finalScore!:number;
    feedback!: string;
    disableFeedback?: boolean;
    technicalSkills!:string;
    attitude!:string;
    commSkills!:string;
    workQuality!:string;
    overAllRating!:string;
    competency!:string;
}