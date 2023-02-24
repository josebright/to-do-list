import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private _jwt: JwtHelperService,
    private router: Router,
    private cookie: CookieService
  ) {}

  signUp(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    const options = {headers};
    const url = `${this.BASE_URL}/auth/signup`;
    return this.http.post(url, {email, password}, options);
  }

  logIn(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    const options = {headers};
    const url = `${this.BASE_URL}/auth/signin`;
    return this.http.post(url, {email, password}, options);
  }

  isLoggedIn(): boolean {
    const token: string = this.cookie.get('token') || 'null'
    if (
      token !== null &&
      token !== undefined &&
      !this._jwt.isTokenExpired(token)
    ) {
      return true;
    }
    return false;
  }

  getToken(): string {
    return this.cookie.get('cookie') || 'null'
  }
}
