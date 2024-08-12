import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Not } from 'typeorm';

import { Appointment } from './entities/appointment.entity';
import { User } from 'src/auth/entities/user.entity';

import { PatientService } from 'src/patient/patient.service';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PaginationDto } from 'src/common/dto/pagination.dtos';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger('PatientService');

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly patientService: PatientService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { startTime, endTime, patientId, medicId } = createAppointmentDto;
    const patient = await this.patientService.findOne(patientId);
    const medic = await this.userRepository.findOne({
      where: { id: medicId },
    });
    if (!medic || !medic.roles.includes('medic'))
      throw new NotFoundException('The user is not a medic or does not exist.');
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        medic: medic,
        startTime: LessThan(endTime),
        endTime: MoreThan(startTime),
      },
    });
    if (existingAppointment) {
      throw new ConflictException(
        'There is already an appointment in this time slot.',
      );
    }
    try {
      const appointmentInfo = this.appointmentRepository.create({
        date: new Date(),
        startTime,
        endTime,
        patient,
        medic,
      });
      await this.appointmentRepository.save(appointmentInfo);
      return appointmentInfo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const [appointments, total] = await this.appointmentRepository.findAndCount(
      {
        relations: ['patient', 'medic'],
        take: limit,
        skip: (page - 1) * limit,
      },
    );
    return {
      data: appointments,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const findAppointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['patient', 'medic'],
    });
    if (!findAppointment)
      throw new NotFoundException(`Appointment with id: ${id} not found`);
    return findAppointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const { startTime, endTime, medicId } = updateAppointmentDto;
    const findAppointment = await this.findOne(id);
    if (medicId && (startTime || endTime)) {
      const existingAppointment = await this.appointmentRepository.findOne({
        where: {
          medic: { id: medicId || findAppointment.medic.id },
          startTime: LessThan(endTime || findAppointment.endTime),
          endTime: MoreThan(startTime || findAppointment.startTime),
          id: Not(id),
        },
      });
      if (existingAppointment) {
        throw new ConflictException(
          'There is already an appointment in this time slot.',
        );
      }
    }
    const appointmentToUpdate = await this.appointmentRepository.preload({
      id: findAppointment.id,
      ...updateAppointmentDto,
    });
    if (!appointmentToUpdate)
      throw new NotFoundException('Appointment not found for update.');
    await this.appointmentRepository.save(appointmentToUpdate);
    return this.findOne(id);
  }

  async remove(id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment)
      throw new NotFoundException(`Appointment with id: ${id} not found`);
    await this.appointmentRepository.remove(appointment);
    return { message: `Appointment ${id} was deleted.` };
  }

  private handleExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
