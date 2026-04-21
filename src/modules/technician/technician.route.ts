import { Router } from "express";
import { TechnicianController } from "./technician.controller";


export const technicianRoutes = (controller: TechnicianController) => {
    const router = Router();

    router.get('/', (req, res) => controller.getAllTechnicians(req, res));
    router.get('/:id', (req, res) => controller.getTechnicianById(req, res));
    router.put('/:id/location', (req, res) => controller.updateLocation(req, res));

    return router;
}

