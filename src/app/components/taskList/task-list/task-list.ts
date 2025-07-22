import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskList {
  showForm = false;
  newDescription = '';

  CurrentTasks = [
    {
      title: 'Implement Notifications System',
      DeadLine: '20 July 2025',
      score: 90,
      description: 'Add real-time notifications to alert users about updates.',
      status: 'In Progress',
    },
    {
      title: 'Upgrade Database Schema',
      DeadLine: '18 July 2025',
      score: 87,
      description: 'Refactor database tables to support new features.',
      status: 'Pending',
    },
    {
      title: 'Add Dark Mode Feature',
      DeadLine: '22 July 2025',
      score: 93,
      description:
        'Provide dark mode option for better user experience at night.',
      status: 'In Progress',
    },
    {
      title: 'Optimize Image Loading',
      DeadLine: '25 July 2025',
      score: 89,
      description: 'Improve performance by lazy loading images.',
      status: 'Pending',
    },
  ];

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitForm() {
    console.log('New Description:', this.newDescription);
    this.newDescription = '';
    this.showForm = false;
  }
}
