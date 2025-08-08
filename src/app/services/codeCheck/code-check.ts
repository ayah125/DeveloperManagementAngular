import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GitHubBuildResult } from '../../interfaces/git-hub-build-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeCheck {

  private APIUrl = "https://localhost:7293/api/GitHub/build-status";
  constructor(private http: HttpClient) {}

  checkBuildStatus(): Observable<GitHubBuildResult> {
    return this.http.get<GitHubBuildResult>(this.APIUrl);
  }
}
