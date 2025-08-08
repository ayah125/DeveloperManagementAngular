import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeveloperPerformanceDTO } from '../../interfaces/DeveloperPerformanceDTO';
import { DeveloperTaskDTO } from '../../interfaces/DeveloperTaskDTO';
import { env } from '../../../enviroment/environment';

@Injectable({ providedIn: 'root' })
export class DeveloperTasks {
  private apiurl=env.apiUrl;
  private baseUrl = `${this.apiurl}/api/DeveloperTasks`;

  constructor(private http: HttpClient) {}

  getTasksByDeveloperId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/developer/${id}`);
  }
 getTaskPerformance(devId: string, taskId: number): Observable<DeveloperPerformanceDTO> {
  return this.http.get<DeveloperPerformanceDTO>(`${this.baseUrl.replace('DeveloperTasks', 'Developer')}/${devId}/performance/${taskId}`);
}

 getTasksByWorkspaceAndDeveloper(workspaceId: number, developerId: string): Observable<DeveloperTaskDTO[]> {
    return this.http.get<DeveloperTaskDTO[]>(`${this.baseUrl}/workspace/${workspaceId}/${developerId}`);
}
}