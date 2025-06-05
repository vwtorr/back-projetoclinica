// src/opening-hours/opening-hours.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpeningHoursService } from './opening-hours.service';
import { OpeningHoursController } from './opening-hours.controller';
import { OpeningHour } from './entities/opening_hours.entity';


@Module({
  imports: [TypeOrmModule.forFeature([OpeningHour])],
  controllers: [OpeningHoursController],
  providers: [OpeningHoursService],
})
export class OpeningHoursModule {}
