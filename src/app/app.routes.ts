import { Routes } from '@angular/router';
import { Register } from './Register/register/register';
import { Login } from './pages/login/login';
import { TaskList } from './components/taskList/task-list/task-list';
import { Home } from './pages/home/home';
import { Layout } from './Shared Component/layout/layout';


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

import { LandingPage } from './pages/landing-page/landing-page';
import { Profile } from './components/profile/profile';
import { NoAuthGuard } from './services/NoAuth';

export const routes: Routes = [
  // Welcome page route (برّه Layout)
  { path: 'welcome', component: WelcomePageComponent },

  // route الجذر (redirect)
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'home', component: LandingPage, },

 
  {
    path: '',
    component: Layout,
    children: [
       { path: 'login', component: Login ,canActivate: [NoAuthGuard] },
    
      { path: 'tasks', component: TaskList ,canActivate: [AuthGuard]},
      { path: 'admin', component: AdminHome },
    
      { path: 'create', component: Createworkspace },
      
      { path: 'register', component: Register },
      { path: 'developers', component: DevelopersComponent },
      { path: 'developer-profile/:id', component: DeveloperProfileComponent },

      { path: 'profile', component: Profile },

      { path: 'workspace/:id/recommend', component: RecommendBox },
         { path: 'workspacee/:id', component: WorkspacePageComponent },
      {
        path: 'workspace',
        children: [
          {
            path: ':id',
            component: WorkspaceDetailComponent,
            children: [

              { path: 'review', component: CodeReview },
              { path: 'check', component: CodeChecker },

            ],
          },
       
        ],
      },
    ],
  },
];

