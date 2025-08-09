import { Component, ElementRef, ViewChild } from '@angular/core';
import { Recommend } from '../../../services/recommend/recommend';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssignDeveloperData } from '../../../interfaces/assign-developer-data';
import { DeveloperService } from '../../../services/developers/developer';
import { Developer } from '../../../interfaces/developer';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceService } from '../../../services/workspace/workspaces';
import lottie from 'lottie-web';

@Component({
  selector: 'app-recommend-box',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recommend-box.html',
  styleUrls: ['./recommend-box.css']
})
export class RecommendBox {
  description: string = '';
  result: any = null;
  assignResult: any = null;
  loading: boolean = false;
  error: string | null = null;
  deadline: Date = new Date();
    developers: Developer[] = [];
    workspaceId : number = 1;
    workspace: any;
    selectedDeveloperId: string = '';  



  constructor(private recommendService: Recommend, private developerService: DeveloperService,private router: Router, private route: ActivatedRoute, private workspaceService: WorkspaceService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.workspaceId = Number(params.get('id'));

      this.workspaceService.workspaces$.subscribe((list) => {
        this.workspace = list.find((ws) => ws.id === this.workspaceId);
      });
    });
    this.GetDevelopersForTask(this.workspaceId);
    
  }
    @ViewChild('lottieContainer', { static: false })
  lottieContainer!: ElementRef;

  ngAfterViewInit(): void {
    // تحميل الـ Lottie
    lottie.loadAnimation({
      container: this.lottieContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/search for employee.json',
    });
  }

  getRecommendation() {
    if (!this.description.trim()) {
      this.error = 'Please enter a description.';
      return;
    }

    this.loading = true;
    this.error = null;

    this.recommendService.getRecommendations(this.description).subscribe({
      next: (response) => {
        this.result = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while fetching recommendations.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  GetDevelopersForTask(workspaceId: number) {
    this.developerService.getDevelopersByWorkspace(workspaceId).subscribe({
      next: (response) => {
        this.developers = response;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  assignDeveloper() {

     const taskDeveloperData: AssignDeveloperData = {
    deadline: this.deadline,
    developerId: this.selectedDeveloperId,
    description: this.description,
    workspaceId: this.workspaceId
  };

    if (!taskDeveloperData.developerId) {
      this.error = 'Please select a developer.';
      return;   
    }
    this.recommendService.AssignDeveloper(taskDeveloperData).subscribe({
      next: (response) => {
        this.assignResult = response;
      },
      error: (err) => {
        this.error = 'An error occurred while assigning the developer.';
        console.error(err);
      }
    });
  }

  reset() {
    this.result = null;
    this.assignResult = null;
    this.description = '';
    this.selectedDeveloperId = '';
    this.deadline = new Date();
    this.error = null;
  }
  trackById(index: number, item: Developer) {
    return item.userId;
  }
 goTohome() {
    this.router.navigate(['workspacee/:id']);
  }
}
