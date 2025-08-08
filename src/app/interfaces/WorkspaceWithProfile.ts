export interface WorkspaceWithProfile {
  workspaceId: number;
  workspaceName: string;
  profile: {
    userName: string;
    email: string;
    role: string;
    totalScore: number;
    taskCount: number;
    completedTasks: number;
    skillTags: string;
    avilability: string;
    branch: string;
    workspaceName: string;
  };
}

