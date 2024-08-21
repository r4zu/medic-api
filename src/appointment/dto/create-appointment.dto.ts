import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

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
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'completed', 'canceled'])
  status?: 'pending' | 'completed' | 'canceled';

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  medicId: string;
}
