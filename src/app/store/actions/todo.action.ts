import { Action } from '@ngrx/store';
import { ListItem } from 'src/app/todo/todo.component';


export enum ToDoActionType {
  ADD_ITEM = '',
}

export class AddItemAction implements Action {
  readonly type = ToDoActionType.ADD_ITEM;
  //add an optional payload
  constructor(public payload: ListItem) {}
}

export type ToDoAction = AddItemAction;