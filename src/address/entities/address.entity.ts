import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from '../../database/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('address')
export class Address extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'user_id' })
  userId: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'neighborhood' })
  neighborhood: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'zip_code' })
  zipCode: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'state' })
  state: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'street' })
  street: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'number' })
  number: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, name: 'city' })
  city: string;

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
