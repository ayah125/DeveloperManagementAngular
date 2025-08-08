import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { workspaceData } from '../../models/workspaceData';
import { WorkspaceToken } from '../../models/workspace-token';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddMemberModel } from '../../interfaces/add-member-model';

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
        'https://localhost:7293/api/WorkSpaces/CreateWorkspace',
        {
          name: workspaceData.name,
          adminUserID: workspaceData.adminUserID,
        },
        { headers }
      )
      .pipe(
        tap((response) => {
          const newWorkspace = {
            name: response.name,
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
      'https://localhost:7293/api/WorkSpaces/CreateWorkspaceTokens',
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
    return this.httpclient.delete(`https://localhost:7293/api/WorkSpaces/DeleteWorkspaceTokens/${workspaceID}`,{headers})
  }

  updateWorkspace(workspaceID: number, tokens: WorkspaceToken){
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.httpclient.put("https://localhost:7293/api/WorkSpaces/UpdateWorkspaceTokens",{
      WorkspaceID: workspaceID,
      GithubToken: tokens.GithubToken,
      OwnerName: tokens.OwnerName,
      GithubRepo: tokens.GithubRepo,
      UserAgent: tokens.UserAgent,
    },{headers})
  }


 getAllWorkspaceTokens(){
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpclient.get<any[]>('https://localhost:7293/api/WorkSpaces/GetAllWorkspaceTokens', { headers })
      .pipe(
        tap(tokens => {
          console.log('Fetched all workspace tokens:', tokens);
        })
      );
 }

 addMemberToWorkspace(WorkspaceID:number,MemberData:AddMemberModel){
  const token = localStorage.getItem('userToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
  return this.httpclient.post('https://localhost:7293/api/WorkSpaces/AddMemberToWorkspace', {
    workspaceID: WorkspaceID,
    developerEmail: MemberData.developerEmail,
    role: MemberData.role,
    branch: MemberData.branch
  },{headers});
 }

 deleteMemberFromWorkspace(workspaceID:number,userID: string){
  const token = localStorage.getItem('userToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
  return this.httpclient.delete(`https://localhost:7293/api/WorkSpaces/DeleteMemberFromWorkspace/${workspaceID}/${userID}`,{headers})
 }




  // (اختياري) تجيب Workspaces من الـ backend وتحدثهم
  loadUserWorkspacesFromApi() {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.httpclient
      .get<any[]>('https://localhost:7293/api/WorkSpaces/user', { headers })
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
