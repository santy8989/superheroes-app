import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../interfaces/superhero.interface';
import { TableComponent } from '../table/table.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from "../search/search.component";
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    HeroFormComponent,
    MatButtonModule,
    MatIconModule,
    SearchComponent
  ],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes: Superhero[] = [];
  filteredHeroes: Superhero[] = [];
  isLoading: boolean = false;

  columns = [
    { header: 'Nombre', field: 'name' },
    { header: 'Identidad secreta', field: 'identity' },
    { header: 'Poder', field: 'power' }
  ];

  actions = [
    {
      icon: 'edit',
      color: 'primary',
      callback: (hero: Superhero) => this.editHero(hero)
    },
    {
      icon: 'delete',
      color: 'warn',
      callback: (hero: Superhero) => this.deleteHero(hero)
    },
    {
      icon: 'visibility',
      color: 'accent',
      callback: (hero: Superhero) => this.viewHero(hero.id)
    }
  ];

  constructor(
    private superheroService: SuperheroService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.superheroService.heroes$.subscribe(data => {
      this.heroes = [...data];
      this.filteredHeroes = [...data];
    });
  }

  addHero(): void {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.superheroService.addHero(result);
      }
    });
  }

  editHero(hero: Superhero): void {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      width: '400px',
      data: hero 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        const updatedHero = { ...hero, ...result };
        this.superheroService.updateHero(updatedHero);
      }
    });
  }

  viewHero(id: number): void {
    this.router.navigate(['/hero', id]);
  }

  deleteHero(hero: Superhero): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { name: hero.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.superheroService.deleteHero(hero.id);
      }
    });
  }

  onSearch(term: string): void {
    const searchTerm = term.toLowerCase();
    this.filteredHeroes = this.heroes.filter(hero =>
      hero.name.toLowerCase().includes(searchTerm) ||
      hero.identity.toLowerCase().includes(searchTerm)
    );
  }
}
