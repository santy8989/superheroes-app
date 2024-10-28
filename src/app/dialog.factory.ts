import { MatDialog } from '@angular/material/dialog';

export const dialogFactory = (dialog: MatDialog) => (component: any, data: any) => 
  dialog.open(component, { width: '400px', data });
