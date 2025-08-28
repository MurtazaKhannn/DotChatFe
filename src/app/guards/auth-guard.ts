import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // The guard now calls checkUserStatus and the router waits for the result
  return authService.checkUserStatus().pipe(
    map(user => {
      if (user) {
        return true; // Login successful, allow access to chat
      } else {
        // No user found, redirect to the login page
        return router.createUrlTree(['/login']);
      }
    })
  );
};