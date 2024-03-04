import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {EncryptDecryptService} from "../services/encrypt-decrypt.service";
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";
import Swal from "sweetalert2";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router,
              private jwtService: JwtService,
              private encDecService: EncryptDecryptService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    //add the jwt token (LocalStorage) request
    const token = this.authService.getToken();
    if (token != undefined && !this.jwtService.isTokenExpired(token)) {
      const decryptedToken = this.encDecService.getDecryption(token);
      const authRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${decryptedToken}`
        },
      });
      return next.handle(authRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err) {
            switch (err.status) {
              case 400:
                Swal.fire('Oops...', 'Page not found', 'error');
                break;
              case 401:
                Swal.fire('Oops...', err.error, 'error');
                break;
              case 500:
                Swal.fire('Oops...', err.error, 'error');
                break;
            }
          }
          throw err;
        })
      );
    } else {
      this.authService.removeToken();
      this.router.navigate(['']);
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err) {
            switch (err.status) {
              case 400:
                Swal.fire('Oops...', 'Page not found', 'error');
                break;
              case 401:
                Swal.fire('Oops...', err.error, 'error');
                break;
              case 500:
                Swal.fire('Oops...', err.error, 'error');
                break;
            }
          }
          throw err;
        })
      );
    }
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
