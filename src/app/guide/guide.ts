import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-guide',
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './guide.html',
  styleUrl: './guide.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Guide {
  items = input<string[]>();
  close = output<void>();

  handleClose() {
    this.close.emit();
  }
}
