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

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'home', component: Home, canActivate: [AuthGuard] },
      { path: 'tasks', component: TaskList },

      { path: 'admin', component: AdminHome },
      { path: 'prev', component: PreviousTasks },
      { path: 'current-task', component: CurrentTask },
      { path: 'create', component: Createworkspace },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      {
        path: 'workspace',
        children: [
          {
            path: '',
            component: WorkspaceDetailComponent,
            children: [
              { path: 'review', component: CodeReview },
              { path: 'check', component: CodeChecker },
              { path: 'recommend', component: RecommendBox },
            ],
          },
          { path: ':id', component: WorkspacePageComponent },
        ],
      },
    ],
  },
];
