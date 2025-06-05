import { PartialType } from '@nestjs/swagger';
import { CreatePatientsNoteDto } from './create-patients_note.dto';

export class UpdatePatientsNoteDto extends PartialType(CreatePatientsNoteDto) {}
