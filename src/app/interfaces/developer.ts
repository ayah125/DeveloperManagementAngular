export interface Developer {
  // id: number;
  // workspaceID: number;
  // userID: string;
  // role: number;
  // totalScore: number;
  // taskCount: number;
  // skillTags: string;
  // completedTasks: number;
  // avilability: boolean;
  // branch: string;
  // workSpace: any;
  // user: any;   
  userId: string;
  userName: string; 
}

export interface DeveloperProfile {
role: string;          
  taskCount: number;
  skillTags: string[];   
  completedTasks: number;
  avilability: string;   
  branch: string;
  userName: string;
  email: string;
  workspaceName: string;
}