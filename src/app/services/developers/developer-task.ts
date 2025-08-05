import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeveloperPerformanceDTO } from '../../interfaces/DeveloperPerformanceDTO';

@Injectable({ providedIn: 'root' })
export class DeveloperTasks {
  private baseUrl = 'https://localhost:7293/api/DeveloperTasks';

  constructor(private http: HttpClient) {}

  getTasksByDeveloperId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-developer/${id}`);
  }
 getTaskPerformance(devId: string, taskId: number): Observable<DeveloperPerformanceDTO> {
  return this.http.get<DeveloperPerformanceDTO>(`${this.baseUrl.replace('DeveloperTasks', 'Developer')}/${devId}/performance/${taskId}`);
}
}
