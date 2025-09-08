import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-add-task',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule
  ],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTask {
  // Define outputs using signal-based outputs
  addTask = output<{title: string; description?: string; date_deadline?: Date}>();
  cancel = output<void>();
  
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date_deadline: ['']
    });
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      this.addTask.emit({
        title: this.form.value.title,
        description: this.form.value.description || undefined,
        date_deadline: this.form.value.date_deadline || undefined
      });
      this.form.reset();
    }
  }
  
  onCancel(): void {
    this.form.reset();
    this.cancel.emit();
  }
}
