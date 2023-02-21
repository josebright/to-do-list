import { createAction } from '@ngrx/store';

export enum AuthLogOutActionTypes {
    LOGOUT = '[Auth] Logout'
}

export const LogOut = createAction(
    AuthLogOutActionTypes.LOGOUT,
  )