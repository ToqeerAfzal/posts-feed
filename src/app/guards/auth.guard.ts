import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeyStrings } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }      
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
     if (this.isLoggedIn()) {      
     return true;      
     }        
    this.router.navigate(['/user']);      
    return false;      
  }      
  public isLoggedIn(): boolean {      
    let status = false;      
    if (localStorage.getItem(KeyStrings.AuthTokenString)) {      
      status = true;      
    }    
    else {      
      status = false;      
    }      
    return status;      
  }
}
