import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models';
import * as userActions from '../actions';

export interface State {
  user: User | null;
  token: string | null;
  loginError?: string;
}

export const initialState: State = {
  user: null,
  token: null,
};

const loginReducer = createReducer(
  initialState,
  on(userActions.login, (state, {user}) => ({...state, user})),
  on(userActions.loginSuccess, (state, loginSuccessResponse) => ({...state, user: loginSuccessResponse.user, token: loginSuccessResponse.token})),
  on(userActions.loginFailure, (state, { error }) => ({...state, loginError: error, token: null, user: null})),
  on(userActions.signup, (state, {user}) => ({...state, user})),
  on(userActions.signupSuccess, (state, result) => ({...state, user: state.user, result}))
);

export function authReducer(state: State | undefined, action: Action): any {
  return loginReducer(state, action);
}

export const getLoggedInUser = (state: State) => {
  return {
    user: state.user,
  }
};

export const userLogin = (state: State) => {
  return {
    user: state.user,
    result: state.token,
  }
};

export const userSignup = (state: State) => {
  return {
    user: state.user,
    result: state.loginError
  }
};