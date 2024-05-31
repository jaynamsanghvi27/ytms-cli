import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from "../../Core/services/login.service";
import Swal from "sweetalert2";
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  units?: any[];
  competencies?: any[];
  grades?: any[];
  signUpForm: FormGroup = this.formBuilder.group(
    {
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      emailAdd: ['', [Validators.required, Validators.pattern(/^[^\s@]+@yash\.com$/)]],
      unit: ['', [Validators.required]],
      competency: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      )]],
      confirmPassword: ['', [Validators.required]]
    })

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private ser: TrainingRequestService,
              private router: Router, private titleCasePipe:TitleCasePipe) {
  }

  ngOnInit(): void {
    this.loadUnit();
    this.loadCompetencies();
    this.loadGrades();
  }

  submit(): void {
    if (this.signUpForm.valid) {
      let user = {
        fullName: this.titleCasePipe.transform(this.signUpForm.value.fullName),
        emailAdd: this.signUpForm.value.emailAdd,
        unit: { id: this.signUpForm.value.unit },
        competency: { id: this.signUpForm.value.competency },
        grade: { id: this.signUpForm.value.grade },
        password: this.signUpForm.value.password,
        confirmPassword: this.signUpForm.value.confirmPassword,
      }

      this.loginService.register(user).subscribe(res => {
        if (res != null) {
          Swal.fire('Success', 'Request Successfully submitted to Admin for Approval', 'success');
          this.router.navigate(['']);
        } else
          Swal.fire('Error', 'Registration failed', 'error');
      })
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  loadUnit() {
    this.ser.getUnitMasterList().subscribe((resp: any) => { this.units = resp });
  }
  loadCompetencies() {
    this.ser.getCompetencyMasterList().subscribe((resp: any) => { this.competencies = resp });
  }
  loadGrades(){
    this.ser.getGradeMasterList().subscribe((resp: any) => { this.grades = resp });
  }
  pushUnit(unit:any) {
    this.units?.push(unit);
  }

  validateSubmit() {
    if (this.signUpForm.controls['password'].value != this.signUpForm.controls['confirmPassword'].value) {
      return true;
    } else {
      return false;
    }
  }

}
