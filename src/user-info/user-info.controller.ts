import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators';

import { UserInfo } from './entities/user-info.entity';

import { UserInfoService } from './user-info.service';

import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Controller('user-info')
@Auth()
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  create(@Body() createUserInfoDto: CreateUserInfoDto): Promise<UserInfo> {
    const userInfo = new UserInfo();
    Object.assign(userInfo, createUserInfoDto);
    return this.userInfoService.create(createUserInfoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserInfoDto: UpdateUserInfoDto,
  ): Promise<UserInfo> {
    const userInfo = new UserInfo();
    Object.assign(userInfo, updateUserInfoDto);
    return this.userInfoService.update(id, updateUserInfoDto);
  }
}
