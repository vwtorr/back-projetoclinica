import { DataSource } from 'typeorm';
import { PatientsNote } from './patients_note.entity';

export const patientsNoteProviders = [
  {
    provide: 'PATIENTS_NOTE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PatientsNote),
    inject: ['DATA_SOURCE'],
  },
];
