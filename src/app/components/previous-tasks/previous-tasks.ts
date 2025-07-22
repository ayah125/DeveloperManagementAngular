import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-previous-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './previous-tasks.html',
  styleUrls: ['./previous-tasks.css'],
})
export class PreviousTasks {
  completedTasks = [
    { title: 'Landing Page Redesign', completedOn: '10 July 2025', score: 92 },
    { title: 'Backend API Refactor', completedOn: '02 July 2025', score: 88 },
    {
      title: 'User Authentication Module',
      completedOn: '25 June 2025',
      score: 95,
    },
    { title: 'Setup CI/CD Pipeline', completedOn: '15 June 2025', score: 85 },
  ];
  motivationalMessage = 'Your past work shows how far you’ve come.';
}
