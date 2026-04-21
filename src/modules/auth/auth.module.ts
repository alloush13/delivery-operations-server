import AuthService from "./auth.service";
import AuthController from "./auth.controller";
import { authRoutes } from "./auth.route";
import { Module } from "../../core/module/module.interface";
import { Container } from "../../core/container";
import { AuthFactory } from "./auth.factory";
import { AdminStrategy } from "./strategies/admin.strategy";
import { TechnicianStrategy } from "./strategies/technician.strategy";
import { AdminService } from "../admin/admin.service";
import { TechnicianService } from "../technician/technician.service";
import { JwtService } from "src/core/services/jwt.service";
import { Server } from "src/core/server";

export class AuthModule implements Module {
      register() {
        Container.singleton(AdminStrategy, () => new AdminStrategy(Container.resolve(AdminService)));
        Container.singleton(TechnicianStrategy, () => new TechnicianStrategy(Container.resolve(TechnicianService)));
        Container.singleton(AuthFactory, () => new AuthFactory(Container.resolve(AdminStrategy), Container.resolve(TechnicianStrategy)));
        Container.singleton(AuthService, () => new AuthService(Container.resolve(AuthFactory), Container.resolve(JwtService)));
        Container.singleton(AuthController, () => new AuthController(Container.resolve(AuthService)));
      }

      boot() {
        const server = Container.resolve(Server);
        const authController = Container.resolve(AuthController);
        server.router.use("/auth", authRoutes(authController));
      }
      
}