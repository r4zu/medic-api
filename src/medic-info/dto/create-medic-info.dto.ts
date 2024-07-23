import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

import { TransformDateWithHour } from 'src/common/transformers/date.transformer';
import { IsValidDays } from '../decorators/days-validator.decorator';

export class CreateMedicInfoDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  speciality: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  registry: string;

  @ApiProperty()
  @IsDate()
  @TransformDateWithHour()
  @IsNotEmpty()
  checkIn: Date;

  @ApiProperty()
  @IsDate()
  @TransformDateWithHour()
  @IsNotEmpty()
  checkOut: Date;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsValidDays()
  days: string[];
}
