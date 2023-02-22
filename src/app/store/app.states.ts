
import { User } from './models/user.model';
import { authReducer} from './reducers/auth.reducers';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message or success message
  message: string | null;
}


export const reducers = {
  auth: authReducer
};