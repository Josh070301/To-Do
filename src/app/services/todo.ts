import { Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private todos: Todo[] = [];
  private readonly STORAGE_KEY = "todos";

  // SECTION Calls the re-usable method inside this class to load todos from local storage when the service is instantiated
  constructor() {
    // this.seedDummyData(); // NOTE Seed initial todos for testing purposes
    // this.deleteAllData(); // NOTE Delete all todo data in local storage for development
    this.loadTodosFromLocalStorage();
  }

  // !SECTION



  // SECTION Seed initial todos for testing purposes
  private seedDummyData(): void {
    const dummyTodos: Todo[] = [
      {
        id: uuidv4(),
        title: 'Buy groceries',
        description: 'Milk, Bread, Eggs',
        completed: false,
        date_created: new Date('2025-09-01T09:30:00')
      },
      {
        id: uuidv4(),
        title: 'Clean the house',
        description: 'Living room and kitchen',
        completed: true,
        date_created: new Date('2025-09-02T14:15:00')
      },
      {
        id: uuidv4(),
        title: 'Buy groceries v2',
        description: 'Milk, Bread, Eggs v2',
        completed: true,
        date_created: new Date('2025-09-03T18:45:00')
      },
      {
        id: uuidv4(),
        title: 'Clean the house v2',
        description: 'Living room and kitchen v2',
        completed: false,
        date_created: new Date()
      },
      {
        id: uuidv4(),
        title: 'Buy groceries',
        description: 'Milk, Bread, Eggs',
        completed: false,
        date_created: new Date('2025-09-01T09:30:00')
      },
      {
        id: uuidv4(),
        title: 'Clean the house',
        description: 'Living room and kitchen',
        completed: false,
        date_created: new Date('2025-09-02T14:15:00')
      },
      {
        id: uuidv4(),
        title: 'Buy groceries v2',
        description: 'Milk, Bread, Eggs v2',
        completed: false,
        date_created: new Date('2025-09-03T18:45:00')
      },
      {
        id: uuidv4(),
        title: 'Clean the house v2',
        description: 'Living room and kitchen v2',
        completed: false,
        date_created: new Date()
      }
    ];

    localStorage.setItem('todos', JSON.stringify(dummyTodos));
  }

  // !SECTION

  
  
  // SECTION Delete All Todo data in local storage for development
  private deleteAllData(): void{
    localStorage.removeItem('todos');
  }

  // !SECTION



  // SECTION (GET) Method to return current Stored Todos
  getTodos() {
    return this.todos;
  }

  // NOTE (GET) with Title filters for searching
  getFilteredTodos(title: string) {
    // console.log("Filtering with: ", title)
    const result = this.todos.filter(todo => todo.title.toLowerCase().includes(title.toLowerCase()));
    // console.log("Result: ", result)
    return result;
  }

  // NOTE (GET) with Completed filters for searching
  getTodosCompleted() {
    return this.todos.filter(todo => todo.completed);
  }

  // NOTE (GET) with Pending filters
  getTodosPending() {
    return this.todos.filter(todo => !todo.completed);
  }

  // !SECTION



  // SECTION (POST) Method to add a new Todo
  addTodo(title: string, description?: string, date_deadline?: Date) {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      description,
      date_deadline,
      completed: false,
      date_created: new Date()
    };

    this.todos.push(newTodo)
    console.log('Adding task:', newTodo);
    // NOTE Saves the new todo to the local storage then loads the todos from local storage
    this.saveToLocalStorage();


    return this.todos;
  }

  // !SECTION



  // SECTION (PUT) Method to update an existing Todo
  updateTodo(id: string, title: string, description?: string, date_deadline?: Date) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    
    // NOTE Conditional check to see if the todo exists, index always starts at 0
    if (todoIndex > -1) {
      this.todos[todoIndex] = { ...this.todos[todoIndex], title, description, date_deadline };
      this.saveToLocalStorage();
    }

    return this.todos;
  }

  // !SECTION



  // SECTION (PUT) Toggle completed status of a Todo
  toggleCompleted(id: string) {

    // NOTE Find the index of the todo by matching the id
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    
    if (todoIndex > -1) {

      // NOTE Toggle the completed status of the todo, if false then turns true (vice versa)
      this.todos[todoIndex].completed = !this.todos[todoIndex].completed;
      this.saveToLocalStorage();
    }

    return this.todos;
  }
  // !SECTION



  // SECTION (DELETE) Method to delete a Todo
  deleteTodo(id: string) {
    // NOTE Filters out the todo that matches the id and creates a new array without that todo
    this.todos = this.todos.filter((todo) => todo.id !== id);
    
    console.log("Deleting ID: ", id)
    // NOTE Saves the updated todos to local storage then loads the todos from local storage
    this.saveToLocalStorage();
    return this.todos;
  }

  // !SECTION



  // SECTION Method to load todos from local storage
  private loadTodosFromLocalStorage(){

    // NOTE Retrieve the todos from local storage that has todos key (STORAGE_KEY)
    const savedTodos = localStorage.getItem(this.STORAGE_KEY);
    
    // NOTE Conditional check to see if there are any saved todos in the local storage
    if (savedTodos) {

      // NOTE Saves to the variable todos by parsing the data to JSON format
      this.todos = JSON.parse(savedTodos);
      console.log(this.todos)
    }
  }

  // !SECTION


  
  // SECTION Re-usable method to save the current todos to local storage
  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
  }

  // !SECTION



  // SECTION Format
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }
  // !SECTION
}
