import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from './../../models';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
})
export class TodoListItemComponent {
  @Input() todo: Todo | null = null;
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>();

  // 'local state is fine'
  editing = false;

  updateText(todo: Todo, text: string): void {
    if (text && text.trim() !== this.todo?.item) {
      const newTodo = {...todo, item: text}
      this.edit.emit(newTodo);
    }
    this.editing = false;
  }

  activeEditMode(): void {
    this.editing = true;
  }
}
