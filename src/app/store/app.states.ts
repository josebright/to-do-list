
import { User } from './models/user.model';
import { authReducer, todoReducer} from './reducers';
import { Todo } from './models/todo.model';

export interface AuthStateInterface {
  isAuthenticated: boolean;
  user: User | null;
  message: string | null;
}

export interface ToDoStateInterface {
  todos: Todo[] | [];
  error: string | null;
  selectTodo: Todo | null;
}

export interface AppStateInterface {
  auth: AuthStateInterface;
  todo: ToDoStateInterface;
}

export const reducers = {
  auth: authReducer,
  todo: todoReducer
};