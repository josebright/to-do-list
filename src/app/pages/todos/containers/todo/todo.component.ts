import { todosSelector } from '../../store/selectors';
import { CreateTodo } from './../../models/todo.model';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../../models';
import * as todoActions from '../../store/actions';
import { AppStateInterface } from 'src/app/store/app.states';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  // hasTodos$ = this.store.select(fromTodos.selectHasTodos);
  // hasCompletedTodos$ = this.store.select(fromTodos.selectHasCompletedTodos);
  // undoneTodosCount$ = this.store.select(fromTodos.selectUndoneTodosCount);
  // currentFilter$ = this.store.select(fromTodos.selectFilter);
  // filteredTodos$ = this.store.select(fromTodos.selectFilteredTodos);
  // loading$ = this.store.select(fromTodos.selectLoading);

  todos$ = this.store.select(todosSelector)
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(todoActions.getUserTodoList());
  }

  onAddTodo(text: string): void {
    const data: CreateTodo = {
      item: text,
    }
    this.store.dispatch(todoActions.createUserTodoItem({data}));
  }

  onEditTodo(todo: Todo): void {
    this.store.dispatch(todoActions.editUserTodoItem({ data: todo }));
  }

  // onUpdate(event: { id: number; text: string }): void {
  //   this.store.dispatch(fromTodos.updateAction(event));
  // }

  onDeleteTodo(id: string): void {
    this.store.dispatch(todoActions.deleteUserTodoItem({ id }));
  }

  // onFilter(filter: TodoFilter): void {
  //   this.store.dispatch(fromTodos.setFilterAction({ filter }));
  // }

  // onClearCompleted(): void {
  //   this.store.dispatch(fromTodos.clearCompletedAction());
  // }
}
