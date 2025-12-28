import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Hero } from '../hero/hero';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [NavBarComponent  , Footer , RouterOutlet , Hero , CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  showHero = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showHero =
this.showHero = this.router.url === '/';
      });
  }
}
