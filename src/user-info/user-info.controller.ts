import { Controller, Post, Body, Patch, Get } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';

import { UserInfo } from './entities/user-info.entity';
import { User } from 'src/auth/entities/user.entity';

import { UserInfoService } from './user-info.service';

import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Controller('user-info')
@Auth()
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createUserInfoDto: CreateUserInfoDto,
  ): Promise<UserInfo> {
    const userInfo = new UserInfo();
    Object.assign(userInfo, createUserInfoDto);
    return this.userInfoService.create(user, createUserInfoDto);
  }

  @Get()
  findUserInfoByUser(@GetUser() user: User): Promise<UserInfo> {
    return this.userInfoService.findUserInfoByUser(user);
  }

  @Patch()
  update(
    @GetUser() user: User,
    @Body() updateUserInfoDto: UpdateUserInfoDto,
  ): Promise<UserInfo> {
    const userInfo = new UserInfo();
    Object.assign(userInfo, updateUserInfoDto);
    return this.userInfoService.update(user, updateUserInfoDto);
  }
}
