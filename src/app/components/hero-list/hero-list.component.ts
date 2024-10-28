import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../interfaces/superhero.interface';
import { TableComponent } from '../table/table.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from "../search/search.component";
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

export type DialogFactory = (component: any, data: any) => { afterClosed: () => any };

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
    private router: Router,
    @Inject('dialogFactory') private dialogFactory: DialogFactory
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

  openDialog(component: any, data: any) {
    return this.dialogFactory(component, data);
  }

  addHero(): void {
    const dialogRef = this.openDialog(HeroFormComponent, null);
    dialogRef.afterClosed().subscribe((result: Superhero | null) => {
      if (result) {
        this.superheroService.addHero(result);
      }
    });
  }

  editHero(hero: Superhero): void {
    const dialogRef = this.openDialog(HeroFormComponent, hero);
    dialogRef.afterClosed().subscribe((result: Partial<Superhero> | null) => {
      if (result) {
        const updatedHero = { ...hero, ...result };
        this.superheroService.updateHero(updatedHero);
      }
    });
  }

  deleteHero(hero: Superhero): void {
    const dialogRef = this.openDialog(ConfirmDialogComponent, { name: hero.name });
    dialogRef.afterClosed().subscribe((result: boolean | null) => {
      if (result) {
        this.superheroService.deleteHero(hero.id);
      }
    });
  }

  viewHero(id: number): void {
    this.router.navigate(['/hero', id]);
  }

  onSearch(term: string): void {
    const searchTerm = term.toLowerCase();
    this.filteredHeroes = this.heroes.filter(hero =>
      hero.name.toLowerCase().includes(searchTerm) ||
      hero.identity.toLowerCase().includes(searchTerm)
    );
  }
}
