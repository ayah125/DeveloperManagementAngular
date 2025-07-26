import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-workspace-detail-component',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './workspace-detail-component.html',
  styleUrl: './workspace-detail-component.css',
})
export class WorkspaceDetailComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToReview() {
    this.router.navigate(['review'], { relativeTo: this.route });
  }

  goToCheck() {
    this.router.navigate(['check'], { relativeTo: this.route });
  }
   goToRecommend() {
    this.router.navigate(['recommend'], { relativeTo: this.route });
  }
}
