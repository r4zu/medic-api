import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { History } from './entities/history.entity';

import { PatientService } from '../patient/patient.service';

import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { PaginationDto } from 'src/common/dto/pagination.dtos';

@Injectable()
export class HistoryService {
  private readonly logger = new Logger('PatientService');

  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
    private readonly patientService: PatientService,
  ) {}

  async create(createHistoryDto: CreateHistoryDto) {
    const { patientId, ...rest } = createHistoryDto;
    const patient = await this.patientService.findOne(patientId);
    try {
      const history = this.historyRepository.create({ ...rest, patient });
      await this.historyRepository.save(history);
      return history;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const [histories, total] = await this.historyRepository.findAndCount({
      relations: ['patient', 'patient.medic'],
      take: limit,
      skip: (page - 1) * limit,
    });
    return {
      data: histories,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const findHistory = await this.historyRepository.findOne({
      where: { id },
      relations: ['patient', 'patient.medic'],
    });
    if (!findHistory)
      throw new NotFoundException(`History with id: ${id} not found`);
    return findHistory;
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto) {
    const findHistory = await this.findOne(id);
    const historyToUpdate = await this.historyRepository.preload({
      id: findHistory.id,
      ...updateHistoryDto,
    });
    await this.historyRepository.save(historyToUpdate);
    return this.findOne(id);
  }

  private handleExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
