import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { IsValidDays } from 'src/common/decorators/days-validator.decorator';

export class CreateAssistantInfoDto {
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

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  medicId: string;
}
