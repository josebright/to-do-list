import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';

import { User } from './../models/user.model';
import { AuthService } from '../../services';
import * as authActions from '../actions';


@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private cookie: CookieService
    ) {}

    // Login using user credentials, and validate if successful or not
    Login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authActions.LogIn), 
            exhaustMap(action =>
                this.authService // make the request
                .logIn(action.email, action.password) // pass user login information
                .pipe(
                    map((user: User) => 
                        authActions.LogInSuccess({email: user.email!, token: user.token!, id: user.id!})),   // pass the information gotten from the request 
                    catchError(({error}) => {
                        return of(authActions.LogInFailure({ error: error.message })) // return errors
                    })
                )
            )
        )
    );

    // If login is successful, store token in cookies and navigate to todo page
    LogInSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.LogInSuccess),
            tap(user => {
                this.cookie.set('token', user.token);
                // localStorage.setItem('token', user.token);
                this.router.navigateByUrl('todo');
            })
        ),
        { dispatch: false }
    );

    // If login is failed, return the error
    LogInFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.LogInFailure)
        ),
        { dispatch: false }
    );

    // Signup using user credentials, and validate if successful or not
    SignUp$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authActions.SignUp),
            exhaustMap(action =>
                this.authService // make the request
                .signUp(action.email, action.password) // pass user signup information
                .pipe(
                    map((user: User) => 
                        authActions.SignUpSuccess({email: user.email!})), // pass the information gotten from the request
                    catchError(({error}) => {
                        return of(authActions.SignUpFailure({ error: error.message })) // return errors
                    })
                )
            )
        ),
    );

    // If signup is successful, navigate to login page
    SignUpSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.SignUpSuccess),
            tap(() => 
                this.router.navigateByUrl('login')
            )
        ),
        { dispatch: false }
    );

    // If signup is failed, return the error
    SignUpFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.SignUpFailure)
        ),
        { dispatch: false }
    );

    //  clear token from cookie to log a user out
    LogOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.LogOut),
            tap(() => {
                this.cookie.delete('token')
                // localStorage.removeItem('token');
                this.router.navigateByUrl('login');
            })
        ),
        { dispatch: false }
    );
}