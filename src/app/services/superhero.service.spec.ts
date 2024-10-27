import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SuperheroService } from './superhero.service';
import { LoadingService } from './loading.service';
import { Superhero } from '../interfaces/superhero.interface';

describe('SuperheroService', () => {
  let service: SuperheroService;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(fakeAsync(() => {
    const spy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);
    TestBed.configureTestingModule({
      providers: [
        SuperheroService,
        { provide: LoadingService, useValue: spy }
      ]
    });
    service = TestBed.inject(SuperheroService);
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    localStorage.clear();
    service['loadHeroesFromLocalStorage']();
    loadingServiceSpy.show.calls.reset();
    loadingServiceSpy.hide.calls.reset();

  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all heroes and manage loading state', fakeAsync(() => {
    let heroes: Superhero[] = [];
    service.getAllHeroes().subscribe(result => {
      heroes = result;
    });
    tick(500);
    expect(heroes.length).toBeGreaterThan(0);
    expect(loadingServiceSpy.show).toHaveBeenCalled();
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  }));

  it('should add a new hero and manage loading state', fakeAsync(() => {
    const newHero: Superhero = { id: 4, name: 'BATMAN', identity: 'Bruce Wayne', power: 'Wealth', image: '' };
    service.addHero(newHero);
    tick(500); 
    let heroes: Superhero[] = [];
    service.heroes$.subscribe(result => {
      heroes = result;
    });
    expect(heroes.some(hero => hero.name === 'BATMAN')).toBeTrue();
    expect(loadingServiceSpy.show).toHaveBeenCalled();
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  }));

  it('should update an existing hero and manage loading state', fakeAsync(() => {
    const updatedHero: Superhero = { id: 1, name: 'SPIDERMAN', identity: 'Peter Parker', power: 'Webs', image: '' };
    service.updateHero(updatedHero);
    tick(500);
    let heroes: Superhero[] = [];
    service.heroes$.subscribe(result => {
      heroes = result;
    });
    const hero = heroes.find(hero => hero.id === 1);
    expect(hero?.power).toBe('Webs');
    expect(loadingServiceSpy.show).toHaveBeenCalled();
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  }));

  it('should delete an existing hero and manage loading state', fakeAsync(() => {
    const heroId = 3;
    loadingServiceSpy.show.calls.reset();
    loadingServiceSpy.hide.calls.reset();
    service.deleteHero(heroId);
    tick(500);
    let heroes: Superhero[] = [];
    service.heroes$.subscribe(result => {
      heroes = result;
    });
    expect(heroes.find(hero => hero.id === heroId)).toBeUndefined();
    expect(loadingServiceSpy.show).toHaveBeenCalled();
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  }));

  it('should get a hero by ID and manage loading state', fakeAsync(() => {
    let hero: Superhero | undefined;
    service.getHeroById(1).subscribe(result => {
      hero = result;
    });
    tick(500); 
    expect(hero?.id).toBe(1);
    expect(hero?.name).toBe('SPIDERMAN');
    expect(loadingServiceSpy.show).toHaveBeenCalled();
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  }));
});
