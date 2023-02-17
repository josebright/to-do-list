import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private userLoggedIn = new Subject<boolean>();
  // loginUrl = 'http://localhost:3000/api/auth/signin';
  // signupUrl = 'http://localhost:3000/api/auth/signup';

  loginUrl = '/api/login';
  signupUrl = '/api/signup';

  constructor(private http: HttpClient) {
    this.userLoggedIn.next(false);
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  signin(user: any) {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    const options = {headers};
    return this.http.post(this.loginUrl,  {user}, options).pipe(
      map((response: Response) => response),
      catchError(err => {
        console.log(err);
        return of([]);
      })
  );
  }

  signup(user: any) {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    const options = {headers};
    return this.http.post(this.signupUrl,  {user}, options).pipe(
      map((response: Response) => response),
      catchError(err => {
        console.log(err);
        return of([]);
      })
   );
  }
}