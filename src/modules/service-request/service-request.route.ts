import { Router } from "express";
import { ServiceRequestController } from "./service-request.controller";

export const serviceRequestRoutes = (controller: ServiceRequestController) => {
  const router = Router();

  router.post("/", (req, res) => controller.createServiceRequest(req, res));

  router.get("/", (req, res) => controller.getAllServiceRequests(req, res));
  router.post("/:id/assign", (req, res) => controller.assignTechnician(req, res));

  //   router.get("/:id", (req, res) => controller.getServiceRequestById(req, res));

  //   router.put("/:id", (req, res) => controller.updateServiceRequest(req, res));

  //   router.delete("/:id", (req, res) => controller.deleteServiceRequest(req, res));

  return router;
};
