import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryInterface } from '../interfaces/category.interface';
import { TodoInterface } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(
      'https://test-task-cloud.herokuapp.com/category'
    );
  }

  getTodos(): Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(
      'https://test-task-cloud.herokuapp.com//todo'
    );
  }

  createCategory(category: CategoryInterface): Observable<CategoryInterface> {
    return this.http.post<CategoryInterface>(
      'https://test-task-cloud.herokuapp.com/category',
      category
    );
  }

  createTodo(todo: TodoInterface): Observable<TodoInterface> {
    console.log('here');
    console.log(todo);
    return this.http.post<TodoInterface>(
      'https://test-task-cloud.herokuapp.com/todo',
      todo
    );
  }

  updateTodoStatus(todo: TodoInterface): Observable<TodoInterface> {
    return this.http.patch<TodoInterface>(
      'https://test-task-cloud.herokuapp.com/todo',
      todo
    );
  }
}
