import { Controller, Post, Body, Patch, Get } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';

import { AssistantInfo } from './entities/assistant-info.entity';
import { User } from 'src/auth/entities/user.entity';

import { AssistantInfoService } from './assistant-info.service';

import { CreateAssistantInfoDto } from './dto/create-assistant-info.dto';
import { UpdateAssistantInfoDto } from './dto/update-assistant-info.dto';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('assistant-info')
@Auth()
export class AssistantInfoController {
  constructor(private readonly assistantInfoService: AssistantInfoService) {}

  @Post()
  @Auth(ValidRoles.assistant)
  create(
    @GetUser() user: User,
    @Body() createAssistantInfoDto: CreateAssistantInfoDto,
  ): Promise<AssistantInfo> {
    return this.assistantInfoService.create(user, createAssistantInfoDto);
  }

  @Get()
  findAssistantInfoByUser(@GetUser() user: User): Promise<AssistantInfo> {
    return this.assistantInfoService.findAssistantInfoByUser(user);
  }

  @Patch()
  @Auth(ValidRoles.assistant)
  update(
    @GetUser() user: User,
    @Body() updateAssistantInfoDto: UpdateAssistantInfoDto,
  ): Promise<AssistantInfo> {
    return this.assistantInfoService.update(user, updateAssistantInfoDto);
  }
}
