import { Router } from '@angular/router'; // لازم تستورده
import { Component, inject } from '@angular/core';
import { Workspace } from '../../services/createWorkSpace/createworkspace';
import { workspaceData } from '../../models/workspaceData';
import { WorkspaceToken } from '../../models/workspace-token';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
// ...
@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-work-space.html',
  styleUrls: ['./create-work-space.css'],
  imports: [FormsModule, CommonModule],
})
export class Createworkspace {
  constructor(private http: HttpClient) {}
  workspaceService = inject(Workspace);
  router = inject(Router); // استخدمي inject بدل constructor لو بتحبي

  showForm = false;
  workspaceData: workspaceData = {
    name: '',
    adminUserID: '',
  };

  public workspaceTokens: WorkspaceToken = {
    workspaceID: 0,
    GithubToken: '',
    GithubRepo: '',
    OwnerName: '',
    UserAgent: '',
  };

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const userID = localStorage.getItem('userID');
    this.workspaceData.adminUserID = userID ?? '';

    this.workspaceService.createWorkspace(this.workspaceData).subscribe({
      next: (response: any) => {
        const workspaceID = response.id;
        console.log('Workspace created, ID:', workspaceID);

        const tokenData = {
          workspaceID: workspaceID,
          GithubToken: this.workspaceTokens.GithubToken,
          GithubRepo: this.workspaceTokens.GithubRepo,
          OwnerName: this.workspaceTokens.OwnerName,
          UserAgent: this.workspaceTokens.UserAgent,
        };

        console.log('Sending token data:', tokenData);

        this.workspaceService
          .createWorkspaceWithToken(workspaceID, tokenData)
          .subscribe({
            next: (tokenResponse: any) => {
              console.log('Token created successfully:', tokenResponse);

              // ✅ هنا نوديه لصفحة الـ workspace
              this.router.navigate(['/workspace', workspaceID]);
            },
            error: (tokenError: any) => {
              console.error('Token Creation failed', tokenError);
            },
          });
      },
      error: (error: any) => {
        console.log('Workspace Creation Failed', error);
      },
    });

    this.showForm = false;
  }
}
