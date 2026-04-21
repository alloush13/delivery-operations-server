import { TechnicianModel } from "./technician.model";
import { Technician } from "./interfaces/technician.entity";
import {TechnicianRepository as ITechnicianRepository } from "./interfaces/technician.repository";

export class TechnicianRepository implements ITechnicianRepository {
  async findAll() : Promise<Technician[]> {
    return await  TechnicianModel.find();
  }

  async findById(id: string) : Promise<Technician | null> {
    return await TechnicianModel.findById(id);
  }

  async findByEmail(email: string) : Promise<Technician | null> {
    return await TechnicianModel.findOne({ email });
  }

  async save(data: any) : Promise<Technician> {
    const technician = new TechnicianModel(data);
    await technician.save();
    return technician;
  }
}