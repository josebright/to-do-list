import { Action } from '@ngrx/store';
import { User } from '../models';

export const USER_LOGIN = '[Login Page] Login';
export const USER_LOGIN_SUCCESS = '[Login Page] Login Success';
export const USER_LOGIN_FAILURE = '[Login Page] Login Failure';

export class login implements Action {
  readonly type = USER_LOGIN
  constructor(public payload: User) {}
}

export class loginSuccess implements Action {
  readonly type = USER_LOGIN_SUCCESS
  constructor(public payload: any) {}
}

export class loginFailure implements Action {
  readonly type = USER_LOGIN_FAILURE
  constructor(public payload: string) {}
}
