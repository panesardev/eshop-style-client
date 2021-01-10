import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

	private message = 'You need to be Logged In';

	canActivate(
		next: ActivatedRouteSnapshot, state: RouterStateSnapshot
	): Observable<boolean> {
		return this.auth.user$.pipe(
			take(1),
			map(user => !!user), // user to boolean
			tap(loggedIn => {
				if (loggedIn) return true;
				this.router.navigate(['/auth/login']);
				alert(this.message);
				return false;
			})
		);
  }

}
