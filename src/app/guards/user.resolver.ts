import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../services/auth';

export const userResolver: ResolveFn<any> = (route, state) => {
  const authService = inject(AuthService);
  // The router will automatically subscribe and wait for this to complete
  return authService.checkUserStatus();
};