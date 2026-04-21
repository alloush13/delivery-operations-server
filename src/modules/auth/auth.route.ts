import { Router } from "express";
import AuthController from "./auth.controller.js";


export const authRoutes = (controller: AuthController) => {
    const router = Router();
    router.post("/admins/register", (req, res) => controller.register(req, res, "admin"));
    router.post("/technicians/register", (req, res) => controller.register(req, res, "technician"));
    return router;
}

