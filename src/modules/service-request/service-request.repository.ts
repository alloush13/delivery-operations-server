import { ServiceRequestModel } from "./service-request.model";
import { ServiceRequest } from "./interfaces/service-request.entity";
import {ServiceRequestRepository as IServiceRequestRepository } from "./interfaces/service-request.repository";

export class ServiceRequestRepository implements IServiceRequestRepository {
  async findAll() : Promise<ServiceRequest[]> {
    return await  ServiceRequestModel.find();
  }

  async findById(id: string) : Promise<ServiceRequest | null> {
    return await ServiceRequestModel.findById(id);
  }

  async findByEmail(email: string) : Promise<ServiceRequest | null> {
    return await ServiceRequestModel.findOne({ email });
  }

  async save(data: any) : Promise<ServiceRequest> {
    const serviceRequest = new ServiceRequestModel(data);
    await serviceRequest.save();
    return serviceRequest;
  }
}