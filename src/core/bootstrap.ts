import express from "express";
import { Container, registerCoreServices } from "./container";
import { DatabaseService } from "./services/database.service";
import { loadModules } from "./module/module.loader";
import { SocketService } from "./services/socket.service";
import { Server } from "./server";
import { createServer } from "http";
import { TechnicianSocket } from "src/modules/technician/technician.socket";
import { AdminSocket } from "src/modules/admin/admin.socket";

export async function bootstrap(): Promise<void> {
  const server = Container.resolve(Server);
  server.app = express();
  server.httpServer = createServer(server.app);
  server.router = express.Router();
  // 1. Core services
  registerCoreServices();

  // 2. JSON middleware (express built-in enough)
  server.app.use(express.json());
  server.app.use(express.urlencoded({ extended: false }));

  // 3. DB connection (via DI)
  const dbService = Container.resolve<DatabaseService>(DatabaseService);
  await dbService.connect();

  const socketService = Container.resolve(SocketService);
  socketService.init(server.httpServer);
  socketService.connect();
    
    server.io = socketService.getIO();

  // 4. Load modules (routes, controllers, etc.)
  loadModules();

  
socketService.setAdminSocket(Container.resolve(AdminSocket));
socketService.setTechnicianSocket(Container.resolve(TechnicianSocket));


  server.app.use(server.API_PREFIX, server.router);
}
