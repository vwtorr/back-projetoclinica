import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    description: 'The user ID associated with the patient exam',
    type: Number,
    nullable: false,
  })
  readonly userId: string;

  @ApiProperty({
    description: 'The neighborhood of the address',
    type: String,
    nullable: true,
  })
  readonly neighborhood: string;

  @ApiProperty({
    description: 'The zip code of the address',
    type: String,
    nullable: true,
  })
  readonly zipCode: string;

  @ApiProperty({
    description: 'The state of the address',
    type: String,
    nullable: true,
  })
  readonly state: string;

  @ApiProperty({
    description: 'The street of the address',
    type: String,
    nullable: true,
  })
  readonly street: string;

  @ApiProperty({
    description: 'The number of the address',
    type: String,
    nullable: true,
  })
  readonly number: string;

  @ApiProperty({
    description: 'The city of the address',
    type: String,
    nullable: true,
  })
  readonly city: string;
}
