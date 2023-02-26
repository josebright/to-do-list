import {  createReducer, on } from '@ngrx/store';
import * as todoActions from '../actions/todo.actions';
import { ToDoStateInterface } from '../app.states';


const initialState: ToDoStateInterface = {
  todos: [],
  error: null,
  selectTodo: null
};

export const todoReducer = createReducer(
  initialState,

  // Get User Todos
  on(todoActions.getUserTodoListSuccess, (state, {data}) => ({...state, todo: data })),
  on(todoActions.getUserTodoListFailure, (state, {error}) => ({...state, error})),

  // Get All User Todos
  on(todoActions.getAllTodoListSuccess, (state, {data}) => ({...state, todos: data })),
  on(todoActions.getAllTodoListFailure, (state, {error}) => ({...state, error})),

  // Create User Todo
  on(todoActions.createUserTodoItemSuccess, (state, {data}) => ({...state, todos: [...state.todos, data]})),
  on(todoActions.createUserTodoItemFailure, (state, {error}) => ({...state, error})),


  // Delete User Todo
  on(todoActions.deleteUserTodoItemSuccess, (state, {id}) => {
    const filteredTodos = state.todos.filter((todo)=> todo.id != id)
    return {...state, todos: filteredTodos }
  }),
  on(todoActions.deleteUserTodoItemFailure, (state, {error}) => ({...state, error })),


   // Edit User Todo
   on(todoActions.editUserTodoItemSuccess, (state, {data}) => {
    const todoId = data.id;
    const getTodoIndexById = state.todos.findIndex((todo)=> todo.id === todoId);
    const todos = state.todos;
    if (getTodoIndexById > -1) {
      todos[getTodoIndexById] = data;
    }
    return {...state, todos}
  }),
   on(todoActions.editUserTodoItemFailure, (state, {error}) => ({...state, error})),
);