import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, WorkspaceService } from '../../workspaceservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
})
export class CardComponent {
  @Input() card!: Card;
  @Input() listIndex!: number;
  @Input() cardIndex!: number;

  editing = false;

  constructor(public workspaceService: WorkspaceService) {}
}
