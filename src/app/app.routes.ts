import { Routes } from '@angular/router';
import { Register } from './Register/register/register';
import { Login } from './pages/login/login';
import { TaskList } from './components/taskList/task-list/task-list';
import { Home } from './pages/home/home';
import { Layout } from './Shared Component/layout/layout';
import { CurrentTask } from './components/current-task/current-task';
import { PreviousTasks } from './components/previous-tasks/previous-tasks';

import { CodeReview } from './components/GenAI-models/review/review';
import { AdminHome } from './pages/admin-home/admin-home';
import { Createworkspace } from './pages/create-work-space/create-work-space';
import { WorkspaceDetailComponent } from './pages/workspace-developer-component/workspace-detail-component';
import { WorkspacePageComponent } from './components/workspace/workspace';

import { AuthGuard } from './auth-guard';
import { RecommendBox } from './components/GenAI-models/recommend-box/recommend-box';
import { CodeChecker } from './components/GenAI-models/code-check/code-check';
import { DevelopersComponent } from './components/developers/developers';
import { DeveloperProfileComponent } from './components/developer-profile/developer-profile';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page';
import { Profile } from './components/profile/profile';
import { NoAuthGuard } from './services/NoAuth';

export const routes: Routes = [

  { path: 'welcome', component: WelcomePageComponent },


  { path: '', redirectTo: 'welcome', pathMatch: 'full' },

 
  {
    path: '',
    component: Layout,
    children: [
      { path: 'home', component: Home, canActivate: [AuthGuard] },
      { path: 'tasks', component: TaskList ,canActivate: [AuthGuard]},
      { path: 'admin', component: AdminHome },
      { path: 'prev', component: PreviousTasks },
      { path: 'current-task', component: CurrentTask },
      { path: 'create', component: Createworkspace },
      { path: 'login', component: Login ,canActivate: [NoAuthGuard] },
      { path: 'register', component: Register },
      { path: 'developers', component: DevelopersComponent },
      { path: 'developer-profile/:id', component: DeveloperProfileComponent },

      { path: 'profile', component: Profile },

      { path: 'workspace/:id/recommend', component: RecommendBox },
      {
        path: 'workspace',
        children: [
          {
            path: '',
            component: WorkspaceDetailComponent,
            children: [
              
              { path: 'review', component: CodeReview },
              { path: 'check', component: CodeChecker },
   
            ],
          },
          { path: ':id', component: WorkspacePageComponent },
        ],
      },
    ],
  },
];

