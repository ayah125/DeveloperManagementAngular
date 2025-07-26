import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CodeReviewService } from '../../../services/codeReview/codereview';
import { reviewResult } from '../../../interfaces/reviewResult';
import { FormsModule } from '@angular/forms';
import { RequestBody } from '../../../models/CodeReviewModel';

@Component({
  selector: 'app-code-review',
  templateUrl: './review.html',
  styleUrls: ['./review.css'],
  imports: [CommonModule,FormsModule],
})
export class CodeReview {
  showDetails = false;
   requestData: RequestBody = {
    ownerName: '',
    repositoryName: '',
    branch: '',
    userToken: '',
    userAgent: '',
  };

  reviewresult: reviewResult | null = null;
  loading = false;
  error: string | null = null;

  constructor(private codereviewservice: CodeReviewService) {}

  Review() {
    this.loading = true;
    this.error = null;
    this.reviewresult = null;

    this.codereviewservice.reviewCode(this.requestData).subscribe({
      next: (response: reviewResult) => {
        this.reviewresult = response;
        this.loading = false;
        this.showDetails = true;
      },
      error: (err) => {
        this.error = 'An error occurred during review.';
        this.loading = false;
      }
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}
