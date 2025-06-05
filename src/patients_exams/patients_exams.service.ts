import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePatientsExamDto } from './dto/create-patients_exam.dto';
import { UpdatePatientsExamDto } from './dto/update-patients_exam.dto';
import { PatientsExam } from './entities/patients_exam.entity';
import { Between, ILike, Repository } from 'typeorm';

@Injectable()
export class PatientsExamsService {
  constructor(
    @Inject('PATIENTS_EXAM_REPOSITORY')
    private patientsExamRepository: Repository<PatientsExam>,
  ) { }

  async create(
    createPatientsExamDto: CreatePatientsExamDto,
  ): Promise<PatientsExam> {
    try {
      console.clear()
      const data = { ...createPatientsExamDto, createdAt: createPatientsExamDto.dateTime }
      console.log(data)
      const newRegister = this.patientsExamRepository.create(
        data,
      );
      return await this.patientsExamRepository.save(newRegister);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(
    search: string,
    initialDate: string,
    finalDate: string,
  ): Promise<PatientsExam[]> {
    try {
      let where = [];

      if (search) {
        where = [
          { user: { name: ILike(`%${search}%`) } },
          { service: { price: ILike(`%${search}%`) } },
        ];
      }
      if (initialDate && finalDate) {
        where.push({ dateTime: Between(initialDate, finalDate) });
      }

      return await this.patientsExamRepository.find({
        where,
        relations: {
          user: true,
          service: true,
        },
      });
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async patientsGroupById(id: number): Promise<PatientsExam[]> {
    try {
      const exams = await this.patientsExamRepository
        .createQueryBuilder('patients_exam')
        .innerJoinAndSelect('patients_exam.user', 'user')
        .innerJoinAndSelect('patients_exam.service', 'service')
        .where('user.id = :id', { id })
        .orderBy('patients_exam.id', 'DESC')
        .getMany();

      return exams;
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async patientsGroupByIdAndDate(id: number, date: string): Promise<PatientsExam[]> {
    try {
      const exams = await this.patientsExamRepository
        .createQueryBuilder('patients_exam')
        .innerJoinAndSelect('patients_exam.user', 'user')
        .innerJoinAndSelect('patients_exam.service', 'service')
        .where('user.id = :id', { id })
        .andWhere('patients_exam.date_time = :date', { date })
        .orderBy('patients_exam.id', 'DESC')
        .getMany();
        console.log(date);

      return exams;

    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<PatientsExam> {
    try {
      return await this.patientsExamRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: number,
    updatePatientsExamDto: UpdatePatientsExamDto,
  ): Promise<PatientsExam> {
    try {
      const {
        dateTime,
        paymentMethods,
        paymentStatus,
        serviceId,
        statusExam,
        userId,
      } = updatePatientsExamDto;
      const patientsExams = await this.findOne(id);
      if (!patientsExams) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }
      if (dateTime) {
        patientsExams.dateTime = dateTime;
      }
      if (paymentMethods) {
        patientsExams.paymentMethods = paymentMethods;
      }
      if (paymentStatus) {
        patientsExams.paymentStatus = paymentStatus;
      }
      if (serviceId) {
        patientsExams.serviceId = serviceId;
      }
      if (statusExam) {
        patientsExams.statusExam = statusExam;
      }
      if (userId) {
        patientsExams.userId = userId;
      }

      patientsExams.updatedAt = new Date();
      return await this.patientsExamRepository.save(patientsExams);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<PatientsExam> {
    try {
      const patientsExams = await this.findOne(id);
      if (!patientsExams) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }
      return await this.patientsExamRepository.softRemove(patientsExams);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
