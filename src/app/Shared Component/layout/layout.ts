import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar'; // اسم كومبوننت navbar بتاعك

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  
})
export class Layout {
    hideBackground = false;
  constructor(private router: Router) {

     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // لو ال URL فيه /workspace → اخفي الخلفية
        this.hideBackground = event.urlAfterRedirects.includes('/workspace');
      }
    });
  }

  isLoginOrRegister(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
