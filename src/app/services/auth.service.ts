import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { User } from '../store/models';


@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private _jwt: JwtHelperService,
    private router: Router
  ) {}

  logIn(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    const options = {headers};
    const url = `${this.BASE_URL}/auth/signin`;
    return this.http.post(url, {email, password}, options).pipe(
      map((payload: User) => {
        return payload;
       }),
      catchError(err => {
        return err;
      })
    );
  }

  isLoggedIn(): boolean {
    const token: string = localStorage.getItem('token') || 'null'

    if (
      token !== null &&
      token !== undefined &&
      !this._jwt.isTokenExpired(token)
    ) {
      return true;
    }
    return false;
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

  signUp(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    const options = {headers};
    const url = `${this.BASE_URL}/auth/signup`;
    return this.http.post(url,  {email, password}, options).pipe(
      map((payload: User) => {
        return payload;
       }),
      catchError(err => {
        return err;
      })
   );
  }
}