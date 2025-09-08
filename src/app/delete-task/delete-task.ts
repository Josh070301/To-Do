import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-task',
  imports: [
    CommonModule
  ],
  templateUrl: './delete-task.html',
  styleUrl: './delete-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteTask {
  confirm = output<void>();
  cancel = output<void>();
}
