import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Patient } from './entities/patient.entity';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PaginationDto } from '../common/dto/pagination.dtos';

@Injectable()
export class PatientService {
  private readonly logger = new Logger('PatientService');

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      const userInfo = this.patientRepository.create(createPatientDto);
      await this.patientRepository.save(userInfo);
      return userInfo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const [patients, total] = await this.patientRepository.findAndCount({
      where: { isDeleted: false },
      take: limit,
      skip: (page - 1) * limit,
    });
    return {
      data: patients,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const findPatient = await this.patientRepository.findOne({
      where: { id },
    });
    if (!findPatient)
      throw new NotFoundException(`Patient with id: ${id} not found`);
    return findPatient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const findPatient = await this.findOne(id);
    const patientToUpdate = await this.patientRepository.preload({
      id: findPatient.id,
      ...updatePatientDto,
    });
    await this.patientRepository.save(patientToUpdate);
    return patientToUpdate;
  }

  async remove(id: string) {
    const findPatient = await this.findOne(id);
    const patientToRemove = await this.patientRepository.preload({
      id: findPatient.id,
      isDeleted: true,
    });
    await this.patientRepository.save(patientToRemove);
    return patientToRemove;
  }

  private handleExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
