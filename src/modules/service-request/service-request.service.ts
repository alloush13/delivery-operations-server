import { plainToInstance } from "class-transformer";
import { ServiceRequestRepository } from "./interfaces/service-request.repository";
import { CreateServiceRequestDto } from "./dto/create-service-request.dto";
import { validate } from "class-validator";
import { ServiceRequest as IServiceRequest } from "./interfaces/service-request.entity";
export class ServiceRequestService {
  constructor(private repo: ServiceRequestRepository) {}

  async createServiceRequest(data: any) {
    const dto = plainToInstance(CreateServiceRequestDto, data);

    const errors = await validate(dto);
    if (errors.length > 0) {
      const messages = errors.map((err) => Object.values(err.constraints || {})).flat();

      throw new Error(messages.join(", "));
    }
    const serviceRequest: IServiceRequest = {
      referenceNumber: dto.referenceNumber,
      customerName: dto.customerName,
      customerPhone: dto.customerPhone,
      status: "new",
      area: dto.area,
      fullAddress: dto.fullAddress,
      location: dto.location,
      category: dto.category,
    };
    return this.repo.save(serviceRequest);
  }

  async getAllServiceRequests() {
    return await this.repo.findAll();
  }

  async getServiceRequestById(id: string) {
    try {
      const serviceRequest = await this.repo.findById(id);
      return serviceRequest;
    } catch (error) {
      throw new Error("Invalid serviceRequest ID");
    }
  }

  async assignServiceRequestToTechnician(id: string, technicianId: string) {
    const serviceRequest = await this.getServiceRequestById(id);
    if (!serviceRequest) {
      throw new Error("Service request not found");
    }
    serviceRequest.technicianId = technicianId;
    serviceRequest.status = "assigned";
    return await this.repo.save(serviceRequest);
  }
}
