import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Workspace } from '../../services/createWorkSpace/createworkspace';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import lottie from 'lottie-web';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeveloperService } from '../../services/developers/developer';
import { DeveloperTasks } from '../../services/developers/developer-task';
import { DeveloperTaskDTO } from '../../interfaces/DeveloperTaskDTO';
import { Developer, DeveloperProfile } from '../../interfaces/developer';
import { trigger, transition, style, animate } from '@angular/animations';
import { AddMemberModel } from '../../interfaces/add-member-model';
import { Roles } from '../../enums/roles';

@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace.html',
  styleUrls: ['./workspace.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ]),
    ]),
    trigger('fadeSlideLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class WorkspacePageComponent implements OnInit, AfterViewInit {
  workspaceId!: number;
  workspace: any;
  Roles = Roles;
  newMember: AddMemberModel = {
    developerEmail: '',
    role: Roles.Null,
    branch: ''
  };
  developers: Developer[] = [];
  showDevelopers = true;
  selectedDeveloper?: Developer;
  selectedDeveloperTasks: DeveloperTaskDTO[] = [];
  developerProfile: DeveloperProfile | null = null;
  isVisible = true; // Controls developer list toggle
  showModal = false;
  loading = false;

  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private workspaceService: Workspace,
    private snackBar: MatSnackBar,
    private developerService: DeveloperService,
    private developerTasks: DeveloperTasks
  ) {}

  ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: this.lottieContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/Online.json'
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.workspaceId = Number(params.get('id'));
      this.workspaceService.workspaces$.subscribe((list) => {
        this.workspace = list.find((ws) => ws.id === this.workspaceId);
      });
      this.developerService.getDevelopersByWorkspace(this.workspaceId).subscribe((devs) => {
        this.developers = devs;
      });
    });
  }

  onDeveloperClick(developer: Developer) {
    this.selectedDeveloper = developer;
    this.developerTasks.getTasksByWorkspaceAndDeveloper(this.workspaceId, developer.userId)
      .subscribe(tasks => {
        this.selectedDeveloperTasks = tasks;
      });
    this.developerService.getDeveloperProfile(this.workspaceId, developer.userId).subscribe(profile => {
      this.developerProfile = profile;
    });
  }

  closeTasksPanel(): void {
    this.selectedDeveloper = undefined;
    this.selectedDeveloperTasks = [];
    this.developerProfile = null;
  }

  goToRecommend() {
    this.router.navigate([`/workspace/${this.workspaceId}/recommend`]);
  }

  openModal() {
    this.newMember = {
      developerEmail: '',
      role: Roles.Null,
      branch: ''
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (
      !this.newMember.developerEmail ||
      this.newMember.role === Roles.Null ||
      !this.newMember.branch
    ) return;

    this.loading = true;
    this.newMember.role = Number(this.newMember.role);
    this.workspaceService.addMemberToWorkspace(this.workspaceId, this.newMember).subscribe({
      next: () => {
        this.loading = false;
        this.closeModal();
        this.snackBar.open('Member added successfully!', 'Close', { duration: 2000 });
        this.developerService.getDevelopersByWorkspace(this.workspaceId).subscribe((devs) => {
          this.developers = devs;
        });
      },
      error: (error: any) => {
        this.loading = false;
        this.snackBar.open('Failed to add member. Please try again.', 'Close', { duration: 2000 });
        console.error('Error adding member:', error);
      }
    });
  }

  deleteDeveloper(dev: Developer, event: MouseEvent): void {
    event.stopPropagation();
    const confirmed = confirm(`Are you sure you want to delete ${dev.userName}?`);
    if (!confirmed) return;

    if (!dev.userId) {
      console.error('Developer ID is missing:', dev);
      this.snackBar.open('Developer ID is missing. Cannot delete.', 'Close', { duration: 2000 });
      return;
    }

    this.workspaceService.deleteMemberFromWorkspace(this.workspaceId, dev.userId).subscribe({
      next: () => {
        this.developers = this.developers.filter(d => d.userId !== dev.userId);
        this.snackBar.open('Developer deleted', 'Close', { duration: 2000 });
        this.developerService.getDevelopersByWorkspace(this.workspaceId).subscribe((devs) => {
          this.developers = devs;
        });
        if (this.selectedDeveloper?.userId === dev.userId) {
          this.closeTasksPanel();
        }
      },
      error: (error: any) => {
        console.error('Error deleting developer:', error);
        this.snackBar.open('Failed to delete developer. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  toggleList() {
    this.isVisible = !this.isVisible;
  }
}