import { Server } from "socket.io";
import { SocketAuthMiddleware } from "../middleware/socket-auth.middleware";
import { TechnicianSocket } from "../../modules/technician/technician.socket";
import { AdminSocket } from "../../modules/admin/admin.socket";

export class SocketService {
  private io!: Server;
  private technicianSocket: TechnicianSocket;
  private adminSocket: AdminSocket
  constructor(
    private readonly socketAuthMiddleware: SocketAuthMiddleware,
  ) {}

  setTechnicianSocket(technicianSocket: TechnicianSocket) {
    this.technicianSocket = technicianSocket;
  }

  setAdminSocket(adminSocket: AdminSocket) {
    this.adminSocket = adminSocket;
  }

  init(httpServer: any) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });
    this.io.use((socket, next) => this.socketAuthMiddleware.handle(socket, next));
    return this.io;
  }
  connect() {
    this.io.on("connection", (socket) => {
      const role = socket.data.role;

      if (role === "technician") {
        this.technicianSocket.init(socket);
      }

      if (role === "admin") {
        this.adminSocket.init(socket);
      }
    });
  }

  getIO(): Server {
    if (!this.io) {
      throw new Error("Socket.IO not initialized");
    }
    return this.io;
  }

  emit(event: string, data: any) {
    this.io.emit(event, data);
  }

  to(room: string) {
    return this.io.to(room);
  }
  emitToAdmins(event: string, data: any) {
    this.io.to("admins").emit(event, data);
  }
}
