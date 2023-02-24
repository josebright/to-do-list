import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input() todos: Todo[] | null = null;
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>();

  todosTrackByFn(index: number, item: Todo): string {
    return item.id;
  }
}
