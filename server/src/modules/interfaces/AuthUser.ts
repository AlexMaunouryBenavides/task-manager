import type { UserRole } from "../interfaces/IUser";
export default interface AuthUser {
  id: number;
  role: UserRole;
}
