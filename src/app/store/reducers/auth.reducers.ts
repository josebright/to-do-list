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

    // pass logged user email
    on(authActions.LogIn, 
        (state, action) => ({...state, user: {email: action.email}})),

    // pass successful user email and token
    on(authActions.LogInSuccess, 
        (state, action) => ({...state, user: {id: action.id, token: action.token, email: action.email}, 
             isAuthenticated: true})),

    // pass error message for failure
    on(authActions.LogInFailure, 
        (state, action) => ({...state, message: action.error})),

    // pass signup user email
    on(authActions.SignUp, 
        (state, action) => ({...state, user: {email: action.email}})),

    // pass successful user email
    on(authActions.SignUpSuccess, 
        (state, action) => ({...state, user: {email: action.email}})),

    // pass error message if failure
    on(authActions.SignUpFailure, 
        (state, action) => ({...state, message: action.error})),

    // false user if logged out
    on(authActions.LogOut, 
        (state) => ({...state, user: null, isAuthenticated: false})),
);
