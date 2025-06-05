import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from '../../database/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('patients_notes')
export class PatientsNote extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', nullable: false, name: 'user_id' })
  userId: string[];

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'blood_type' })
  bloodType: string;

  @ApiProperty()
  @Column('varchar', { array: true, nullable: true, name: 'allergy' })
  allergy: string[];

  @OneToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
