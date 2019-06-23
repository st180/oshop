import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
 
import { Router, CanActivate } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
 
  constructor(private auth: AuthService, private userService: UserService) { }
 
  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .pipe(map (appUser => appUser.isAdmin));
  }
}