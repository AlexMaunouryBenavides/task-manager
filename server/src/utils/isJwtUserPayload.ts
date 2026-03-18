import { UserRole } from "../modules/interfaces/IUser";
import type JwtUserPayload from "../modules/interfaces/JwtUser";

export default function isJwtUserPayload(
  payload: unknown,
): payload is JwtUserPayload {
  if (typeof payload !== "object" || payload === null) return false;

  const p = payload as Record<string, unknown>;

  return (
    (typeof p.sub === "string" || typeof p.sub === "number") &&
    Object.values(UserRole).includes(p.role as UserRole)
  );
}
