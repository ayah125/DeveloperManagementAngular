import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Recommend {
  private APIUrl = "http://localhost:5023/api/GenAIModels/Recommend";

  constructor(private http: HttpClient) {}

  getRecommendations(description: string): Observable<any> {
    const body = { description: description };
    return this.http.post<any>(this.APIUrl, body);
  }
}
