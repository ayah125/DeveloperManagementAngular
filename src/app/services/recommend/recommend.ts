import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignDeveloperData } from '../../interfaces/assign-developer-data';
import { env } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root',
})
export class Recommend {
  constructor(private http: HttpClient) {}

  getRecommendations(description: string): Observable<any> {
    const token = localStorage.getItem('userToken');

    if (!token) {
      throw new Error('Authentication token not found in localStorage');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const body = { description: description };
    return this.http.post<any>(`${env.apiUrl}api/GenAIModels/Recommend`, body, {
      headers,
    });
  }

  AssignDeveloper(assignData: AssignDeveloperData): Observable<any> {
    return this.http.post<any>(`${env.apiUrl}api/DeveloperTasks`, assignData);
  }
}
