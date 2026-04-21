import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { RegisterTechnicianDto } from "../dto/register-technician.dto";
import { AuthStrategy } from "./auth.strategy";
import { TechnicianService } from "../../technician/technician.service";
import bcrypt from "bcrypt";

export class TechnicianStrategy implements AuthStrategy {
  constructor(private readonly technicianService: TechnicianService) {}
  async register(data: RegisterTechnicianDto) {
    
    const dto = plainToInstance(RegisterTechnicianDto, data);

    console.log(dto);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();

      throw new Error(messages.join(", "));
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
        const technician = await this.technicianService.createTechnician({
            name: dto.name,
            phone: dto.phone,
            password: hashedPassword,
            skills: dto.skills,
        });
        return technician;
  }

  async login(data: any) {
    return { ...data, role: "technician" };
  }
}
