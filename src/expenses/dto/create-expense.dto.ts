import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'The document associated with the expense',
    type: String,
    nullable: true,
  })
  readonly document: string;

  @ApiProperty({
    description: 'A description of the expense',
    type: String,
    nullable: true,
  })
  readonly description: string;

  @ApiProperty({
    description: 'The release date of the expense',
    type: String,
    nullable: true,
  })
  readonly releaseDate: string;

  @ApiProperty({
    description: 'The value of the expense',
    type: String,
    nullable: true,
  })
  readonly value: string;

  @ApiProperty({
    description: 'The type of the expense',
    type: String,
    nullable: true,
  })
  readonly type: string;

  @ApiProperty({
    description: 'The release type of the expense',
    type: String,
    nullable: true,
  })
  
  readonly status: string;
}
