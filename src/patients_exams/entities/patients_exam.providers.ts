import { DataSource } from 'typeorm';
import { PatientsExam } from './patients_exam.entity';

export const patientsExamProviders = [
  {
    provide: 'PATIENTS_EXAM_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PatientsExam),
    inject: ['DATA_SOURCE'],
  },
];
