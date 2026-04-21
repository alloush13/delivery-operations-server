import { Admin } from "./interfaces/admin.entity";
import { AdminRepository as IAdminRepository } from "./interfaces/admin.repository";

import { AdminModel } from "./admin.model";
export class AdminRepository implements IAdminRepository {

  findAll(): Promise<Admin[]> {
    return AdminModel.find();
  }
  findById(id: string): Promise<Admin | null> {
    return AdminModel.findById(id);
  }
  findByEmail(email: string): Promise<Admin | null> {
    return AdminModel.findOne({ email });
  }
  save(admin: Admin): Promise<Admin> {
    return AdminModel.create(admin);
  }
}