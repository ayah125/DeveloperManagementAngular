// src/app/services/workspaces.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateWorkspaceService {
  private workspacesSource = new BehaviorSubject<
    { name: string; id: number; type: string; description: string }[]
  >([]);
  workspaces$ = this.workspacesSource.asObservable();

  addWorkspace(newWorkspace: {
    name: string;
    id: number;
    type: string;
    description: string;
  }) {
    const current = this.workspacesSource.value;
    this.workspacesSource.next([...current, newWorkspace]);
  }
}
