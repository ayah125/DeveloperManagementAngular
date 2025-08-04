import { Injectable } from '@angular/core';
import { WorkspaceWithProfile } from '../../interfaces/WorkspaceWithProfile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../../enviroment/environment';
import { DeveloperTaskDTO } from '../../interfaces/DeveloperTaskDTO';

@Injectable({
  providedIn: 'root'
})
export class Getprofile {
  
  constructor(private http: HttpClient) {}

  GetAllProfiles(): Observable<WorkspaceWithProfile[]> {
    const token = localStorage.getItem('userToken');

    if (!token) {
      throw new Error('Authentication token not found in localStorage');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<WorkspaceWithProfile[]>(
      `${env.apiUrl}api/Developer/profile/all`,
      { headers }
    );
  }
  GetAllTasks(): Observable<DeveloperTaskDTO[]> {
    const token = localStorage.getItem('userToken');

    if (!token) {
      throw new Error('Authentication token not found in localStorage');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<DeveloperTaskDTO[]>(
      `${env.apiUrl}api/DeveloperTasks/developer/${localStorage.getItem('userID')}`,
      { headers }
    );
  }}
