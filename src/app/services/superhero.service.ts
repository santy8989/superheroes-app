import { Injectable } from '@angular/core';
import { Superhero } from '../interfaces/superhero.interface';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private localStorageKey = 'superheroes';
  private delayTime:number=500;

  private defaultHeroes: Superhero[] = [
    { id: 1, name: 'SPIDERMAN', identity: 'Peter Parker', power: 'Spider abilities', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lo7PcxCCcEE1rbPIwFV37bTQoioBmNGhcg&s' },
    { id: 2, name: 'SUPERMAN', identity: 'Clark Kent', power: 'Super strength', image: 'https://www.cinemascomics.com/wp-content/uploads/2021/06/Superman.jpg' },
    { id: 3, name: 'IRON MAN', identity: 'Tony Stark', power: 'Money', image: 'https://hips.hearstapps.com/hmg-prod/images/iron-man-nuevo-traje-1539168331.jpg?crop=1xw:0.27xh;center,top&resize=1200:*' }
  ];

  private heroesSubject: BehaviorSubject<Superhero[]> = new BehaviorSubject<Superhero[]>([]);
  public heroes$: Observable<Superhero[]> = this.heroesSubject.asObservable();

  constructor(private loadingService: LoadingService) {
    this.loadHeroesFromLocalStorage();
  }

  private loadHeroesFromLocalStorage(): void {
    const savedHeroes = localStorage.getItem(this.localStorageKey);
    let heroes: Superhero[];
    if (savedHeroes) {
      const parsedHeroes = JSON.parse(savedHeroes);
      heroes = parsedHeroes.length > 0 ? parsedHeroes : this.defaultHeroes;
    } else {
      heroes = this.defaultHeroes;
    };
    this.heroesSubject.next(heroes);
    this.saveHeroesToLocalStorage();
  }

  private saveHeroesToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.heroesSubject.value));
  }

  getAllHeroes(): Observable<Superhero[]> {
    this.loadingService.show();
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.heroesSubject.value);
        observer.complete();
        this.loadingService.hide();
      }, this.delayTime);
    });
  }

  addHero(hero: Superhero): void {
    this.loadingService.show();
    setTimeout(() => {
      const heroes = [...this.heroesSubject.value, { ...hero, id: this.generateId() }];
      this.heroesSubject.next(heroes);
      this.saveHeroesToLocalStorage();
      this.loadingService.hide();
    }, this.delayTime);
  }

  updateHero(updatedHero: Superhero): void {
    this.loadingService.show();
    setTimeout(() => {
      const heroes = this.heroesSubject.value.map(hero =>
        hero.id === updatedHero.id ? updatedHero : hero
      );
      this.heroesSubject.next(heroes);
      this.saveHeroesToLocalStorage();
      this.loadingService.hide();
    }, this.delayTime);
  }
  
  getHeroById(id: number): Observable<Superhero | undefined> {
    this.loadingService.show();
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.heroesSubject.value.find(hero => hero.id === id));
        observer.complete();
        this.loadingService.hide();
      }, this.delayTime); 
    });
  }

  deleteHero(id: number): void {
    this.loadingService.show();
    setTimeout(() => {
      const heroes = this.heroesSubject.value.filter(hero => hero.id !== id);
      this.heroesSubject.next(heroes);
      this.saveHeroesToLocalStorage();
      this.loadingService.hide();
    }, this.delayTime); 
  }

  private generateId(): number {
    const heroes = this.heroesSubject.value;
    return heroes.length ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }
}
