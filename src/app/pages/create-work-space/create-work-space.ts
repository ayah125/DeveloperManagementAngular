import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Workspace } from '../../services/createWorkSpace/createworkspace';
import { workspaceData } from '../../models/workspaceData';
import { WorkspaceToken } from '../../models/workspace-token';
import Lottie from 'lottie-web'; 
@Component({
  selector: 'app-create-workspace',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './create-work-space.html',
  styleUrls: ['./create-work-space.css'],
})
export class Createworkspace {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;
    ngAfterViewInit(): void {
      Lottie.loadAnimation({
        container: this.lottieContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/Share.json'
      });
    }
  constructor(private http: HttpClient) {}
  workspaceService = inject(Workspace);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

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
    Name: '',
  };

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
      return;
    }

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
          Name: this.workspaceData.name
        };

        console.log('Sending token data:', tokenData);

        this.workspaceService.createWorkspaceWithToken(workspaceID, tokenData).subscribe({
          next: (tokenResponse: any) => {
            console.log('Token created successfully:', tokenResponse);
            this.snackBar.open('Workspace Created!', 'Close', { duration: 2000 });
            this.workspaceService.loadUserWorkspacesFromApi();
            this.router.navigate(['/workspacee', workspaceID]);
            this.showForm = false;
          },
          error: (tokenError: any) => {
            console.error('Token Creation failed', tokenError);
            this.snackBar.open('Error occurred!', 'Close', { duration: 3000 });
          },
        });
      },
      error: (error: any) => {
        console.error('Workspace Creation Failed', error);
        this.snackBar.open('Error occurred!', 'Close', { duration: 3000 });
      },
    });
  }
}