import mongoose from "mongoose";
import { databaseConfig } from "../../config/database.config";

export class DatabaseService {
  async connect() {
    try {
      await mongoose.connect(databaseConfig.uri)
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB error:", error);
      throw error;
    }
  }
}