import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UppercaseDirective } from './uppercase.directive';

@Component({
  selector: 'app-test',
  template: `<input type="text" appUppercase [(ngModel)]="value" />`,
  standalone: true,
  imports: [FormsModule, UppercaseDirective]
})
class TestComponent {
  value = '';
}

describe('UppercaseDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement; 
    fixture.detectChanges();
  });

  it('should convert input text to uppercase', () => {
    inputEl.value = 'lowercase text';
    const event = new Event('input');
    inputEl.dispatchEvent(event);
    fixture.detectChanges();

    expect(inputEl.value).toBe('LOWERCASE TEXT');
  });

  it('should maintain cursor position after transformation', () => {
    inputEl.value = 'test';
    inputEl.setSelectionRange(1, 1);

    const initialStart = inputEl.selectionStart;
    const initialEnd = inputEl.selectionEnd;

    const event = new Event('input');
    inputEl.dispatchEvent(event);
    fixture.detectChanges();

    expect(inputEl.value).toBe('TEST');
    expect(inputEl.selectionStart).toBe(initialStart);
    expect(inputEl.selectionEnd).toBe(initialEnd);
  });

  it('should update the form control value to uppercase', () => {
    inputEl.value = 'form value';
    const event = new Event('input');
    inputEl.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.value).toBe('FORM VALUE');
  });
});
