import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTask {
  // Define outputs using signal-based outputs
  addTask = output<{title: string; description?: string}>();
  cancel = output<void>();
  
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      this.addTask.emit({
        title: this.form.value.title,
        description: this.form.value.description || undefined
      });
      this.form.reset();
    }
  }
  
  onCancel(): void {
    this.form.reset();
    this.cancel.emit();
  }
}
