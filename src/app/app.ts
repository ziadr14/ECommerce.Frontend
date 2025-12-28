import { Component, OnInit, signal } from '@angular/core';
import { NavBarComponent } from './Components/nav-bar/nav-bar';
import { Product } from './Components/product/product';
import { RouterOutlet } from '@angular/router';
import { Loading } from './Services/loading/loading';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [
    NavBarComponent,
    RouterOutlet,
    NgxSpinnerComponent,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ecommerce'); 



ngOnInit() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,  
    mirror: true 
  });
}
}
