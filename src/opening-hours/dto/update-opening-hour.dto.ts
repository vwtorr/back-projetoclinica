// src/opening-hours/dto/update-opening-hour.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateOpeningHourDto } from './create-opening-hour.dto';

export class UpdateOpeningHourDto extends PartialType(CreateOpeningHourDto) {}