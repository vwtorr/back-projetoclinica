import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePatientsNoteDto } from './dto/create-patients_note.dto';
import { UpdatePatientsNoteDto } from './dto/update-patients_note.dto';
import { Repository } from 'typeorm';
import { PatientsNote } from './entities/patients_note.entity';

@Injectable()
export class PatientsNotesService {
  constructor(
    @Inject('PATIENTS_NOTE_REPOSITORY')
    private patientNoteRepository: Repository<PatientsNote>,
  ) {}
  async create(
    createPatientsNoteDto: CreatePatientsNoteDto,
  ): Promise<PatientsNote> {
    try {
      const newRegister = this.patientNoteRepository.create(
        createPatientsNoteDto,
      );
      return await this.patientNoteRepository.save(newRegister);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<PatientsNote[]> {
    try {
      return await this.patientNoteRepository.find();
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<PatientsNote> {
    try {
      return await this.patientNoteRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: number,
    updatePatientsNoteDto: UpdatePatientsNoteDto,
  ): Promise<PatientsNote> {
    try {
      const { allergy, bloodType } = updatePatientsNoteDto;
      const patientsNotes = await this.findOne(id);
      if (!patientsNotes) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }
      if (allergy) {
        patientsNotes.allergy = allergy;
      }
      if (bloodType) {
        patientsNotes.bloodType = bloodType;
      }

      patientsNotes.updatedAt = new Date();
      return await this.patientNoteRepository.save(patientsNotes);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<PatientsNote> {
    try {
      const patientsNotes = await this.findOne(id);
      if (!patientsNotes) {
        throw new HttpException('nao encontrado', HttpStatus?.NOT_FOUND);
      }
      return await this.patientNoteRepository.softRemove(patientsNotes);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
