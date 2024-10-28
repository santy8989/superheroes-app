import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<HeroFormComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    
    await TestBed.configureTestingModule({
      imports: [HeroFormComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { name: 'Superman', identity: 'Clark Kent', power: 'Flight', image: '' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data when provided', () => {
    expect(component.heroForm.value).toEqual({
      name: 'Superman',
      identity: 'Clark Kent',
      power: 'Flight',
      image: ''
    });
  });

  it('should display validation error for required fields', () => {
    const nameInput = component.heroForm.get('name');
    nameInput?.setValue('');
    nameInput?.markAsTouched();
    fixture.detectChanges();

    const errorMsg: DebugElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorMsg.nativeElement.textContent).toContain('El nombre es requerido');
  });

  it('should show invalid URL error for image field when URL is incorrect', () => {
    const imageControl = component.heroForm.get('image');
    imageControl?.setValue('invalid-url');
    imageControl?.markAsTouched();
    fixture.detectChanges();

    const errorMsg: DebugElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorMsg.nativeElement.textContent).toContain('Por favor, ingrese una URL válida');
  });

  it('should close dialog with form data when form is valid and saved', () => {
    component.heroForm.setValue({
      name: 'Batman',
      identity: 'Bruce Wayne',
      power: 'Stealth',
      image: 'http://batman.com/image.jpg'
    });
    component.onSave();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      name: 'Batman',
      identity: 'Bruce Wayne',
      power: 'Stealth',
      image: 'http://batman.com/image.jpg'
    });
  });

  it('should not close dialog when form is invalid and saved', () => {
    component.heroForm.get('name')?.setValue(''); 
    component.onSave();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
