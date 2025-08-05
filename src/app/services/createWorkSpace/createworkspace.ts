import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { workspaceData } from '../../models/workspaceData';
import { WorkspaceToken } from '../../models/workspace-token';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Workspace {
  httpclient = inject(HttpClient);
  private workspacesSubject = new BehaviorSubject<any[]>([]);
  public workspaces$ = this.workspacesSubject.asObservable();
  
     constructor() {
    const savedWorkspaces = localStorage.getItem('workspaces');
    if (savedWorkspaces) {
      this.workspacesSubject.next(JSON.parse(savedWorkspaces));
    }
  }

  createWorkspace(workspaceData: workspaceData) {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpclient
      .post<any>(
        'http://localhost:5023/api/WorkSpaces/CreateWorkspace',
        {
          name: workspaceData.name,
          adminUserID: workspaceData.adminUserID,
        },
        { headers }
      )
      .pipe(
        tap((response) => {
          const newWorkspace = {
            Name: response.Name,
            id: response.id,
            type: response.type || '',
            description: response.description || '',
          };

          const current = this.workspacesSubject.getValue();
          const updated = [...current, newWorkspace];

          this.workspacesSubject.next(updated);

          localStorage.setItem('workspaces', JSON.stringify(updated));
        })
      );
  }

  createWorkspaceWithToken(workspaceID: number, tokens: WorkspaceToken) {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpclient.post(
      'http://localhost:5023/api/WorkSpaces/CreateWorkspaceTokens',
      {
        WorkspaceID: workspaceID,
        GithubToken: tokens.GithubToken,
        OwnerName: tokens.OwnerName,
        GithubRepo: tokens.GithubRepo,
        UserAgent: tokens.UserAgent,
         Name: tokens.Name
      },
      { headers }
    );
  }

  deleteWorkspace(workspaceID: number) {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.httpclient.delete(`http://localhost:5023/api/WorkSpaces/DeleteWorkspaceTokens/${workspaceID}`,{headers})
  }

  updateWorkspace(workspaceID: number, tokens: WorkspaceToken){
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.httpclient.put("http://localhost:5023/api/WorkSpaces/UpdateWorkspaceTokens",{
      WorkspaceID: workspaceID,
      GithubToken: tokens.GithubToken,
      OwnerName: tokens.OwnerName,
      GithubRepo: tokens.GithubRepo,
      UserAgent: tokens.UserAgent,
      Name:tokens.Name || ''
    },{headers})
  }


 getAllWorkspaceTokens(){
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpclient.get<any[]>('http://localhost:5023/api/WorkSpaces/GetAllWorkspaceTokens', { headers })
      .pipe(
        tap(tokens => {
          console.log('Fetched all workspace tokens:', tokens);
        })
      );
 }






  // (اختياري) تجيب Workspaces من الـ backend وتحدثهم
  loadUserWorkspacesFromApi() {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.httpclient
      .get<any[]>('http://localhost:5023/api/WorkSpaces/user', { headers })
      .subscribe(
        (wsList) => {
          this.workspacesSubject.next(wsList);
          localStorage.setItem('workspaces', JSON.stringify(wsList));
        },
        (error) => {
          console.error('Failed to load user workspaces', error);
        }
      );
  }
}
