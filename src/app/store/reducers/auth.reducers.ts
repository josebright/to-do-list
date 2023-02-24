import { createReducer, on } from '@ngrx/store';

import * as authActions from "../actions";
import { AuthStateInterface } from '../app.states';




const initialState: AuthStateInterface = {
    isAuthenticated: false,
    user: null,
    message: null,
};

export const authReducer = createReducer(
    initialState,
    on(authActions.LogIn, 
        (state, action) => ({...state, user: {email: action.email}})),
    on(authActions.LogInSuccess, 
        (state, action) => ({...state, user: {id: action.id, token: action.token, email: action.email}, 
             isAuthenticated: true})),
    on(authActions.LogInFailure, 
        (state, action) => ({...state, message: action.error})),
    on(authActions.SignUp, 
        (state, action) => ({...state, user: {email: action.email}})),
    on(authActions.SignUpSuccess, 
        (state, action) => ({...state, user: {email: action.email}})),
    on(authActions.SignUpFailure, 
        (state, action) => ({...state, message: action.error})),
    on(authActions.LogOut, 
        (state) => ({...state, user: null, isAuthenticated: false})),
);
