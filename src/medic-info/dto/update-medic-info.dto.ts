import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateMedicInfoDto } from './create-medic-info.dto';

export class UpdateMedicInfoDto extends PartialType(
  OmitType(CreateMedicInfoDto, ['registry'] as const),
) {}
