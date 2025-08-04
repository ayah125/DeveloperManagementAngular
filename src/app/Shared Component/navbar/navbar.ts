import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
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
import { filter } from 'rxjs/operators'; // ✅ صح بدل internal
import { Workspace } from '../../services/createWorkSpace/createworkspace';
import { Createworkspace } from '../../pages/create-work-space/create-work-space';
import { WorkspaceToken } from '../../models/workspace-token';

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
  templateUrl:'./navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements AfterViewInit, OnInit {
  workspaces: {
    name: string;
    id: number;
    type: string;
    description: string;
  }[] = [];
  workspaceTokens:WorkspaceToken[] = [];

  isSidebarOpen: boolean = false;
  profileExpanded: boolean = false;
  role: string = 'User';


  activeMenu: number | null = null;
  selectedToken: WorkspaceToken | null = null;
  showEditPopup: boolean = false;

  constructor(
    public workspaceService: Workspace,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.workspaceService.loadUserWorkspacesFromApi();
    this.workspaceService.getAllWorkspaceTokens().subscribe({
      next: (tokens:any) => {
        this.workspaceTokens = tokens;
        console.log('Workspace Tokens:', this.workspaceTokens);
      },
      error: (err) => {
        console.error('Error fetching workspace tokens:', err);
      }
    });
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
toggleOptions(id: number) {
  this.activeMenu = this.activeMenu === id ? null : id;
}

  onDelete(workspaceID:number){
    this.workspaceService.deleteWorkspace(workspaceID).subscribe({
      next: ()=>{
        this.workspaceService.loadUserWorkspacesFromApi();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onEdit(workspaceId: number) {
  const token = this.workspaceTokens.find((t: WorkspaceToken) => t.workspaceID === workspaceId);
  if (token) {
    this.selectedToken = { ...token }; 
    this.showEditPopup = true;
  }
}

onSaveEdit() {
  if (!this.selectedToken) return;

  this.workspaceService.updateWorkspace(this.selectedToken.workspaceID, this.selectedToken)
    .subscribe({
      next: () => {
        console.log('Updated!');
        this.showEditPopup = false;
      
        this.workspaceService.getAllWorkspaceTokens().subscribe(tokens => {
          this.workspaceTokens = tokens;
        });
      },
      error: (err:any) => {
        console.error('Update failed:', err);
      }
    });
}

closeEditPopup() {
  this.showEditPopup = false;
}

}
