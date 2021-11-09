import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { IFbAuthResponse, IUser } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  error$: Subject<string> = new Subject();

  get token (): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp') || '');

    if( new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  setToken (responce: IFbAuthResponse | null) {
    if(!responce) {
      localStorage.clear();
      return;
    }
    const expDate = new Date(new Date().getTime() + +responce.expiresIn * 1000);

    localStorage.setItem('fb-token', responce.idToken);
    localStorage.setItem('fb-token-exp', expDate.toString());
  }

  login (user: IUser): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post( `${env.baseFbUrl}/v1/accounts:signInWithPassword?key=${env.apiKey}`, user)
      .pipe(
        catchError(err => this.handleError(err))
      )
  }

  logout (query?: any) {
    this.setToken(null);
    this.router.navigate(['/admin/login'], {
      queryParams: query || null
    })
  }

  get isAuth (): boolean {
    return !!this.token;
  }

  handleError (error: HttpErrorResponse): Observable<HttpErrorResponse> {
    const {message, code} = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next(`Invalid email ( Code: ${code} )`);
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next(`Email not found ( Code: ${code} )`);
        break;
      case 'INVALID_PASSWORD':
        this.error$.next(`Invalid password ( Code: ${code} )`);
        break;
      default:
        this.error$.next(`Unexpected error ( Code: ${code} )`);
    }

    return throwError(error);
  }


}
