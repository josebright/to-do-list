import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:3000/api/to-do';

  // rootURL = '/api';

  findUserList() {
    return this.http.get(this.rootURL + '/tasks');
  }

  addTask(task: any) {
    return this.http.post(this.rootURL + '/task', {task});
  }

  updateList(task: any) {
    return this.http.put(this.rootURL + '/task', {task});
  }

  deleteList(taskId: any) {
    console.log('deleting task:::', taskId);
    return this.http.delete(`${this.rootURL}/task/${taskId}`);
  }
}