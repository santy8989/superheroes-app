import { Injectable } from '@angular/core';
import { Superhero } from '../interfaces/superhero.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  private localStorageKey = 'superheroes';

  private defaultHeroes: Superhero[] = [
    { id: 1, name: 'Spiderman', alias: 'Peter Parker', power: 'Spider abilities', companyName: 'Marvel' },
    { id: 2, name: 'Superman', alias: 'Clark Kent', power: 'Super strength', companyName: 'DC Comics' },
    { id: 3, name: 'Iron Man', alias: 'Tony Stark', power: 'Money', companyName: 'Marvel' }
  ];

  private superheroes: Superhero[] = [];

  constructor() {
    this.loadHeroesFromLocalStorage();
  }

  private loadHeroesFromLocalStorage(): void {
    const savedHeroes = localStorage.getItem(this.localStorageKey);
    // console.log("loading",savedHeroes)
    if (savedHeroes && savedHeroes !== '[]') {
      this.superheroes = JSON.parse(savedHeroes);
    } else {
      this.superheroes = this.defaultHeroes;
      this.saveHeroesToLocalStorage();
    }
  }

  private saveHeroesToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.superheroes));
    console.log("saved heroes:", this.superheroes)
  }

  getAllHeroes(): Observable<Superhero[]> {
    return of(this.superheroes);
  }

  getHeroById(id: number): Observable<Superhero | undefined> {
    const hero = this.superheroes.find(h => h.id === id);
    return of(hero);
  }

  addHero(hero: Superhero): void {
    hero.id = this.superheroes.length + 1;
    this.superheroes.push(hero);
    this.saveHeroesToLocalStorage();
  }

  updateHero(updatedHero: Superhero): void {
    const index = this.superheroes.findIndex(h => h.id === updatedHero.id);
    if (index !== -1) {
      this.superheroes[index] = updatedHero;
      this.saveHeroesToLocalStorage(); 
    }
  }

  deleteHero(id: number): void {
    this.superheroes = this.superheroes.filter(h => h.id !== id);
    this.saveHeroesToLocalStorage();
  }

  searchHeroes(term: string): Observable<Superhero[]> {
    const filteredHeroes = this.superheroes.filter(hero =>
      hero.name.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredHeroes);
  }
}
