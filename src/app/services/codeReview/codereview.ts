import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reviewResult } from '../../interfaces/reviewResult';
// import { RequestBody } from '../../models/CodeReviewModel';

@Injectable({
  providedIn: 'root',
})
export class CodeReviewService {
  private apiUrl = 'https://localhost:7293/api/GenAIModels/CodeReview'; // عدلي الرابط حسب API بتاعك

  constructor(private http: HttpClient) {}

  reviewCode(workspaceId: number): Observable<reviewResult> {
    return this.http.post<reviewResult>(this.apiUrl, { workspaceId });
  }
}
