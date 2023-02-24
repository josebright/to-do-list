import { createAction, props } from '@ngrx/store';

export enum AuthLogInActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure'
}

export const LogIn = createAction(
  AuthLogInActionTypes.LOGIN,
  props<{email: string, password: string}>()
);

export const LogInSuccess = createAction(
  AuthLogInActionTypes.LOGIN_SUCCESS,
  props<{ id: string, email: string, token: string}>()
)

export const LogInFailure = createAction(
  AuthLogInActionTypes.LOGIN_FAILURE,
  props<{error: string}>()
)
