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


  // if user is loggedin, then get todo lists
  getUserTodoList(): Observable<Todo> {
    const url = this.rootURL;
    return this.http.get<Todo>(url, 
      { withCredentials: true } // pass user's credentials along with request
      )
    .pipe(
      map(todos => todos),
    )
  }

  //  admin user can get all todo lists
  getAllTodoList(): Observable<Todo[]> {
    const url = `${this.rootURL}/lists`;
    return this.http.get<Todo[]>(url,
      { withCredentials: true }) // pass user's credentials along with request
    .pipe(
      map(todos => todos),
    );
  }

  //  user can create todo item service
  createUserTodoItem(todo: CreateTodo): Observable<Todo> {
    const url = this.rootURL;
    return this.http.post(url, { withCredentials: true, todo }) // pass user's credentials along with request
    .pipe(
      map((data: any) => data.todo),
    );
  }

  // user can edit todo item
  editUserTodoItem(todo: Partial<Todo>): Observable<Todo> {
    const url = `${this.rootURL}/${todo.id}`;
    return this.http.patch(url, { withCredentials: true, todo }) // pass user's credentials along with request
    .pipe(
      map((data: any) => data.todo),
    );
  }

  // user can delete todo item
  deleteUserTodoItem(id: string): Observable<any> {
    const url = `${this.rootURL}/${id}`;
    return this.http.delete(url, { withCredentials: true }) // pass user's credentials along with request
  }
}