import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';

import { TodoService } from '../../services';
import * as todoActions from '../actions';

@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}

  findUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.findUserList),
      exhaustMap(action =>
        this.todoService.findUserList().pipe(
          map(response => {
            console.log("response:::", response)
            return todoActions.findUserListSuccess({response})
          }),
          catchError((error: any) => of(todoActions.findUserListFailure(error))))
      )
    )
  );

  createList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.createList),
      exhaustMap(action =>
        this.todoService.addTask(action.task).pipe(
          map(response => todoActions.createListSuccess(response)),
          catchError((error: any) => of(todoActions.createListFailure(error))))
      )
    )
  );


  deleteList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.deleteList),
      exhaustMap(action => this.todoService.deleteList(action.taskid).pipe(
          map(response => todoActions.deleteListSuccess(response)),
          catchError((error: any) => of(todoActions.deleteListFailure(error))))
      )
    )
  );

  updateList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.updateList),
      exhaustMap(action =>
        this.todoService.updateList(action.task).pipe(
          map(response => todoActions.updateListSuccess(response)),
          catchError((error: any) => of(todoActions.updateListFailure(error))))
      )
    )
  );

}