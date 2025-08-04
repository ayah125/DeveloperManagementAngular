import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { env } from '../../../enviroment/environment';

export interface Workspace {
  id: number;
  name: string;
  adminUserID: string;
}

@Injectable({ providedIn: 'root' })
export class WorkspaceService {
  private apiUrl = `${env.apiUrl}/api/workspaces`;

  private workspacesSource = new BehaviorSubject<Workspace[]>([]);
  workspaces$ = this.workspacesSource.asObservable();

  constructor(private http: HttpClient) {}

  loadAllWorkspaces(): void {
    this.http.get<Workspace[]>(this.apiUrl).subscribe({
      next: (data) => this.workspacesSource.next(data),
      error: (err) => console.error('Error loading workspaces:', err),
    });
  }

  addWorkspace(workspace: Workspace) {
    const current = this.workspacesSource.getValue();
    this.workspacesSource.next([...current, workspace]);
  }

  
}
