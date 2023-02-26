import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateTodo, Todo } from '../store/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient,
  ) { }

  rootURL = 'http://localhost:3000/api/to-do';


  getUserTodoList(): Observable<Todo> {
    const url = this.rootURL;
    return this.http.get<Todo>(url, 
      { withCredentials: true }
      )
    .pipe(
      map(todos => todos),
    )
  }

  getAllTodoList(): Observable<Todo[]> {
    const url = `${this.rootURL}/lists`;
    return this.http.get<Todo[]>(url,
      { withCredentials: true })
    .pipe(
      map(todos => todos),
    );
  }

  createUserTodoItem(todo: CreateTodo): Observable<Todo> {
    const url = this.rootURL;
    return this.http.post(url, { withCredentials: true, todo })
    .pipe(
      map((data: any) => data.todo),
    );
  }

  editUserTodoItem(todo: Partial<Todo>): Observable<Todo> {
    const url = `${this.rootURL}/${todo.id}`;
    return this.http.patch(url, { withCredentials: true, todo })
    .pipe(
      map((data: any) => data.todo),
    );
  }

  deleteUserTodoItem(id: string): Observable<any> {
    const url = `${this.rootURL}/${id}`;
    return this.http.delete(url, { withCredentials: true })
  }
}