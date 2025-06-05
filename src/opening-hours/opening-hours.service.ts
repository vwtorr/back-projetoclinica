// src/opening-hours/opening-hours.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpeningHour } from './entities/opening_hours.entity';
import { CreateOpeningHourDto } from './dto/create-opening-hour.dto';
import { UpdateOpeningHourDto } from './dto/update-opening-hour.dto';

@Injectable()
export class OpeningHoursService {
  constructor(
    @InjectRepository(OpeningHour)
    private readonly openingHourRepository: Repository<OpeningHour>,
  ) {}

  create(dto: CreateOpeningHourDto) {
    const openingHour = this.openingHourRepository.create(dto);
    return this.openingHourRepository.save(openingHour);
  }

  findAll() {
    return this.openingHourRepository.find();
  }

  findOne(id: number) {
    return this.openingHourRepository.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateOpeningHourDto) {
    return this.openingHourRepository.update(id, dto);
  }

  remove(id: number) {
    return this.openingHourRepository.delete(id);
  }
}