import { Module } from '@nestjs/common';
import { PositionsSalariesService } from './positions_salaries.service';
import { PositionsSalariesController } from './positions_salaries.controller';
import { positionsSalariesProviders } from './entities/positions_salary.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PositionsSalariesController],
  providers: [...positionsSalariesProviders, PositionsSalariesService],
})
export class PositionsSalariesModule {}
