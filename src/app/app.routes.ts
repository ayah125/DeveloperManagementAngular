import { Routes } from '@angular/router';
import { Register } from './Register/register/register';
import { Login } from './pages/login/login';
import { TaskList } from './components/taskList/task-list/task-list';
import { Home } from './pages/home/home';
import { Layout } from './Shared Component/layout/layout';
import { CurrentTask } from './components/current-task/current-task';
import { PreviousTasks } from './components/previous-tasks/previous-tasks';
import { CreateWorkSpace } from './pages/create-work-space/create-work-space';
import { WorkspaceListComponent } from './workspacecomponent/workspacecomponent';
import { WorkspaceDetailComponent } from './pages/workspace-detail-component/workspace-detail-component';
import { CodeReview } from './review/review';
import { CheckCode } from './pages/check-code/check-code';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'work', component: WorkspaceListComponent },
      { path: 'tasks', component: TaskList },
      { path: 'prev', component: PreviousTasks },
      { path: 'current-task', component: CurrentTask },
      { path: 'create', component: CreateWorkSpace },
      { path: 'login', component: Login },
      { path: 'register', component: Register },

      // هنا بنخلي workspace details كـ parent
      {
        path: 'workspace/:id',
        component: WorkspaceDetailComponent,
        children: [
          { path: 'review', component: CodeReview },
          { path: 'check', component: CheckCode },
        ],
      },
    ],
  },
];
