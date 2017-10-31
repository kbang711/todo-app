import { Injectable } from '@angular/core';

import { Todo } from './todo';

@Injectable()
export class TodoDataService {
  //To increment IDs
  lastId: number = 0;
  //Placeholder for Todo List
  todos: Todo[] = [];

  constructor() { }

  //Adding to Todo
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  //Deleting from List
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  //Updating List
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  //Get all Todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  //Get Todo by ID
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id).pop();
  }

  //Toggle if complete or not
  toggleTodoComplete(todo: Todo) {
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }
}
