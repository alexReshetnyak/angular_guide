import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { CoreModule } from 'src/app/core.module';

@Injectable({ providedIn: CoreModule })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public canActivate (
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot,
  ): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree > {
    return this.authService.user.pipe(
      take(1),
      map((user: User) => !!user ? true : this.router.createUrlTree(['/auth']))
    );
  }
}