import { Component, OnDestroy } from '@angular/core';
// import { WorkspaceService } from '../../services/workspace.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WorkspaceService } from '../../services/workspace/workspaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnDestroy {
  motivationalQuotes: string[] = [
    'Keep coding, keep growing! 🚀',
    'Every bug you fix makes you stronger. 💪',
    'You’re just one commit away from greatness! 🌟',
    'Believe in your code – and in yourself! ✨',
    'Great things are built one line at a time. 🛠️',
    'Debugging is like solving mysteries. 🕵️‍♂️',
    'Stay curious, keep learning! 📚',
    'Your next project will be your best yet! 💡',
    'Code. Test. Repeat. Succeed. ✅',
    'Dream big. Code bigger! 💻',
  ];

  randomQuote: string = '';
  newWorkspaceName: string = '';
  private intervalId: any;

  constructor(private workspaceService: WorkspaceService) {
    this.getRandomQuote();
    this.intervalId = setInterval(() => {
      this.getRandomQuote();
    }, 5000);
  }

  openModal() {
    const modalEl = document.getElementById('createWorkspaceModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  addWorkspace() {
    if (this.newWorkspaceName.trim()) {
      this.workspaceService.addWorkspace;
      this.newWorkspaceName = '';
    }
  }

  getRandomQuote() {
    const index = Math.floor(Math.random() * this.motivationalQuotes.length);
    this.randomQuote = this.motivationalQuotes[index];
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
