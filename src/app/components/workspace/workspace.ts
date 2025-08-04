import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Workspace } from '../../services/createWorkSpace/createworkspace';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import lottie from 'lottie-web';
import { Router } from '@angular/router';


import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace.html',
  styleUrls: ['./workspace.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],

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
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ]),
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
  


export class WorkspacePageComponent implements OnInit  {
    activeTab = 'developers';
isListOpen = true;
isVisible = true;

  workspaceId: number = 0;
  workspace: any;

    showDevelopers = true;

  constructor(
    private router: Router,
  private route: ActivatedRoute,
  private workspaceService: Workspace

  ) {}
 @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;

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
   
    });
  }

  developers: Developer[] = [
    { name: 'Ayah', avatar: 'A', score: 85, pendingTasks: 3,tasks: ['Task 1', 'Task 2', 'Task 3'], },
    { name: 'Ahmed', avatar: 'B', score: 60, pendingTasks: 1 , tasks: ['Task 1', 'Task 2', 'Task 3'],},
     { name: 'Mustafa', avatar: 'C', score: 35, pendingTasks: 3, tasks: ['Task 1', 'Task 2', 'Task 3'], },
      { name: 'Wessam', avatar: 'A', score: 25, pendingTasks: 5,tasks: ['Task 1', 'Task 2', 'Task 3'], },
    { name: 'Mayar', avatar: 'C', score: 95, pendingTasks: 0 ,tasks: ['Task 1', 'Task 2', 'Task 3'],},
  ];
 activeDeveloper: any = null;

  listVisible = true;

  selectDeveloper(dev: any) {
    this.activeDeveloper = dev;
    this.activeTab = 'score'; // دايمًا يبدأ بالـ score tab
  }

  toggleList() {
    this.listVisible = !this.listVisible;
  }
goToRecommend() {
this.router.navigate([`/workspace/${this.workspaceId}/recommend`]);

}
onAddMember() {
  // هنا تفتحي Dialog أو تروحي صفحة تانية أو تفتحي فورم
  console.log('Add Member Clicked');
}
 showForm = false;

 
  newMember = {
    DeveloperEmail: '',
    Role: '',
    Branch: ''
  };

  submitMember() {
    console.log('Submitted:', this.newMember);
    // هنا تقدر تبعت البيانات للباك اند أو تضيفها لقائمة
    this.showForm = false;
  }
   showModal = false;
  loading = false;

  member = {
    DeveloperEmail: '',
    Role: '',
    Branch: ''
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (!this.member.DeveloperEmail || !this.member.Role || !this.member.Branch) return;

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.closeModal();
      alert('Member added successfully!');
    }, 2000);
  }
}


interface Developer {
  name: string;
  avatar: string; // URL أو حتى حرف
  score: number;
tasks:string[];
    pendingTasks: number;
}
