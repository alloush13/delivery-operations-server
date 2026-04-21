import {
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  IsNumber,
  IsOptional,
} from "class-validator";
import { LocationDto } from "./locatin.dto";

export class CreateServiceRequestDto {
  @IsNotEmpty()
  @IsString()
  referenceNumber: string;

  @IsNotEmpty()
  @IsString()
  customerName: string;

  @Length(10, 15)
  customerPhone: string;

  @IsNotEmpty()
  @IsString()
  area: string;

  @IsNotEmpty()
  @IsString()
  fullAddress: string;

 
  location: LocationDto;


  @IsNotEmpty()
  @IsString()
  category: string;

  @IsEnum(["low", "medium", "high"])
  @IsOptional()
  priority?: "low" | "medium" | "high";
}