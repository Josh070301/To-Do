import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';


@Component({
  selector: 'app-update-task',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule
  ],
  templateUrl: './update-task.html',
  styleUrl: './update-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateTask {
  id = input<string>('');
  title = input<string>('');
  description = input<string>('');
  date_deadline = input<Date | null | undefined>(undefined); 

  updateTask = output<{ id: string; title: string; description?: string, date_deadline?: Date }>();
  cancel = output<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date_deadline: ['']
    });
  }

  ngOnInit(): void {

    this.form.patchValue({
      title: this.title(),
      description: this.description(),
      date_deadline: this.date_deadline()
    });
    console.log('Date Deadline Passed to component: ', this.date_deadline());
  }

  ngOnChanges(): void {
    this.form.patchValue({
      title: this.title(),
      description: this.description(),
      date_deadline: this.date_deadline(),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.updateTask.emit({
        id: this.id(),
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
