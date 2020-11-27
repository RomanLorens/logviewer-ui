import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user: User

  constructor(private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.currentUser().subscribe(d => this.user = d)
      return this.user && this.user.roles.includes('admin')
  }
  
}
