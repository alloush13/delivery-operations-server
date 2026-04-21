import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { adminRoutes } from "./admin.route";
import { Module } from "../../core/module/module.interface";
import { Container } from "../../core/container";
import { AdminRepository } from "./admin.repository";
import { Server } from "src/core/server";
import { AdminSocket } from "./admin.socket";

export class AdminModule implements Module {
  register() {
    Container.singleton(AdminRepository, () => new AdminRepository());
    Container.singleton(AdminService, () => new AdminService(Container.resolve(AdminRepository)));
    Container.singleton(AdminController, () => new AdminController(Container.resolve(AdminService)));
    Container.singleton(AdminSocket, () => new AdminSocket());
  }

  boot() {
    const server = Container.resolve(Server);
    const adminController = Container.resolve(AdminController);
    server.router.use("/admins", adminRoutes(adminController));
  }
}
