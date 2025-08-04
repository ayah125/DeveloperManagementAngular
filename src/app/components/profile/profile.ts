import { Component } from '@angular/core';
import { Getprofile } from '../../services/getprofile/getprofile';
import { WorkspaceWithProfile } from '../../interfaces/WorkspaceWithProfile ';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  profiles: WorkspaceWithProfile[] = [];

constructor(private getprofile: Getprofile) { }

ngOnInit() {
  this.getprofile.GetAllProfiles().subscribe(data => {
    this.profiles = data;
  });
}

}
