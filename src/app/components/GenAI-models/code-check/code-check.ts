import { Component } from '@angular/core';
import { GitHubBuildResult } from '../../../interfaces/git-hub-build-result';
import { CodeCheck } from '../../../services/codeCheck/code-check';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-check',
  imports: [FormsModule,CommonModule],
  templateUrl: './code-check.html',
  styleUrl: './code-check.css'
})
export class CodeChecker {
result: GitHubBuildResult | null = null;
loading: boolean = false;
error: string | null = null;
constructor(private codeCheckService: CodeCheck) {}

checkStatus(){
  this.loading = true;
  this.error = null;
  this.result = null;

  this.codeCheckService.checkBuildStatus().subscribe(
    {
      next: (response: GitHubBuildResult) => {
        this.result = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while checking the build status.';
        console.error(err);
        this.loading = false;
      }
    }
  )
}
}
