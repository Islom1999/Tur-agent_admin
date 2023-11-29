import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const canActivate: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = await authService.isLoggedIn();

  if (isLoggedIn) return true;
  router.navigate(['/login']);
  return false;
};

export const canActivateChild: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
  canActivate(route, state);