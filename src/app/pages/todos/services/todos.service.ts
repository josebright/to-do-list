import { CookieService } from 'ngx-cookie-service';
import { CreateTodo } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  rootURL = 'http://localhost:3000/api/to-do';


  getUserTodoList(): Observable<Todo> {
    const url = this.rootURL;
    // const token = this.cookie.get('token');
    // const headers = new HttpHeaders({"Set-Cookie": "token=" + token});
    // const options = {headers};
    return this.http.get<Todo>(url, 
      // options
      )
    .pipe(
      map(todos => todos),
    )
  }

  getAllTodoList(): Observable<Todo[]> {
    const url = `${this.rootURL}/lists`;
    return this.http.get<Todo[]>(url)
    .pipe(
      map(todos => todos),
    );
  }

  createUserTodoItem(todo: CreateTodo): Observable<Todo> {
    const url = this.rootURL;
    return this.http.post(url, {todo})
    .pipe(
      map((data: any) => data.todo),
    );
  }

  editUserTodoItem(todo: Partial<Todo>): Observable<Todo> {
    const url = `${this.rootURL}/${todo.id}`;
    return this.http.patch(url, {todo})
    .pipe(
      map((data: any) => data.todo),
    );
  }

  deleteUserTodoItem(id: string): Observable<any> {
    const url = `${this.rootURL}/${id}`;
    return this.http.delete(url)
    .pipe(
      tap((anything)=> console.log(anything)),
    );
  }
}