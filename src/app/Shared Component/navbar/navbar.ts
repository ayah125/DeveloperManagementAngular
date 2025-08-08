import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Workspace } from '../../services/createWorkSpace/createworkspace';
import { WorkspaceToken } from '../../models/workspace-token';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Getprofile } from '../../services/getprofile/getprofile';
import {  WorkspaceWithProfile } from '../../interfaces/WorkspaceWithProfile';

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
  templateUrl: './navbar.html',
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
  isMobile = false;


  constructor(
    public workspaceService: Workspace,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    public profile: Getprofile
  ) {}
  

  checkScreenSize() {
    this.isMobile = window.innerWidth < 992;
    if (!this.isMobile) {
      this.isSidebarOpen = true;
    }
  }
    userRole: 'Admin' | 'Developer' | 'unknown' = 'unknown';

    
getRole(roleString: any): 'Admin' | 'Developer' | 'unknown' {
  const role = String(roleString).toLowerCase();

  console.log('👉 Raw role from API:', roleString);
  console.log('👉 Normalized role:', role);

  if (role === 'admin') return 'Admin';
  if (role === 'developer') return 'Developer';

  console.warn('⚠️ Unrecognized role:', role);
  return 'unknown';
}


 getRoleName(roleNumber: number): string {
    switch (roleNumber) {
      case 0: return 'Admin';
      case 1: return 'Developer';
      default: return 'Unknown';
    }
  }

navigateBasedOnRole() {
  console.log('📌 navigateBasedOnRole called', this.userRole);

  if (this.userRole === 'unknown') {
    console.warn('🚫 navigateBasedOnRole called before userRole is known');
    return;
  }

  switch (this.userRole) {
    case 'Admin':
      const adminWorkspaceId = this.workspaces[0]?.id;
      if (adminWorkspaceId) {
        console.log('✅ Navigating to Admin workspace:', adminWorkspaceId);
        this.router.navigate([`/workspace/${adminWorkspaceId}`]);
      } else {
        alert('No workspace ID found for admin');
      }
      break;

    case 'Developer':
      console.log('✅ Navigating to Developer workspace');
      this.router.navigate(['/workspace']);
      break;

    default:
      alert('Role not recognized');
      break;
  }
}


  ngOnInit() {
    console.log(' Full UserRole enum:', this.userRole);

    this.workspaceService.loadUserWorkspacesFromApi();
    this.workspaceService.getAllWorkspaceTokens().subscribe({
      next: (tokens) => this.workspaceTokens = tokens,
      error: (err) => console.error('Error fetching tokens:', err)
    });

    this.workspaceService.workspaces$.subscribe(ws => this.workspaces = ws);

this.profile.GetAllProfiles().subscribe({
  next: (workspaces: WorkspaceWithProfile[]) => {
    if (!workspaces || workspaces.length === 0) {
      alert('No workspaces found for this user');
      return;
    }

    const profile = workspaces[0]?.profile;

    if (profile && profile.role !== undefined) {
      const roleString = profile.role;
      this.userRole = this.getRole(roleString);

      console.log(' Raw role from API:', profile.role);
      console.log(' Mapped userRole:', this.userRole);
    } else {
      alert('Profile or role not found');
    }
  },
  error: (err) => {
    console.error('Error fetching profile', err);
  }
});



  }

  ngAfterViewInit() {
    const tooltipList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipList.map((el) => new bootstrap.Tooltip(el));

    const toggleBtn = document.querySelector('.sidebar-toggle-btn');
    const sidebar = document.querySelector('.custom-sidebar');

    toggleBtn?.addEventListener('mouseenter', () => this.isSidebarOpen = true);
    sidebar?.addEventListener('mouseleave', () => this.isSidebarOpen = false);
  }

  allWorkspacesExpanded = false;
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
