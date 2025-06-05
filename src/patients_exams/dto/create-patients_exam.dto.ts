import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientsExamDto {
  @ApiProperty({
    description: 'The user ID associated with the patient exam',
    type: Number,
    nullable: false,
  })
  readonly userId: number;

  @ApiProperty({
    description: 'The service ID associated with the exam',
    type: Number,
    nullable: false,
  })
  readonly serviceId: number;

  @ApiProperty({
    description: 'The service ID associated with the exam',
    nullable: false,
  })
  readonly paymentMethods: JSON;

  @ApiProperty({
    description: 'The date and time of the exam',
    type: String,
    nullable: true,
  })
  readonly dateTime: string;

  @ApiProperty({
    description: 'The status of the exam',
    type: String,
    nullable: true,
  })
  readonly statusExam: string;

  @ApiProperty({
    description: 'The payment status of the exam',
    type: String,
    nullable: true,
  })
  readonly paymentStatus: string;
}
