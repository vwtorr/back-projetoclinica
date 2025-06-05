import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'bancoclinica.postgres.uhserver.com',
        port: 5432,
        username: 'ufersa',
        password: 'admin01-',
        database: 'bancoclinica',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logger: 'debug',
      });

      return dataSource.initialize();
    },
  },
];
