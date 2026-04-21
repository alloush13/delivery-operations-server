import { TechnicianRepository } from "./interfaces/technician.repository";
export class TechnicianService {
  constructor(private repo: TechnicianRepository) {}

  async createTechnician(data: any) {
    return this.repo.save(data);
  }

  async getAllTechnicians() {
    return await this.repo.findAll();
  }

  async getTechnicianById(id: string) {
  try {
    const technician = await this.repo.findById(id);
    return technician;
  }
    catch (error) { 
      throw new Error("Invalid technician ID");
    }
    
 

  }


  updateStatus(id: string, status: "online" | "offline") {
    return this.repo.findById(id).then((technician) => {
      if (!technician) {
        throw new Error("Technician not found");
      }
      technician.availability = status;
      return this.repo.save(technician);
    });
  }
  updateLocation(id: string, location: any) {
    return this.repo.findById(id).then((technician) => {
      if (!technician) {
        throw new Error("Technician not found");
      }
      technician.currentLocation = location;
      return this.repo.save(technician);
    });
  }
}
