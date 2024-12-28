import { ApplicationConfig, effect, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { metaReducers, reducers } from './store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import { INEOStateEffects } from './store/ineo_state/ineo-state.effects';
import { MessageService } from 'primeng/api';
import { delayInterceptor } from './interceptor/delay.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(  withInterceptors([delayInterceptor]),),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
              name: 'primeng',
              order: 'app-styles, primeng, another-css-library'
          },
          darkModeSelector: 'null',

      }
    }
    }),
    provideStore(reducers, {metaReducers}),
    provideEffects([
      INEOStateEffects
    ]),
    provideStoreDevtools({
      maxAge:25
    }),
    MessageService,
  ]
};
