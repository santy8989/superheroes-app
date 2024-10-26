import { Injectable } from '@angular/core';
import { Superhero } from '../interfaces/superhero.interface';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private localStorageKey = 'superheroes';

  private defaultHeroes: Superhero[] = [
    { id: 1, alias: 'Spiderman', name: 'Peter Parker', power: 'Spider abilities', image: 'Marvel' },
    { id: 2, alias: 'Superman', name: 'Clark Kent', power: 'Super strength', image: 'DC Comics' },
    { id: 3, alias: 'Iron Man', name: 'Tony Stark', power: 'Money', image: 'Marvel' }
  ];

  private heroesSubject: BehaviorSubject<Superhero[]> = new BehaviorSubject<Superhero[]>([]);
  public heroes$: Observable<Superhero[]> = this.heroesSubject.asObservable();

  constructor() {
    this.loadHeroesFromLocalStorage();
  }

  private loadHeroesFromLocalStorage(): void {
    const savedHeroes = localStorage.getItem(this.localStorageKey);
    const heroes = savedHeroes ? JSON.parse(savedHeroes) : this.defaultHeroes;
    this.heroesSubject.next(heroes);
    this.saveHeroesToLocalStorage();
  }

  private saveHeroesToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.heroesSubject.value));
  }

  getAllHeroes(): Observable<Superhero[]> {
    return this.heroes$;
  }

  addHero(hero: Superhero): void {
    const heroes = [...this.heroesSubject.value, { ...hero, id: this.generateId() }];
    this.heroesSubject.next(heroes);
    this.saveHeroesToLocalStorage();
  }

  updateHero(updatedHero: Superhero): void {
    const heroes = this.heroesSubject.value.map(hero =>
      hero.id === updatedHero.id ? updatedHero : hero
    );
    this.heroesSubject.next(heroes);
    this.saveHeroesToLocalStorage();
  }
  
  getHeroById(id: number): Observable<Superhero | undefined> {
    return this.heroes$.pipe(
      map(heroes => heroes.find(hero => hero.id === id))
    );
  }

  deleteHero(id: number): void {
    const heroes = this.heroesSubject.value.filter(hero => hero.id !== id);
    this.heroesSubject.next(heroes);
    this.saveHeroesToLocalStorage();
  }

  private generateId(): number {
    const heroes = this.heroesSubject.value;
    return heroes.length ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }
}
