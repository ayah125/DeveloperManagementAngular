import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar'; // اسم كومبوننت navbar بتاعك

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
})
export class Layout {
  constructor(private router: Router) {}

  isLoginOrRegister(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
