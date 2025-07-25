import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workspace } from '../../services/createWorkSpace/createworkspace';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace.html',
  styleUrls: ['./workspace.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class WorkspacePageComponent implements OnInit {
  customNote: string = '';
  workspaceId: number = 0;
  workspace: any;
  customNoteInput: string = '';
  savedNote: string = '';
  constructor(
    private route: ActivatedRoute,
    private workspaceService: Workspace
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.workspaceId = Number(params.get('id'));

      this.workspaceService.workspaces$.subscribe((list) => {
        this.workspace = list.find((ws) => ws.id === this.workspaceId);
      });
      if (this.workspace) {
        const notes = JSON.parse(
          localStorage.getItem('workspaceNotes') || '{}'
        );
        this.savedNote = notes[this.workspace.id] || '';
        this.customNoteInput = this.savedNote;
      }
    });
  }
  saveNote() {
    const notes = JSON.parse(localStorage.getItem('workspaceNotes') || '{}');
    notes[this.workspace.id] = this.customNoteInput;
    localStorage.setItem('workspaceNotes', JSON.stringify(notes));
    this.savedNote = this.customNoteInput;
  }
}
