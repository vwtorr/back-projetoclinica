import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ILike, Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @Inject('SERVICE_REPOSITORY')
    private serviceRepository: Repository<Service>,
  ) { }
  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    try {
      const newRegister = this.serviceRepository.create({
        ...createServiceDto,
        status: true,
      });
      return await this.serviceRepository.save(newRegister);
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(search: string): Promise<Service[]> {
    try {
      let where = [];

      if (search) {
        where = [
          { code: ILike(`%${search}%`) },
          { name: ILike(`%${search}%`) },
          { description: ILike(`%${search}%`) },
          { price: ILike(`%${search}%`) },
        ];
      }

      return await this.serviceRepository.find({ where });
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      return await this.serviceRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<any> {
    try {
      const { code, description, name, price, status } = updateServiceDto;
      const service = await this.findOne(id);
      if (!service) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }
      if (code) {
        service.code = code;
      }
      if (description) {
        service.description = description;
      }
      if (name) {
        service.name = name;
      }
      if (price) {
        service.price = price;
      }
      if (status == true || status == false) {
        service.status = status;
      }
      service.updatedAt = new Date();
      return await this.serviceRepository.save(service);
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const service = await this.findOne(id);
      if (!service) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }
      return await this.serviceRepository.softRemove(service);
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
