import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// NOTE PrimeNG
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- Add this import
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeuix/themes/lara';
import { MessageService } from 'primeng/api'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
        theme: {
            preset: Lara,
            options: {
                darkModeSelector: '',
                ripple: true
            }
        }
    }),
    provideAnimations(),
    MessageService // NOTE For Toast
  ]
};
