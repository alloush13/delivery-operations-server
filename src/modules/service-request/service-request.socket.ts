import { Container } from "../../core/container";
import { SocketService } from "../../core/services/socket.service";
import { ServiceRequestService } from "./service-request.service";

export class ServiceRequestSocket {
  private socket = Container.resolve(SocketService);
  private serviceRequestService = Container.resolve<ServiceRequestService>(ServiceRequestService);

}