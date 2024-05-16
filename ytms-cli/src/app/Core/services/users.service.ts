import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {JwtService} from "./jwt.service";
import {Observable} from "rxjs";
import {environment} from "../application_constant/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersUrl = '/users';

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private jwtService: JwtService) {
  }

  getAllPendingUsers(): Observable<any> {
    return this.http.get(environment.baseUrl
      + environment.contextUrl
      + this.usersUrl
      + `/pending`,
      {
        headers:
          {'Content-Type': 'application/json'}
      });
  }

  approvePendingUser(emailAdd: string,roleName: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const params = new HttpParams()
      .set('emailAdd', emailAdd)
      .set('roleName',roleName);
    return this.http.post(environment.baseUrl
      + environment.contextUrl
      + this.usersUrl
      + `/approve`, {}, {
        headers: headers,
        params: params
      }
    );
  }

  declinePendingUser(emailAdd: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const params = new HttpParams()
      .set('emailAdd', emailAdd);

    return this.http.post(environment.baseUrl
      + environment.contextUrl
      + this.usersUrl
      + `/decline`, {}, {
        headers: headers,
        params: params
      }
    );
  }

  public getUser(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + environment.contextUrl + this.usersUrl + '/get/user');
  }

  public getAllTrainers(): Observable<string[]> {
    return this.http.get<string[]>(environment.baseUrl + environment.contextUrl + this.usersUrl + '/get/all-trainers');
  }

  public getAllRoles(){
    return this.http.get<any>(environment.baseUrl + environment.contextUrl + this.usersUrl + '/roles');
  }

  public getAllActiveUsers(){
    return this.http.get<any>(environment.baseUrl + environment.contextUrl + this.usersUrl + '/active');
  }
}
