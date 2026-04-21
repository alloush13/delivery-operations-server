import { Admin } from "./admin.entity";

export interface AdminRepository {
  findAll(): Promise<Admin[]>;
  findById(id: string): Promise<Admin | null>;
  save(admin: Admin): Promise<Admin>;
}