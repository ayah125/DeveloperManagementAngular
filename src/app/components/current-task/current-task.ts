import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-current-task',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './current-task.html',
  styleUrl: './current-task.css',
})
export class CurrentTask {
  linkValue: string = '';
  linkError: string = '';
  showToast: boolean = false;

  constructor(private router: Router) {}

  CurrentTasks = [
    {
      title: 'Implement Notifications System',
      DeadLine: '20 July 2025',
      score: 90,
    },
    { title: 'Upgrade Database Schema', DeadLine: '18 July 2025', score: 87 },
    { title: 'Add Dark Mode Feature', DeadLine: '22 July 2025', score: 93 },
    { title: 'Optimize Image Loading', DeadLine: '25 July 2025', score: 89 },
  ];

  selectedTask: any = null;
  showStartForm = false;
  taskDescription: string = '';
  showLinkInput = false;

  showDetails(task: any) {
    this.selectedTask = task;
  }

  backToList() {
    this.selectedTask = null;
    this.showStartForm = false;
    this.showLinkInput = false;
    this.linkValue = '';
    this.linkError = '';
  }

  readyToStart() {
    this.showStartForm = false;
    this.showLinkInput = true;
    this.linkError = ''; // reset
  }

  sendAndRemoveTask() {
    if (!this.linkValue.trim()) {
      this.linkError = '⚠️ Please enter the link before sending.';
      return;
    }
    this.linkError = '';

    // نظهر التوست
    this.showToast = true;

    // نخفي التوست بعد 3 ثواني
    setTimeout(() => {
      this.showToast = false;
    }, 3000);

    // نحذف التاسك
    this.CurrentTasks = this.CurrentTasks.filter(
      (task) => task !== this.selectedTask
    );

    // إغلاق الفورم
    this.backToList();
  }
  sendTaskDescription() {
    if (!this.taskDescription.trim()) {
      this.linkError = '⚠️ Please enter your code before sending.';
      return;
    }

    console.log('✅ Description submitted:', this.taskDescription);

    // إظهار Toast
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2500);

    this.taskDescription = '';
    this.showStartForm = false;
    this.backToList();
  }
}
