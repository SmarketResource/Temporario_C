import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

/* Services */
import { AuthenticationService } from '../services/authentication.service';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
    
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean{
        if(this.authenticationService.usuarioEstaAutenticado() == true){
            return true;
        }
       else{
           this.router.navigate(['/login']);
           return false;
       }
    }
}