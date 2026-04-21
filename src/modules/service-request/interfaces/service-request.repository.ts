import { ServiceRequest } from "./service-request.entity";

export interface ServiceRequestRepository {
  findAll(): Promise<ServiceRequest[]>;
  findById(id: string): Promise<ServiceRequest | null>;
  save(serviceRequest: ServiceRequest): Promise<ServiceRequest>;
}