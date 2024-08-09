import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { Patient } from './entities/patient.entity';

import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), AuthModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
