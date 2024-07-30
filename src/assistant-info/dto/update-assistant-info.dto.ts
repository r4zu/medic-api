import { PartialType } from '@nestjs/swagger';
import { CreateAssistantInfoDto } from './create-assistant-info.dto';

export class UpdateAssistantInfoDto extends PartialType(
  CreateAssistantInfoDto,
) {}
