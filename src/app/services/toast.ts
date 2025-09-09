import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messageService = inject(MessageService);

  // NOTE shows toast
  showToast(message: string, severity: 'success' | 'info' | 'warn' | 'error' = 'success', summary = 'Success', life = 3000) {
    this.messageService.add({
      severity,
      summary,
      detail: message,
      life
    });
  }
}
