import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GitHubBuildResult } from '../../interfaces/git-hub-build-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeCheck {

  private APIUrl = "http://localhost:5023/api/GitHub/build-status";
  constructor(private http: HttpClient) {}

  checkBuildStatus(): Observable<GitHubBuildResult> {
    return this.http.get<GitHubBuildResult>(this.APIUrl);
  }
}
