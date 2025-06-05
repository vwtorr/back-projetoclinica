import { Module } from '@nestjs/common';
import { PatientsNotesService } from './patients_notes.service';
import { PatientsNotesController } from './patients_notes.controller';
import { patientsNoteProviders } from './entities/patients_note.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PatientsNotesController],
  providers: [...patientsNoteProviders, PatientsNotesService],
})
export class PatientsNotesModule {}
