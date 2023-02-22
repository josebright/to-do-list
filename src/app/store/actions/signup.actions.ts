import { createAction, props } from '@ngrx/store';

export enum AuthSignUpActionTypes {
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure'
}

export const SignUp = createAction(
  AuthSignUpActionTypes.SIGNUP,
  props<{email: string, password: string}>()
);

export const SignUpSuccess = createAction(
  AuthSignUpActionTypes.SIGNUP_SUCCESS,
  props<{email: string, message: string}>()
)

export const SignUpFailure = createAction(
  AuthSignUpActionTypes.SIGNUP_FAILURE,
  props<{error: string}>()
)