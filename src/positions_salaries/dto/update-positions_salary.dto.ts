import { PartialType } from '@nestjs/swagger';
import { CreatePositionsSalaryDto } from './create-positions_salary.dto';

export class UpdatePositionsSalaryDto extends PartialType(CreatePositionsSalaryDto) {}
