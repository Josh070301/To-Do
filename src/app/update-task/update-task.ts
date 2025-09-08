import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-task.html',
  styleUrl: './update-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateTask {
  id = input<string>('');
  title = input<string>('');
  description = input<string>('');

  updateTask = output<{ id: string; title: string; description?: string }>();
  cancel = output<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      title: this.title(),
      description: this.description()
    });
  }

  ngOnChanges(): void {
    this.form.patchValue({
      title: this.title(),
      description: this.description()
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.updateTask.emit({
        id: this.id(),
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
