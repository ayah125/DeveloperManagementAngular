import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CodeReviewService } from '../../../services/codeReview/codereview';
import { reviewResult } from '../../../interfaces/reviewResult';
import { FormsModule } from '@angular/forms';
import { RequestBody } from '../../../models/CodeReviewModel';
import { DeveloperTaskDTO } from '../../../interfaces/DeveloperTaskDTO';
import { DeveloperTasks } from '../../../services/developers/developer-task';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceService } from '../../../services/workspace/workspaces';

@Component({
  selector: 'app-code-review',
  templateUrl: './review.html',
  styleUrls: ['./review.css'],
  imports: [CommonModule,FormsModule],
})
export class CodeReview {
  showDetails = false;
   workspaceId : number = 1011; // يمكنك تعديل هذا حسب الحاجة
    workspace: any = "Test";
   taskId: number = 1; 
  developerId: string = localStorage.getItem('userID') || '1'; 
  tasks: DeveloperTaskDTO[] = [];
  reviewresult: reviewResult | null = null;
  loading = false;
  error: string | null = null;

  constructor(private codereviewservice: CodeReviewService, private developertasks: DeveloperTasks,private route: ActivatedRoute,private workspaceService: WorkspaceService) {}

  Review() {
    this.loading = true;
    this.error = null;
    this.reviewresult = null;
    console.log('Reviewing code for task:', this.taskId, 'in workspace:', this.workspaceId);
    this.codereviewservice.reviewCode(this.workspaceId, this.taskId).subscribe({
      next: (response: reviewResult) => {
        this.reviewresult = response;
        this.loading = false;
        this.showDetails = true;
        console.log('Review result:', this.reviewresult);
      },
      error: (err) => {
        this.error = 'An error occurred during review.';
        this.loading = false;
      }
    });
  }
ngOnInit(): void {
  this.route.parent?.paramMap.subscribe((params) => {
    const idParam = params.get('id');
    this.workspaceId = idParam ? Number(idParam) : 0;
    console.log('Workspace ID:', this.workspaceId);
    this.showTasks();
  });
}


  showTasks(): void {
    this.developertasks.getTasksByDeveloperId(this.developerId).subscribe({
      next: (response) => {
        this.tasks = response;
        this.taskId = 0;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}
