import { AdminRepository } from "./admin.repository";

export class AdminService {
  constructor(private adminRepo: AdminRepository) {}

  async createAdmin(data: any) {
    return this.adminRepo.save(data);
  }



}
