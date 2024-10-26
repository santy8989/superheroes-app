import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogModule  } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatIconModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent{
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}
}
