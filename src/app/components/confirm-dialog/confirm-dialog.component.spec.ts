import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(async () => {
    const data = { name: 'Test Hero' }; 
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the hero name in the confirmation message', () => {
    const messageElement = fixture.debugElement.query(By.css('mat-dialog-content p')).nativeElement;
    console.log("message", messageElement)
    expect(messageElement.textContent).toContain('Test Hero');
  });

  it('should close the dialog with "true" when clicking "Eliminar"', () => {
    const deleteButton = fixture.debugElement.query(By.css('button[color="warn"]'));
    deleteButton.nativeElement.click(); 
    fixture.detectChanges();  

    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog with "null" when clicking "Cancelar"', () => {
    const cancelButton = fixture.debugElement.query(By.css('button[color="primary"]'));
    cancelButton.nativeElement.click(); 
    fixture.detectChanges();  

    expect(dialogRefSpy.close).toHaveBeenCalledWith('');
  });
});
