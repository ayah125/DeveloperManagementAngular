import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Developer, DeveloperProfile } from '../../interfaces/developer';
import { Observable } from 'rxjs';
import { env } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  private apiurl=env.apiUrl;
  private apiUrl = `${this.apiurl}/api/Developer`;

  constructor(private http: HttpClient) {}

  getDevelopersByWorkspace(workspaceId: number): Observable<Developer[]> {

    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Developer[]>(
      `${this.apiUrl}/workspace/${workspaceId}/members`,
      { headers }
    );
  }
  getDeveloperProfile(workspaceId: number, developerId: string): Observable<DeveloperProfile> {

    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<DeveloperProfile>(
      `${this.apiUrl}/${developerId}/workspace/${workspaceId}/profile`,
      { headers }
    );
  }
}
