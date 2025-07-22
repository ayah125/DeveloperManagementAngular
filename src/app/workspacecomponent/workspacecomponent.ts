import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workspace, WorkspaceService } from '../services/workspace/workspaces';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workspace-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workspacecomponent.html',
  styleUrls: ['./workspacecomponent.css'],
})
export class WorkspaceListComponent implements OnInit {
  workspaces: any[] = [
    { name: 'Test Workspace', adminUserID: 'admin1' },
    { name: 'Another WS', adminUserID: 'admin2' },
  ];

  constructor(private workspaceService: WorkspaceService) {}

  ngOnInit() {
    // نشترك في البيانات
    this.workspaceService.workspaces$.subscribe((data) => {
      this.workspaces = data;
    });

    // نحمّل الداتا من الـ API
    this.workspaceService.loadAllWorkspaces();
  }
}
