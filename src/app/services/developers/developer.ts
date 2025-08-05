import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Developer } from '../../interfaces/developer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  private apiUrl = 'http://localhost:5023/api/Developer';

  constructor(private http: HttpClient) {}

  getDevelopersByWorkspace(workspaceId: number): Observable<Developer[]> {

    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Developer[]>(
      `${this.apiUrl}/workspace/${workspaceId}/members`,
      { headers }
    );
  }
}
