import { DataSource } from 'typeorm';
import { PositionsSalary } from './positions_salary.entity';

export const positionsSalariesProviders = [
  {
    provide: 'POSOTIONS_SALARYS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PositionsSalary),
    inject: ['DATA_SOURCE'],
  },
];
