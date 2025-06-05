import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const newRegister = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(newRegister);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Role[]> {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Role> {
    try {
      return await this.roleRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      const { name } = updateRoleDto;
      const role = await this.findOne(id);
      if (!role) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }
      if (name) {
        role.name = name;
      }
      role.updatedAt = new Date();
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<Role> {
    try {
      const role = await this.findOne(id);
      if (!role) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }
      return await this.roleRepository.softRemove(role);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
