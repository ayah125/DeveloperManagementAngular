export interface DeveloperTaskDTO {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;     // or Date, depending on parsing
  deadline: string;      // or Date
  developerId: string;
  developerName?: string;
  workspaceId: number;
  workspaceName?: string;
}
