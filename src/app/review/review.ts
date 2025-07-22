import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-code-review',
  templateUrl: './review.html',
  styleUrls: ['./review.css'],
  imports: [CommonModule],
})
export class CodeReview {
  showDetails = false;

  // بيانات حقيقية (ممكن تيجي من API بعدين)
  score: number = 88;
  feedback: string = 'Your code is clean and modular, good use of components!';
  suggestions: string[] = [
    'Add more inline comments.',
    'Refactor large functions into smaller ones.',
    'Consider writing unit tests for edge cases.',
  ];

  toggleDetails() {
    this.showDetails = true;
  }
}
