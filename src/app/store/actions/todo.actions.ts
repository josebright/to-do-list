import { createAction, props } from '@ngrx/store';
import { CreateTodo, Todo } from '../models/todo.model';

export enum ToDoActionTypes {
    GET_USER_TODOS = '[Todo] Get User Todos',
    GET_USER_TODOS_SUCCESS = '[Todo] Get User Todos Success',
    GET_USER_TODOS_FAILURE = '[Todo] Get User Todos Failure',

    GET_ALL_TODOS = '[Todo] Get All Todos',
    GET_ALL_TODOS_SUCCESS = '[Todo] Get All Todos Success',
    GET_ALL_TODOS_FAILURE = '[Todo] Get All Todos Failure',

    CREATE_USER_TODO = '[Todo] Create User Todo',
    CREATE_USER_TODO_SUCCESS = '[Todo] Create User Todo Success',
    CREATE_USER_TODO_FAILURE = '[Todo] Create User Todo Failure',

    DELETE_USER_TODO = '[Todo] Delete User Todo',
    DELETE_USER_TODO_SUCCESS = '[Todo] Delete User Todo Success',
    DELETE_USER_TODO_FAILURE = '[Todo] Delete User Todo Failure',

    EDIT_USER_TODO = '[Todo] Edit User Todo',
    EDIT_USER_TODO_SUCCESS = '[Todo] Edit User Todo Success',
    EDIT_USER_TODO_FAILURE = '[Todo] Edit User Todo Failure',
  }


export const getUserTodoList = createAction(
  ToDoActionTypes.GET_USER_TODOS,
);

export const getUserTodoListSuccess = createAction(
  ToDoActionTypes.GET_USER_TODOS_SUCCESS,
  props<{data: Todo}>()
);

export const getUserTodoListFailure = createAction(
  ToDoActionTypes.GET_USER_TODOS_FAILURE,
  props<{error: string}>()
);

export const getAllTodoList = createAction(
  ToDoActionTypes.GET_ALL_TODOS
);

export const getAllTodoListSuccess = createAction(
  ToDoActionTypes.GET_ALL_TODOS_SUCCESS,
  props<{data: Todo[]}>()
);

export const getAllTodoListFailure = createAction(
  ToDoActionTypes.GET_ALL_TODOS_FAILURE,
  props<{error: string}>()
);

export const createUserTodoItem = createAction(
  ToDoActionTypes.CREATE_USER_TODO,
  props<{data: CreateTodo}>()
);

export const createUserTodoItemSuccess = createAction(
  ToDoActionTypes.CREATE_USER_TODO_SUCCESS,
  props<{data: Todo}>()
);

export const createUserTodoItemFailure = createAction(
  ToDoActionTypes.CREATE_USER_TODO_FAILURE,
  props<{error: string}>()
);

export const editUserTodoItem = createAction(
  ToDoActionTypes.EDIT_USER_TODO,
  props<{data: Todo}>()
);

export const editUserTodoItemSuccess = createAction(
  ToDoActionTypes.EDIT_USER_TODO_SUCCESS,
  props<{data: Todo}>()
);

export const editUserTodoItemFailure = createAction(
  ToDoActionTypes.EDIT_USER_TODO_FAILURE,
  props<{error: string}>()
);

export const deleteUserTodoItem = createAction(
  ToDoActionTypes.DELETE_USER_TODO,
  props<{id: string}>()
);

export const deleteUserTodoItemSuccess = createAction(
  ToDoActionTypes.DELETE_USER_TODO_SUCCESS,
  props<{id: string}>()
);

export const deleteUserTodoItemFailure = createAction(
  ToDoActionTypes.DELETE_USER_TODO_FAILURE,
  props<{error: string}>()
);
