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
import { User } from 'src/auth/entities/user.entity';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PaginationDto } from '../common/dto/pagination.dtos';

@Injectable()
export class PatientService {
  private readonly logger = new Logger('PatientService');

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { medicId, ...rest } = createPatientDto;
    const medic = await this.userRepository.findOne({
      where: { id: medicId },
    });
    if (!medic || !medic.roles.includes('medic'))
      throw new NotFoundException('The user is not a medic or does not exist.');
    try {
      const patientInfo = this.patientRepository.create({
        ...rest,
        medic,
      });
      await this.patientRepository.save(patientInfo);
      return patientInfo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const [patients, total] = await this.patientRepository.findAndCount({
      where: { isDeleted: false },
      relations: ['medic'],
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
      where: { id, isDeleted: false },
      relations: ['medic'],
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
    return this.findOne(id);
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
