import { Component } from '@angular/core';
import { Getprofile } from '../../services/getprofile/getprofile';
import { CommonModule } from '@angular/common';
import { WorkspaceWithProfile } from '../../interfaces/WorkspaceWithProfile';
import { DeveloperTaskDTO } from '../../interfaces/DeveloperTaskDTO';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl:'./profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
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
}

}
