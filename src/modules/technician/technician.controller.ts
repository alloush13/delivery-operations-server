import { TechnicianService } from "./technician.service";
export class TechnicianController {
  constructor(private technicianService: TechnicianService) {}

  async getAllTechnicians(req: any, res: any) {
    const technicians = await this.technicianService.getAllTechnicians();
    return res.status(200).json({
      success: true,
      message: "List of all technicians",
      data: technicians,
    });
  }

  async getTechnicianById(req: any, res: any) {
    try {
      const { id } = req.params;
      const technician = await this.technicianService.getTechnicianById(id);
      if (!technician) {
        return res.status(404).json({
          success: false,
          message: "Technician not found",
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to retrieve technician details",
      });
    }
  }

  async updateLocation(req: any, res: any) {
    
  }
}
