import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GitHubBuildResult } from '../../interfaces/git-hub-build-result';
import { Observable } from 'rxjs';
import { env } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeCheck {
private apiUrl=env.apiUrl;

  private APIUrl = `${this.apiUrl}/api/GitHub/build-status`;
  constructor(private http: HttpClient) {}

  checkBuildStatus(): Observable<GitHubBuildResult> {
    return this.http.get<GitHubBuildResult>(this.APIUrl);
  }
}
