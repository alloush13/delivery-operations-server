import { Container } from "./service-container";
import { DatabaseService } from "../services/database.service";
import { JwtService } from "../services/jwt.service";
import { SocketService } from "../services/socket.service";
import { SocketAuthMiddleware } from "../middleware/socket-auth.middleware";

export function registerCoreServices() {
  Container.singleton(DatabaseService, () => new DatabaseService());
  Container.singleton(JwtService, () => new JwtService());
  Container.singleton(SocketService, () => new SocketService(Container.resolve(SocketAuthMiddleware)));
  Container.singleton(SocketAuthMiddleware, () => new SocketAuthMiddleware(Container.resolve(JwtService)));
}
