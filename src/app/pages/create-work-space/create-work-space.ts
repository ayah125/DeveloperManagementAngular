import { Component } from '@angular/core';

import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RequestBody } from '../../models/CodeReviewModel';
import { Router } from '@angular/router';
import { CreateWorkspaceService } from '../../services/createWorkSpace/createworkspace';

@Component({
  selector: 'app-create-work-space',
  standalone: true,
  imports: [FormsModule, CommonModule],

  templateUrl: './create-work-space.html',
  styleUrl: './create-work-space.css',
})
export class CreateWorkSpace {
  requestData: RequestBody = {
    ownerName: '',
    repositoryName: '',

    userToken: '',
    userAgent: '',
  };

  responseData: any;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private workspaceService: CreateWorkspaceService
  ) {}
  GotoDetails() {
    const newWorkspace = {
      id: Date.now(),
      name: this.requestData.repositoryName,
      type: 'default',
      description: 'New workspace',
    };

    this.workspaceService.addWorkspace(newWorkspace);
    this.router.navigate(['/workspace', newWorkspace.id]);
  }
}
