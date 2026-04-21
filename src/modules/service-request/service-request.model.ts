import { Schema, model, Types } from "mongoose";
import { ServiceRequest } from "./interfaces/service-request.entity";

const ServiceRequestSchema = new Schema<ServiceRequest>(
  {
    referenceNumber: { type: String, required: true, unique: true },

    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },

    area: { type: String, required: true },
    fullAddress: { type: String, required: true },

    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },

    category: { type: String, required: true },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    status: {
      type: String,
      enum: [
        "new",
        "assigned",
        "on_the_way",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "new",
    },

    technicianId: {
      type: Schema.Types.ObjectId,
      ref: "Technician",
      default: null,
    },

    externalReference: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const ServiceRequestModel = model<ServiceRequest>(
  "ServiceRequest",
  ServiceRequestSchema
);