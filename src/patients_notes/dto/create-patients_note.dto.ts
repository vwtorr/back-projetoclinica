import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientsNoteDto {
  @ApiProperty({
    description: 'The user ID associated with the patient',
    type: [String],
    nullable: true,
  })
  readonly userId: string[];

  @ApiProperty({
    description: 'The blood type of the patient',
    type: String,
    nullable: true,
  })
  readonly bloodType: string;

  @ApiProperty({
    description: 'List of allergies associated with the patient',
    type: [String],
    nullable: true,
  })
  readonly allergy: string[];
}
