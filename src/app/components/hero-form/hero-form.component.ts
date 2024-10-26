import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HeroFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Superhero
  ) {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      alias: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      power: [''],
      companyName: ['', Validators.maxLength(15)]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.heroForm.patchValue(this.data);
    }
  }

  onSave(): void {
    if (this.heroForm.valid) {
      this.dialogRef.close(this.heroForm.value);
    }
  }
}
