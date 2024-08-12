import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { History } from './entities/history.entity';

import { AuthModule } from 'src/auth/auth.module';

import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [TypeOrmModule.forFeature([History]), AuthModule, PatientModule],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
