import { Schema, model } from "mongoose";
import { Admin } from "./interfaces/admin.entity";

const AdminSchema = new Schema<Admin>(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const AdminModel = model<Admin>(
  "Admin",
  AdminSchema
);