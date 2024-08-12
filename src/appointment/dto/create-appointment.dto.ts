import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';

import { TransformDateWithHour } from 'src/common/transformers/date.transformer';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsDate()
  @TransformDateWithHour()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty()
  @IsDate()
  @TransformDateWithHour()
  @IsNotEmpty()
  endTime: Date;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  medicId: string;
}
