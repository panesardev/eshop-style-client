import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) { }

	canActivate(
		next: ActivatedRouteSnapshot, state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.auth.user$.pipe(
			take(1),
			map(user => user.isAdmin), // user to boolean
			tap(isAdmin => {
        		return isAdmin;
			})
		);
  	}

}
