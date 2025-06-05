import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from '../../database/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { PatientsNote } from '../../patients_notes/entities/patients_note.entity';
import { PositionsSalary } from '../../positions_salaries/entities/positions_salary.entity';
import { PatientsExam } from '../../patients_exams/entities/patients_exam.entity';
import { Address } from '../../address/entities/address.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty()
  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string;

  @ApiProperty()
  @Column({
    name: 'email',
    type: 'varchar',
  })
  email: string;

  @ApiProperty()
  @Column({
    name: 'password',
    type: 'varchar',
    unique: false,
  })
  password: string;

  @ApiProperty()
  @Column({
    name: 'document',
    type: 'varchar',
  })
  document: string;

  @ApiProperty()
  @Column({
    name: 'birth_date',
    type: 'date',
    nullable: false,
  })
  birthDate: Date;

  @ApiProperty()
  @Column({
    name: 'phone_number',
    type: 'varchar',
    nullable: true,
  })
  phoneNumber: string;

  @ApiProperty()
  @Column({
    name: 'status',
    type: 'bool',
    default: true,
  })
  status: boolean;

  @ApiProperty()
  @Column({
    name: 'role_id',
    type: 'varchar',
  })
  roleId: string;

  @OneToOne(() => PatientsNote, (notes) => notes.user, {
    cascade: ['soft-remove'],
    eager: true,
  })
  notes: PatientsNote;

  @OneToOne(() => PositionsSalary, (salary) => salary.user, {
    cascade: ['soft-remove'],
    eager: true,
  })
  salary: PositionsSalary;

  @OneToMany(() => PatientsExam, (exams) => exams.user, {
    cascade: ['soft-remove'],
    eager: true,
  })
  exams: PatientsExam[];

  @OneToOne(() => Address, (address) => address.user, {
    cascade: ['soft-remove'],
    eager: true,
  })
  address: Address;

  @ManyToOne(() => Role, (role) => role.user, {
    eager: true,
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
