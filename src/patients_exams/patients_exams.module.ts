import { Module } from '@nestjs/common';
import { PatientsExamsService } from './patients_exams.service';
import { PatientsExamsController } from './patients_exams.controller';
import { DatabaseModule } from '../database/database.module';
import { patientsExamProviders } from './entities/patients_exam.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PatientsExamsController],
  providers: [...patientsExamProviders, PatientsExamsService],
})
export class PatientsExamsModule {}
