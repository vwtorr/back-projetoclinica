import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from '../../database/base.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Service } from '../../services/entities/service.entity';

@Entity('patients_exams')
export class PatientsExam{

  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: null,
  })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', default: null })
  deletedAt: Date;

  @ApiProperty()
  @Column({ type: 'int', nullable: true, name: 'user_id' })
  userId: number;

  @ApiProperty()
  @Column({ type: 'int', nullable: true, name: 'service_id' })
  serviceId: number;

  @ApiProperty()
  @Column({
    type: 'json',
    nullable: true,
    name: 'payment_methods',
  })
  paymentMethods: JSON;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'date_time' })
  dateTime: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'status_exam' })
  statusExam: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'payment_status' })
  paymentStatus: string;

  @ManyToOne(() => User, (user) => user.exams)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Service, (service) => service.exams)
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
