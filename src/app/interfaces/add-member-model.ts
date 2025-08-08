import { Roles } from "../enums/roles";

export interface AddMemberModel {
  developerEmail: string,
  role: Roles,
  branch: string
}
