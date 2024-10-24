import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../interfaces/superhero.interface';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes: Superhero[] = [];

  columns = [
    { header: 'Nombre', field: 'name' },
    { header: 'Alias', field: 'alias' },
    { header: 'Poder', field: 'power' },
    { header: 'Compañía', field: 'companyName' }
  ];

  actions = [
    {
      label: 'Editar',
      icon: 'edit',
      color: 'primary',
      callback: (hero: Superhero) => this.editHero(hero)
    },
    {
      label: 'Eliminar',
      icon: 'delete',
      color: 'warn',
      callback: (hero: Superhero) => this.deleteHero(hero)
    }
  ];

  constructor(private superheroService: SuperheroService) {}

  ngOnInit(): void {
    this.superheroService.getAllHeroes().subscribe(data => {
      this.heroes = data;
    });
  }

  editHero(hero: Superhero): void {
    console.log('Editar héroe:', hero);
  }

  deleteHero(hero: Superhero): void {
    this.superheroService.deleteHero(hero.id);
    this.heroes = this.heroes.filter(h => h.id !== hero.id);
  }
}
