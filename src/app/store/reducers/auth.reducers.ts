import { createReducer, on } from '@ngrx/store';

import * as authActions from "../actions";
import { State } from '../app.states';




export const initialState: State = {
    isAuthenticated: false,
    user: null,
    message: null,
};

export const authReducer = createReducer(
    initialState,
    on(authActions.LogIn, 
        (state, action) => ({...state, user: {email: action.email}})),
    on(authActions.LogInSuccess, 
        (state, action) => ({...state, user: {token: action.token, email: action.email}, 
            message: action.message, isAuthenticated: true})),
    on(authActions.LogInFailure, 
        (state, action) => ({...state, message: action.error})),
    on(authActions.SignUp, 
        (state, action) => ({...state, user: {email: action.email}})),
    on(authActions.SignUpSuccess, 
        (state, action) => ({...state, user: {email: action.email}, message: action.message})),
    on(authActions.SignUpFailure, 
        (state, action) => ({...state, message: action.error})),
    on(authActions.LogOut, 
        (state) => ({...state, user: null, isAuthenticated: false})),
);
