export interface DeveloperTaskDTO {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;     
  deadline: string;     
  developerId: string;
  developerName?: string;
  workspaceId: number;
  workspaceName?: string;
}
