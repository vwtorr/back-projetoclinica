import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePositionsSalaryDto } from './dto/create-positions_salary.dto';
import { UpdatePositionsSalaryDto } from './dto/update-positions_salary.dto';
import { Repository } from 'typeorm';
import { PositionsSalary } from './entities/positions_salary.entity';

@Injectable()
export class PositionsSalariesService {
  constructor(
    @Inject('POSOTIONS_SALARYS_REPOSITORY')
    private positionsSalarysRepository: Repository<PositionsSalary>,
  ) {}

  async create(
    createPositionsSalaryDto: CreatePositionsSalaryDto,
  ): Promise<PositionsSalary> {
    try {
      const newRegister = this.positionsSalarysRepository.create(
        createPositionsSalaryDto,
      );
      return await this.positionsSalarysRepository.save(newRegister);
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<PositionsSalary[]> {
    try {
      return await this.positionsSalarysRepository.find();
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<PositionsSalary> {
    try {
      return await this.positionsSalarysRepository.findOne({
        where: { id: id },
      });
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updatePositionsSalaryDto: UpdatePositionsSalaryDto,
  ): Promise<PositionsSalary> {
    try {
      const { hiringDate, position, remuneration } = updatePositionsSalaryDto;
      const positionsSalaries = await this.findOne(id);
      if (!positionsSalaries) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }

      if (hiringDate) {
        positionsSalaries.hiringDate = hiringDate;
      }

      if (remuneration) {
        positionsSalaries.remuneration = remuneration;
      }

      if (position) {
        positionsSalaries.position = position;
      }

      positionsSalaries.updatedAt = new Date();
      return await this.positionsSalarysRepository.save(positionsSalaries);
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<PositionsSalary> {
    try {
      const positionsSalaries = await this.findOne(id);
      if (!positionsSalaries) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }
      return await this.positionsSalarysRepository.softRemove(
        positionsSalaries,
      );
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
