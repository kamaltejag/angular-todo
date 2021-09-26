import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private apiUrl = 'https://packetcode-json-server.herokuapp.com/todos';

  constructor(private http: HttpClient) {}

  getTodo(id: number): Observable<Todo>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Todo>(url);
  }

  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.apiUrl);
  }

  createTodo(todo: any): Observable<Todo>{
    return this.http.post<Todo>(this.apiUrl, todo, httpOptions);
  }

  updateTodo(todo: any): Observable<Todo>{
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.patch<Todo>(url, todo, httpOptions);
  }

  deleteTodo(id: any): Observable<Todo>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Todo>(url);
  }
}
