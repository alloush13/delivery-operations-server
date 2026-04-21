import { Schema, model } from "mongoose";
import { Technician } from "./interfaces/technician.entity";

const TechnicianSchema = new Schema<Technician>(
  {
    name: { type: String, required: true },

    phone: { type: String, required: true, unique: true },

    skills: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    availability: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },

    currentLocation: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
  },
  {
    timestamps: true,
  }
);

export const TechnicianModel = model<Technician>(
  "Technician",
  TechnicianSchema
);