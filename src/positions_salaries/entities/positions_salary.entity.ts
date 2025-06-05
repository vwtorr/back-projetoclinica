import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from '../../database/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity('positions_salaries')
export class PositionsSalary extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'position' })
  position: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'remuneration' })
  remuneration: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'hiring_date' })
  hiringDate: string;

  @OneToOne(() => User, (user) => user.salary)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
