import { User } from './../models/user.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../services';
import * as authActions from '../actions';


@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    Login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authActions.LogIn),
            exhaustMap(action =>
                this.authService
                .logIn(action.email, action.password)
                .pipe(
                    map((user: User) => 
                        authActions.LogInSuccess({email: action.email, token: user.token!})),
                    catchError(error => 
                        of(authActions.LogInFailure({ error: error })))
                )
            )
        )
    );

    LogInSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.LogInSuccess),
            tap(user => {
                localStorage.setItem('token', user.token);
                this.router.navigateByUrl('/');
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
                        authActions.SignUpSuccess({email: action.email, token: user.token!})),
                    catchError(error => 
                        of(authActions.SignUpFailure({ error: error })))
                )
            )
        )
    );

    SignUpSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.SignUpSuccess),
            tap(user => {
                localStorage.setItem('token', user.token);
                this.router.navigateByUrl('/');
            })
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
            tap(user => {
                localStorage.removeItem('token');
            })
        ),
        { dispatch: false }
    );
}