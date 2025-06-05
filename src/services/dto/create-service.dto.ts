import { ApiProperty } from '@nestjs/swagger';
import { Double } from 'typeorm';

export class CreateServiceDto {
  @ApiProperty({
    description: 'The unique code of the service',
    type: String,
    maxLength: 26,
  })
  readonly code: string;

  @ApiProperty({
    description: 'The name of the service',
    type: String,
    maxLength: 26,
  })
  readonly name: string;

  @ApiProperty({
    description: 'A description of the service',
    type: String,
    nullable: true,
  })
  readonly description: string;

  @ApiProperty({
    description: 'The price of the service',
    type: String,
    nullable: true,
  })
  readonly price: string;

  @ApiProperty({
    description: 'The status of the service (active or inactive)',
    type: Boolean,
    default: true,
  })
  readonly status: boolean;
}
