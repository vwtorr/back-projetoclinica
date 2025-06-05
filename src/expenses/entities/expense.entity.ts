import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from '../../database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('expenses')
export class Expense extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'document' })
  document: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'description' })
  description: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'release_date' })
  releaseDate: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'value' })
  value: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'type' })
  type: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'status' })
  status: string;
}
