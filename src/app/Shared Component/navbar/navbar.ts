import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { Workspace } from '../../services/createWorkSpace/createworkspace';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';

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
   animations: [
    trigger('fadeSlide', [
      transition(':leave', [
        animate('300ms ease', style({ opacity: 0, transform: 'translateX(-20px)' }))
      ]),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('300ms ease', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
    ])
  ]
})
export class Navbar implements AfterViewInit, OnInit {
  workspaces: { name: string; id: number; type: string; description: string }[] = [];
  isSidebarOpen: boolean = false;
  profileExpanded: boolean = false;
  role: string = 'User';

  workspaceToDelete: any = null;
  workspaceToEdit: any = null;
  editedName: string = '';

  showSnackbar: boolean = false;

  constructor(
    public workspaceService: Workspace,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.workspaceService.loadUserWorkspacesFromApi();
    this.workspaceService.workspaces$.subscribe((ws) => {
      this.workspaces = ws;
    });
    this.authService.user$.subscribe((user) => {
      console.log('USER IN NAVBAR:', user);
    });
  }

  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((el) => new bootstrap.Tooltip(el));

    const toggleBtn = document.querySelector('.sidebar-toggle-btn');
    const sidebar = document.querySelector('.custom-sidebar');

    if (toggleBtn) {
      toggleBtn.addEventListener('mouseenter', () => {
        this.isSidebarOpen = true;
      });
    }

    if (sidebar) {
      sidebar.addEventListener('mouseleave', () => {
        this.isSidebarOpen = false;
      });
    }
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
    this.isSidebarOpen = false;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  // ✅ Edit logic
  openEditModal(ws: any) {
    this.workspaceToEdit = ws;
    this.editedName = ws.name;
    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  }

  confirmEdit() {
    if (this.workspaceToEdit && this.editedName.trim()) {
      console.log('Edited name:', this.editedName);
      // هنا تقدر تنادي API لتحديث الاسم
      this.workspaceToEdit.name = this.editedName;

      // اقفل المودال
      const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
      modal.hide();

      // ممكن تعرض snackbar أو رسالة نجاح هنا كمان
    }
  }

  // ✅ Delete logic
  openDeleteModal(ws: any) {
    this.workspaceToDelete = ws;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  }

  confirmDelete() {
    if (this.workspaceToDelete) {
      console.log('Deleting workspace:', this.workspaceToDelete);
      this.deleteWorkspace(this.workspaceToDelete);

      // اقفل المودال
      const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
      modal.hide();

      // عرض Snackbar
      this.showSnackbar = true;
      setTimeout(() => {
        this.showSnackbar = false;
      }, 3000);
    }
  }

  deleteWorkspace(ws: any) {
    console.log('Workspace deleted:', ws);
    // هنا تنادي API أو service لحذف الـ workspace
    // مثال سريع: this.workspaceService.delete(ws.id);
    // أو تشيله محليًا:
    this.workspaces = this.workspaces.filter((w) => w.id !== ws.id);
  }
  showSuccess(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    panelClass: ['success-snackbar'],
  });
}

showError(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    panelClass: ['error-snackbar'],
  });}
  
}
