import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsIn, IsNotEmpty, IsString } from 'class-validator';

import { IsValidDni } from '../decorators/dni-validator.decorator';
import { TransformDate } from '../../common/transformers/date.transformer';

export class CreateUserInfoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(['cedula', 'pasaporte', 'RUC'], {
    message: 'dniType must be -cedula-, -pasaporte- o -RUC-',
  })
  dniType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsValidDni()
  dni: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsDate()
  @TransformDate()
  @IsNotEmpty()
  dob: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}
