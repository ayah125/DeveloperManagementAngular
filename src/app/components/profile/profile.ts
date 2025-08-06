import { Component } from '@angular/core';
import { Getprofile } from '../../services/getprofile/getprofile';
import { CommonModule } from '@angular/common';
import { WorkspaceWithProfile } from '../../interfaces/WorkspaceWithProfile';
import { DeveloperTaskDTO } from '../../interfaces/DeveloperTaskDTO';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
   workspaceStates: boolean[] = [];
  profiles: WorkspaceWithProfile[] = [];
  tasks: DeveloperTaskDTO[] = [];
constructor(private getprofile: Getprofile) { }



ngOnInit() {
  this.getprofile.GetAllProfiles().subscribe(data => {
    this.profiles = data;
  });
  this.getprofile.GetAllTasks().subscribe(data => {
    this.tasks = data;
  });
        this.getprofile.GetAllProfiles().subscribe(data => {
      this.profiles = data;
      this.workspaceStates = new Array(data.length).fill(false);  
    });

}
 toggleWorkspace(index: number): void {
    this.workspaceStates[index] = !this.workspaceStates[index];
  }


}
