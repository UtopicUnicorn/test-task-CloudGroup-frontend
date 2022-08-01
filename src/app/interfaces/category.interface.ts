import { TodoInterface } from './todo.interface';

export interface CategoryInterface {
  id?: number;
  title: string;
  todos?: TodoInterface[];
}
