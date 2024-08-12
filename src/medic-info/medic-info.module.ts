import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { MedicInfo } from './entities/medic-info.entity';

import { MedicInfoService } from './medic-info.service';
import { MedicInfoController } from './medic-info.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicInfo]), AuthModule],
  controllers: [MedicInfoController],
  providers: [MedicInfoService],
  exports: [MedicInfoService],
})
export class MedicInfoModule {}
