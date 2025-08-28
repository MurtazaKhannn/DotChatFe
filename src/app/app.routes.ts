import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import { userResolver } from './guards/user.resolver'; 


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'chat', 
    component: ChatComponent,
    canActivate: [authGuard] // The guard now handles everything
    // REMOVE the resolve property from here
  },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: '**', redirectTo: '/chat' }
];