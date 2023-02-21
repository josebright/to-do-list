import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from "../actions";
import { User } from "../models";

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

const reducer = createReducer(
    initialState,
    on(authActions.LogIn, (state, action) => ({...state, email: action.email, password: action.password})),
    on(authActions.LogInSuccess, (state, action) => ({...state, user: {token: action.token, email: action.email}, isAuthenticated: true})),
    on(authActions.LogInFailure, (state, { error }) => ({...state, errorMessage: error, token: null, user: null, isAuthenticated: false})),
    on(authActions.SignUp, (state, action) => ({...state, email: action.email, password: action.password})),
    on(authActions.SignUpSuccess, (state, action) => ({...state, user: {token: action.token, email: action.email}, isAuthenticated: true, errorMessage: null})),
    on(authActions.SignUpFailure, (state, { error }) => ({...state, errorMessage: error})),
    on(authActions.LogOut, (state) => ({...state, token: null, user: null})),
);

export function authReducer(state: State | undefined, action: Action): State {
    return reducer(state, action);
}
