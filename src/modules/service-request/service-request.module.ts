import { Module } from "../../core/module/module.interface";
import { Container } from "../../core/container";
import { ServiceRequestService } from "./service-request.service";
import { ServiceRequestController } from "./service-request.controller";
import { serviceRequestRoutes } from "./service-request.route";
import { ServiceRequestRepository } from "./service-request.repository";
import { ServiceRequestSocket } from "./service-request.socket";
import { Server } from "../../core/server";

export class ServiceRequestModule implements Module {
  register() {
    Container.singleton(ServiceRequestRepository, () => new ServiceRequestRepository());
    Container.singleton(ServiceRequestService, () => new ServiceRequestService(Container.resolve(ServiceRequestRepository)));
    Container.singleton(ServiceRequestController, () => new ServiceRequestController(Container.resolve(ServiceRequestService)));
    Container.singleton(ServiceRequestSocket, () => new ServiceRequestSocket());
  }


  boot() {
    const server = Container.resolve(Server);
    const serviceRequestController = Container.resolve(ServiceRequestController);
    server.router.use("/service-requests", serviceRequestRoutes(serviceRequestController));
    
  }
}
