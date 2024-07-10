import { IsDate, IsIn, IsNotEmpty, IsString } from 'class-validator';

import { IsValidDni } from '../decorators/dni-validator.decorator';
import { TransformDate } from '../transformers/date.transformer';

export class CreateUserInfoDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['cedula', 'pasaporte', 'RUC'], {
    message: 'dniType must be -cedula-, -pasaporte- o -RUC-',
  })
  dniType: string;

  @IsString()
  @IsNotEmpty()
  @IsValidDni()
  dni: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  @TransformDate()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
