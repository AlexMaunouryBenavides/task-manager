import type { UserRole } from "../interfaces/IUser";
export default interface JwtUserPayload {
  sub: string;
  role: UserRole;
}
