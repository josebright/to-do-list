
import { User } from './models/user.model';
import { authReducer} from './reducers';
import { todoReducer} from '../pages/todos/store';
import { ToDoStateInterface } from '../pages/todos/store/entities/todo';

export interface AuthStateInterface {
  isAuthenticated: boolean;
  user: User | null;
  message: string | null;
}



export interface AppStateInterface {
  auth: AuthStateInterface;
  todo: ToDoStateInterface;
}

export const reducers = {
  auth: authReducer,
  todo: todoReducer
};