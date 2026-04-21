import { AuthStrategy } from "./auth.strategy";
import { RegisterAdminDto } from "../dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import bcrypt from "bcrypt";
import { AdminService } from "../../../modules/admin/admin.service";

export class AdminStrategy implements AuthStrategy {
    constructor(private readonly adminService: AdminService) {}
  async register(data: RegisterAdminDto) {
    const dto = plainToInstance(RegisterAdminDto, data);

    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();

      throw new Error(messages.join(", "));
    }

     const hashedPassword = await bcrypt.hash(dto.password, 10);

    const admin = await this.adminService.createAdmin({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
     })
    

    return admin;
  }

  async login(data: any) {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const admin = {
      id: 1,
      email,
      role: "admin",
    };

    return admin;
  }
}