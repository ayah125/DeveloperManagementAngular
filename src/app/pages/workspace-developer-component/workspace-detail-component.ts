import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import lottie from 'lottie-web';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-workspace-detail-component',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './workspace-detail-component.html',
  styleUrl: './workspace-detail-component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ]
})
export class WorkspaceDetailComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @ViewChild('lottieContainer', { static: false })
  lottieContainer!: ElementRef;

  ngAfterViewInit(): void {
    // تحميل الـ Lottie
    lottie.loadAnimation({
      container: this.lottieContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/developer skills.json',
    });
  }

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
