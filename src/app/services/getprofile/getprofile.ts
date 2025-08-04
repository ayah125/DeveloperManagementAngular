import { Injectable } from '@angular/core';
import { WorkspaceWithProfile } from '../../interfaces/WorkspaceWithProfile ';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Getprofile {
  
  constructor(private http: HttpClient) { }
  
  GetAllProfiles(): Observable<WorkspaceWithProfile[]>{
    return this.http.get<WorkspaceWithProfile[]>('api/workspaces/profiles');
  }
}
