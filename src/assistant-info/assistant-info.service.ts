import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { AssistantInfo } from './entities/assistant-info.entity';

import { CreateAssistantInfoDto } from './dto/create-assistant-info.dto';
import { UpdateAssistantInfoDto } from './dto/update-assistant-info.dto';

@Injectable()
export class AssistantInfoService {
  private readonly logger = new Logger('AssistantInfoService');

  constructor(
    @InjectRepository(AssistantInfo)
    private readonly assistantInfoRepository: Repository<AssistantInfo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User, createAssistantInfoDto: CreateAssistantInfoDto) {
    const { medicId, ...rest } = createAssistantInfoDto;
    const medic = await this.userRepository.findOne({
      where: { id: medicId },
    });
    if (!medic || !medic.roles.includes('medic'))
      throw new NotFoundException('The user is not a medic or does not exist.');
    try {
      const assistantInfo = this.assistantInfoRepository.create({
        ...rest,
        user,
        medic: medic,
      });
      await this.assistantInfoRepository.save(assistantInfo);
      return assistantInfo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAssistantInfoByUser(user: User) {
    const findAssistantInfoByUser = await this.assistantInfoRepository.findOne({
      where: { user: user },
      relations: ['medic'],
    });
    if (!findAssistantInfoByUser)
      throw new NotFoundException(`User with id: ${user.id} not found`);
    return findAssistantInfoByUser;
  }

  async update(user: User, updateAssistantInfoDto: UpdateAssistantInfoDto) {
    const { medicId, ...rest } = updateAssistantInfoDto;
    let medic: User;
    if (medicId) {
      medic = await this.userRepository.findOne({
        where: { id: medicId },
      });
      if (!medic || !medic.roles.includes('medic'))
        throw new NotFoundException(
          'The user is not a medic or does not exist.',
        );
    }
    const findAssistantInfoByUser = await this.findAssistantInfoByUser(user);
    const assistantInfoToUpdate = await this.assistantInfoRepository.preload({
      id: findAssistantInfoByUser.id,
      ...rest,
    });
    if (medic) assistantInfoToUpdate.medic = medic;
    if (!assistantInfoToUpdate)
      throw new NotFoundException(`User with id: ${user.id} not found`);
    await this.assistantInfoRepository.save(assistantInfoToUpdate);
    return assistantInfoToUpdate;
  }

  private handleExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
