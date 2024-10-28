import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, NoopAnimationsModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchTerm on input change', () => {
    spyOn(component.searchTerm, 'emit');
    
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const testValue = 'Spider-Man';
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchTerm.emit).toHaveBeenCalledWith(testValue);
  });

  it('should display the correct placeholder text', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.placeholder).toBe('Escribe el nombre o la identidad del héroe');
  });
});
