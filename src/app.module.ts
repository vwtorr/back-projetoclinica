import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- IMPORTANTE
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { ExpensesModule } from './expenses/expenses.module';
import { PatientsExamsModule } from './patients_exams/patients_exams.module';
import { PositionsSalariesModule } from './positions_salaries/positions_salaries.module';
import { AddressModule } from './address/address.module';
import { PatientsNotesModule } from './patients_notes/patients_notes.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { HttpModule } from '@nestjs/axios';
import { OpeningHoursModule } from './opening-hours/opening-hours.module';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'bancoclinica.postgres.uhserver.com',
      port: 5432,
      username: 'ufersa',
      password: 'admin01-',
      database: 'bancoclinica',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),

    AuthModule,
    UsersModule,
    ServicesModule,
    ExpensesModule,
    PatientsExamsModule,
    PositionsSalariesModule,
    AddressModule,
    PatientsNotesModule,
    RolesModule,
    HttpModule,
    OpeningHoursModule,
  ],
})
export class AppModule {}
