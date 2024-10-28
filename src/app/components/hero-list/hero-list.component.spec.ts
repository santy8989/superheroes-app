import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent, DialogFactory } from './hero-list.component';
import { SuperheroService } from '../../services/superhero.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let superheroServiceSpy: jasmine.SpyObj<SuperheroService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const dialogFactoryMock: DialogFactory = (component, data) => {
    if (component === HeroFormComponent && !data) {
      return {
        afterClosed: () => of({ id: 3, name: 'Wonder Woman', identity: 'Diana Prince', power: 'Strength' })
      };
    } else if (component === HeroFormComponent && data) {
      return {
        afterClosed: () => of({ name: 'Wonder Woman', identity: 'Diana Prince', power: 'Strength' })
      };
    } else if (component === ConfirmDialogComponent) {
      return {
        afterClosed: () => of(true)
      };
    }
    return { afterClosed: () => of(null) };
  };

  beforeEach(async () => {
    superheroServiceSpy = jasmine.createSpyObj('SuperheroService', ['addHero', 'updateHero', 'deleteHero'], {
      heroes$: of([{ id: 1, name: 'Superman', identity: 'Clark Kent', power: 'Flight' }])
    });
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HeroListComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: SuperheroService, useValue: superheroServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: 'dialogFactory', useValue: dialogFactoryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call addHero with correct data', () => {
    component.addHero();
    expect(superheroServiceSpy.addHero).toHaveBeenCalledWith({
      id: 3,
      name: 'Wonder Woman',
      identity: 'Diana Prince',
      power: 'Strength'
    });
  });

  it('should call updateHero on editHero', () => {
    const hero = { id: 1, name: 'Superman', identity: 'Clark Kent', power: 'Flight' };
    component.editHero(hero);
    expect(superheroServiceSpy.updateHero).toHaveBeenCalledWith({
      id: 1,
      name: 'Wonder Woman',
      identity: 'Diana Prince',
      power: 'Strength'
    });
  });

  it('should call deleteHero on deleteHero', () => {
    const hero = { id: 1, name: 'Superman', identity: 'Clark Kent', power: 'Flight' };
    component.deleteHero(hero);
    expect(superheroServiceSpy.deleteHero).toHaveBeenCalledWith(1);
  });

  it('should navigate to the correct route on viewHero', () => {
    const heroId = 5;
    component.viewHero(heroId);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/hero', heroId]);
  });

  it('should filter heroes based on search term', () => {
    component.heroes = [
      { id: 1, name: 'Superman', identity: 'Clark Kent', power: 'Flight' },
      { id: 2, name: 'Batman', identity: 'Bruce Wayne', power: 'Martial Arts' }
    ];
    component.onSearch('bat');
    expect(component.filteredHeroes).toEqual([
      { id: 2, name: 'Batman', identity: 'Bruce Wayne', power: 'Martial Arts' }
    ]);
  });

  it('should initialize with loading and heroes data', () => {
    fixture.detectChanges();
    expect(component.isLoading).toBeFalse();
    expect(component.heroes).toEqual([
      { id: 1, name: 'Superman', identity: 'Clark Kent', power: 'Flight' }
    ]);
    expect(component.filteredHeroes).toEqual(component.heroes);
  });
});
