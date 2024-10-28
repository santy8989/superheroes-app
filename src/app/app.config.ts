import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { dialogFactory } from './dialog.factory';
import { MatDialog } from '@angular/material/dialog';




export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    MatDialog,
    { provide: 'dialogFactory', useFactory: dialogFactory, deps: [MatDialog] }
    
  ]
};
