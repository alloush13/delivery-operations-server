import { MinLength, Length, IsNotEmpty} from "class-validator";

export class CreateTechnicianDto {
    @IsNotEmpty()
    name: string;

    @Length(10, 15)
    phone: string;

    @IsNotEmpty()
    vehicleType: string;

    @MinLength(6)
    password: string;
}