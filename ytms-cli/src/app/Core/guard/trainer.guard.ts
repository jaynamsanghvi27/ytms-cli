import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import Swal from "sweetalert2";
import {AuthService} from "../services/auth.service";
import {JwtService} from "../services/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class TrainerGuard implements CanActivate {

  constructor(private authService: AuthService,
              private jwtService: JwtService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuthentication(route, state);
  }

  private checkAuthentication(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();
      if (token != undefined) {
        if (!this.jwtService.isTokenExpired(token)) {
          //get roles from token
          const role = this.jwtService.getRoleFromToken(token);
          if('/tm-view-trainer-form' ===this.router.url) return true;
          if('/requester/view-trainer-form' ===this.router.url) return true;
          // Check if route is restricted by role
          if (role === 'ROLE_TRAINER') {
            // Role not authorized, redirect to home page
            return true;
          } else {
            // Not authenticated, redirect to user dashboard or handle accordingly
            Swal.fire('Error', 'Unauthorized', 'error');
            this.router.navigate(['']);
            return false;
          }
        } else {
          Swal.fire('Oops...', 'Token is expired, please re-login', 'error');
          this.authService.removeToken();
          this.router.navigate(['']);
          return false;
        }
      }
      // User details not available, handle accordingly
    } else {
      // Not authenticated, redirect to user dashboard or handle accordingly
      this.router.navigate(['']);
      return false;
    }
  }
}
