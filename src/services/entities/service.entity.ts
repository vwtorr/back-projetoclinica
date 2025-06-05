import { ApiProperty } from '@nestjs/swagger';
import { Column, Double, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../../database/base.entity';
import { PatientsExam } from '../../patients_exams/entities/patients_exam.entity';

@Entity('services')
export class Service extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'char', length: 26, name: 'code' })
  code: string;

  @ApiProperty()
  @Column({ type: 'char', length: 26, name: 'name', unique: true })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'description' })
  description: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'price' })
  price: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: true, name: 'status' })
  status: boolean;

  @ManyToOne(() => PatientsExam, (exams) => exams.service)
  @JoinColumn({ name: 'service_id' })
  exams: PatientsExam;
}
