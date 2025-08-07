import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignDeveloperData } from '../../interfaces/assign-developer-data';
import { env } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class Recommend {

  constructor(private http: HttpClient) {}

  getRecommendations(description: string): Observable<any> {
    const body = { description: description };
    return this.http.post<any>(`${env.apiUrl}api/GenAIModels/Recommend`, body);
  }

  AssignDeveloper(assignData: AssignDeveloperData): Observable<any> {
    return this.http.post<any>(`${env.apiUrl}api/DeveloperTasks`, assignData);
  }
}
