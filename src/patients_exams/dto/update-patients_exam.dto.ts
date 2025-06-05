import { PartialType } from '@nestjs/swagger';
import { CreatePatientsExamDto } from './create-patients_exam.dto';

export class UpdatePatientsExamDto extends PartialType(CreatePatientsExamDto) {}
