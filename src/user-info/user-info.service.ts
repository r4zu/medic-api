import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserInfo } from './entities/user-info.entity';

import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class UserInfoService {
  private readonly logger = new Logger('UserInfoService');

  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
  ) {}

  async create(createUserInfoDto: CreateUserInfoDto) {
    try {
      const userInfo = this.userInfoRepository.create(createUserInfoDto);
      await this.userInfoRepository.save(userInfo);
      return userInfo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findByUserId(id: string) {
    return;
  }

  async update(id: string, updateUserInfoDto: UpdateUserInfoDto) {
    const userInfo = await this.userInfoRepository.preload({
      id: id,
      ...updateUserInfoDto,
    });
    if (!userInfo) throw new NotFoundException(`User with id: ${id} not found`);
    await this.userInfoRepository.save(userInfo);
    return userInfo;
  }

  private handleExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
