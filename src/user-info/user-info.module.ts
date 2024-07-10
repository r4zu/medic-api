import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { UserInfo } from './entities/user-info.entity';

import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo]), AuthModule],
  controllers: [UserInfoController],
  providers: [UserInfoService],
})
export class UserInfoModule {}
