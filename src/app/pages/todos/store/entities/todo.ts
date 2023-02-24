import {Todo} from '../../models'

export interface ToDoStateInterface {
    todos: Todo[] | [];
    error: string | null;
    selectTodo: Todo | null;
  }