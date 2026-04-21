import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwt.service";
import { Container } from "../container/service-container";
import { GuardRole } from "./roles.guard";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: GuardRole;
  };
}

export function guard(...allowedRoles: GuardRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const jwtService = Container.resolve(JwtService);

    try {
      const payload = jwtService.verify(token) as AuthRequest["user"];

      if (!payload) {
        return res.status(401).json({ message: "Invalid token payload" });
      }

      // attach user
      req.user = payload;

      // role check
      if (allowedRoles.length && !allowedRoles.includes(payload.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}