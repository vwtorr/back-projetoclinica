import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'email user',
    type: String,
    nullable: false,
  })
  readonly email: string;

  @ApiProperty({
    description: 'passworduser',
    type: String,
    nullable: false,
  })
  readonly password: string;
}
