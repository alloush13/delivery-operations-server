import { Socket } from "socket.io";
import { SocketService } from "../../core/services/socket.service";
import { TechnicianService } from "./technician.service";

export class TechnicianSocket {
  constructor(
    private readonly technicianService: TechnicianService,
    private readonly socketService: SocketService
  ) {}

  init(socket: Socket) {
    const technicianId = socket.data.userId;

    console.log("Technician connected:", socket.id);

    if (technicianId) {
      this.technicianService.updateStatus(technicianId, "online");
    }

    socket.on("location:update", async (data) => {
      await this.handleLocationUpdate(socket, data);
    });

    socket.on("disconnect", async () => {
      console.log("Technician disconnected:", socket.id);

      if (technicianId) {
        await this.technicianService.updateStatus(
          technicianId,
          "offline"
        );
      }
    });
  }

  private async handleLocationUpdate(socket: Socket, data: any) {
    try {
      console.log(socket.data);
      const technicianId = socket.data?.userId;
      if (!technicianId) {
        return;
      }
      const { lat, lng } = data;
      await this.technicianService.updateLocation(technicianId, {
        lat,
        lng,
      });

      this.socketService.emitToAdmins("technician:location", {
        technicianId,
        lat,
        lng,
      });
    } catch (err) {
      console.error("Location update error:", err);
    }
  }
}