import { Component, OnInit } from '@angular/core';
import { DeveloperService } from '../../services/developers/developer';
import { Developer } from '../../interfaces/developer';
import { CommonModule } from '@angular/common';

@Component({
   standalone: true,
  imports: [CommonModule],
  selector: 'app-developers-list',
  templateUrl: './developers.html',
  styleUrls: ['./developers.css']
})
export class DevelopersComponent implements OnInit {
  developers: Developer[] = [];
  workspaceId = 1; 

  constructor(private developerService: DeveloperService) {}

  ngOnInit(): void {
    this.loadDevelopers();
  }

  loadDevelopers(): void {
    this.developerService.getDevelopersByWorkspace(this.workspaceId)
      .subscribe({
        next: (data) => {
          this.developers = data;
        },
        error: (err) => {
          console.error('Error fetching developers:', err);
        }
      });
  }
}
