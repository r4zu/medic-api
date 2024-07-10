import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserInfoDto } from './create-user-info.dto';

export class UpdateUserInfoDto extends PartialType(
  OmitType(CreateUserInfoDto, ['dni', 'dniType'] as const),
) {}
