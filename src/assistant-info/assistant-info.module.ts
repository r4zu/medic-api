import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { AssistantInfo } from './entities/assistant-info.entity';

import { AssistantInfoService } from './assistant-info.service';
import { AssistantInfoController } from './assistant-info.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AssistantInfo]), AuthModule],
  controllers: [AssistantInfoController],
  providers: [AssistantInfoService],
})
export class AssistantInfoModule {}
