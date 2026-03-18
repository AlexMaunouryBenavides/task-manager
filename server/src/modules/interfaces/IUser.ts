export enum UserRole {
  ADMIN = "admin",
  COLLABORATOR = "collaborator",
}

export default interface IUser {
  id: number;
  name: string;
  lastname: string | null;
  email: string;
  password: string;
  role: UserRole;
}
