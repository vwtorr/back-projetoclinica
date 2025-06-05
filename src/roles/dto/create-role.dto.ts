import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Name',
    type: String,
    nullable: false,
  })
  readonly name: string;
}
