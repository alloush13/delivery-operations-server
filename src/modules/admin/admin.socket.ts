import { Socket } from "socket.io";
import { SocketService } from "../../core/services/socket.service";
import { AdminService } from "./admin.service";

export class AdminSocket {


  init(io: any) {
    io.on("connection", async (socket: Socket) => {
      console.log("Admin connected:", socket.id);
      
    });
  }

}