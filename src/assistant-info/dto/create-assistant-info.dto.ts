import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { TransformDateWithHour } from 'src/common/transformers/date.transformer';
import { IsValidDays } from 'src/common/decorators/days-validator.decorator';

export class CreateAssistantInfoDto {
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

  @ApiProperty()
  @IsString()
  @IsEmail()
  emailMedic: string;
}
