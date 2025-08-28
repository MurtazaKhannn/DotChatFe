import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AuthService } from './app/services/auth';
import { Observable } from 'rxjs';

function initializeApp(authService: AuthService): () => Observable<any> {
  return () => authService.checkUserStatus();
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
