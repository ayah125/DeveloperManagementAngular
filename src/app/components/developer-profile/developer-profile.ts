import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeveloperTasks } from '../../services/developers/developer-task';
import { CommonModule } from '@angular/common';
import { DeveloperPerformanceDTO } from '../../interfaces/DeveloperPerformanceDTO';
import { DeveloperService } from '../../services/developers/developer';
import { WorkspaceService } from '../../services/workspace/workspaces';
import { Developer, DeveloperProfile } from '../../interfaces/developer';

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
  workspaceId: number = 0;
  workspace: any;
  developerProfile: DeveloperProfile | null = null;
  constructor(
    private route: ActivatedRoute,
    private taskService: DeveloperTasks,
    private developerService: DeveloperService,
    private workspaceService: WorkspaceService
  ) {}

  ngOnInit(): void {
    this.developerId = this.route.snapshot.paramMap.get('id')!;
    
        this.route.paramMap.subscribe((params) => {
      this.workspaceId = Number(params.get('id'));

      this.workspaceService.workspaces$.subscribe((list) => {
        this.workspace = list.find((ws) => ws.id === this.workspaceId);
      });
    });
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

    this.developerService.getDeveloperProfile(this.workspaceId, this.developerId).subscribe(profile => {
      this.developerProfile = profile;
    });
  }
}
