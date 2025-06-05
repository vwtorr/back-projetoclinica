import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The document of the user',
    type: String,
  })
  readonly document: string;

  @ApiProperty({
    description: 'The name of the user',
    type: String,
  })
  readonly name: string;

  @ApiProperty({
    description: 'The role of the user',
    type: String,
  })
  readonly roleId: string;

  @ApiProperty({
    description: 'The birth date of the user',
    type: String, // You can use 'string' or 'date' depending on how you want it to be formatted in the API
    format: 'date',
  })
  readonly birthDate: Date;

  readonly phoneNumber: string;

  @ApiProperty({
    description: 'The email address of the user',
    type: String,
  })
  readonly email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
  })
  readonly password: string;

  @ApiProperty({
    description: 'The status of the user (active, inactive, etc.)',
    type: Boolean,
  })
  readonly status: boolean;

  @ApiProperty({
    description: 'The status of the user (active, inactive, etc.)',
    type: Boolean,
  })
  readonly resetPassword: boolean;
}
