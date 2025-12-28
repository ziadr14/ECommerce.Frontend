import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth-service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule , RouterLink , 


    
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBarComponent {
  scrolled = false;
  menuActive = false;
  userDropdownActive = false;
  isDarkMode = false;

  constructor(private authService: AuthService) {}

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  toggleUserDropdown() {
    this.userDropdownActive = !this.userDropdownActive;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}

