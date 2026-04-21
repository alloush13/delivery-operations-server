import { Module } from "../../core/module/module.interface";
import { Container } from "../../core/container";
import { TechnicianService } from "./technician.service";
import { TechnicianController } from "./technician.controller";
import { technicianRoutes } from "./technician.route";
import { TechnicianRepository } from "./technician.repository";
import { TechnicianSocket } from "./technician.socket";
import { Server } from "../../core/server";
import { SocketService } from "src/core/services/socket.service";

export class TechnicianModule implements Module {
  register() {
    Container.singleton(TechnicianRepository, () => new TechnicianRepository());
    Container.singleton(TechnicianService, () => new TechnicianService(Container.resolve(TechnicianRepository)));
    Container.singleton(TechnicianController, () => new TechnicianController(Container.resolve(TechnicianService)));
    Container.singleton(TechnicianSocket, () => new TechnicianSocket(Container.resolve(TechnicianService), Container.resolve(SocketService)));
    
  }

  boot() {
    const server = Container.resolve(Server);
    const technicianController = Container.resolve(TechnicianController);
    server.router.use("/technicians", technicianRoutes(technicianController));
  }
}
