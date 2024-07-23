import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MedicInfo } from './entities/medic-info.entity';
import { User } from 'src/auth/entities/user.entity';

import { CreateMedicInfoDto } from './dto/create-medic-info.dto';
import { UpdateMedicInfoDto } from './dto/update-medic-info.dto';

@Injectable()
export class MedicInfoService {
  private readonly logger = new Logger('MedicInfoService');

  constructor(
    @InjectRepository(MedicInfo)
    private readonly medicInfoRepository: Repository<MedicInfo>,
  ) {}

  async create(user: User, createMedicInfoDto: CreateMedicInfoDto) {
    try {
      const medicInfo = this.medicInfoRepository.create({
        ...createMedicInfoDto,
        user,
      });
      await this.medicInfoRepository.save(medicInfo);
      return medicInfo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findMedicInfoByUser(user: User) {
    try {
      const findUserInfoByUser = await this.medicInfoRepository.findOne({
        where: { user: user },
      });
      if (!findUserInfoByUser)
        throw new NotFoundException(`User with id: ${user.id} not found`);
      return findUserInfoByUser;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(user: User, updateMedicInfoDto: UpdateMedicInfoDto) {
    const findUserInfoByUser = await this.findMedicInfoByUser(user);
    const medicInfoToUpdate = await this.medicInfoRepository.preload({
      id: findUserInfoByUser.id,
      ...updateMedicInfoDto,
    });
    if (!medicInfoToUpdate)
      throw new NotFoundException(`User with id: ${user.id} not found`);
    await this.medicInfoRepository.save(medicInfoToUpdate);
    return medicInfoToUpdate;
  }

  private handleExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
