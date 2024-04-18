import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ExcludeTrainerGuard implements CanActivate {

  constructor(private authService: AuthService,
    private jwtService: JwtService,
    private router: Router) {}
      

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return   this.checkAuthentication(route, state);;
  }


  private checkAuthentication(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();
      if (token != undefined) {
        if (!this.jwtService.isTokenExpired(token)) {
          //get roles from token
          const role = this.jwtService.getRoleFromToken(token);
       
          if ((role === 'ROLE_TECHNICAL_MANAGER' || role === 'ROLE_REQUESTER') && role != undefined || null) {
            // Role not authorized, redirect to home page
            return true;
          } else {
            
              Swal.fire('Error', 'Unauthorized', 'error');
              this.router.navigate(['trainer/dashboard']);
           
            return false;
          }
        } else {
          Swal.fire('Oops...', 'Token is expired, please re-login', 'error');
          this.authService.removeToken();
          this.router.navigate(['']);
          return false;
        }
      }
    } else {
      // Not authenticated, redirect to user dashboard or handle accordingly
      this.router.navigate(['']);
      return false;
    }
  }
}
