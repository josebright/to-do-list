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

    Login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authActions.LogIn),
            exhaustMap(action =>
                this.authService
                .logIn(action.email, action.password)
                .pipe(
                    map((user: User) => 
                        authActions.LogInSuccess({email: user.email!, token: user.token!, id: user.id!})),   
                    catchError(({error}) => {
                        return of(authActions.LogInFailure({ error: error.message }))
                    })
                )
            )
        )
    );

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

    LogInFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.LogInFailure)
        ),
        { dispatch: false }
    );

    SignUp$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authActions.SignUp),
            exhaustMap(action =>
                this.authService
                .signUp(action.email, action.password)
                .pipe(
                    map((user: User) => 
                        authActions.SignUpSuccess({email: user.email!})),
                    catchError(({error}) => {
                        return of(authActions.SignUpFailure({ error: error.message }))
                    })
                )
            )
        ),
    );

    SignUpSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.SignUpSuccess),
            tap(() => 
                this.router.navigateByUrl('login')
            )
        ),
        { dispatch: false }
    );

    SignUpFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.SignUpFailure)
        ),
        { dispatch: false }
    );

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