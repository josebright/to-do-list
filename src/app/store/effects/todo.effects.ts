import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todos.service';
import * as todoActions from '../actions/todo.actions';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}

  getUserTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.getUserTodoList),
      exhaustMap(() =>
        this.todoService.getUserTodoList().pipe(
          map(data => 
            todoActions.getUserTodoListSuccess({data})),
          catchError(error => 
            of(todoActions.getUserTodoListFailure(error.error.message))))
      )
    )
  );

  getAllTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.getAllTodoList),
      exhaustMap(() =>
        this.todoService.getAllTodoList().pipe(
          map(data => 
            todoActions.getAllTodoListSuccess({data})
          ),
          catchError(error => 
            of(todoActions.getAllTodoListFailure(error.error.message))))
      )
    )
  );

  createUserTodoItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.createUserTodoItem),
      exhaustMap((action) => 
        this.todoService.createUserTodoItem(action.data)
        .pipe(
          map(data => 
            todoActions.createUserTodoItemSuccess({data})),
          catchError(error => 
            of(todoActions.createUserTodoItemFailure(error))))
      )   
    )
  );

  editUserTodoItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.editUserTodoItem),
      exhaustMap(action =>
        this.todoService.editUserTodoItem(action.data).pipe(
          map(data => {
            return todoActions.editUserTodoItemSuccess({data})
          }),
          catchError((error) => of(todoActions.editUserTodoItemFailure({error}))))
      )
    )
  );

  deleteUserTodoItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.deleteUserTodoItem),
      exhaustMap(action => this.todoService.deleteUserTodoItem(action.id).pipe(
          map((_) => todoActions.deleteUserTodoItemSuccess({id:action.id})),
          catchError((error) => of(todoActions.deleteUserTodoItemFailure({error}))))
      )
    )
  );
}