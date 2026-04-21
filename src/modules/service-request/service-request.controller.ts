import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateServiceRequestDto } from "./dto/create-service-request.dto";
import { ServiceRequestService } from "./service-request.service";

export class ServiceRequestController {
  constructor(private serviceRequestService: ServiceRequestService) {}

  async createServiceRequest(req: Request, res: Response) {
    try {
      const serviceRequest = await this.serviceRequestService.createServiceRequest(req.body);
      res.json({success: true,serviceRequest,});
    
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getAllServiceRequests(req: Request, res: Response) {
    const data = await this.serviceRequestService.getAllServiceRequests();
    res.json({ success: true, data });
  }

  async assignTechnician (req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const { technicianId } = req.body;

    try {
      await this.serviceRequestService.assignServiceRequestToTechnician(id, technicianId);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    } 
  }
}