// src/opening-hours/dto/create-opening-hour.dto.ts
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateOpeningHourDto {
  @IsString()
  dayOfWeek: string;

  @IsBoolean()
  isOpen: boolean;

  @IsOptional()
  openTime?: string;

  @IsOptional()
  closeTime?: string;

  @IsOptional()
  lunchStart?: string;

  @IsOptional()
  lunchEnd?: string;
}