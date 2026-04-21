import { Router } from "express";
import {AdminController} from "./admin.controller";


export const adminRoutes = (controller: AdminController) => {
    const router = Router();

    return router;
}

