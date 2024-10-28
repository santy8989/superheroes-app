import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { SuperheroService } from '../../services/superhero.service';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let superheroServiceSpy: jasmine.SpyObj<SuperheroService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const superheroSpy = jasmine.createSpyObj('SuperheroService', ['getHeroById']);
    const loadingSpy = jasmine.createSpyObj('LoadingService', [], { loading$: of(false) });
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent],
      providers: [
        { provide: SuperheroService, useValue: superheroSpy },
        { provide: LoadingService, useValue: loadingSpy },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    superheroServiceSpy = TestBed.inject(SuperheroService) as jasmine.SpyObj<SuperheroService>;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    superheroServiceSpy.getHeroById.and.returnValue(of({
      id: 1,
      name: 'Superman',
      identity: 'Clark Kent',
      power: 'Super strength',
      image: 'assets/superman.jpg'
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero details when a hero is found', () => {
    fixture.detectChanges();  
    const titleElement = fixture.debugElement.query(By.css('mat-card-title'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('Superman (Clark Kent)');
  });

  it('should display "Héroe no encontrado" message when hero is not found', () => {
    superheroServiceSpy.getHeroById.and.returnValue(of(undefined));
    fixture.detectChanges();
    const notFoundElement = fixture.debugElement.query(By.css('.hero-detail-container')).nativeElement;
    expect(notFoundElement.textContent).toContain('Héroe no encontrado');
  });

  it('should navigate back to the hero list when goBack is called', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set default image when image loading fails', () => {
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    component.setDefaultImage({ target: imgElement } as Event);
    fixture.detectChanges();
    expect(imgElement.src).toContain('assets/default-image.jpg');
  });
});
