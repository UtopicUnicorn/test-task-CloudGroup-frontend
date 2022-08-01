import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryInterface } from '../interfaces/category.interface';
import { TodoInterface } from '../interfaces/todo.interface';
import { backendURL } from '../requestUrl';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(backendURL + 'category');
  }

  getTodos(): Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(backendURL + 'todo');
  }

  createCategory(category: CategoryInterface): Observable<CategoryInterface> {
    console.log('created category');
    return this.http.post<CategoryInterface>(backendURL + 'category', category);
  }

  createTodo(todo: TodoInterface): Observable<TodoInterface> {
    console.log('created todo');
    return this.http.post<TodoInterface>(backendURL + 'todo', todo);
  }

  updateTodoStatus(todo: TodoInterface): Observable<TodoInterface> {
    return this.http.patch<TodoInterface>(backendURL + 'todo', todo);
  }
}
