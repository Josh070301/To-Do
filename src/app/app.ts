import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// NOTE PrimeNG Components
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
// NOTE Toasts PrimeNG
import { ToastModule } from 'primeng/toast';

// NOTE PrimeIcons
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

// NOTE ToDo Service and models import
import { TodoService } from './services/todo';
import { Todo } from "./models/todo.model";
import { ToastService } from './services/toast';

// NOTE StandAlone Components imports
import { AddTask } from './add-task/add-task';
import { DeleteTask } from './delete-task/delete-task';
import { UpdateTask } from './update-task/update-task';
import { Guide } from './guide/guide';
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddTask,
    DeleteTask,
    UpdateTask,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PanelModule,
    ListboxModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    Guide
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {

  protected readonly title = signal('To-Do');
  protected service = inject(TodoService);
  protected toastService = inject(ToastService);
  todos = this.service.getTodos('');
  todosPending = this.service.getTodosPending('');
  todosCompleted = this.service.getTodosCompleted('');
  currentDate = new Date()
  
  // SECTION 
  
  // NOTE Reactive states with getter property to allow re-usability without calling it like a function
  get totalTasksCount() {
    return this.todos.length;
  }

  get completedTasksCount() {
    let result =  this.todos.filter(todo => todo.completed).length;
    this.todosCompleted = this.service.getTodosCompleted(this.searchTitle);
    return result;
  }

  get pendingTasksCount() {
    let result =  this.todos.filter(todo => !todo.completed).length;
    this.todosPending = this.service.getTodosPending(this.searchTitle);
    return result;
  }

  // NOTE past deadline checker
  isPastDeadline(date_deadline?: unknown): boolean {
    if (!date_deadline) {
      return false;
    }
    const deadlineDate = typeof date_deadline === 'string'
      ? new Date(date_deadline)
      : date_deadline instanceof Date
        ? date_deadline
        : undefined;
    if (!deadlineDate) return false;
    return deadlineDate < this.currentDate;
  }

  // !SECTION



  // SECTION - Search Filter
  searchTitle: string = "";
  filterTodos() {
    this.todos = this.service.getTodos(this.searchTitle);
    this.todosPending = this.service.getTodosPending(this.searchTitle);
    this.todosCompleted = this.service.getTodosCompleted(this.searchTitle);
    console.log("Searched Pending: ", this.todosPending);
    console.log("Searched Completed: ", this.todosCompleted);
  }

  // NOTE Clears filter
  clearFilter() {
    this.searchTitle = '';
    this.filterTodos();
  }
  // !SECTION



  // SECTION - Add Task Dialog
  // NOTE Readonly means it is initialized once then cannot be changed
  protected readonly addTaskDialog = signal(false);
  openAddTaskDialog() {
    this.addTaskDialog.set(true);
  }

  closeAddTaskDialog() {
    this.addTaskDialog.set(false);
  }


  handleAddTask({ title, description, date_deadline }: { title: string; description?: string; date_deadline?: Date }) {
    this.service.addTodo(title, description, date_deadline);
    this.closeAddTaskDialog();
    this.toastService.showToast('Task added successfully.', 'success', 'Success');
  }

  // !SECTION



  // SECTION
  protected readonly updateTaskDialog = signal(false);
  protected todoToUpdate: Todo | null = null;

  openUpdateTaskDialog(todo: Todo) {
    // Ensure date_deadline is a Date object if present
    const date_deadline = todo.date_deadline
      ? new Date(todo.date_deadline)
      : undefined;

    this.todoToUpdate = {
      ...todo,
      date_deadline
    };
    this.updateTaskDialog.set(true);
  }

  closeUpdateTaskDialog() {
    this.todoToUpdate = null;
    this.updateTaskDialog.set(false);
  }

  handleUpdateTask({ id, title, description, date_deadline }: { id: string; title: string; description?: string; date_deadline?: Date }) {
    this.service.updateTodo(id, title, description, date_deadline);
    this.todos = this.service.getTodos(this.searchTitle);
    this.closeUpdateTaskDialog();
    this.toastService.showToast('Task updated successfully.', 'success', 'Success');
  }
  // !SECTION



  // SECTION - Toggle completed status using inject service
  toggleTodo({id}: {id: string}) {
    this.service.toggleCompleted(id);
    this.todos = this.service.getTodos(this.searchTitle);
    this.toastService.showToast('Task status updated.', 'success', 'Success');
  }


  // !SECTION



  // SECTION - Confirm DeletionTask Dialog
  protected readonly confirmDeletionDialog = signal(false);
  protected todoIdToDelete: string | null = null;

  openConfirmDeletionDialog(todoId: string) {
    this.todoIdToDelete = todoId;
    this.confirmDeletionDialog.set(true);
  }

  closeConfirmDeletionDialog() {
    this.todoIdToDelete = null;
    this.confirmDeletionDialog.set(false);
  }

  handleConfirmDeletion() {
    if (this.todoIdToDelete) {
      this.service.deleteTodo(this.todoIdToDelete);
      this.todos = this.service.getTodos(this.searchTitle);
      this.closeConfirmDeletionDialog();
      this.toastService.showToast('Task deleted successfully.', 'success', 'Success');
    }
  }
  // !SECTION


  
  // SECTION - Guide Dialog
  protected readonly guideDialog = signal(false);
  protected guideItems: string[] = [];
  openGuide(items: string[]) {
    this.guideItems = items;
    this.guideDialog.set(true);
  }
   
  closeGuide() {
    this.guideItems = [];
    this.guideDialog.set(false);
  }

  // !SECTION
}
