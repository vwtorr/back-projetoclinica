import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      const newRegister = this.addressRepository.create(createAddressDto);
      return await this.addressRepository.save(newRegister);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Address[]> {
    try {
      return await this.addressRepository.find();
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Address> {
    try {
      return await this.addressRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    try {
      const { city, neighborhood, number, state, street, zipCode } =
        updateAddressDto;
      const address = await this.findOne(id);
      if (!address) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }

      if (city) {
        address.city = city;
      }
      if (neighborhood) {
        address.neighborhood = neighborhood;
      }
      if (number) {
        address.number = number;
      }
      if (state) {
        address.state = state;
      }
      if (street) {
        address.street = street;
      }
      if (zipCode) {
        address.zipCode = zipCode;
      }
      address.updatedAt = new Date();
      return await this.addressRepository.save(address);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<Address> {
    try {
      const address = await this.findOne(id);
      if (!address) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }
      return await this.addressRepository.softRemove(address);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
