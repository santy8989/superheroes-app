import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from '../../interfaces/superhero.interface';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoadingService } from '../../services/loading.service';
@Component({
  selector: 'app-hero-detail',
  standalone: true,
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  imports:[CommonModule,MatCardModule,MatButtonModule]
})
export class HeroDetailComponent implements OnInit {
  hero: Superhero | undefined ;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private superheroService: SuperheroService,
    private loadingService:LoadingService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
    const heroId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("hero",heroId)
    this.superheroService.getHeroById(heroId).subscribe(hero => {
      this.hero = hero;
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
  setDefaultImage(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/default-image.jpg'; // Ruta de la imagen predeterminada
  }
}
