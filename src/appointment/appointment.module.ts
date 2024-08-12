import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Appointment } from './entities/appointment.entity';

import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';

import { AuthModule } from 'src/auth/auth.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), AuthModule, PatientModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
