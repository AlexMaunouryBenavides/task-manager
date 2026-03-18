import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type AuthUser from "../modules/interfaces/AuthUser";
import isJwtUserPayload from "../utils/isJwtUserPayload";

dotenv.config();

export interface AuthRequest extends Request {
  user?: AuthUser;
}

// lire le cookie
// verifier si il y a un token
// verifier si le token correspond a un user (collaborator ou admin)
// choper les infos pour identifications dans req

const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).json({ message: "acces denied" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET as string);

    if (!isJwtUserPayload(decoded)) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    const userId = Number(decoded.sub);

    if (Number.isNaN(userId)) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    req.user = { id: userId, role: decoded.role };

    next();
  } catch (error) {
    res.status(401).json({ message: "Error server" });
    return;
  }
};

// fonction pour fabriquer un middleware ( genre controller) pour verifier ( si tu as tel role tu passe sinon non )
const verifyRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "invalide credentials" });
      return;
    }
    const isRoleListed = allowedRoles.includes(req.user.role);
    if (isRoleListed) {
      next();
    } else {
      res.status(403).json({ message: "acces denied" });
      return;
    }
  };
};

export default { verifyToken, verifyRole };
