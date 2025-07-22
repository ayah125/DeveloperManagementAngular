import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';

import { filter } from 'rxjs/internal/operators/filter';
import { CreateWorkspaceService } from '../../services/createWorkSpace/createworkspace';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements AfterViewInit, OnInit {
  workspaces: {
    name: string;
    id: number;
    type: string;
    description: string;
  }[] = [];

  isSidebarOpen: boolean = false;
  profileExpanded: boolean = false;
  role: string = 'User';

  constructor(
    public workspaceService: CreateWorkspaceService,
    public authService: AuthService,

    private router: Router
  ) {}

  ngOnInit() {
    this.workspaceService.workspaces$.subscribe((ws) => {
      this.workspaces = ws;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isSidebarOpen = false;
      });
  }

  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((el) => new bootstrap.Tooltip(el));
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleProfile() {
    this.profileExpanded = !this.profileExpanded;
  }

  logout() {
    this.authService.logout();
  }
  goToWorkspace(id: number) {
    this.router.navigate(['/workspace', id]);
  }
}
