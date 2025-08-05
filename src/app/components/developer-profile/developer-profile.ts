import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeveloperTasks } from '../../services/developers/developer-task';
import { CommonModule } from '@angular/common';
import { DeveloperPerformanceDTO } from '../../interfaces/DeveloperPerformanceDTO';

@Component({
  imports: [CommonModule],
  selector: 'app-developer-profile',
  templateUrl: './developer-profile.html',
  styleUrls: ['./developer-profile.css']
})
export class DeveloperProfileComponent implements OnInit {
  developerId!: string;
  developerName: string = '';
  tasks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: DeveloperTasks
  ) {}

  ngOnInit(): void {
    this.developerId = this.route.snapshot.paramMap.get('id')!;
    
    this.taskService.getTasksByDeveloperId(this.developerId).subscribe(tasks => {
      this.tasks = Array.isArray(tasks) ? tasks : [tasks];
      
      if (this.tasks.length > 0) {
        this.developerName = this.tasks[0].developerName;
        
        // get task performance
        this.tasks.forEach(task => {
          this.taskService.getTaskPerformance(this.developerId, task.id).subscribe(performance => {
            task.performance = performance;
          });
        });
      }
    });
  }
}
