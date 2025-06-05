import { ApiProperty } from '@nestjs/swagger';

export class CreatePositionsSalaryDto {
  @ApiProperty({
    description: 'The user ID associated with the position and salary',
    type: Number,
  })
  readonly userId: number;

  @ApiProperty({
    description: 'The position for the user',
    type: String,
    nullable: true,
  })
  readonly position: string;

  @ApiProperty({
    description: 'The remuneration for the position',
    type: String,
    nullable: true,
  })
  readonly remuneration: string;

  @ApiProperty({
    description: 'The hiring date of the position',
    type: String,
    nullable: true,
  })
  readonly hiringDate: string;
}
