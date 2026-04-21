import {
  IsNotEmpty,
  Length,
  MinLength,
  IsArray,
  IsOptional,
  IsString,
} from "class-validator";

export class RegisterTechnicianDto {
  @IsNotEmpty()
  name: string;

  @Length(10, 15)
  phone: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills: string[];

  @MinLength(6)
  password: string;
}