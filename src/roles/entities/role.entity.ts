import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from '../../database/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @ApiProperty()
  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  user: User;
}
