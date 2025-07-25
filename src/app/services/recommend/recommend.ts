import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Recommend {
  private APIUrl = "https://localhost:7293/api/GenAIModels/Recommend";

  constructor(private http: HttpClient) {}

  getRecommendations(description: string): Observable<any> {
    const body = { description: description };
    return this.http.post<any>(this.APIUrl, body);
  }
}
