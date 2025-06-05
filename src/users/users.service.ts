import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
     
      const hash = await argon2.hash(
        createUserDto?.password ?? 'defaultPassword',
      );

     
      const roleId = String(createUserDto?.roleId ?? 2);

      const newRegister = this.userRepository.create({
        ...createUserDto,
        password: hash,
        roleId: roleId,
      });

   
      return await this.userRepository.save(newRegister);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(type: string, search: string): Promise<User[]> {
    try {
      let where = [];

      if (search) {
        where = [
          { name: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
          { document: ILike(`%${search}%`) },
          { phoneNumber: ILike(`%${search}%`) },
        ];
      }

      if (type) {
        where.push({ role: { name: type } });
      }

      return await this.userRepository.find({ where });
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const {
        birthDate,
        document,
        email,
        name,
        password,
        phoneNumber,
        status,
        resetPassword,
      } = updateUserDto;
      const user = await this.findOne(id);
      if (!user) {
        throw new HttpException(
          'Usuario nao encontrado',
          HttpStatus?.NOT_FOUND,
        );
      }
      if (birthDate) {
        user.birthDate = birthDate;
      }
      if (document) {
        user.document = document;
      }
      if (email) {
        user.email = email;
      }
      if (name) {
        user.name = name;
      }
      if (password) {
        user.password = password;
      }
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
      if (status == true || status == false) {
        user.status = status;
      }
      if (resetPassword) {
        const hash = await argon2.hash('mudar123');
        user.password = hash;
      }
      user.updatedAt = new Date();
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new HttpException(
          'Usuario nao encontrado',
          HttpStatus?.NOT_FOUND,
        );
      }
      return await this.userRepository.softRemove(user);
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email: email } });
    } catch (error) {
      throw new HttpException(
        error?.message,
        HttpStatus?.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
