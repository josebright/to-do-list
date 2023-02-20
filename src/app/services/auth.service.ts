import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../store/models';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
  ) {}

  // getToken(): string {
  //   return localStorage.getItem('token');
  // }

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