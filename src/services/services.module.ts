import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { serviceProviders } from './entities/service.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicesController],
  providers: [...serviceProviders, ServicesService],
})
export class ServicesModule {}
