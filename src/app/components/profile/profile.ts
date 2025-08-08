import { Component } from '@angular/core';
import { Getprofile } from '../../services/getprofile/getprofile';
import { CommonModule } from '@angular/common';
import { WorkspaceWithProfile } from '../../interfaces/WorkspaceWithProfile';
import { DeveloperTaskDTO } from '../../interfaces/DeveloperTaskDTO';
import { FormsModule } from '@angular/forms';
import { UpdateProfileRequest } from '../../interfaces/UpdateProfileRequest';

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
  isEditPopupOpen = false;
editableProfile: WorkspaceWithProfile = {
  workspaceId: 0,
  workspaceName: '',
  profile: {
    userName: '',
    email: '',
    role: '',
    totalScore: 0,
    taskCount: 0,
    completedTasks: 0,
    skillTags: '',
    avilability: true, 
    branch: '',
    workspaceName: ''
  }
};
constructor(private getprofile: Getprofile) { }



ngOnInit() {

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

  OnUpdateClick(profile: WorkspaceWithProfile) {
  const userId = localStorage.getItem('userID');
  if (!userId) {
    console.error('No userID found in local storage');
    return;
  }

  const request = {
    workspaceId: profile.workspaceId,          // Matches WorkspaceId
    userID: userId,                            // Matches UserID exactly
    skillTags: profile.profile.skillTags,      // Matches SkillTags
    avilability: Boolean(profile.profile.avilability)   // Matches Avilability (misspelled)
  };

  console.log('Sending update request:', request);

  this.getprofile.UpdateProfile(request).subscribe(
    response => {
      console.log('Profile updated successfully:', response);
      this.isEditPopupOpen = false;
    },
    error => {
      console.error('Error updating profile:', error);
    }
  );
}

  openEditPopup(ws: WorkspaceWithProfile) {
  this.editableProfile = ws;
  this.isEditPopupOpen = true;
}

closeEditPopup() {
  this.isEditPopupOpen = false;
this.editableProfile = {
  workspaceId: 0,
  workspaceName: '',
  profile: {
    userName: '',
    email: '',
    role: '',
    totalScore: 0,
    taskCount: 0,
    completedTasks: 0,
    skillTags: '',
    avilability: true,
    branch: '',
    workspaceName: ''
  }
};
}

saveProfile() {
  if (this.editableProfile) {
    this.OnUpdateClick(this.editableProfile);
    this.closeEditPopup();
  }
}
}
