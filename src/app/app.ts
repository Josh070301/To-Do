import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// NOTE ToDo Service and models import
import { TodoService } from './services/todo';
import { Todo } from "./models/todo.model";

// NOTE StandAlone Components imports
import { AddTask } from './add-task/add-task';
import { DeleteTask } from './delete-task/delete-task';
import { UpdateTask } from './update-task/update-task';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddTask,
    DeleteTask,
    UpdateTask
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('To-Do');
  protected service = inject(TodoService);

  todos = this.service.getTodos();

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
    // console.log('Adding task:', { title, description });
    this.service.addTodo(title, description, date_deadline);
    this.closeAddTaskDialog();
  }

  // !SECTION



  // SECTION
  protected readonly updateTaskDialog = signal(false);
  protected todoToUpdate: Todo | null = null;

  openUpdateTaskDialog(todo: Todo) {
    this.todoToUpdate = todo;
    console.log('ToUpdate Data: ', this.todoToUpdate);
    this.updateTaskDialog.set(true);
  }

  closeUpdateTaskDialog() {
    this.todoToUpdate = null;
    this.updateTaskDialog.set(false);
  }

  handleUpdateTask({ id, title, description, date_deadline }: { id: string; title: string; description?: string; date_deadline?: Date }) {
    this.service.updateTodo(id, title, description, date_deadline);
    this.todos = this.service.getTodos();
    this.closeUpdateTaskDialog();
  }
  // !SECTION



  // SECTION - Toggle completed status using inject service
  toggleTodo({id}: {id: string}) {
    this.service.toggleCompleted(id)
    this.todos = this.service.getTodos();
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
      this.todos = this.service.getTodos();
      this.closeConfirmDeletionDialog();
    }
  }
  // !SECTION
    
}
