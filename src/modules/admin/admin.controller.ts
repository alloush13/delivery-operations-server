import { AdminService } from "./admin.service";
export class AdminController {
  constructor(private adminService: AdminService) {}

  getAdminService() {
    return this.adminService;
  }

}