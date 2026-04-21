import { Technician } from "./technician.entity";

export interface TechnicianRepository {
  findAll(): Promise<Technician[]>;
  findById(id: string): Promise<Technician | null>;
  save(technician: Technician): Promise<Technician>;
}