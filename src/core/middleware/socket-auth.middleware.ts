import { Socket } from "socket.io";
import { JwtService } from "../services/jwt.service";

export class SocketAuthMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  handle(socket: Socket, next: (err?: Error) => void) {
    const { token } = socket.handshake.auth;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    try {
      const decoded = this.jwtService.verify(token);

      socket.data.userId = decoded.id;
      socket.data.role = decoded.role;

      next();
    } catch {
      next(new Error("Invalid token"));
    }
  }
}