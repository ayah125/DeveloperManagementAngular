import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Workspace } from '../../services/createWorkSpace/createworkspace';
import { WorkspaceToken } from '../../models/workspace-token';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule
  ],
  templateUrl:'./navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements AfterViewInit, OnInit {
  workspaces: { name: string; id: number; type: string; description: string }[] = [];
  workspaceTokens: WorkspaceToken[] = [];
  isSidebarOpen = false;
  profileExpanded = false;
  activeMenu: number | null = null;
  selectedToken: WorkspaceToken | null = null;
  showEditPopup = false;




  constructor(
    public workspaceService: Workspace,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.workspaceService.loadUserWorkspacesFromApi();
    this.workspaceService.getAllWorkspaceTokens().subscribe({
      next: (tokens) => this.workspaceTokens = tokens,
      error: (err) => console.error('Error fetching tokens:', err)
    });
    this.workspaceService.workspaces$.subscribe(ws => this.workspaces = ws);
  }

  ngAfterViewInit() {
    const tooltipList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipList.map((el) => new bootstrap.Tooltip(el));

    const toggleBtn = document.querySelector('.sidebar-toggle-btn');
    const sidebar = document.querySelector('.custom-sidebar');

    toggleBtn?.addEventListener('mouseenter', () => this.isSidebarOpen = true);
    sidebar?.addEventListener('mouseleave', () => this.isSidebarOpen = false);
  }

  allWorkspacesExpanded = false; // يبدأ مفتوح
toggleAllWorkspaces() {
  this.allWorkspacesExpanded = !this.allWorkspacesExpanded;
}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleProfile() {
    this.profileExpanded = !this.profileExpanded;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleOptions(id: number) {
    this.activeMenu = this.activeMenu === id ? null : id;
  }

  goToWorkspace(id: number) {
    this.router.navigate(['/workspace', id]);
    this.closeSidebar();
  }

  logout() {
    this.authService.logout();
  }

  onDelete(workspaceID: number) {
    this.workspaceService.deleteWorkspace(workspaceID).subscribe({
      next: () => {
        this.snackBar.open('Workspace deleted successfully', 'Close', { duration: 2000 });
        this.workspaceService.loadUserWorkspacesFromApi();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to delete workspace: ' + (err.error?.message || ''), 'Close', { duration: 3000 });
      }
    });
  }

onEdit(workspaceId: number) {
  console.log('Edit clicked for workspaceId:', workspaceId);
  

  if (!this.workspaceTokens || this.workspaceTokens.length === 0) {
    console.error('Workspace tokens not loaded yet');
    this.snackBar.open('Please wait, data is still loading', 'Close', { duration: 2000 });
    return;
  }

  const token = this.workspaceTokens.find(t => +t.workspaceID === +workspaceId);
  const workspace = this.workspaces.find(w => w.id === workspaceId);

  if (token && workspace) {
    this.selectedToken = {
      workspaceID: token.workspaceID,
      GithubToken: token.GithubToken,
      GithubRepo: token.GithubRepo,
      OwnerName: token.OwnerName,
      UserAgent: token.UserAgent,
        Name: workspace.name ?? ''  
    };
    this.showEditPopup = true;
  } else {
    console.error('Token or workspace not found');
    this.snackBar.open('Failed to find workspace data', 'Close', { duration: 2000 });
  }
}


onSaveEdit() {
  if (!this.selectedToken) return;

  if (!this.selectedToken.Name?.trim()) {
    this.snackBar.open('Workspace name is required', 'Close', { duration: 2000 });
    return;
  }

  this.workspaceService.updateWorkspace(this.selectedToken.workspaceID, this.selectedToken)
    .subscribe({
      next: () => {
        this.snackBar.open('Workspace updated successfully', 'Close', { duration: 2000 });
        this.showEditPopup = false;
        this.workspaceService.getAllWorkspaceTokens().subscribe(tokens => this.workspaceTokens = tokens);
        this.workspaceService.loadUserWorkspacesFromApi();
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.snackBar.open('Update failed: ' + (err.error?.message || ''), 'Close', { duration: 3000 });
      }
    });
}


onDeleteConfirmed(workspaceID: number) {
  this.workspaceService.deleteWorkspace(workspaceID).subscribe({
    next: () => {
      this.snackBar.open('Workspace deleted successfully', 'Close', { duration: 2000 });
      this.workspaceService.loadUserWorkspacesFromApi();
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open('Failed to delete workspace: ' + (err.error?.message || ''), 'Close', { duration: 3000 });
    }
  });
}
confirmDelete(workspaceID: number) {
  const confirmed = window.confirm('Are you sure you want to delete this workspace?');
  if (confirmed) {
    this.onDeleteConfirmed(workspaceID);
  }
}


  closeEditPopup() {
    this.showEditPopup = false;
  }
}
