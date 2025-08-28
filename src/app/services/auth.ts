import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Use a BehaviorSubject to store the current user state
  private currentUserSource = new BehaviorSubject<any | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  private backendUrl = 'https://localhost:7228'; // Your backend URL

  constructor(private http: HttpClient) { }

  public get currentUserValue(): any | null {
    return this.currentUserSource.value;
  }

  // Check the backend to see if the user has a valid auth cookie
  checkUserStatus() {
    return this.http.get(`${this.backendUrl}/auth/me` , { withCredentials : true}).pipe(
      tap(user => this.currentUserSource.next(user)),
      catchError(() => {
        this.currentUserSource.next(null);
        return of(null);
      })
    );
  }

  logout() {
    return this.http.post(`${this.backendUrl}/auth/logout`, {} , { withCredentials: true } ).pipe(
      tap(() => this.currentUserSource.next(null))
    );
  }
}