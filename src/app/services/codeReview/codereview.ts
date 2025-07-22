import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestBody } from '../../models/CodeReviewModel';
// import { RequestBody } from '../../models/CodeReviewModel';

@Injectable({
  providedIn: 'root',
})
export class CodeReviewService {
  private apiUrl = 'http://localhost:5023/api/GenAIModels/CodeReview'; // عدلي الرابط حسب API بتاعك

  constructor(private http: HttpClient) {}

  reviewCode(requestBody: RequestBody): Observable<any> {
    return this.http.post<any>(this.apiUrl, requestBody);
  }
}
