import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import { IsValidDays } from 'src/common/decorators/days-validator.decorator';

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
  @IsString()
  @IsNotEmpty()
  checkIn: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  checkOut: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsValidDays()
  days: string[];
}
